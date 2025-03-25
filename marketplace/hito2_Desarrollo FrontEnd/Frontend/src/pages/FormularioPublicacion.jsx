import { useState } from "react";

function FormularioPublicacion() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const producto = {
      titulo,
      descripcion,
      precio: parseFloat(precio),
      imagen
    };
    console.log("Producto creado:", producto);
    // Aquí luego agregas el POST a la API (/productos)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default FormularioPublicacion;
