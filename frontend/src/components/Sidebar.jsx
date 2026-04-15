import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ menuOpen, setMenuOpen, setCategory, setSort }) {
  const [user, setUser] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  const handleClick = (cat) => {
  setCategory(cat);
  setMenuOpen(false);
  navigate("/");   // ✅ THIS IS MISSING
};
  const handleSort = (type) => {
    setSort(type);
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 999
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: menuOpen ? "0" : "-320px",
          width: "300px",
          height: "100vh",
          background: "white",
          zIndex: 1000,
          transition: "0.3s",
          overflowY: "auto"
        }}
      >
        <div style={{
          background: "#131921",
          color: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span>Hello, {user ? user.name : "Guest"}</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div style={{ padding: "20px" }}>
          <h4>Shop by Category</h4>

          <p onClick={() => handleClick("All")} style={itemStyle} onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>All</p>

          <h5>Fashion</h5>
          <p onClick={() => handleClick("Men")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Men</p>
          <p onClick={() => handleClick("Women")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Women</p>
          <p onClick={() => handleClick("Jewelry")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Jewelry</p>

          <h5>Electronics</h5>
          <p onClick={() => handleClick("Mobiles")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Mobiles</p>
          <p onClick={() => handleClick("Electronics")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Laptops & Gadgets</p>

          <h5>Others</h5>
          <p onClick={() => handleClick("Furniture")} style={itemStyle}onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>Furniture</p>

          {/* 🔥 SORT */}
          <hr />
          <h4>Sort By</h4>

          <p onClick={() => handleSort("low")} style={itemStyle} onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>
            Price: Low to High
          </p>

          <p onClick={() => handleSort("high")} style={itemStyle} onMouseOver={(e) => e.target.style.color = "#ff9900"}
  onMouseOut={(e) => e.target.style.color = "black"}>
            Price: High to Low
          </p>
        </div>
      </div>
    </>
  );
}

const itemStyle = {
  cursor: "pointer",
  padding: "8px 0",
  fontSize: "15px",
  userSelect: "none"
};

export default Sidebar;