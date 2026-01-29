import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

const API_URL = "https://farmer-shop-backend.onrender.com/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // 🔁 LOAD PRODUCTS
  const loadProducts = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    let res;

    if (user?.role === "farmer") {
      res = await axios.get(
        `${API_URL}/farmer-products/${user.email}`
      );
    } else {
      res = await axios.get(API_URL); // customer
    }

    setProducts(Array.isArray(res.data) ? res.data : []);
  } catch (err) {
    console.error("LOAD PRODUCTS ERROR", err);
    setProducts([]);
  }
};



  useEffect(() => {
    loadProducts();
  }, []);

  // ➕ ADD PRODUCT (FARMER)
  const addProduct = async (product) => {
    try {
      const res = await axios.post(`${API_URL}/add`, {
        ...product,
        status: "pending",
        marketPrice: null,
        rejectReason: ""
      });

      setProducts(prev => [...prev, res.data]);

      return { success: true, data: res.data };

    } catch (err) {
      console.error("ADD PRODUCT ERROR", err);

      return {
        success: false,
        message: err.response?.data?.message || "Product add failed"
      };
    }
  };

  // ✅ APPROVE
  const approveProduct = async (id, marketPrice) => {
    try {
      const res = await axios.put(`${API_URL}/approve/${id}`, { marketPrice });
      setProducts(products.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error("APPROVE PRODUCT ERROR", err);
    }
  };

  // ❌ REJECT
  const rejectProduct = async (id, reason) => {
    try {
      const res = await axios.put(`${API_URL}/reject/${id}`, { reason });
      setProducts(products.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error("REJECT PRODUCT ERROR", err);
    }
  };

  // 🗑 DELETE
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error("DELETE PRODUCT ERROR", err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        approveProduct,
        rejectProduct,
        deleteProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
