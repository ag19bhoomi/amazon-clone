import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("https://amazon-clone-backend-a7zs.onrender.com/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        setOrders(data);
      });
  }, []);

  return (
    <div style={{ background: "#eaeded", minHeight: "100vh", padding: "20px" }}>
      
      <h2 style={{ marginBottom: "20px" }}>Your Orders</h2>

      {orders.length === 0 ? (
        <h3>No orders yet</h3>
      ) : (
        orders.map(order => (
          <div
            key={order.id}
            style={{
              background: "white",
              borderRadius: "8px",
              marginBottom: "20px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >

            {/* 🔥 ORDER HEADER */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              background: "#f3f3f3",
              padding: "15px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              fontSize: "14px"
            }}>
              <div>
                <div><strong>ORDER PLACED</strong></div>
                <div>{new Date(order.created_at).toLocaleString()}</div>
              </div>

              <div>
                <div><strong>TOTAL</strong></div>
                <div>₹{order.total_amount}</div>
              </div>

              <div>
                <div><strong>ORDER ID</strong></div>
                <div>{order.id}</div>
              </div>
            </div>

            {/* 🔥 ITEMS */}
            <div style={{ padding: "15px" }}>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px"
                  }}
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/80")
                    }
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      marginRight: "15px"
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: "5px 0" }}>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  {/* OPTIONAL BUTTON */}
                 
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;