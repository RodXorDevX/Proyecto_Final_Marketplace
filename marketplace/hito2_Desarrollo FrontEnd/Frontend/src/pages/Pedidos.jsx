import { useState } from 'react';
import '../assets/css/pedidos.css';
import SidebarPerfil from '../components/SidebarPerfil';

export default function Pedidos() {
  const [pedidos] = useState([
    {
      id: '10111',
      producto: 'Polera manga corta',
      talla: 'TALLA S - BLANCA',
      precio: '$9.990',
      realizadoPor: 'Usuario 2',
      fecha: '3-3-2025',
      estado: 'Enviado'
    },
    {
      id: '10113',
      producto: 'Mochila Fjallraven',
      talla: 'TALLA S - BLANCA',
      precio: '$12.990',
      realizadoPor: 'Usuario 3',
      fecha: '3-3-2025',
      estado: 'Pendiente'
    }
  ]);

  const calcularGanancias = () => {
    return pedidos.reduce((total, pedido) => {
      return total + parseInt(pedido.precio.replace(/\D/g, ''));
    }, 0);
  };

  const handleEstadoClick = (id) => {
    console.log('Cambiar estado del pedido:', id);
  };

  return (
    <div style={{ display: "flex" }}>
      <SidebarPerfil />
      <div className="pedidos-content">
        <h1>LISTADO DE PEDIDOS</h1>
        <div className="pedidos-list">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="pedido-item">
              <div className="pedido-info">
                <div className="pedido-principal">
                  <span className="producto">{pedido.producto}</span>
                </div>
                <div className="pedido-detalles">
                  <span className="talla">{pedido.talla}</span>
                  <span className="realizado">Realizado por {pedido.realizadoPor}</span>
                </div>
              </div>
              <div className="pedido-status">
                <div className="pedido-id-fecha">
                  <span>ID:{pedido.id}</span>
                  <span>{pedido.fecha}</span>
                </div>
                <div className="estado-container">
                  <button 
                    className={`estado-btn ${pedido.estado.toLowerCase()}`}
                    onClick={() => handleEstadoClick(pedido.id)}
                  >
                    {pedido.estado}
                  </button>
                  <button className="delete-btn">✕</button>
                </div>
                <span className="precio">{pedido.precio}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="ganancias">
          <span>Ganancias: ${calcularGanancias().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
