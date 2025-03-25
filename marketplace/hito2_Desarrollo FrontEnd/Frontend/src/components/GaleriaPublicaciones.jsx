import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

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
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {productos.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "1rem", width: "200px" }}>
          <img src={item.image} alt={item.title} style={{ width: "100%" }} />
          <h4>{item.title}</h4>
          <p>${item.price}</p>

          {/* Control de cantidad */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.5rem" }}>
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

