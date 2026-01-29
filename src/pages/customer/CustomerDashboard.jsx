import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CustomerDashboard.css";
import bgImage from "../../assets/back.jpeg";  
export default function CustomerDashboard() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // logged user from localStorage
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="customer-page" style={{ backgroundImage: `url(${bgImage})` }}>

      {/* ===== TOP RIGHT USER INFO (UNCHANGED LOGIC) ===== */}
      {user && (
        <div className="user-box">
          <div
            className="user-pill"
            onClick={() => setOpen(!open)}
          >
            👤 {user.name || "Customer"}
          </div>

          {open && (
            <div className="user-dropdown">
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>

              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.removeItem("loggedUser");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* ===== VEGGIES STRIP (NEW – VISUAL ONLY) ===== */}
      <div className="veggie-strip">
        <img src="https://img.icons8.com/color/96/tomato.png" alt="tomato" />
        <img src="https://img.icons8.com/color/96/carrot.png" alt="carrot" />
        <img src="https://img.icons8.com/color/96/onion.png" alt="onion" />
        <img src="https://img.icons8.com/color/96/broccoli.png" alt="broccoli" />
      </div>

      {/* ===== CENTER CONTENT (SAME TEXT) ===== */}
      <div className="dashboard-card">
        <h2>Welcome to कृषी connect</h2>
        <p>Buy fresh products directly from farmers</p>

        <Link to="/customer/products">
          <button className="btn-main">
            🥬 View Products
          </button>
        </Link>
      </div>
    </div>
  );
}
