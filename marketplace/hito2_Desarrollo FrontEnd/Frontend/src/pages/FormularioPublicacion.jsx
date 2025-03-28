import "../assets/css/FormularioPublicacion.css";
import React, { useRef, useState } from "react";
import axios from "axios";

const COLORES = [
  { nombre: "Negro", valor: "#000000" },
  { nombre: "Blanco", valor: "#ffffff" },
  { nombre: "Rojo", valor: "#ff0000" },
  { nombre: "Azul", valor: "#0000ff" },
  { nombre: "Marrón", valor: "#8b4513" },
  { nombre: "Amarillo", valor: "#ffff00" },
  { nombre: "Dorado", valor: "#ffd700" },
  { nombre: "Plateado", valor: "#c0c0c0" },
  { nombre: "Rosa", valor: "#ffc0cb" },
  { nombre: "Verde", valor: "#008000" },
  { nombre: "Naranjo", valor: "#ffa500" },
  {
    nombre: "Multicolor",
    valor:
      "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
  },
];

const TALLAS = ["S", "M", "L", "XL"];

function FormularioPublicacion() {
  const inputRef = useRef(null);
  const [imagenes, setImagenes] = useState([]);

  const [formData, setFormData] = useState({
    titulo: "",
    precio: "",
    categoria: "",
    tallas: [],
    colores: [],
    descripcion: "",
    stock: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTallaChange = (talla) => {
    setFormData((prev) => {
      const tallas = prev.tallas.includes(talla)
        ? prev.tallas.filter((t) => t !== talla)
        : [...prev.tallas, talla];
      return { ...prev, tallas };
    });
  };

  const handleColorChange = (color) => {
    setFormData((prev) => {
      const colores = prev.colores.includes(color)
        ? prev.colores.filter((c) => c !== color)
        : [...prev.colores, color];
      return { ...prev, colores };
    });
  };

  const handleImagenChange = (e) => {
    const files = Array.from(e.target.files);
    const nuevosArchivos = files.slice(0, 4 - imagenes.length);
    const previews = nuevosArchivos.map((file) => URL.createObjectURL(file));
    setImagenes((prev) => [...prev, ...previews]);
    e.target.value = null;
  };

  const abrirSelector = () => {
    if (imagenes.length >= 4) return;
    inputRef.current.click();
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datosFinales = { ...formData, imagenes };
    console.log("Simulando envio de:", datosFinales);
    // Aquí envías a tu backend
    // axios.post("http://localhost:3000/publicaciones", datosFinales)
    //   .then(() => alert("Publicación creada!"))
    //   .catch(err => alert("Error al publicar."));
  };

  return (
    <div className="formulario-publicacion-container">
      <div className="imagenes-publicacion">
        <div className="imagen-y-miniaturas">
          <div className="zona-principal" onClick={abrirSelector}>
            {imagenes[0] ? (
              <>
                <img src={imagenes[0]} alt="Principal" />
                <button
                  className="boton-eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarImagen(0);
                  }}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="texto-overlay">AÑADIR FOTOS</div>
            )}
          </div>

          <div className="miniaturas-laterales">
            {imagenes.slice(1).map((src, index) => (
              <div key={index} className="miniatura-overlay">
                <img src={src} alt={`Miniatura ${index + 1}`} />
                <div className="numero-overlay">+{index + 1}</div>
                <button
                  className="boton-eliminar"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarImagen(index + 1);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="titulo-imagenes">Título imágenes</p>
        <p className="texto-subida" onClick={abrirSelector}>
          Subir fotos (hasta 4)
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleImagenChange}
        />
      </div>

      <div className="formulario-container">
        <h2>FORMULARIO DE PUBLICACIÓN</h2>
        <form onSubmit={handleSubmit}>
          <div className="grupo-input">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Título del producto"
              value={formData.titulo}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="stock">Cantidad de Productos</label>
            <select
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            >
              {[...Array(55).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grupo-input">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="">Selecciona categoría</option>
              <option value="hombre">Ropa de Hombre</option>
              <option value="mujer">Ropa de Mujer</option>
              <option value="accesorios">Accesorios</option>
              <option value="tecnologia">Tecnología</option>
            </select>
          </div>

          {(formData.categoria === "hombre" || formData.categoria === "mujer") && (
            <div className="grupo-input">
              <label>Tallas</label>
              <div className="tallas-checkboxes">
                {TALLAS.map((talla) => (
                  <label key={talla}>
                    <input
                      type="checkbox"
                      checked={formData.tallas.includes(talla)}
                      onChange={() => handleTallaChange(talla)}
                    />{" "}
                    {talla}
                  </label>
                ))}
              </div>
            </div>
          )}

          {formData.categoria && (
            <div className="grupo-input">
              <label>Colores</label>
              <div className="colores-selector">
                {COLORES.map((color) => (
                  <div
                    key={color.nombre}
                    title={color.nombre}
                    onClick={() => handleColorChange(color.nombre)}
                    className={`color-box ${
                      formData.colores.includes(color.nombre)
                        ? "seleccionado"
                        : ""
                    }`}
                    style={{ background: color.valor }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grupo-input">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">PUBLICAR</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPublicacion;

