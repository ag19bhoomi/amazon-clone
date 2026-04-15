const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET products with search + category filter
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
// GET single product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  res.json(result.rows[0]);
});
module.exports = router;
