import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./FarmerOrders.css";

// ✅ FIXED: correct orders API base
const API_URL = "https://farmer-shop-backend.onrender.com/api/orders";

export default function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const farmerEmail = user?.email;
    if (!farmerEmail) return;

    const loadFarmerOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/farmer/${farmerEmail}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("LOAD FARMER ORDERS ERROR", err);
      }
    };

    loadFarmerOrders();
  }, [location.pathname]);

  return (
    <div className="farmer-orders-scope">
      <div className="farmer-orders-page">

        <h2>
          {location.pathname === "/farmer/rejected"
            ? "Rejected Orders"
            : "Your Orders"}
        </h2>

        {orders.length === 0 && (
          <p className="no-orders">No orders received yet</p>
        )}

        {orders.map(order => (
          <div
            key={order._id}
            className="farmer-order-card"
          >
            <h4>📦 {order.product.name.en}</h4>

            <p><b>Quantity:</b> {order.quantity}</p>
            <p><b>Farmer Price:</b> ₹{order.product.price}</p>
            <p><b>Market Price:</b> ₹{order.product.marketPrice}</p>

            <hr />

            <p><b>Customer Email:</b> {order.customer.email}</p>
            <p><b>Customer Name:</b> {order.customer.name}</p>
            <p><b>Customer phone:</b> {order.customer.phone}</p>
            <p><b>Customer Address:</b> {order.customer.address || "Not Provided"}</p>

            {order.customer.phone && (
              <a
                href={`https://wa.me/91${order.customer.phone}?text=${encodeURIComponent(
                  `Hello ${order.customer.name},
I am your farmer.

Product: ${order.product.name.en}
Quantity: ${order.quantity}

Regarding delivery timing & availability.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
              >
                💬 Chat on WhatsApp
              </a>
            )}

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </p>

            <p>
              <b>Order Date:</b>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
