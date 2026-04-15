const express = require('express');
const router = express.Router();

const pool = require('../config/db'); // ✅ FIXED
const authMiddleware = require('../middleware/authMiddleware'); // ✅ IMPORTANT

// 🔥 PLACE ORDER
router.post("/place", authMiddleware, async (req, res) => {
  const user_id = req.user.id;
  const { shipping_address } = req.body;

  try {
    // 1. Get cart items
    const cartItems = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1",
      [user_id]
    );

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 2. Calculate total
    let total = 0;
    for (let item of cartItems.rows) {
      const product = await pool.query(
        "SELECT price FROM products WHERE id = $1",
        [item.product_id]
      );
      total += product.rows[0].price * item.quantity;
    }

    // 3. Create order
    const order = await pool.query(
      "INSERT INTO orders (user_id, total_amount, shipping_address) VALUES ($1, $2, $3) RETURNING *",
      [user_id, total, shipping_address]
    );

    const order_id = order.rows[0].id;

    // 4. Insert order items
    for (let item of cartItems.rows) {
      const product = await pool.query(
        "SELECT price FROM products WHERE id = $1",
        [item.product_id]
      );

      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
        [order_id, item.product_id, item.quantity, product.rows[0].price]
      );
    }

    // 5. Clear cart
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1",
      [user_id]
    );

    res.json({ message: "Order placed successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});


// 🔥 GET USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  const user_id = req.user.id;

  try {
    const orders = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    const result = [];

    for (let order of orders.rows) {
      const items = await pool.query(
        `SELECT oi.*, p.name, p.image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );

      result.push({
        ...order,
        items: items.rows,
      });
    }

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;