import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [params] = useSearchParams();
  const role = params.get("role"); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ADMIN_EMAIL = "admin@farmershop.com";
  const ADMIN_PASSWORD = "FARMER@123";

  const handleLogin = async () => {
    if (!role) {
      alert("Please login from Home page");
      navigate("/");
      return;
    }

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    // 🔥 ADMIN LOGIN (UNCHANGED)
    if (role === "admin") {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        alert("Invalid Admin Credentials");
        return;
      }
      localStorage.setItem("loggedUser", JSON.stringify({ email, role }));
      navigate("/admin");
      return;
    }

    // 🔥 USER LOGIN
    const res = await login(email.trim(), password);

    if (!res || !res.success) {
      alert(res?.message || "Login failed");
      return;
    }

    navigate(`/${role}`);
  };

  return (
    <div className="container center login-page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="login-card">
        <h2>{role ? role.toUpperCase() : "SECURE"} LOGIN</h2>
        <p className="subtitle">Welcome to the Magic Farm</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
        </Link>

        <button className="btn btn-green" onClick={handleLogin}>
          Enter Portal
        </button>
      </div>
    </div>
  );
}
