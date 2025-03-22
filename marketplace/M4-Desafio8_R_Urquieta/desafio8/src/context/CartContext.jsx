import React, { createContext, useState, useEffect } from 'react';
import { pizzaCart as carroBase } from "../assets/js/pizzas";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [pizzaCart, setPizzaCart] = useState(carroBase);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pizzaCart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);
        setTotal(nuevoTotal);
    }, [pizzaCart]);

    const aumentarCant = (index) => {
        const nuevoCarro = [...pizzaCart];
        nuevoCarro[index].count += 1;
        setPizzaCart(nuevoCarro);
    };

    const disminuirCant = (index) => {
        const nuevoCarro = [...pizzaCart];
        if (nuevoCarro[index].count > 1) {
            nuevoCarro[index].count -= 1;
        } else {
            nuevoCarro.splice(index, 1);
        }
        setPizzaCart(nuevoCarro);
    };
    const addToCart = (pizza) => {
        const existingPizzaIndex = pizzaCart.findIndex(item => item.id === pizza.id);
        
        if (existingPizzaIndex >= 0) {
            // Si la pizza ya está en el carrito, aumentar la cantidad
            aumentarCant(existingPizzaIndex);
        } else {
            // Si es una nueva pizza, agregarla al carrito con count = 1
            setPizzaCart([...pizzaCart, { ...pizza, count: 1 }]);
        }
    };

    return (
        <CartContext.Provider value={{ 
            pizzaCart, 
            total, 
            aumentarCant, 
            disminuirCant,
            addToCart 
        }}>
            {children}
        </CartContext.Provider>
    );
};
