import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Inicio</Link> |{" "}

      {!usuario ? (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/registro">Registro</Link>
        </>
      ) : (
        <>
          <Link to="/perfil">Mi Perfil</Link> |{" "}
          <Link to="/publicar">Publicar</Link> |{" "}
          <button onClick={logout}>Cerrar sesión</button> |{" "}
          <span>🛒 ${calcularTotal().toLocaleString("es-CL")}</span>
        </>
      )}
    </nav>
  );
}

export default Navbar;

