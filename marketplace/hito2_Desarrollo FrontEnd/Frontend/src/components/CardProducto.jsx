import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import axios from "axios";
import '../assets/css/CardProducto.css';

function CardProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener el producto", error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  const { titulo, precio, imagen } = producto;
  const cantidad = carrito.find((p) => p.id === id)?.cantidad || 0;

  return (
    <div className="producto">
      <div className="imagen-container">
        <img src={imagen || "https://via.placeholder.com/150"} alt={titulo} />
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
          <button onClick={() => agregarAlCarrito(producto)}>
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
