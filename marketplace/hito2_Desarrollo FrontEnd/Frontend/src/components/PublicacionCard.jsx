import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../assets/css/PublicacionCard.css";
import defaultImage from "../assets/img/Default_Product.png";

function PublicacionCard({ publicacion }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);
  const cantidad = carrito.find((item) => item.id === publicacion.id)?.cantidad || 0;

  const handleAgregar = () => {
    agregarAlCarrito({
      id: publicacion.id,
      title: publicacion.titulo,
      image: publicacion.imagen,
      price: publicacion.precio || 10000,
      cantidad: 1,
      talla: "S",
      color: "BLANCO"
    });
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
        <p>${publicacion.precio || 10000}</p>
        <div className="card-actions">
          <button className="ver-btn">VER</button>
          <div className="icon-buttons">
            <button className="edit-btn"><FaEdit /></button>
            <button className="delete-btn"><FaTrash /></button>
          </div>
        </div>
      </div>

      <div className="contador">
        <button onClick={() => disminuirCantidad(publicacion.id)} disabled={cantidad === 0}>-</button>
        <span>{cantidad}</span>
        <button onClick={handleAgregar}>+</button>
      </div>
    </div>
  );
}

export default PublicacionCard;
