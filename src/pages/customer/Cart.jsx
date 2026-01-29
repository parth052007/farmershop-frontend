import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import "./Cart.css";
export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [order, setOrder] = useState({
    name: "",
    phone: "",
    address: ""
  });

  // 🔢 LOCAL QUANTITY STATE (PER PRODUCT)
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, p) => {
      acc[p._id] = p.qty;
      return acc;
    }, {})
  );

  // 👨‍🌾 FARMER DETAILS TOGGLE STATE
  const [showFarmer, setShowFarmer] = useState({});

  // 🔁 TOTAL CALCULATION (LIVE)
  const total = cart.reduce(
    (sum, p) => sum + p.price * (quantities[p._id] || 1),
    0
  );

  if (!cart.length) return <h2 className="center">Cart is Empty</h2>;

  return (
    <div className="container center">
      <h2>My Cart</h2>

      {cart.map(p => (
        <div key={p._id} className="card">
          {p.image && (
            <img src={p.image} alt="product" style={{ width: 100 }} />
          )}

          <h4>{p.name.en}</h4>

          {/* 🔢 QUANTITY CONTROL */}
          <div style={{ marginBottom: 8 }}>
            <label>Qty: </label>
            <input
              type="number"
              min="1"
              value={quantities[p._id]}
              onChange={(e) =>
                setQuantities({
                  ...quantities,
                  [p._id]: Number(e.target.value)
                })
              }
              style={{ width: 60 }}
            />
          </div>

          <p>
            ₹{p.price} × {quantities[p._id]} ={" "}
            <b>₹{p.price * quantities[p._id]}</b>
          </p>

          <button
            className="btn btn-outline"
            onClick={() => removeFromCart(p._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total Amount: ₹{total}</h3>

      {!showForm && (
        <button className="btn btn-green" onClick={() => setShowForm(true)}>
          Place Order
        </button>
      )}

      {showForm && (
        <div className="card" style={{ marginTop: 20, maxWidth: 420 }}>
          <h3>Delivery Details</h3>

          <input
            placeholder="Customer Name"
            value={order.name}
            onChange={(e) =>
              setOrder({ ...order, name: e.target.value })
            }
          />
          <br /><br />

          {/* 📞 PHONE – EXACT 10 DIGITS */}
          <input
            placeholder="Phone Number"
            value={order.phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOrder({ ...order, phone: value });
            }}
          />
          <small style={{ color: "gray" }}>
          
          </small>
          <br /><br />

          <textarea
            placeholder="Delivery Address"
            rows="3"
            value={order.address}
            onChange={(e) =>
              setOrder({ ...order, address: e.target.value })
            }
          />
          <br /><br />

          <p><b>Products:</b></p>

          {cart.map(p => (
            <div key={p._id} style={{ marginBottom: 10 }}>
              <p>
                • {p.name.en} × {quantities[p._id]}
              </p>

              <button
                type="button"
                className="btn btn-outline"
                style={{ fontSize: 12 }}
                onClick={() =>
                  setShowFarmer({
                    ...showFarmer,
                    [p._id]: !showFarmer[p._id]
                  })
                }
              >
                {showFarmer[p._id]
                  ? "Hide Farmer Details"
                  : "Show Farmer Details"}
              </button>

              {showFarmer[p._id] && (
                <div style={{ fontSize: 13, color: "#555", marginTop: 5 }}>
                  <p>
                    👨‍🌾 <b>Farmer Email:</b>{" "}
                    {p.farmer?.email || p.farmerEmail}
                  </p>
                  
                </div>
              )}
            </div>
          ))}

          <p><b>Total Payable:</b> ₹{total}</p>
          <p><b>Status:</b> Placed</p>

          <button
            className="btn btn-green"
            style={{ width: "100%" }}
            onClick={async () => {

              // 🔴 VALIDATIONS
              if (!order.name || !order.phone || !order.address) {
                alert("Fill all delivery details");
                return;
              }

              if (order.phone.length !== 10) {
                alert("Phone number must be exactly 10 digits");
                return;
              }

              const user = JSON.parse(localStorage.getItem("loggedUser"));
              if (!user?.email) return alert("Login required");

              for (const p of cart) {
                const qty = quantities[p._id];

                const orderData = {
                  customer: {
                    email: user.email,
                    name: order.name,
                    phone: order.phone,
                    address: order.address  // 🔥 ADD THIS
      
                  },

                  farmerEmail: p.farmer?.email || p.farmerEmail,

                  product: {
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    marketPrice: p.marketPrice,
                    image: p.image,
                    
                  },

                  quantity: qty,
                  totalAmount: p.price * qty,
                  status: "placed"
                };

                const res = await placeOrder(orderData);
                if (!res.success) {
                  alert("Order failed for " + p.name.en);
                  return;
                }
              }

              alert("✅ Order Placed Successfully");
              clearCart();
              navigate("/customer/orders");
            }}
          >
            Confirm & Place Order
          </button>
        </div>
      )}
    </div>
  );
}
