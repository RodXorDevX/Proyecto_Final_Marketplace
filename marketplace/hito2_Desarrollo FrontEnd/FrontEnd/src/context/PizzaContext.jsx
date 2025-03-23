import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPizzas = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/pizzas');
            setPizzas(response.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getPizzaById = (id) => {
        return pizzas.find(pizza => pizza.id === id);
    };

    useEffect(() => {
        getPizzas();
    }, []);

    return (
        <PizzaContext.Provider value={{
            pizzas,
            loading,
            error,
            getPizzas,
            getPizzaById
        }}>
            {children}
        </PizzaContext.Provider>
    );
};