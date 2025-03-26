import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaShoppingCart, FaStar } from 'react-icons/fa';
import '../assets/css/Navbar.css';

function Navbar() {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="container-0-1-6">
          <div className="logo-icon">
            <FaStar color="#151c33" />
          </div>
        </div>
        <span className="text-0-1-4">TREND'S</span>
      </div>

      <div className="nav-links">
        {!usuario ? (
          <>
            <span className="text-0-1-5">
              <Link to="/registro">REGISTRO</Link>
            </span>
            <span className="text-0-1-1">
              <Link to="/login">INGRESAR</Link>
            </span>
          </>
        ) : (
          <>
            <Link to="/perfil">Mi Perfil</Link>
            <Link to="/publicar">Publicar</Link>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        )}

        <div className="user-actions">
          <div className="container-0-1-2">
            <FaUser color="#151c33" />
          </div>
          <div className="container-0-1-3">
            <FaShoppingCart />
            {carrito && carrito.length > 0 && (
              <span className="cart-total">
                ${calcularTotal().toLocaleString("es-CL")}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

