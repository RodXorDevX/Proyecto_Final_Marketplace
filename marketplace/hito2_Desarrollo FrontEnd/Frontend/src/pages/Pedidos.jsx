import { useEffect, useState, useContext } from "react";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/pedidos.css";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarOpciones, setMostrarOpciones] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (!usuario) return;

    const vendedorId = usuario.usuario.id;

    fetch(`http://localhost:3000/pedidos?vendedor_id=${vendedorId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPedidos(data);
        } else {
          setError(data.error || "Error desconocido");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los pedidos:", error);
        setError("Hubo un problema al obtener los pedidos.");
      })
      .finally(() => setLoading(false));
  }, [usuario]);

  const toggleOpciones = (pedidoId) => {
    setMostrarOpciones((prev) => ({
      ...prev,
      [pedidoId]: !prev[pedidoId],
    }));
  };

  const handleStatusChange = async (pedidoId, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:3000/pedidos/${pedidoId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nuevoEstado }),
      });

      const actualizado = await res.json();

      // Actualizar estado local
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId ? { ...p, status: actualizado.status } : p
        )
      );

      // Ocultar opciones después de actualizar
      setMostrarOpciones((prev) => ({
        ...prev,
        [pedidoId]: false,
      }));
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pedidos-container">
      <SidebarPerfil />
      <div className="pedidos-content">
        <h1>LISTADO DE PEDIDOS</h1>

        {pedidos.length === 0 ? (
          <p>No tienes pedidos.</p>
        ) : (
          <div className="pedidos-list">
            {pedidos.map((pedido) => {
              const estado = pedido.status || "Pendiente";

              return (
                <div key={pedido.id} className="pedido-box">
                  <img className="pedido-img" src={pedido.imagen} alt={pedido.titulo} />
                  <div className="pedido-info">
                    <div className="pedido-texto">
                      <h4>{pedido.titulo}</h4>
                      {pedido.size && <p className="talla">Talla {pedido.size}</p>}
                      <p>Comprado por: {pedido.usuario_nombre}</p>
                      <p>{pedido.cantidad} unidades</p>
                      <p>{pedido.created_at ? new Date(pedido.created_at).toLocaleDateString("es-CL") : "Fecha no disponible"}</p>
                      <p className="precio">
                        ${Number(pedido.total).toLocaleString("es-CL")}
                      </p>
                    </div>

                    <div className="pedido-estado">
                      <button
                        className={`estado-btn ${estado.toLowerCase()}`}
                        onClick={() => toggleOpciones(pedido.id)}
                      >
                        {estado}
                      </button>

                      {mostrarOpciones[pedido.id] && (
                        <div className="estado-opciones">
                          <button
                            className="estado-btn entregado"
                            onClick={() => handleStatusChange(pedido.id, "Entregado")}
                          >
                            Entregado
                          </button>
                          <button
                            className="estado-btn cancelado"
                            onClick={() => handleStatusChange(pedido.id, "Cancelado")}
                          >
                            Cancelado
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
