import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import '../assets/css/CardProducto.css';

function CardProducto({ producto }) {
  const navigate = useNavigate();
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);
  const cantidad = carrito.find((p) => p.id === producto.id)?.cantidad || 0;

  return (
    <div className="producto">
      <div className="imagen-container">
        <img src={producto.image} alt={producto.title} />
      </div>
      
      <h4>{producto.title}</h4>
      
      <div className="acciones">
        <p>${producto.price}</p>

        <div className="control-cantidad">
          <button
            onClick={() => disminuirCantidad(producto.id)}
            disabled={cantidad === 0}>
            Quitar
          </button>
          <span>{cantidad}</span>
          <button onClick={() => agregarAlCarrito(producto)}>
            Agregar
          </button>
        </div>

        <button 
          className="detalle-button" 
          onClick={() => navigate(`/publicacion/${producto.id}`)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}

export default CardProducto;
