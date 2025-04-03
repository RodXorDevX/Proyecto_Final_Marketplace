import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CarritoContext } from "../context/CarritoContext";
import "../assets/css/DetallePublicacion.css";

function DetallePublicacion() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [tallaSeleccionada, setTallaSeleccionada] = useState("S");
  const [colorSeleccionado, setColorSeleccionado] = useState("blanco");
  const { agregarAlCarrito, carrito } = useContext(CarritoContext);

  // Cargar el producto
  useEffect(() => {
    axios.get(`http://localhost:3000/productos/${id}`)
      .then((res) => {
        setProducto(res.data);
        setImagenes([res.data.image, res.data.image + "?1", res.data.image + "?2"]);
      })
      .catch((err) => console.error("Error al obtener producto", err));
  }, [id]);

  // Revisar si ya hay productos con este ID en el carrito
  useEffect(() => {
    if (!producto) return;
    const cantidadTotal = carrito
      .filter((item) => item.id === producto.id)
      .reduce((sum, item) => sum + item.cantidad, 0);
    setCantidad(cantidadTotal > 0 ? cantidadTotal : 1);
  }, [producto, carrito]);

  const handleAgregar = () => {
    agregarAlCarrito({ ...producto, talla: tallaSeleccionada, color: colorSeleccionado, cantidad });
  };

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-imagenes">
        <div className="imagen-principal">
          <img src={imagenes[imagenSeleccionada]} alt={producto.title} />
        </div>
        <div className="miniaturas">
          {imagenes.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`mini ${index}`}
              onClick={() => setImagenSeleccionada(index)}
              className={index === imagenSeleccionada ? "miniatura activa" : "miniatura"}
            />
          ))}
        </div>
      </div>

      <div className="detalle-info">
        <h2 className="detalle-titulo">{producto.title}</h2>
        <p className="detalle-precio">${producto.price}</p>

        <div className="detalle-descripcion">
          <p><strong>Tipo de Producto:</strong> {producto.category}</p>
          <p><strong>Color:</strong> {colorSeleccionado}</p>
          <p><strong>Composición:</strong> 95% Algodón 5% Spandex</p>
          <p><strong>Cuidados:</strong> Lavar a Máquina máx. 30ºC. con centrifugado corto.<br />No usar secadora.</p>
          <p><strong>Modelo:</strong> Daniela está usando una polera S y mide 172 cm.</p>
        </div>

        <div className="detalle-colores">
          <p><strong>Colores:</strong></p>
          <div className="colores">
            {["blanco", "negro", "amarillo"].map((color) => (
              <span
                key={color}
                className={`color ${color} ${colorSeleccionado === color ? "seleccionado" : ""}`}
                onClick={() => setColorSeleccionado(color)}
              ></span>
            ))}
          </div>
        </div>

        <div className="detalle-tallas">
          <p><strong>Tallas:</strong></p>
          <div className="tallas">
            {["S", "M", "L"].map(talla => (
              <button
                key={talla}
                className={`talla ${tallaSeleccionada === talla ? "active" : ""}`}
                onClick={() => setTallaSeleccionada(talla)}>
                {talla}
              </button>
            ))}
          </div>
        </div>

        <div className="detalle-cantidad">
          <p><strong>Cantidad:</strong></p>
          <div className="cantidad-control">
            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
            <span>{cantidad}</span>
            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
          </div>
        </div>

        <button className="btn-agregar" onClick={handleAgregar}>AGREGAR AL CARRITO</button>
      </div>
    </div>
  );
}

export default DetallePublicacion;
