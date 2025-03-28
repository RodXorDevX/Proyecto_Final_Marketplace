import { useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import defaultAvatar from '../assets/img/default-avatar.webp'; // Asegúrate de tener esta imagen
import '../assets/css/SidebarPerfil.css';

function SidebarPerfil() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-pic">
          <img 
            src={defaultAvatar} 
            alt="Perfil" 
            onError={(e) => {e.target.src = defaultAvatar}}
          />
        </div>
        <h3>USUARIO 1</h3>
      </div>

      <nav className="menu">
        <button 
          className="menu-item active"
          onClick={() => navigate('/perfil')}
        >
          <FaUser />
          <span>Mis Publicaciones</span>
        </button>
        <button 
          className="menu-item"
          onClick={() => navigate('/carrito')}
        >
          <FaShoppingCart />
          <span>Mi Carrito</span>
        </button>
      </nav>
    </div>
  );
}

export default SidebarPerfil;