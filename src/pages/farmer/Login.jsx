import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h2>Login</h2>

      <Link to="/farmer-login">
        <button>Farmer Login</button>
      </Link>
    </div>
  );
}
