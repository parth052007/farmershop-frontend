import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <div className="container center">
      <h2>Customer Panel</h2>

      <Link to="/customer/products">
        <button className="btn btn-green">View Products</button>
      </Link>

      <Link to="/customer/orders">
        <button className="btn btn-outline">My Orders</button>
      </Link>
    </div>
  );
}
