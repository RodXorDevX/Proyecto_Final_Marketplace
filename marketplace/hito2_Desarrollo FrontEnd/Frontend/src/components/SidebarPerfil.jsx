function SidebarPerfil({ nombre = "Usuario 1" }) {
    return (
      <aside style={{
        width: "220px",
        background: "#e6e6e6",
        padding: "1.5rem",
        textAlign: "center",
        height: "100vh",
      }}>
        <div style={{ fontSize: "80px", color: "#f4d03f" }}>🟡</div>
        <h3>{nombre.toUpperCase()}</h3>
        <nav style={{ marginTop: "2rem" }}>
          <p style={{ fontWeight: "bold" }}>Mis publicaciones</p>
          <p style={{ color: "gray" }}>Mi carrito</p>
        </nav>
      </aside>
    );
  }
  
  export default SidebarPerfil;