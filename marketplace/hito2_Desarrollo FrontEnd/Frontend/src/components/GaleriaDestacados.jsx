import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import '../assets/css/GaleriaDestacados.css';

function GaleriaDestacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  return (
    <div className="galeria-destacados">
      {productos.slice(0, 6).map((item) => (
        <CardProducto key={item.id} producto={item} />
      ))}
    </div>
  );
}

export default GaleriaDestacados;