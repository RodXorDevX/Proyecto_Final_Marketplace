import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import "../assets/css/PublicacionCard.css";

function PublicacionCard({ publicacion }) {
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);

  // Obtener la cantidad del producto actual en el carrito
  const cantidad = carrito.find((item) => item.id === publicacion.id)?.cantidad || 0;

  const handleAgregar = () => {
    agregarAlCarrito({
      id: publicacion.id,
      title: publicacion.titulo,
      image: publicacion.imagen,
      price: publicacion.precio || 10000, // Usa precio real si está disponible
      cantidad: 1,
    });
  };

  return (
    <div className="publicacion-card">
      <img src={publicacion.imagen} alt={publicacion.titulo} />
      <h4>{publicacion.titulo}</h4>

      <div className="button-group">
        <button>VER</button>
        <button>✏️</button>
        <button>🗑️</button>
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
