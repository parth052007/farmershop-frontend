import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import "./ProductList.css";

// ❤️ WISHLIST HELPERS (SAME)
const getWishlist = () =>
  JSON.parse(localStorage.getItem("wishlist")) || [];

const saveWishlist = (data) =>
  localStorage.setItem("wishlist", JSON.stringify(data));

export default function ProductList() {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();

  const [maxPrice, setMaxPrice] = useState(100);

  const [language, setLanguage] = useState("en");
  const [search, setSearch] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showLang, setShowLang] = useState(false);

  // 🔥 SETTINGS STATES
  const [showSettings, setShowSettings] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // ✅ HAMBURGER STATE
  const [showSidebar, setShowSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const [profile, setProfile] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || ""
  });

  // ✅ FIXED WISHLIST STATE
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = getWishlist();
    setWishlist(saved.map(p => p._id));
  }, []);

  // 🔥🔥🔥 BACK BUTTON FIX (ONLY ADDITION — NOTHING REMOVED)
  useEffect(() => {
    if (showSidebar) {
      window.history.pushState({ sidebar: true }, "");
    }

    const handleBack = () => {
      if (showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [showSidebar]);
  // 🔥🔥🔥 END FIX

  const toggleWishlist = (product) => {
    const saved = getWishlist();
    const exists = saved.find(p => p._id === product._id);

    let updated;
    if (exists) {
      updated = saved.filter(p => p._id !== product._id);
    } else {
      updated = [...saved, product];
    }

    saveWishlist(updated);
    setWishlist(updated.map(p => p._id));
  };

  const startVoiceSearch = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("Voice search not supported");

    const rec = new SR();
    rec.lang =
      language === "hi" ? "hi-IN" :
      language === "mr" ? "mr-IN" : "en-IN";

    rec.start();
    rec.onresult = (e) => setSearch(e.results[0][0].transcript);
  };

  let approvedProducts = products.filter((p) => {
    const status = (p.status || "").toLowerCase();

    const productName =
      p.name?.[language] ||
      p.name?.en ||
      "";

    return (
      status === "approved" &&
      productName.toLowerCase().includes(search.toLowerCase())
    );
  });

  approvedProducts = approvedProducts.filter(p => p.price <= maxPrice);

  if (categoryFilter)
    approvedProducts = approvedProducts.filter(p => p.category === categoryFilter);

  if (priceFilter === "low")
    approvedProducts = [...approvedProducts].sort((a, b) => a.price - b.price);

  if (priceFilter === "high")
    approvedProducts = [...approvedProducts].sort((a, b) => b.price - a.price);

  return (
    <div className="fc-layout">

      {/* ========== SIDEBAR ========== */}
      <aside className={`fc-sidebar ${showSidebar ? "open" : ""}`}>
        <h2 className="fc-logo">🥬 कृषी connect</h2>

        <nav>
          <Link>Dashboard</Link>
          <Link className="active">🥬 Products</Link>
          <Link to="/customer/orders">📦 My Orders</Link>
          <Link to="/customer/wishlist">❤️ Wishlist</Link>
          <Link to="/customer/cart">🛒 Cart</Link>
          <Link onClick={() => setShowSettings(true)}>⚙️ Settings</Link>
        </nav>
      </aside>

      {/* SIDEBAR OVERLAY */}
      {showSidebar && (
        <div
          className="sidebar-overlay"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* OVERLAY */}
      <div
        className={`settings-overlay ${showSettings ? "active" : ""}`}
        onClick={() => {
          setShowSettings(false);
          setEditMode(false);
        }}
      />

      {/* SETTINGS PANEL */}
      <div className={`settings-panel ${showSettings ? "open" : ""}`}>
        <h3>⚙️ Account Settings</h3>

        {editMode ? (
          <>
            <input
              placeholder="Name"
              value={profile.name}
              onChange={e =>
                setProfile({ ...profile, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={profile.phone}
              onChange={e =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />

            <textarea
              placeholder="Address"
              value={profile.address}
              onChange={e =>
                setProfile({ ...profile, address: e.target.value })
              }
            />

            <button
              className="btn btn-green"
              onClick={async () => {
                if (!user || !user._id) {
                  alert("User ID missing. Please logout and login again.");
                  return;
                }

                try {
                  const res = await fetch(
                    `https://farmer-shop-backend.onrender.com/${user._id}`,
                    {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(profile)
                    }
                  );

                  if (!res.ok) {
                    alert("Profile update failed");
                    return;
                  }

                  const updatedUser = await res.json();
                  localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
                  setEditMode(false);
                  alert("✅ Profile Updated Successfully");

                } catch (err) {
                  alert("Server error while updating profile");
                }
              }}
            >
              💾 Save
            </button>
          </>
        ) : (
          <>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phone}</p>
            <p><b>Address:</b> {user.address}</p>

            <button
              className="btn btn-outline"
              onClick={() => setEditMode(true)}
            >
              ✏️ Edit Profile
            </button>
          </>
        )}

        <button
          className="btn logout-btn"
          onClick={() => {
            localStorage.removeItem("loggedUser");
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* ========== MAIN ========== */}
      <main className="fc-main">

        <div className="fc-topbar">
          <button
            className="hamburger"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </button>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={startVoiceSearch}>🎙️</button>
          <button onClick={() => setShowFilter(!showFilter)}>⚙️</button>
          <button onClick={() => setShowLang(!showLang)}>🌐</button>
        </div>

        {showLang && (
          <div className="fc-dropdown">
            <button onClick={() => { setLanguage("en"); setShowLang(false); }}>
              🇬🇧 English
            </button>
            <button onClick={() => { setLanguage("hi"); setShowLang(false); }}>
              🇮🇳 हिंदी
            </button>
            <button onClick={() => { setLanguage("mr"); setShowLang(false); }}>
              🇮🇳 मराठी
            </button>
          </div>
        )}

        <div className="fc-chips">
          <button onClick={() => setCategoryFilter("vegetable")}>🥕 Vegetables</button>
          <button onClick={() => setCategoryFilter("fruit")}>🍎 Fruits</button>
          <button onClick={() => setCategoryFilter("leafy")}>🌿 Leafy</button>
          <button onClick={() => setCategoryFilter("seeds")}>🌱 Seeds</button>
          <button className="clear" onClick={() => setCategoryFilter("")}>❌ Clear</button>
        </div>

        <div className="fc-price">
          <label>💰 Max Price: <b>₹{maxPrice}</b></label>
          <input
            type="range"
            min="0"
            max="10000"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <h3 className="fc-title">Available Fresh Products</h3>

        <div className="fc-grid">
          {approvedProducts.map((p) => (
            <div className="fc-card" key={p._id}>
              <span
                className={`fc-heart ${wishlist.includes(p._id) ? "active" : ""}`}
                onClick={() => toggleWishlist(p)}
              >
                ♥
              </span>

              <img src={p.image} alt={p.name.en} />
              <h4>{p.name[language]}</h4>

              <p className="fc-price">
                <span className="farmer-price">₹{p.price}</span>
              </p>

              <p className="fc-market">
                Market Price: <span>₹{p.marketPrice}</span>
              </p>

              <button
                onClick={() => {
                  addToCart({
                    _id: p._id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                    farmerEmail: p.farmer?.email,
                    farmerPhone: p.farmer?.phone,
                    marketPrice: p.marketPrice
                  });

                  setShowMsg(true);
                  setTimeout(() => setShowMsg(false), 1200);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}