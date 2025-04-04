import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/css/PublicacionCard.css";
import defaultImage from "../assets/img/Default_Product.png";
import { useState } from "react";
import axios from "axios";

function PublicacionCard({ publicacion }) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/productos/${publicacion.id}`);
      alert("Publicación eliminada con éxito");
    } catch (err) {
      setError("Error al eliminar la publicación");
      console.error(err);
    }
  };

  return (
    <div className="publicacion-card">
      <img
        src={publicacion.imagen || defaultImage}
        alt={publicacion.titulo}
        onError={(e) => { e.target.src = defaultImage }}
      />
      <div className="card-content">
        <h3>{publicacion.titulo}</h3>
        <p className="precio">${publicacion.precio || 10000}</p>
        <p className="stock">Stock disponible: {publicacion.stock || 0}</p>
        <div className="card-actions">
          <Link to={`/productos/${publicacion.id}`} className="ver-btn">VER</Link>
          <div className="icon-buttons">
            <Link to={`/productos/${publicacion.id}/editar`} className="edit-btn">
              <FaEdit />
            </Link>
            <button className="delete-btn" onClick={handleDelete}><FaTrash /></button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default PublicacionCard;