import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import SidebarPerfil from "../components/SidebarPerfil";
import "../assets/css/Carrito.css";

function Carrito() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);  // Estado para procesar la compra
  const { carrito, calcularTotal, vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handlePagar = async () => {
    setIsProcessing(true);  // Bloqueamos el botón mientras se procesa la compra
    try {
      const response = await fetch('http://localhost:3000/pedidos/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: 1,  // Asegúrate de obtener el ID del usuario logueado
          carrito: carrito.map(item => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          }))
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el pedido');
      }
  
      const data = await response.json();
      console.log(data);
  
      // Mostrar mensaje de éxito
      setShowSuccessMessage(true);
  
      // Vaciar el carrito
      vaciarCarrito();
  
      // Redirigir a "ResumenCompra" pasando el carrito y total como estado
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsProcessing(false);
        navigate('/resumen-compra', { state: { carrito, total: calcularTotal() } });  // Pasamos los datos al estado de la navegación
      }, 3000);
  
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar tu pedido');
      setIsProcessing(false);  // Si hay error, dejar de procesar
    }
  };
  
  return (
    <div className="carrito-container">
      <SidebarPerfil />
      <main className="carrito-main">
        <div className="carrito-productos">
          <h2>CARRITO DE COMPRAS</h2>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.image || item.imagen} alt={item.title || item.titulo} />
                <div className="carrito-item-info">
                  <h4>{item.title || item.titulo}</h4>
                  <p>TALLA {item.talla || "S"} - {item.color || "BLANCO"}</p>
                </div>
                <div className="carrito-cantidad">
                  <button>-</button>
                  <span>{item.cantidad}</span>
                  <button>+</button>
                </div>
                <p className="carrito-precio">${item.precio}</p>
              </div>
            ))
          )}
        </div>
        <div className="carrito-resumen">
          <h3>RESUMEN</h3>
          <ul>
            {carrito.map((item) => (
              <li key={item.id}>
                {item.title || item.titulo}<br />
                ${item.precio} x {item.cantidad}
              </li>
            ))}
          </ul>
          <hr />
          <p><strong>TOTAL:</strong> ${calcularTotal()}</p>
          <button onClick={handlePagar} disabled={isProcessing}>
            {isProcessing ? 'Procesando...' : 'PAGAR'}
          </button>
          {showSuccessMessage && <div className="success-message">¡Compra realizada con éxito!</div>}
        </div>
      </main>
    </div>
  );
}

export default Carrito;
