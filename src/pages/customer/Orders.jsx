import { useState, useEffect } from "react";
import axios from "axios";

// ✅ FIXED: correct orders API base
const API_URL = import.meta.env.VITE_API_URL + "/api/orders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  // ✅ LOAD USER-SPECIFIC ORDERS FROM BACKEND
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const userEmail = user?.email;
    if (!userEmail) return;

    const loadOrders = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/customer/${userEmail}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("LOAD ORDERS ERROR", err);
      }
    };

    loadOrders();
  }, []);

  // ❌ Cancel only UI-side for now
  const cancelOrder = (id) => {
    const updatedOrders = orders.filter(o => o._id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div className="container center">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders placed yet</p>}

      {orders.map(o => (
        <div key={o._id} className="card">
          <p><b>Order ID:</b> #{o._id}</p>
          <p><b>Status:</b> {o.status}</p>
          <p><b>Total Amount:</b> ₹{o.totalAmount}</p>
          <p>
            <b>Date:</b>{" "}
            {new Date(o.createdAt).toLocaleString()}
          </p>

          <p><b>Products:</b></p>
          <p>
            • {o.product.name.en} × {o.quantity}
          </p>

          <button
            className="btn btn-outline"
            onClick={() => cancelOrder(o._id)}
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
}
