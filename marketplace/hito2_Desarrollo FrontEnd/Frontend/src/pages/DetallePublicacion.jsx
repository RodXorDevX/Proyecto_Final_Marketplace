import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetallePublicacion() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProducto(res.data))
      .catch((err) => console.error("Error al obtener producto", err));
  }, [id]);

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} style={{ width: "200px" }} />
      <p>{producto.description}</p>
      <p><strong>Precio:</strong> ${producto.price}</p>
      <p><strong>Categoría:</strong> {producto.category}</p>
    </div>
  );
}

export default DetallePublicacion;
