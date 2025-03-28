import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import '../assets/css/GaleriaDestacados.css';

function GaleriaDestacados({ search }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  const productosFiltrados = productos
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  return (
    <div className="galeria-destacados">
      {productosFiltrados.map((item) => (
        <CardProducto key={item.id} producto={item} />
      ))}
    </div>
  );
}

export default GaleriaDestacados;