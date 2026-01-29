import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser")) || null
  );

  const API_URL = "https://farmer-shop-backend.onrender.com";

  // ✅ FIXED LOGIN (SAFE RESPONSE CHECK ADDED)
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: email.trim(),
        password
      });

      if (!res.data || !res.data.user || !res.data.token) {
        return {
          success: false,
          message: "Invalid server response"
        };
      }

      localStorage.setItem("loggedUser", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return { success: true };

    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed"
      };
    }
  };

  // 🔥 REGISTER (UNCHANGED)
  const register = async (name, email, password, role, phone, address, otp) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
        phone,
        address,
        otp
      });

      return {
        success: true,
        message: res.data.message
      };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed"
      };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
