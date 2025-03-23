import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [token, setToken] = useState(null);

    // Método para registrar un nuevo usuario
    const register = async (userData) => {
        try {
            // Asegúrate de que solo envías los datos necesarios
            const { nombre, apellido, email, password } = userData; // Desestructurar solo los datos necesarios
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                nombre,
                apellido,
                email,
                password,
                // No enviar profileImage
            });
            // Manejar la respuesta
            setUserInfo(response.data.user); // Ajusta esto según la estructura de tu respuesta
            setToken(response.data.token); // Ajusta esto según la estructura de tu respuesta
            localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
        } catch (error) {
            console.error('Error al registrarse:', error.response ? error.response.data : error.message);
            throw error; // Lanza el error para manejarlo en el componente
        }
    };
   // Método para iniciar sesión
   const login = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        setUserInfo(response.data.user); // Ajusta esto según la estructura de tu respuesta
        setToken(response.data.token); // Ajusta esto según la estructura de tu respuesta
        localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
        return true; // Retornar true si el inicio de sesión es exitoso
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response ? error.response.data : error.message);
        return false; // Retornar false si hay un error
    }
};
const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token disponible');
        }

        const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUserInfo(response.data); // Ajusta esto según la estructura de tu respuesta
        return response.data; // Retorna la información del perfil
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setUserInfo(null); // Restablecer userInfo si hay un error
        throw error; // Lanza el error para manejarlo en el componente
    }
};
    // Otros métodos (login, logout, etc.)...
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí puedes hacer una solicitud para obtener la información del usuario
            getProfile(); // Llama a la función para obtener el perfil del usuario
        }
    }, []);

    const logout = () => {
        setToken(false);
        localStorage.setItem('token', 'false');
    };
    return (
        <UserContext.Provider value={{ 
            token, 
            logout, 
            login, 
            register, 
            getProfile,
            userInfo
            
        }}>
            {children}
        </UserContext.Provider>
    );
}; 