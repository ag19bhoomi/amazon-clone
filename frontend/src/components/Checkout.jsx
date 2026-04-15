import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCart(Array.isArray(data) ? data : []));
  }, []);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    const fullAddress = `${name}, ${phone}, ${address}`;

    const res = await fetch(
      "http://localhost:5000/api/cart/place-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address: fullAddress }),
      }
    );

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    navigate(`/order-success/${data.order_id}`);
  };

  return (
    <div style={wrapper}>
      <div style={container}>

        {/* LEFT SIDE */}
        <div style={{ flex: 2 }}>

          {/* ADDRESS */}
          <div style={card}>
            <h3>📍 Delivery Address</h3>

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={input}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={input}
            />

            <textarea
              placeholder="Full Address (Street, City, Pincode)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={textarea}
            />
          </div>

          {/* ITEMS */}
          <div style={card}>
            <h3>🛒 Review Items</h3>

            {cart.map((item) => (
              <div key={item.id} style={itemRow}>
                <img src={item.image_url} style={img} />

                <div>
                  <p style={{ fontWeight: "bold" }}>{item.name}</p>
                  <p style={{ color: "#B12704" }}>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PAYMENT */}
          <div style={card}>
            <h3>💳 Payment Method</h3>

            <p style={{ color: "green" }}>
              Cash on Delivery (COD) Available
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div style={summary}>
          <h3>Order Summary</h3>

          <p>Items: ₹{total}</p>
          <p>Delivery: <span style={{ color: "green" }}>FREE</span></p>

          <hr />

          <h2>Total: ₹{total}</h2>

          <button style={btn} onClick={placeOrder}>
            Place Order
          </button>

          <p style={{ fontSize: "12px", marginTop: "10px", color: "#555" }}>
            By placing your order, you agree to our terms.
          </p>
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

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
  display: "flex",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textarea = {
  width: "100%",
  height: "90px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const itemRow = {
  display: "flex",
  gap: "15px",
  marginBottom: "12px",
  alignItems: "center",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "contain",
};

const summary = {
  flex: 1,
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  height: "fit-content",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  position: "sticky",
  top: "100px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#ffd814",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "6px",
};

export default Checkout;