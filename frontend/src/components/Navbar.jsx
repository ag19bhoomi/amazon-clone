import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/temp";

function Navbar({ setMenuOpen, setSearch, setCategory }){
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { cartCount } = useContext(CartContext);

  const [showDropdown, setShowDropdown] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <div style={navbar}>

      {/* LEFT */}
      <div style={left}>
        <button onClick={() => setMenuOpen(true)} style={menuBtn}>
          ☰
        </button>

        <div onClick={() => navigate("/")} style={logoWrapper}>
        <span style={logoMain}>amazon</span>
        <span style={logoIn}>.in</span>

        <div style={smile}></div>
        </div>
      </div>

      {/* CENTER SEARCH */}
      <div style={searchWrapper}>
  
  <select
  onChange={(e) => {
    setCategory(e.target.value);   // 🔥 update category
  }}
  style={{
    padding: "10px",
    border: "none",
    outline: "none",
    background: "#f3f3f3"
  }}
>
  <option value="All">All</option>
<option value="Mobiles">Mobiles</option>
<option value="Men">Men</option>
<option value="Women">Women</option>
<option value="Jewelry">Jewelry</option>
<option value="Electronics">Electronics</option>
<option value="Furniture">Furniture</option>
</select>

  <input
    type="text"
    placeholder="Search Amazon.in"
    onChange={(e) => setSearch(e.target.value)}
    style={searchInput}
  />

  <button style={searchBtn}>🔍</button>
</div>

      {/* RIGHT */}
      <div style={right}>

        {/* USER */}
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <div style={{ fontSize: "12px" }}>Hello</div>
          <div style={{ fontWeight: "bold" }}>
            {user?.name || "Guest"}
          </div>

          {showDropdown && (
            <div style={dropdown}>
              <div onClick={handleLogout} style={logoutBtn}>
                 Logout
              </div>
            </div>
          )}
        </div>

        {/* ORDERS */}
        <div onClick={() => navigate("/orders")} style={{ cursor: "pointer" }}>
          Orders
        </div>

        {/* CART */}
        <div onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
          🛒 {cartCount}
        </div>

      </div>
    </div>
  );
}

/* 🔥 STYLES */

const navbar = {
  background: "#131921",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const menuBtn = {
  fontSize: "22px",
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
};

/* 🔍 SEARCH */
const searchWrapper = {
  flex: 1,
  display: "flex",
  margin: "0 20px",
  maxWidth: "700px",
  background: "white",
  borderRadius: "5px",
  overflow: "hidden",
};

const searchInput = {
  flex: 1,
  padding: "10px",
  border: "none",
  outline: "none",
};

const searchBtn = {
  background: "#febd69",
  border: "none",
  padding: "10px 15px",
  cursor: "pointer",
};

/* 🟡 LOGO */
const logoWrapper = {
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "flex-end",
  gap: "2px",
};

const logoMain = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "white",
};

const logoIn = {
  fontSize: "12px",
  color: "white",   // 🔥 FIXED
  marginBottom: "2px",
};

const smile = {
  position: "absolute",
  bottom: "-5px",
  left: "0",
  width: "60px",
  height: "10px",
  borderBottom: "3px solid #f90",
  borderRadius: "50%",
};
/* DROPDOWN */
const dropdown = {
  position: "absolute",
  top: "40px",
  right: "0",
  background: "white",
  color: "black",
  padding: "10px",
  borderRadius: "6px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  zIndex: 1000,   // 🔥 ADD THIS
};
const categoryDropdown = {
  border: "none",
  background: "#f3f3f3",
  padding: "10px",
  cursor: "pointer",
};
const logoutBtn = {
  cursor: "pointer",
  padding: "5px 10px",
};
export default Navbar;