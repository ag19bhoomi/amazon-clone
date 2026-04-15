const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authMiddleware = require("../middleware/authMiddleware");


// ✅ ADD TO CART
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    // 🔥 VALIDATION
    if (!product_id || isNaN(product_id)) {
      return res.status(400).json({ error: "Invalid product_id" });
    }

    if (!quantity || isNaN(quantity)) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const existing = await pool.query(
      'SELECT * FROM cart_items WHERE user_id=$1 AND product_id=$2',
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id=$2 AND product_id=$3',
        [quantity, user_id, product_id]
      );
    } else {
      await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [user_id, product_id, quantity]
      );
    }

    res.json({ message: 'Product added to cart' });

  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({ error: 'Error adding to cart' });
  }
});


// ✅ GET CART
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT 
          c.id, 
          c.product_id,
          c.quantity, 
          p.name, 
          p.price, 
          p.image_url
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [user_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});


// ✅ UPDATE QUANTITY
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    // 🔥 VALIDATION
    if (!product_id || isNaN(product_id)) {
      return res.status(400).json({ error: "Invalid product_id" });
    }

    if (quantity === undefined || isNaN(quantity)) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE user_id=$2 AND product_id=$3',
      [quantity, user_id, product_id]
    );

    res.json({ message: 'Cart updated' });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: 'Error updating cart' });
  }
});


// ✅ REMOVE ITEM
router.delete('/remove/:id', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;

    // 🔥 VALIDATION
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid cart id" });
    }

    await pool.query(
      'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
      [id, user_id]
    );

    res.json({ message: 'Item removed from cart' });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});


// ✅ PLACE ORDER (FINAL)
router.post("/place-order", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address } = req.body;

    // 🔥 VALIDATION
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    // 🔥 GET CART WITH PRICE
    const cart = await pool.query(
      `SELECT c.product_id, c.quantity, p.price
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 🔥 CALCULATE TOTAL
    let total = 0;
    for (let item of cart.rows) {
      total += item.quantity * item.price;
    }

    // 🔥 CREATE ORDER
    const order = await pool.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, total, address]
    );

    const order_id = order.rows[0].id;

    // 🔥 INSERT ORDER ITEMS
    for (let item of cart.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    // 🔥 CLEAR CART
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1",
      [user_id]
    );

    res.json({ success: true, order_id });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ error: "Order failed" });
  }
});


module.exports = router;