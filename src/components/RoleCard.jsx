import { useNavigate } from "react-router-dom";

export default function RoleCard({ title, desc, role, register }) {
  const navigate = useNavigate();

  return (
    <div className="card center">
      <h3>{title}</h3>
      <p>{desc}</p>

      <button
        className="btn btn-green"
        onClick={() => navigate(`/login?role=${role}`)}
      >
        Login
      </button>

      {register && (
        <button
          className="btn btn-outline"
          onClick={() => navigate(`/register?role=${role}`)}
        >
          Register
        </button>
      )}
    </div>
  );
}
