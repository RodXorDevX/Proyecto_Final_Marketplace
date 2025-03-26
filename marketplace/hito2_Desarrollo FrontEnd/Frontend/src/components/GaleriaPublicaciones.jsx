import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import '../assets/css/GaleriaPublicaciones.css';
function GaleriaPublicaciones() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { agregarAlCarrito, disminuirCantidad, carrito } = useContext(CarritoContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  return (
    <div className="galeria-publicaciones">
      {productos.slice(0, 6).map((item) => (
        <div key={item.id} className="producto">
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
          <p>${item.price}</p>

          <div className="control-cantidad">
            <button
              onClick={() => disminuirCantidad(item.id)}
              disabled={!carrito.find((p) => p.id === item.id)}
            >
              -
            </button>
            <span>{carrito.find((p) => p.id === item.id)?.cantidad || 0}</span>
            <button onClick={() => agregarAlCarrito(item)}>+</button>
          </div>

          <button onClick={() => navigate(`/publicacion/${item.id}`)}>Ver detalle</button>
        </div>
      ))}
    </div>
  );
}

export default GaleriaPublicaciones;

