import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save user
    localStorage.setItem("user", JSON.stringify({ name, email }));

    alert("Account created successfully!");

    navigate("/");
  };

  return (
    <div className="signup-page">

      {/* LOGO */}
      <div className="signup-logo">
        amazon<span>.in</span>
      </div>

      {/* BOX */}
      <div className="signup-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Re-enter Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Create your Amazon account</button>
        </form>
      </div>

      {/* FOOTER */}
      <div className="signup-footer">
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Help</span>
      </div>

    </div>
  );
}

export default Signup;