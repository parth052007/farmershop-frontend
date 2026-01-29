export default function Footer() {
  return (
    <div style={styles.footer}>
      <p>© 2025 Aapni Mandi</p>

      <div>
        <a href="https://instagram.com/your_instagram" target="_blank" rel="noreferrer">
          📸 Instagram
        </a>{" "}
        |{" "}
        <a href="mailto:yourgmail@gmail.com">
          ✉️ yourgmail@gmail.com
        </a>
      </div>
    </div>
  );
}

const styles = {
  footer: {
    marginTop: 60,
    padding: 20,
    textAlign: "center",
    background: "#f1f8e9",
    color: "#2e7d32"
  }
};
