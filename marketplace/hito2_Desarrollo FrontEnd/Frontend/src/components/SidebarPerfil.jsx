import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import defaultAvatar from '../assets/img/default-avatar.webp'; // Asegúrate de tener esta imagen
import '../assets/css/SidebarPerfil.css';

function SidebarPerfil() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useContext(AuthContext);
  
  // Determinar cuál opción está activa según la ruta actual
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="profile-pic">
          <img 
            src={usuario?.usuario?.picture || defaultAvatar} 
            alt="Perfil" 
            onError={(e) => {e.target.src = defaultAvatar}}
          />
        </div>
        <h3>{usuario?.usuario?.nombre || "USUARIO"}</h3>
      </div>

      <nav className="menu">
        <button 
          className={`menu-item ${isActive('/perfil') ? 'active' : ''}`}
          onClick={() => navigate('/perfil')}
        >
          <FaUser />
          <span>Mis Publicaciones</span>
        </button>
        <button 
          className={`menu-item ${isActive('/carrito') ? 'active' : ''}`}
          onClick={() => navigate('/carrito')}
        >
          <FaShoppingCart />
          <span>Mi Carrito</span>
        </button>
        <button 
          className={`menu-item ${isActive('/pedidos') ? 'active' : ''}`}
          onClick={() => navigate('/pedidos')}
        >
          <FaClipboardList />
          <span>Mis Pedidos</span>
        </button>
      </nav>
    </div>
  );
}

export default SidebarPerfil;