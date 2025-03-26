import React, { useState } from 'react';
import '../assets/css/Register.css'; 
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="page-container">
      <div className="box">
        <div className="imagen-izquierda"></div>
        <div className="registro">
          <div className="text-wrapper-2">REGISTRO</div>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
            required
            className="input-field"
          />

          <button type="submit" onClick={handleSubmit} className="submit-btn">Registrarme</button>

          <p className="tienes-cuenta">
            <span className="span">¿Tienes cuenta? </span>
            <span className="text-wrapper-3"><Link to="/login" className="link-login">Ingresa aquí</Link></span> 
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
