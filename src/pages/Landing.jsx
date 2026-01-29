import "./Landing.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFarmerLang } from "../context/FarmerLangContext"; // ✅ ADD

export default function Landing() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const { lang, setLang } = useFarmerLang(); // ✅ ADD

  return (
    <div className="landing-wrapper">
      {/* ===== NAVBAR ===== */}
      <nav className="landing-nav">
        <div className="logo">कृषी~CONNECT</div>

        <ul className="nav-links">
          <li className="nav-item">Home</li>

          <li
            className="nav-item"
            onClick={() => setActiveSection("about")}
          >
            About
          </li>

          <li
            className="nav-item"
            onClick={() => setActiveSection("services")}
          >
            Services
          </li>

          <li
            className="nav-item"
            onClick={() => setActiveSection("contact")}
          >
            Contact
          </li>
        </ul>

      
      </nav>

      {/* ===== HERO CONTENT ===== */}
      <div className="hero-content">
        <h1>WELCOME TO कृषी~CONNECT</h1>
        <p>
          कृषी connect – Not Just Vegetables, We Sell Trust.”
        </p>

        <button onClick={() => navigate("/home")}>
          GET STARTED
        </button>
      </div>

      {/* ===== INFO OVERLAY ===== */}
      {activeSection && (
        <div
          className="info-overlay"
          onClick={() => setActiveSection(null)}
        >
          <div
            className="info-box"
            onClick={(e) => e.stopPropagation()}
          >
            {activeSection === "about" && (
              <>
                <h2>About Us</h2>

                <li>🌱 Who We Are  
                कृषी~CONNECT is a technology-driven agricultural marketplace connecting farmers directly with customers.</li>

                <li>🤝 Direct Farmer–Customer Connection  
                We remove unnecessary middlemen, enabling fair pricing and transparent transactions for both farmers and buyers.</li>

                <li>📈 Empowering Farmers  
                Our platform gives farmers control over product listings, pricing visibility, and access to a wider customer base.</li>

                <li>🥬 Fresh & Trusted Products  
                Customers receive farm-fresh produce with verified quality and clear source information.</li>

                <li>🛡️ Transparency & Trust  
                Admin verification ensures quality standards, genuine pricing, and a secure buying experience.</li>

                <li>🌍 Our Vision  
                To build a sustainable, trustworthy, and efficient farm-to-table ecosystem using modern technology.</li>
              </>
            )}

            {activeSection === "services" && (
              <>
                <h2>Our Services</h2>
                <ul>
                  <li>🌾 Farmer Product Listing</li>
                  <li>🛒 Direct Customer Purchasing</li>
                  <li>📊 Admin Quality & Price Control</li>
                  <li>🔒 Secure User Management</li>
                  <li>🚚 Transparent Farm-to-Customer Flow</li>
                </ul>
              </>
            )}

            {activeSection === "contact" && (
              <>
                <h2>Contact</h2>
                <p>
                  📧 krushiconnect@gmail.com <br />
                  📸 Instagram: @krushi_connect
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
