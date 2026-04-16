const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// ✅ SPECIFIC ROUTE FIRST
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("REAL ERROR:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ ID ROUTE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ERROR IN ID ROUTE:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = router;