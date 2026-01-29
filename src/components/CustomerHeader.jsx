import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHeader.css";

export default function CustomerHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  if (!user) return null;

  return (
    <div className="customer-header">
      <div className="user-box" onClick={() => setOpen(!open)}>
        👤 {user.name || "Customer"}
      </div>

      {open && (
        <div className="user-dropdown">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>

          <button
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
  );
}
