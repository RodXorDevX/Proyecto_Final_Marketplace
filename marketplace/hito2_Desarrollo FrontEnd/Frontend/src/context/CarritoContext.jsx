import { createContext, useState } from "react";

// Creamos el contexto
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id && item.talla === producto.talla
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id && item.talla === producto.talla
            ? { ...item, cantidad: item.cantidad + 1 } // Siempre aumenta en 1
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const disminuirCantidad = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito
        .map((item) =>
          item.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0) // Elimina si queda en 0
    );
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total, item) => total + parseFloat(item.price || item.precio) * item.cantidad,
      0
    );
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, disminuirCantidad, calcularTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};
