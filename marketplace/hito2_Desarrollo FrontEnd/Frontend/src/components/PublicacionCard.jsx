import '../assets/css/PublicacionCard.css';

function PublicacionCard({ publicacion }) {
    return (
      <div className="publicacion-card">
        <img src={publicacion.imagen} alt={publicacion.titulo} />
        <h4>{publicacion.titulo}</h4>
        <div className="button-group">
          <button>VER</button>
          <button>✏️</button>
          <button>🗑️</button>
        </div>
      </div>
    );
}

export default PublicacionCard;