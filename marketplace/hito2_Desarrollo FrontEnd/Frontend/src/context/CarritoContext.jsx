import { createContext, useState } from "react";

// Creamos el contexto
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
  
    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const disminuirCantidad = (productoId) => {
    setCarrito(
      carrito
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0) // Elimina si queda en 0
    );
  };
  
  

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + parseFloat(item.price || item.precio) * item.cantidad, 0);
};

  return (
<CarritoContext.Provider value={{ carrito, agregarAlCarrito, disminuirCantidad, calcularTotal }}>
{children}
    </CarritoContext.Provider>
  );
};
