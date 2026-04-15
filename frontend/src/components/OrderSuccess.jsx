import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
function OrderSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();
  useTitle("Order Placed - Amazon.in");
  return (
    <div style={wrapper}>
      <div style={card}>
        
        <h1>🎉 Order Placed Successfully!</h1>
        <h2>Your Order ID: {id}</h2>

        {/* BUTTON */}
        <button
          style={btn}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const wrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#eaeded",
  minHeight: "80vh",
};

const card = {
  background: "white",
  padding: "40px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "#ffd814",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default OrderSuccess;