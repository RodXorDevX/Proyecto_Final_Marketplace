import { FaEdit, FaTrash } from 'react-icons/fa';
import '../assets/css/PublicacionCard.css';
import defaultImage from '../assets/img/Default_Product.png'; // Asegúrate de tener esta imagen

function PublicacionCard({ publicacion }) {
    return (
      <div className="publicacion-card">
        <img 
          src={publicacion.image || defaultImage} 
          alt={publicacion.title}
          onError={(e) => {e.target.src = defaultImage}}
        />
        <div className="card-content">
          <h3>{publicacion.title}</h3>
          <p>${publicacion.price}</p>
          <div className="card-actions">
            <button className="ver-btn">VER</button>
            <div className="icon-buttons">
              <button className="edit-btn">
                <FaEdit />
              </button>
              <button className="delete-btn">
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PublicacionCard;