const pool = require("./src/config/db");

function getRandomPrice(base) {
  return Math.floor(base * (0.8 + Math.random() * 0.5));
}

function getRandomCategory(category) {
  const map = {
    "electronics": "Electronics",
    "jewelery": "Jewelry",
    "men's clothing": "Clothing",
    "women's clothing": "Clothing"
  };
  return map[category] || "Electronics";
}

async function seedProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    for (let p of products) {

      // 🔥 CHECK IF ALREADY EXISTS
      const existing = await pool.query(
        "SELECT * FROM products WHERE name = $1",
        [p.title]
      );

      if (existing.rows.length > 0) {
        console.log(`⚠️ Skipping duplicate: ${p.title}`);
        continue;
      }

      await pool.query(
        "INSERT INTO products (name, price, image_url, category) VALUES ($1, $2, $3, $4)",
        [
          p.title,
          getRandomPrice(p.price * 80),
          p.image,
          getRandomCategory(p.category)
        ]
      );
    }

    console.log("✅ Products inserted without duplicates!");
    process.exit();

  } catch (err) {
    console.error(err);
  }
}

seedProducts();