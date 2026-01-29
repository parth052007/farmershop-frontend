import "./Register.css";

import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";   // ✅ FIXED PATH
import axios from "axios";   // 🔥 ADD

export default function Register() {
  const [params] = useSearchParams();
  const role = params.get("role"); // farmer / buyer
  const mappedRole = role === "customer" ? "buyer" : role;
  const navigate = useNavigate();
  const { register } = useAuth(); // 🔥 IMPORTANT

  // 🔥 ADD THIS
  const API_URL = "https://farmer-shop-backend.onrender.com";

  const [otpSent, setOtpSent] = useState(false);   // 🔥 ADD
  const [otp, setOtp] = useState("");              // 🔥 ADD

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "", 
    password: "",
    confirm: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🔥 SEND OTP (FINAL – CORS SAFE) */
  const sendOtp = async () => {
    if (!form.email) {
      alert("Enter email first");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/send-otp`,
        { email: form.email },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("OTP RESPONSE:", res.data);

      alert("✅ OTP sent to email");
      setOtpSent(true);

    } catch (err) {
      console.error(
        "SEND OTP ERROR:",
        err.response?.data || err.message
      );
      alert("❌ Failed to send OTP");
    }
  };

  const handleRegister = async () => {
    if (!role) {
      alert("Please register from Home page");
      navigate("/");
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.password ||
      !form.confirm ||
      !otp
    ) {
      alert("Fill all fields");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Password not matching");
      return;
    }

    const res = await register(
      form.name,
      form.email,
      form.password,
      mappedRole,
      form.phone,
      form.address,
      otp
    );

    if (!res.success) {
      alert(res.message);
      return;
    }

    alert("✅ Registration Successful");
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h2>{role ? role.toUpperCase() : ""} Register</h2>

        <input name="name" placeholder="Full Name" onChange={handleChange} /><br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />

        <button className="btn btn-green" onClick={sendOtp}>
          Send OTP
        </button>
        <br /><br />

        {otpSent && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <br /><br />
          </>
        )}

        <input name="phone" placeholder="Phone Number" onChange={handleChange} /><br /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange} /><br /><br />
        <input name="address" placeholder="Address" onChange={handleChange} /><br /><br />

        <button className="btn btn-green" onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  );
}
