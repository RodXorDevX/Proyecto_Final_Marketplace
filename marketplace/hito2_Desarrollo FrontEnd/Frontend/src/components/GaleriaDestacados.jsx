/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import '../assets/css/GaleriaDestacados.css';

function GaleriaDestacados() {
  const [productosDestacados, setProductosDestacados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/productos");
        const productos = response.data.data || response.data;

        // Seleccionar 6 productos al azar
        const productosAleatorios = productos.sort(() => 0.5 - Math.random()).slice(0, 6);
        setProductosDestacados(productosAleatorios);
      } catch (error) {
        console.error("Error al obtener productos destacados", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="galeria-destacados">
      {productosDestacados.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default GaleriaDestacados;


 