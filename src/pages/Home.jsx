import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useFarmerLang } from "../context/FarmerLangContext";
import farmerImg from "../assets/farmer.png";
import customerImg from "../assets/customer.png";



export default function Home() {
  const navigate = useNavigate();
  const { lang, setLang } = useFarmerLang();

  const text = {
    en: {
      title: "Welcome to कृषी connect 🌾",
      subtitle: "Direct from farm to your table 🌱",
      farmerDesc: "Sell your products",
      customerDesc: "Buy fresh products",
      login: "Login",
      register: "Register"
    },
    hi: {
      title: "कृषी connect में आपका स्वागत है 🌾",
      subtitle: "खेत से सीधे आपकी थाली तक 🌱",
      farmerDesc: "अपने उत्पाद बेचें",
      customerDesc: "ताज़ा उत्पाद खरीदें",
      login: "लॉगिन",
      register: "रजिस्टर"
    },
    mr: {
      title: "कृषी connect मध्ये स्वागत आहे 🌾",
      subtitle: "शेतातून थेट तुमच्या ताटात 🌱",
      farmerDesc: "आपली उत्पादने विक्री करा",
      customerDesc: "ताजी उत्पादने खरेदी करा",
      login: "लॉगिन",
      register: "नोंदणी"
    }
  };

  return (
    <div className="home-container">

      {/* Background Blur Overlay */}
      <div className="forest-overlay"></div>

      {/* HEADER */}
      <div className="header">
        {/* Decorative Vines */}
        <div className="vine vine-left">🌿</div>
        <div className="vine vine-right"></div>
        
        <a className="slogan">“🌿कृषी connect – Not Just Vegetables, We Sell Trust.”</a>
        
        <div className="header-controls">
          <div className="lang-buttons">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>English</button>
            <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")}>हिंदी</button>
            <button className={lang === "mr" ? "active" : ""} onClick={() => setLang("mr")}>मराठी</button>
          </div>

          <div
            className="admin-icon"
            onClick={() => navigate("/login?role=admin")}
            title="Admin Login"
          >
            



            
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero-content">
        <h1 className="title">{text[lang].title}</h1>
        <p className="subtitle">{text[lang].subtitle}</p>

        <div className="card-wrapper">
          {/* FARMER SECTION */}
          
          <div className="card-group">
            
            <div className="card glass-card">
              <h2>👨‍🌾 Farmer</h2>
              <p>{text[lang].farmerDesc}</p>
              <button className="primary-btn" onClick={() => navigate("/login?role=farmer")}>
                {text[lang].login}
              </button>
              <button
                className="outline-btn"
                onClick={() => navigate("/register?role=farmer")}
              >
                {text[lang].register}
              </button>
              <div className="tree-decor">
   
  </div>
            </div>
          </div>

           {/* CUSTOMER SECTION */}
          <div className="card-group">
          
            
            <div className="card glass-card">
              
              <h2>🛒 Customer</h2>
              <p>{text[lang].customerDesc}</p>
              <button className="primary-btn" onClick={() => navigate("/login?role=customer")}>
                {text[lang].login}
              </button>
              <button
                className="outline-btn"
                onClick={() => navigate("/register?role=customer")}
              >
                {text[lang].register}
              </button>
              <div className="tree-decor">
    
           </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            📸 Instagram
          </a>
          <span className="divider">|</span>
          <a href="mailto:yourmail@gmail.com">
            📧 Gmail
          </a>
        </div>
      </footer>
    </div>
    
  );
}