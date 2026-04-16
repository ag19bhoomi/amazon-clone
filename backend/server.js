const express = require('express');
const cors = require('cors');

require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const authRoutes = require("./src/routes/authRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);


app.use("/api/auth", authRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('API is running...');
});
const pool = require('./src/config/db');
app.get('/debug-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    res.status(500).send("DB error");
  }
});
// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
