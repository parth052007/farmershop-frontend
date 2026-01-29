import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { FarmerLangProvider } from "./context/FarmerLangContext";
import { AuthProvider } from "./context/AuthContext";   // ✅ ADDED
import FarmerOrders from "./pages/farmer/FarmerOrders";

import FarmerAgroMarket from "./pages/farmer/FarmerAgroMarket";
// 🔥 ADD THIS IMPORT
import RejectedOrders from "./pages/farmer/RejectedOrders";  // reuse same page

// backend ka order 
import { OrderProvider } from "./context/OrderContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// CUSTOMER
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import ProductList from "./pages/customer/ProductList";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Wishlist from "./pages/customer/Wishlist";

// FARMER
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/MyProducts";
import FarmingAssistant from "./pages/farmer/FarmingAssistant";
import HelpfulToYou from "./pages/farmer/HelpfulToYou";


// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <FarmerLangProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter>
                <Routes>
                  {/* PUBLIC */}
                  <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                   <Route path="/reset-password/:token" element={<ResetPassword />} />
                  
                  {/* CUSTOMER */}
                  <Route path="/customer" element={<CustomerDashboard />} />
                  <Route path="/customer/products" element={<ProductList />} />
                  <Route path="/customer/cart" element={<Cart />} />
                  <Route path="/customer/orders" element={<Orders />} />
                  <Route path="/customer/wishlist" element={<Wishlist />} />
                  {/* FARMER */}
                  <Route path="/farmer" element={<FarmerDashboard />} />
                  <Route path="/farmer/add-product" element={<AddProduct />} />
                  <Route path="/farmer/my-products" element={<MyProducts />} />
                  <Route path="/farmer/orders" element={<FarmerOrders />} />
                  <Route path="/farmer/assistant"element={<FarmingAssistant />}/>
                <Route path="/farmer/helpful" element={<HelpfulToYou />} />
                 <Route path="/farmer/market" element={<FarmerAgroMarket />} /> 


                  {/* 🔥 NEW: REJECTED ORDERS ROUTE */}
                  <Route path="/farmer/rejected" element={<RejectedOrders />} />

                  {/* ADMIN */}
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </FarmerLangProvider>
    </AuthProvider>
  );
}
