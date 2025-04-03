import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import '../assets/css/CardProducto.css';

function CardProducto({ producto }) {
  const navigate = useNavigate();
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);

  // Adaptar campos para que funcionen con productos de FakeStore o de tu backend
  const id = producto.id;
  const titulo = producto.title || producto.titulo || "Producto sin título";
  const precio = producto.price || producto.precio || 0;
  const imagen = producto.image || producto.imagen || "https://via.placeholder.com/150";

  const cantidad = carrito.find((p) => p.id === id)?.cantidad || 0;

  return (
    <div className="producto">
      <div className="imagen-container">
        <img src={imagen} alt={titulo} />
      </div>
      
      <h4>{titulo}</h4>
      
      <div className="acciones">
        <p>${precio}</p>

        <div className="control-cantidad">
          <button
            onClick={() => disminuirCantidad(id)}
            disabled={cantidad === 0}
          >
            Quitar
          </button>
          <span>{cantidad}</span>
          <button onClick={() => agregarAlCarrito({ ...producto, id, titulo, precio, imagen })}>
            Agregar
          </button>
        </div>

        <button 
          className="detalle-button" 
          onClick={() => navigate(`/publicacion/${id}`)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}

export default CardProducto;
