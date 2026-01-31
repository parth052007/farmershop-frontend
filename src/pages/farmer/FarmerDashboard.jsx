import { Link, useNavigate } from "react-router-dom";
import { useFarmerLang } from "../../context/FarmerLangContext";
import { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContext";
import jsPDF from "jspdf";

import "./FarmerDashboard.css";

/* 🔥🔥🔥 ADDED FOR CHART 🔥🔥🔥 */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
/* 🔥🔥🔥 END ADD 🔥🔥🔥 */

export default function FarmerDashboard() {
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  /* 🔥 ADD — sidebar state */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login?role=farmer");
  };

  const { lang, setLang } = useFarmerLang();
  const { products } = useProducts();

  const farmer = JSON.parse(localStorage.getItem("loggedUser"));

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [chartData, setChartData] = useState(null);

  /* 🌦️ WEATHER STATE */
  const [weather, setWeather] = useState(null);

  const text = {
    en: {
      title: "Farmer Dashboard",
      add: "Add Product",
      view: "My Products",
      orders: "Your Orders",
      rejected: "Rejected Orders",
      invoice: "Download Invoice",
      weather: "Weather Alert",
      temp: "Temperature",
      rain: "Rain Chance",
      assistant: "AI Assistant",
      market: "Buy Seeds & Tools"
    },
    hi: {
      title: "किसान डैशबोर्ड",
      add: "उत्पाद जोड़ें",
      view: "मेरे उत्पाद",
      orders: "आपके ऑर्डर",
      rejected: "रद्द ऑर्डर",
      invoice: "इनवॉइस डाउनलोड",
      weather: "मौसम चेतावनी",
      temp: "तापमान",
      rain: "बारिश की संभावना",
      assistant: "एआई सहायक",
      market: "बीज और उपकरण खरीदें"
    },
    mr: {
      title: "शेतकरी डॅशबोर्ड",
      add: "भाजी जोडा",
      view: "माझी उत्पादने",
      orders: "तुमचे ऑर्डर",
      rejected: "रद्द ऑर्डर",
      invoice: "इनव्हॉइस डाउनलोड",
      weather: "हवामान सूचना",
      temp: "तापमान",
      rain: "पावसाची शक्यता",
      assistant: "एआय सहाय्यक",
      market: "बियाणे व साधने खरेदी"
    }
  };

  useEffect(() => {
    if (!farmer?.email) return;

    const myProducts = products.filter(
      p => p.farmer?.email === farmer.email
    );

    const rejectedProducts = myProducts.filter(
      p => p.status === "rejected"
    );

    setRejectedOrders(rejectedProducts.length);

    const fetchOrders = async () => {
  const API_URL = import.meta.env.VITE_API_URL + "/api/orders";

  const response = await fetch(
    `${API_URL}/farmer/${farmer.email.toLowerCase()}`
  );

  if (!response.ok) {
    console.error("Failed to load farmer orders");
    return;
  }

  const data = await response.json();
      setOrders(data);
      setTotalOrders(data.length);

      const totalRevenue = data.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
      );

      setRevenue(totalRevenue);

      const dailyMap = {};
      data.forEach(o => {
        if (!o.createdAt) return;
        const date = new Date(o.createdAt);
        const now = new Date();

        if (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        ) {
          const day = date.getDate();
          dailyMap[day] = (dailyMap[day] || 0) + 1;
        }
      });

      setChartData({
        labels: Object.keys(dailyMap),
        datasets: [{ label: "Orders", data: Object.values(dailyMap) }]
      });
    };

    fetchOrders();
  }, [farmer?.email, products]);

  useEffect(() => {
    if (!farmer?.address) return;

    const city = farmer.address.split(",")[0];

    fetch(`https://farmer-shop-backend.onrender.com/${city}`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error("Weather error", err));
  }, [farmer?.address]);

  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Farmer Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${farmer?.name}`, 14, 35);
    doc.text(`Email: ${farmer?.email}`, 14, 45);
    doc.text(`Phone: ${farmer?.phone}`, 14, 55);
    doc.text(`Total Orders: ${totalOrders}`, 14, 75);
    doc.text(`Rejected Products: ${rejectedOrders}`, 14, 85);
    doc.text(`Total Revenue: ₹${revenue}`, 14, 95);
    doc.save("invoice.pdf");
  };

  return (
    <div className="fd-wrapper">

      {/* 🔥 MOBILE HAMBURGER */}
      <div className="fd-hamburger" onClick={() => setSidebarOpen(true)}>
        ☰
      </div>

      {/* 🔥 SIDEBAR OVERLAY */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* 🔥 PROFILE OVERLAY */}
      <div
        className={`settings-overlay ${showProfile ? "active" : ""}`}
        onClick={() => setShowProfile(false)}
      />

      {/* 🔥 PROFILE SLIDE PANEL */}
      <div className={`settings-panel ${showProfile ? "open" : ""}`}>
        <h3>👨‍🌾 Farmer Profile</h3>

        {farmer && (
          <>
            <p><b>Name:</b> {farmer.name}</p>
            <p><b>Email:</b> {farmer.email}</p>
            <p><b>Phone:</b> {farmer.phone || "Not Provided"}</p>
            <p><b>Address:</b> {farmer.address || "Not Provided"}</p>
          </>
        )}

        <button className="btn logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* 🔥 SIDEBAR */}
      <aside className={`fd-sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>🌾 कृषी connect</h2>

        <button onClick={() => setLang("en")}>English</button>
        <button onClick={() => setLang("hi")}>हिंदी</button>
        <button onClick={() => setLang("mr")}>मराठी</button>

        <Link to="/farmer/add-product" onClick={() => setSidebarOpen(false)}>{text[lang].add}</Link>
        <Link to="/farmer/my-products" onClick={() => setSidebarOpen(false)}>{text[lang].view}</Link>
        <Link to="/farmer/orders" onClick={() => setSidebarOpen(false)}>{text[lang].orders}</Link>
        <Link to="/farmer/rejected" onClick={() => setSidebarOpen(false)}>{text[lang].rejected}</Link>
        <Link to="/farmer/assistant" onClick={() => setSidebarOpen(false)}>🤖 {text[lang].assistant}</Link>
        <Link to="/farmer/helpful" onClick={() => setSidebarOpen(false)}>📺 Helpful To You</Link>
        <Link to="/farmer/market" onClick={() => setSidebarOpen(false)}>🛒 {text[lang].market}</Link>

        <button onClick={downloadInvoice}>
          📄 {text[lang].invoice}
        </button>

        {weather && (
          <div className="fd-weather-sidebar">
            <h4>🌦️ {text[lang].weather}</h4>
            <p>{weather.alert}</p>
            <small>
              🌡️ {text[lang].temp}: {weather.temp}°C <br />
              🌧️ {text[lang].rain}: {weather.rain}%
            </small>
          </div>
        )}
      </aside>

      <main className="fd-main">
        <div className="fd-user">
          <div className="fd-avatar" onClick={() => setShowProfile(true)}>
            👤
          </div>
        </div>

        <h1>{text[lang].title}</h1>

        <div className="fd-cards">
          <div className="fd-card">
            <h4>Total Orders</h4>
            <p>{totalOrders}</p>
          </div>

          <div className="fd-card green">
            <h4>Total Revenue</h4>
            <p>₹{revenue.toLocaleString()}</p>
          </div>

          <div className="fd-card red">
            <h4>Rejected Orders</h4>
            <p>{rejectedOrders}</p>
          </div>
        </div>

        <div className="fd-chart">
          <h3>📊 Monthly Sales</h3>

          <div className="fd-chart-wrapper">
            {chartData && (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            )}
          </div>
        </div>

      </main>
    </div>
  );
}