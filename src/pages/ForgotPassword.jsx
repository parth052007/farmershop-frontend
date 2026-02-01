import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!email) return alert("Enter your email");

    try {
      const res = await axios.post(
  "https://farmer-shop-backend.onrender.com/api/auth/forgot-password",
  { email }
);

      setResetLink(res.data.resetLink);
      setMsg("Reset link generated 👇");

    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container center login-page">
      <div className="login-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your registered email</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button className="btn btn-green" onClick={handleSubmit}>
          Send Reset Link
        </button>

        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}

        {/* 🔥 CLICKABLE RESET LINK */}
        {resetLink && (
          <p style={{ marginTop: 10 }}>
            👉{" "}
            <a href={resetLink} style={{ color: "green", fontWeight: "bold" }}>
              Click here to reset password
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
