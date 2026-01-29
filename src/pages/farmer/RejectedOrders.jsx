import { useProducts } from "../../context/ProductContext";
import { useFarmerLang } from "../../context/FarmerLangContext";

export default function RejectedOrders() {
  const { products, deleteProduct } = useProducts();
  const { lang } = useFarmerLang();

  const farmer = JSON.parse(localStorage.getItem("loggedUser"));

  // 🔴 ONLY ADMIN REJECTED PRODUCTS OF THIS FARMER
  const rejectedProducts = farmer
    ? products.filter(
        p =>
          p.farmer?.email === farmer.email &&
          p.status === "rejected"
      )
    : [];

  return (
    <div className="container center">
      <h2>❌ Rejected Products</h2>

      {rejectedProducts.length === 0 && (
        <p>No rejected products</p>
      )}

      {rejectedProducts.map(p => (
        <div key={p._id} className="card" style={{ border: "2px solid red" }}>
          {p.image && (
            <img
              src={p.image}
              alt="product"
              style={{ width: 120, borderRadius: 10 }}
            />
          )}

          <h4>{p.name?.[lang]}</h4>
          <p>₹{p.price}</p>

          <p style={{ color: "red", fontSize: 14 }}>
            ❌ Rejected: {p.rejectReason}
          </p>

          {/* 🔥 DELETE REJECTED PRODUCT */}
          <button
            className="btn btn-outline"
            style={{ borderColor: "red", color: "red" }}
            onClick={() => {
              if (window.confirm("Delete this rejected product?")) {
                deleteProduct(p._id);
              }
            }}
          >
            🗑 Delete Product
          </button>
        </div>
      ))}
    </div>
  );
}
