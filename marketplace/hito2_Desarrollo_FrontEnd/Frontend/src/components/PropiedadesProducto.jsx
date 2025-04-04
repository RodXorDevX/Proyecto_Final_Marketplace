import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PropiedadesProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState({
    imagen: '',
    precio: 0,
    stock: 0,
    categoria_id: '',
    descripcion: ''
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Obtener el producto por ID
    const fetchProducto = async () => {
      const response = await axios.get(`/api/productos/${id}`);
      setProducto(response.data);
    };

    // Obtener categorías para el select
    const fetchCategorias = async () => {
      const response = await axios.get('/api/categorias'); // Asegúrate de tener este endpoint
      setCategorias(response.data);
    };

    fetchProducto();
    fetchCategorias();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/productos/${id}`, producto);
      alert('Producto actualizado con éxito');
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="categoria_id"
            value={producto.categoria_id}
            onChange={handleChange}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default PropiedadesProducto; 