import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/temp";
import useTitle from "../hooks/useTitle";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  useTitle("Cart - Amazon.in");

  // ✅ FETCH CART (FIXED)
  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const res = await fetch(
      "https://amazon-clone-backend-a7zs.onrender.com/api/cart",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ✅ HANDLE 401
    if (res.status === 401) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    const data = await res.json();
    setCartItems(Array.isArray(data) ? data : []);
  };

  // ✅ FIXED: REMOVE setInterval (ONLY CALL ONCE)
  useEffect(() => {
    fetchCart();
  }, []);

  // UPDATE
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;

    const token = localStorage.getItem("token");

    await fetch(
      "https://amazon-clone-backend-a7zs.onrender.com/api/cart/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: qty,
        }),
      }
    );

    fetchCart();
    fetchCartCount();
  };

  // REMOVE
  const removeItem = async (cartId) => {
    const token = localStorage.getItem("token");

    await fetch(
      `https://amazon-clone-backend-a7zs.onrender.com/api/cart/remove/${cartId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchCart();
    fetchCartCount();
  };

  // TOTAL
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // CHECKOUT
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div style={wrapper}>
      <div style={container}>
        <h2>Your Cart</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* LEFT */}
          <div style={{ flex: 2 }}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} style={card}>
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={image}
                    onClick={() =>
                      navigate(`/product/${item.product_id}`)
                    }
                  />

                  <div style={{ flex: 1 }}>
                    <h3>{item.name}</h3>
                    <p style={{ color: "#B12704" }}>₹{item.price}</p>

                    <div style={qtyWrapper}>
                      <div style={qtyBox}>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                          style={qtyBtn}
                        >
                          −
                        </button>

                        <span style={qtyNumber}>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                          style={qtyBtn}
                        >
                          +
                        </button>
                      </div>

                      <span
                        onClick={() => removeItem(item.id)}
                        style={deleteText}
                      >
                        🗑 Delete
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* RIGHT */}
          <div style={summary}>
            <h3>Cart Summary</h3>

            <p>
              Subtotal ({cartItems.length} items):{" "}
              <strong>₹{subtotal}</strong>
            </p>

            <hr />

            <h2>Total: ₹{subtotal}</h2>

            <button onClick={handleCheckout} style={checkoutBtn}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const wrapper = {
  display: "flex",
  justifyContent: "center",
  background: "#eaeded",
  minHeight: "100vh",
  paddingTop: "40px",
};

const container = {
  width: "90%",
  maxWidth: "1200px",
};

const card = {
  display: "flex",
  gap: "20px",
  background: "white",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const image = {
  width: "140px",
  height: "140px",
  objectFit: "contain",
  cursor: "pointer",
};

const qtyWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginTop: "10px",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  borderRadius: "25px",
  overflow: "hidden",
  background: "#f0f2f2",
};

const qtyBtn = {
  border: "none",
  background: "transparent",
  padding: "8px 12px",
  cursor: "pointer",
  fontSize: "18px",
};

const qtyNumber = {
  padding: "0 15px",
  fontWeight: "bold",
};

const deleteText = {
  cursor: "pointer",
  color: "#007185",
  fontSize: "14px",
};

const summary = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "10px",
};

const checkoutBtn = {
  width: "100%",
  marginTop: "10px",
  padding: "10px",
  background: "#ffd814",
  border: "none",
  cursor: "pointer",
};

export default Cart;