function PublicacionCard({ publicacion }) {
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "220px",
        background: "#fff",
      }}>
        <img src={publicacion.imagen} alt={publicacion.titulo} style={{ width: "100%" }} />
        <h4>{publicacion.titulo}</h4>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <button>VER</button>
          <button>✏️</button>
          <button>🗑️</button>
        </div>
      </div>
    );
  }
  
  export default PublicacionCard;