import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const OrderContext = createContext();

// ✅ FIXED: ENV BASED API (hard-coded hata diya)
const API_URL = import.meta.env.VITE_API_URL + "/api/orders";

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  // ✅ LOAD CUSTOMER ORDERS
  const loadOrders = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(
        `${API_URL}/customer/${user.email.toLowerCase()}`
      );
      setOrders(res.data);
    } catch (err) {
      console.error("LOAD ORDERS ERROR", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ✅ PLACE ORDER
  const placeOrder = async (orderData) => {
    try {
      const fixedOrderData = {
        ...orderData,
        customer: {
          ...orderData.customer,
          email: orderData.customer.email.toLowerCase()
        },
        farmerEmail: orderData.farmerEmail.toLowerCase()
      };

      const res = await axios.post(
        `${API_URL}/place`,
        fixedOrderData
      );

      setOrders(prev => [res.data, ...prev]);

      return { success: true };
    } catch (err) {
      console.error("PLACE ORDER ERROR", err);
      return {
        success: false,
        message: err.response?.data?.message || "Order failed"
      };
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);