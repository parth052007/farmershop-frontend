import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    if (!password || !confirm)
      return alert("Fill all fields");

    if (password !== confirm)
      return alert("Passwords do not match");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="container center login-page">
      <div className="login-card">
        <h2>🔁 Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        <button className="btn btn-green" onClick={handleReset}>
          Reset Password
        </button>

        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
}
