import "./FarmerAgroMarket.css";

/* 🔥 LOCAL ASSETS IMPORT */
import pesticide from "../../assets/pesticide.jpeg";
import pesticide2 from "../../assets/pesticide2.jpeg";


export default function FarmerAgroMarket() {
  const products = [
    {
      name: "Hybrid Tomato Seeds",
      image: pesticide,
      amazon: "https://www.amazon.in/",
      flipkart: "https://www.flipkart.com/"
    },
    {
      name: "Organic Fertilizer",
      image: pesticide2,
      amazon: "https://www.amazon.in/",
      flipkart: "https://www.flipkart.com/"
    },
    {
      name: "Drip Irrigation Kit",
     
      amazon: "https://www.amazon.in/",
      flipkart: "https://www.flipkart.com/"
    },
    {
      name: "Multi Crop Pesticide",
   
      amazon: "https://www.amazon.in/",
      flipkart: "https://www.flipkart.com/"
    }
  ];

  return (
    <div className="agro-wrapper">
      <h1>🛒 Farmer Agro Market</h1>
      <p className="sub">
        Buy trusted seeds & tools from verified platforms
      </p>

      <div className="market-grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="img-wrap">
              <img src={p.image} alt={p.name} />
            </div>

            <h3>{p.name}</h3>

            <div className="buy-buttons">
              <a
                href={p.amazon}
                target="_blank"
                rel="noreferrer"
                className="amazon"
              >
                Buy on Amazon
              </a>
              <a
                href={p.flipkart}
                target="_blank"
                rel="noreferrer"
                className="flipkart"
              >
                Buy on Flipkart
              </a>
            </div>
          </div>
        ))}
      </div>

      <p className="disclaimer">
        🔒 Products shown for reference. Purchase is completed on third-party platforms.
      </p>
    </div>
  );
}
