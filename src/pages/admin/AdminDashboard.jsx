import { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { products, approveProduct, rejectProduct, deleteProduct } = useProducts();

  const [marketPrices, setMarketPrices] = useState({});
  const [rejectReasons, setRejectReasons] = useState({});
  const [openFarmer, setOpenFarmer] = useState(null);

  const pendingProducts = products.filter(
    (p) => p.status === "pending"
  );

  const approvedProducts = products.filter(
    (p) => p.status === "approved"
  );

  return (
    <div className="container center">
      <h2>Admin Dashboard</h2>

      <h3>Pending Products</h3>

      {pendingProducts.length === 0 && <p>No pending products</p>}

      {pendingProducts.map((p) => (
        <div key={p._id} className="card">

          {p.image && (
            <img src={p.image} alt="product" style={{ width: 120 }} />
          )}

          <h4>
            {p.name.en} / {p.name.hi} / {p.name.mr}
          </h4>

          <p>👨‍🌾 Farmer Price: ₹{p.price}</p>

          <button
            className="btn btn-outline"
            onClick={() =>
              setOpenFarmer(openFarmer === p._id ? null : p._id)
            }
          >
            Show Farmer Details
          </button>

          {openFarmer === p._id && p.farmer && (
            <div className="farmer-box">
              <p><b>Email:</b> {p.farmer.email}</p>
              <p><b>Address:</b> {p.farmer.address}</p>
            </div>
          )}

          <input
            type="number"
            placeholder="Enter Market Price ₹"
            value={marketPrices[p._id] || ""}
            onChange={(e) =>
              setMarketPrices({
                ...marketPrices,
                [p._id]: e.target.value
              })
            }
          />

          <input
            placeholder="Reject Reason"
            value={rejectReasons[p._id] || ""}
            onChange={(e) =>
              setRejectReasons({
                ...rejectReasons,
                [p._id]: e.target.value
              })
            }
          />

          <br /><br />

          <button
            className="btn btn-green"
            disabled={!marketPrices[p._id]}
            onClick={() =>
              approveProduct(p._id, marketPrices[p._id])
            }
          >
            Approve
          </button>

          <button
            className="btn btn-outline"
            disabled={!rejectReasons[p._id]}
            onClick={() =>
              rejectProduct(p._id, rejectReasons[p._id])
            }
          >
            Reject
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: 40 }}>Listed Products on Customer</h3>

      {approvedProducts.length === 0 ? (
        <p>No products listed for customers</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Farmer Email</th>
              <th>Farmer Price</th>
              <th>Market Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {approvedProducts.map((p) => (
              <tr key={p._id}>
                <td>
                  {p.image && (
                    <img
                      src={p.image}
                      alt="product"
                      style={{ width: 60 }}
                    />
                  )}
                </td>

                <td>{p.name.en}</td>
                <td>{p.farmer?.email}</td>
                <td>₹{p.price}</td>
                <td>₹{p.marketPrice}</td>

                <td>
                  <button
                    className="btn btn-outline"
                    onClick={() => deleteProduct(p._id)}
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
