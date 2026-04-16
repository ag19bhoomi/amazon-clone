import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import { CartContext } from "../context/temp";
import useTitle from "../hooks/useTitle";
function ProductList({ category, search, sort }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useTitle("Amazon.in - Home");
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  useEffect(() => {
    fetch("https://amazon-clone-backend-a7zs.onrender.com/api/products/all")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = async (id) => {
    const token = localStorage.getItem("token");

   const res = await fetch("https://amazon-clone-backend-a7zs.onrender.com/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: id, quantity: 1 })
    });

    const data = await res.json();

    if (data.error) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    fetchCartCount();
  };

  // 🔥 FILTER
  let filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  // 🔥 SORT
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // 🔥 PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, search, sort]);

  return (
    <div style={{ padding: "20px", background: "#eaeded", minHeight: "100vh" }}>
    <div className="product-container">
  {currentProducts.map(p => (
  <div
    className="product-card"
    key={p.id}
    style={{ position: "relative" }}   // 🔥 VERY IMPORTANT
  >

    {/* 🔥 BADGES HERE */}
    {p.price < 40000 && (
      <div style={badge}>Deal</div>
    )}

    {p.is_prime && (
  <div style={primeBadge}>Prime</div>
)}

    {/* EXISTING CONTENT */}
    <img
      src={p.image_url}
      alt={p.name}
      onClick={() => navigate(`/product/${p.id}`)}
    />
    <h3>{p.name}</h3>

    {/* ⭐ rating (if added) */}
    <div style={rating}>
  {"⭐".repeat(Math.floor(p.rating || 4))}
  {"☆".repeat(5 - Math.floor(p.rating || 4))}
  <span style={{ color: "#555" }}>
    {" "}
    ({(p.rating || 4).toFixed(1)})
  </span>
</div>
  <p style={{ color: "green", fontSize: "14px" }}>
  {p.discount}% off
</p>
    <p style={{ color: "#B12704" }}>₹{p.price}</p>

    <button onClick={() => addToCart(p.id)}>Add to Cart</button>
    
  </div>
))}
</div>

      {/* 🔥 PAGINATION UI */}
      <div style={paginationWrapper}>
  
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    style={{
      ...pageBtn,
      opacity: currentPage === 1 ? 0.5 : 1
    }}onMouseOver={(e) => {
  if (!e.target.disabled) {
    e.target.style.background = "#f7f7f7";
  }
}}
onMouseOut={(e) => {
  if (!e.target.classList.contains("active")) {
    e.target.style.background = "white";
  }
}}
  >
    ← Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      style={{
        ...pageBtn,
        ...(currentPage === i + 1 ? activePage : {})
      }}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    style={{
      ...pageBtn,boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      opacity: currentPage === totalPages ? 0.5 : 1
    }}onMouseOver={(e) => {
  if (!e.target.disabled) {
    e.target.style.background = "#f7f7f7";
  }
}}
onMouseOut={(e) => {
  if (!e.target.classList.contains("active")) {
    e.target.style.background = "white";
  }
}}
  >
    Next →
  </button>

</div>
    </div>
  );
}
const paginationWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  marginTop: "30px",
};

const pageBtn = {
  padding: "8px 14px",
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const activePage = {
  background: "#ff9900",
  color: "white",
  border: "1px solid #ff9900",
  fontWeight: "bold",
};
const rating = {
  color: "#ffa41c",
  fontSize: "14px",
  margin: "5px 0",
};

const badge = {
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "red",
  color: "white",
  padding: "3px 6px",
  fontSize: "12px",
  borderRadius: "3px",
};

const primeBadge = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "#00a8e1",
  color: "white",
  padding: "3px 6px",
  fontSize: "12px",
  borderRadius: "3px",
};

export default ProductList;