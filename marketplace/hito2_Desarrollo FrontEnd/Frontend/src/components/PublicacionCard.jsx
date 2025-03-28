import { FaEdit, FaTrash } from "react-icons/fa";
import "../assets/css/PublicacionCard.css";
import defaultImage from "../assets/img/Default_Product.png";

function PublicacionCard({ publicacion }) {
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
          <button className="ver-btn">VER</button>
          <div className="icon-buttons">
            <button className="edit-btn"><FaEdit /></button>
            <button className="delete-btn"><FaTrash /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicacionCard;
