import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(UserContext);
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (userData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            await register({
                nombre: userData.nombre,
                apellido: userData.apellido,
                email: userData.email,
                password: userData.password,
            });
            setSuccessMessage('¡Registro exitoso!');
            navigate('/login');
        } catch (error) {
            setError('Error al registrarse.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <label htmlFor="nombre">Nombre:</label>
            <input 
                type="text" 
                id="nombre"
                className="form-control"
                value={userData.nombre} 
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })} 
                required 
            />
            <label htmlFor="apellido">Apellido:</label>
            <input 
                type="text" 
                id="apellido"
                className="form-control"
                value={userData.apellido} 
                onChange={(e) => setUserData({ ...userData, apellido: e.target.value })} 
                required 
            />
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email"
                className="form-control"
                value={userData.email} 
                onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
                required 
            />
            <label htmlFor="password">Contraseña:</label>
            <input 
                type="password" 
                id="password"
                className="form-control"
                value={userData.password} 
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} 
                required 
            />
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input 
                type="password" 
                id="confirmPassword"
                className="form-control"
                value={userData.confirmPassword} 
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} 
                required 
            />
            <label htmlFor="avatarUpload">Cambiar Avatar:</label>
            <input 
                type="file" 
                id="avatarUpload"
                accept="image/*" 
                onChange={handleImageChange} 
            />
            {avatar && (
                <img 
                    src={avatar} 
                    alt="Avatar Preview" 
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
            )}
            <button type="submit">Registrarse</button>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
    );
};

export default Register;
