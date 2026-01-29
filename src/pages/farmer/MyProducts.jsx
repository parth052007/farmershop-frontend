import { useProducts } from "../../context/ProductContext";
import { useFarmerLang } from "../../context/FarmerLangContext";

export default function MyProducts() {
  const { products, deleteProduct } = useProducts();
  const { lang } = useFarmerLang();

  // 🔐 Logged in farmer
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const title = {
    en: "My Products",
    hi: "मेरे उत्पाद",
    mr: "माझी उत्पादने"
  };

  // ✅ FIXED FILTER (IMPORTANT)
  const myProducts = user
  ? products.filter(p => p.farmer?.email === user.email)
  : [];




  return (
    <div className="container center">
      <h2>{title[lang]}</h2>

      <p style={{ fontWeight: "bold", marginBottom: 15 }}>
        {lang === "hi" && "कुल उत्पाद: "}
        {lang === "mr" && "एकूण उत्पादने: "}
        {lang === "en" && "Total Products: "}
        {myProducts.length}
      </p>

      {myProducts.length === 0 && <p>No products added</p>}

      {myProducts.map(p => (
        <div key={p.id} className="card">
          {p.image && (
            <img
              src={p.image}
              alt="product"
              style={{ width: 120, borderRadius: 10 }}
            />
          )}

          <h4>{p.name?.[lang]}</h4>
          <p>₹{p.price}</p>

          {/* ❌ REJECTED STATUS SHOW */}
          {p.status === "rejected" && (
            <p style={{ color: "red", fontSize: 14 }}>
              ❌ Rejected: {p.rejectReason}
            </p>
          )}

          <button
            className="btn btn-outline"
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
