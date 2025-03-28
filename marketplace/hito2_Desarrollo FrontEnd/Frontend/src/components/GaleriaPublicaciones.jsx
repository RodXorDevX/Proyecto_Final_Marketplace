import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProducto";
import MenuCategorias from "./MenuCategorias";
import "../assets/css/GaleriaPublicaciones.css";

function GaleriaPublicaciones({ search }) {
  const [productos, setProductos] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState('all');

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al obtener productos", err));
  }, []);

  const productosFiltrados = productos
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoriaActual === 'all' || item.category === categoriaActual;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="galeria-container">
      <MenuCategorias onSelectCategory={setCategoriaActual} />
      <div className="galeria-publicaciones">
        {productosFiltrados.map((item) => (
          <CardProducto key={item.id} producto={item} />
        ))}
      </div>
    </div>
  );
}

export default GaleriaPublicaciones;
