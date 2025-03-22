import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { login } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const success = await login({ email, password });
        if (!success) {
            setError('Error al iniciar sesión.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email"
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <label htmlFor="password">Contraseña:</label>
            <input 
                type="password" 
                id="password"
                className="form-control"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Iniciar Sesión</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default Login;
