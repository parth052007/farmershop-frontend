import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const getWishlist = () =>
  JSON.parse(localStorage.getItem("wishlist")) || [];

const saveWishlist = (data) =>
  localStorage.setItem("wishlist", JSON.stringify(data));

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const removeItem = (id) => {
    const updated = wishlist.filter(p => p._id !== id);
    saveWishlist(updated);
    setWishlist(updated);
  };

  return (
    <div className="wl-page">
      <h2 className="wl-title">❤️ My Wishlist</h2>

      {wishlist.length === 0 && (
        <p className="wl-empty">No items in wishlist</p>
      )}

      <div className="wl-grid">
        {wishlist.map((p) => (
          <div className="wl-card" key={p._id}>
            <img src={p.image} alt={p.name.en} />
            <h4>{p.name.en}</h4>
            <p>₹{p.price}</p>

            <button onClick={() => removeItem(p._id)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>

      <Link to="/customer/products" className="wl-back">
        ⬅ Back to Products
      </Link>
    </div>
  );
}
