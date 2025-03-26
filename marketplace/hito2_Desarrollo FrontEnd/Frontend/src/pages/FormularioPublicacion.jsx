import "../assets/css/FormularioPublicacion.css";
import React, { useRef, useState } from "react";

function FormularioPublicacion() {
  const inputRef = useRef(null);
  const [imagenes, setImagenes] = useState([]);

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

  return (
    <div className="formulario-publicacion-container">
      <div className="imagenes-publicacion">
        <div className="imagen-y-miniaturas">
          {/* Imagen principal */}
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

          {/* Miniaturas */}
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

      {/* Formulario */}
      <div className="formulario-container">
        <h2>FORMULARIO DE PUBLICACIÓN</h2>
        <form>
          <input type="text" placeholder="TÍTULO" />
          <input type="number" placeholder="Precio" />
          <input type="text" placeholder="Categoría" />
          <textarea placeholder="Descripción"></textarea>
          <button type="submit">PUBLICAR</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioPublicacion;