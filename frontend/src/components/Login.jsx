import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ MOVE useEffect INSIDE COMPONENT
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, []);
const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("https://amazon-clone-backend-a7zs.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  // 🔥 STORE TOKEN
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  navigate("/");
};

  return (
    <div className="login-page">
      <h1 className="amazon-logo">amazon.in</h1>

      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin} className="form">

          <div className="form-group">
            <label>Email or mobile phone number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <label>Password</label>
              <span style={{ fontSize: "12px", color: "#007185", cursor: "pointer" }}>
                Forgot Password
              </span>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div style={{ marginTop: "10px" }}>
            <input type="checkbox" /> Keep me signed in
          </div>

          <hr style={{ margin: "20px 0" }} />

          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Create your Amazon account
          </button>

        </form>
      </div>

      <div className="login-footer">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>
    </div>
  );
}

export default Login;