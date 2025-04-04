import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditarProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
    imagen: ""
  });
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/productos/${id}`, producto);
      alert("Producto actualizado con éxito");
      navigate(`/productos/${id}`); // Redirigir a la página del producto
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="titulo" value={producto.titulo} onChange={handleChange} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="precio" value={producto.precio} onChange={handleChange} required />
        </div>
        <div>
          <label>Imagen URL:</label>
          <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} />
        </div>
        <div>
          <label>Cantidad:</label>
          <input type="number" name="cantidad" value={producto.stock} onChange={handleChange} required />
        </div>
        <div>
          <label>Categoría:</label>
          <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} required />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default EditarProducto; 