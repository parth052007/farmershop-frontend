import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useFarmerLang } from "../../context/FarmerLangContext";
import "./AddProduct.css";

export default function AddProduct() {
  const { lang } = useFarmerLang();
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  const labels = {
    en: "Add Product",
    hi: "उत्पाद जोड़ें",
    mr: "भाजी जोडा"
  };

  const [product, setProduct] = useState({
    en: "",
    hi: "",
    mr: "",
    price: "",
    category: "",
    image: "",     
    preview: null
  });

  // ✅ BASE64 IMAGE CONVERTER
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 200 * 1024) {
      alert("Image size should be under 200KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({
        ...product,
        image: reader.result,
        preview: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!product.en || !product.price || !product.category) {
      alert("Fill required fields");
      return;
    }

    const payload = {                      // 🔥 ADDED (debug-friendly)
      name: {
        en: product.en,
        hi: product.hi,
        mr: product.mr
      },
      price: Number(product.price),
      category: product.category,
      image: product.image,
      farmerEmail: user.email,             // (kept as-is)
      farmer: {
        email: user.email,
        address: user.address || "Not Provided"
      }
    };

    console.log("ADD PRODUCT PAYLOAD =>", payload); // 🔥 ADDED (debug)

    const res = await addProduct(payload);

    if (!res || !res.success) {
      alert(res?.message || "Product add failed");
      return;
    }

    navigate("/farmer/my-products");
  };

  return (
    <div className="container center add-product-page">
      <h2>{labels[lang]}</h2>

      <input
        placeholder="Product Name (English)"
        value={product.en}
        onChange={e => setProduct({ ...product, en: e.target.value })}
      /><br /><br />

      <input
        placeholder="उत्पाद नाम (Hindi)"
        value={product.hi}
        onChange={e => setProduct({ ...product, hi: e.target.value })}
      /><br /><br />

      <input
        placeholder="उत्पादन नाव (Marathi)"
        value={product.mr}
        onChange={e => setProduct({ ...product, mr: e.target.value })}
      /><br /><br />

      <select
        value={product.category}
        onChange={e => setProduct({ ...product, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="vegetable">🥬 Vegetable</option>
        <option value="fruit">🍎 Fruit</option>
        <option value="leafy">🌿 Leafy</option>
        <option value="grain">🌾 Grains</option>
        <option value="seed">🌱 Seeds</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Price ₹"
        value={product.price}
        onChange={e => setProduct({ ...product, price: e.target.value })}
      /><br /><br />

      <input type="file" accept="image/*" onChange={handleImage} />

      {product.preview && (
        <>
          <br /><br />
          <img src={product.preview} alt="preview" style={{ width: 150 }} />
        </>
      )}

      <br /><br />
      <button className="btn btn-green" onClick={handleSubmit}>
        {labels[lang]}
      </button>
    </div>
  );
}