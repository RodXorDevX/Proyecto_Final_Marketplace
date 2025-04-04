import { useEffect, useState, useContext } from "react";
import SidebarPerfil from "../components/SidebarPerfil";
import { AuthContext } from "../context/AuthContext"; // Importa el contexto de autenticación
import "../assets/css/pedidos.css";

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const { usuario } = useContext(AuthContext);  // Obtén el usuario logueado

  // Realizamos la llamada a la API para obtener los pedidos del usuario
  useEffect(() => {
    if (!usuario) return;  // Si el usuario no está logueado, no hacer la llamada
    
    const usuarioId = usuario.usuario.id; // Obtener el ID del usuario logueado
    const vendedorId = 1; // Aquí deberías obtener el ID del vendedor al que deseas acceder (por ejemplo, del producto o perfil)
    
    // Hacemos la solicitud al backend para obtener los pedidos de este vendedor
    fetch(`http://localhost:3000/pedidos?usuario_id=${usuarioId}&vendedor_id=${vendedorId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);  // Esto imprimirá la respuesta de la API
        if (Array.isArray(data)) {
          setPedidos(data);  // Guardamos los pedidos obtenidos en el estado
        } else {
          setError(data.error || "Error desconocido"); // Maneja el error si no es un array
        }
      })
      .catch(error => {
        console.error("Error al obtener los pedidos:", error);
        setError("Hubo un problema al obtener los pedidos.");
      })
      .finally(() => setLoading(false));  // Se ejecuta siempre, ya sea que haya éxito o error
  }, [usuario]);
  

  // Si la página está cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando pedidos...</div>;
  }

  // Si hubo un error, mostramos el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pedidos-container">
      <SidebarPerfil />
      <div className="pedidos-content">
        <h1>LISTADO DE PEDIDOS</h1>

        {/* Si no hay pedidos, mostrar este mensaje */}
        {pedidos.length === 0 ? (
          <p>No tienes pedidos.</p>
        ) : (
          <div className="pedidos-list">
            {/* Iteramos sobre los pedidos para mostrarlos */}
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="pedido-item">
                <div className="pedido-info">
                  {/* Muestra el título del producto */}
                  <span className="producto">{pedido.titulo}</span>
                  {/* Muestra la talla si está presente */}
                  <span className="talla">{pedido.size || "Tamaño no especificado"}</span>
                  {/* Muestra el nombre del usuario que hizo el pedido */}
                  <span className="realizado">Realizado por: {pedido.usuario_nombre}</span>
                </div>
                <div className="pedido-status">
                  {/* Muestra el ID del pedido y la fecha de creación */}
                  <span>ID: {pedido.id}</span>
                  <span>{pedido.created_at}</span>
                  {/* Muestra el estado del pedido */}
                  <button>{pedido.status}</button>
                  {/* Muestra el precio total del pedido */}
                  <span className="precio">${pedido.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
