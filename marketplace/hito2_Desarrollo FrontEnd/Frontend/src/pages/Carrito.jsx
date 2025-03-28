import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import SidebarPerfil from "../components/SidebarPerfil";
import "../assets/css/Carrito.css";

function Carrito() {
  const { carrito, agregarAlCarrito, disminuirCantidad, calcularTotal } =
    useContext(CarritoContext);

  return (
    <div className="carrito-container">
      <SidebarPerfil />

      <main className="carrito-main">
        {/* Columna de productos */}
        <div className="carrito-productos">
          <h2>CARRITO DE COMPRAS</h2>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.image || item.imagen} alt={item.title} />
                <div className="carrito-item-info">
                  <h4>{item.title || item.titulo}</h4>
                  <p>TALLA S - BLANCA</p>
                </div>

                {/* Botones + - */}
                <div className="carrito-cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => agregarAlCarrito(item)}>+</button>
                </div>

                <p className="carrito-precio">
  ${parseFloat(item.price || item.precio).toLocaleString("es-CL")}
</p>

                <button>Ver</button>
                <button onClick={() => disminuirCantidad(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {/* Columna resumen */}
        <div className="carrito-resumen">
          <h3>RESUMEN</h3>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.title || item.titulo}
                <br />
                {parseFloat(item.price || item.precio).toLocaleString(
                  "es-CL"
                )}{" "}
                x{item.cantidad}
              </li>
            ))}
          </ul>
          <hr />
          <p>
            <strong>TOTAL:</strong> {calcularTotal().toLocaleString("es-CL")}
          </p>
          <button>PAGAR</button>
        </div>
      </main>
    </div>
  );
}

export default Carrito;
