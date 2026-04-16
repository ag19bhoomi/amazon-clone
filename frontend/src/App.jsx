import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./components/Orders";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";


function Layout() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // 🔥 ADDED
  


  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

return (
  <>
    {/* ❌ COMMENT THESE */}
    {/* {!hideNavbar && <Navbar ... />} */}
    {/* {!hideNavbar && <Sidebar ... />} */}

    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
    </Routes>
  </>
);
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}


export default App;