import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import SidebarPerfil from "../components/SidebarPerfil";

function Carrito() {
  const {
    carrito,
    agregarAlCarrito,
    disminuirCantidad,
    calcularTotal,
  } = useContext(CarritoContext);

  return (
    <div style={{ display: "flex" }}>
      <SidebarPerfil />

      <main style={{ flex: 1, background: "#d9d9d9", padding: "2rem", display: "flex", gap: "2rem" }}>
    
        <div style={{ flex: 2 }}>
          <h2 style={{ marginBottom: "2rem" }}>CARRITO DE COMPRAS</h2>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  padding: "1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={item.image || item.imagen}
                  alt={item.title}
                  style={{ width: "80px", height: "100px", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{item.title || item.titulo}</h4>
                  <p style={{ fontSize: "0.9rem", color: "gray" }}>TALLA S - BLANCA</p>
                </div>

                {/* Botones + - */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => agregarAlCarrito(item)}>+</button>
                </div>

                <p style={{ width: "80px", textAlign: "right" }}>
                  ${parseFloat(item.price || item.precio).toLocaleString("es-CL")}
                </p>

                <button style={{ marginRight: "0.5rem" }}>Ver</button>
                <button onClick={() => disminuirCantidad(item.id)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        {/* Columna resumen */}
        <div
          style={{
            background: "#fff",
            padding: "1.5rem",
            width: "250px",
            height: "fit-content",
          }}
        >
          <h3>RESUMEN</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.title || item.titulo}<br />
                {parseFloat(item.price || item.precio).toLocaleString("es-CL")} x{item.cantidad}
              </li>
            ))}
          </ul>
          <hr />
          <p><strong>TOTAL:</strong> {calcularTotal().toLocaleString("es-CL")}</p>
          <button
            style={{
              backgroundColor: "#0a1c3d",
              color: "#fff",
              width: "100%",
              padding: "0.5rem",
              border: "none",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            PAGAR
          </button>
        </div>
      </main>
    </div>
  );
}

export default Carrito;
