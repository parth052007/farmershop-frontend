import { useProducts } from "../../context/ProductContext";

export default function ListedProducts() {
  const { products, deleteProduct } = useProducts();

  // ✅ ONLY APPROVED PRODUCTS (customer ko dikhte wale)
  const approvedProducts = products.filter(
    p => p.status === "approved"
  );

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Listed Products (Customer View)
      </h2>

      {approvedProducts.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No products listed for customers
        </p>
      )}

      {approvedProducts.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#fff"
          }}
        >
          <thead>
            <tr style={{ background: "#2e7d32", color: "#fff" }}>
              <th style={th}>Image</th>
              <th style={th}>Product</th>
              <th style={th}>Farmer Email</th>
              <th style={th}>Farmer Price</th>
              <th style={th}>Market Price</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {approvedProducts.map(p => (
              <tr key={p.id}>
                <td style={td}>
                  {p.image && (
                    <img
                      src={p.image}
                      alt="product"
                      style={{ width: 60, borderRadius: 6 }}
                    />
                  )}
                </td>

                <td style={td}>
                  {p.name.en} / {p.name.hi} / {p.name.mr}
                </td>

                <td style={td}>
                  {p.farmer?.email}
                </td>

                <td style={td}>
                  ₹{p.price}
                </td>

                <td style={td}>
                  ₹{p.marketPrice}
                </td>

                <td style={td}>
                  <button
                    className="btn btn-outline"
                    style={{ color: "red", borderColor: "red" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this product from customer listing?"
                        )
                      ) {
                        deleteProduct(p.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center"
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center"
};
