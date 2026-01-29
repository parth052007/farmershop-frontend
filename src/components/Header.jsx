import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <h2 style={styles.logo}>🌾 Aapni Mandi</h2>

      {/* Admin Login Icon */}
      <div
        style={styles.adminIcon}
        title="Admin Login"
        onClick={() => navigate("/login?role=admin")}
      >
        🛡️ Admin
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#e8f5e9"
  },
  logo: {
    color: "#2e7d32",
    margin: 0
  },
  adminIcon: {
    cursor: "pointer",
    fontSize: "14px",
    background: "#2e7d32",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px"
  }
};
