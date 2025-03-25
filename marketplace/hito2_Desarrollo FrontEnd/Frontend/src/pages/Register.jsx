import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 

  /*
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/registro", form)
      .then((res) => {
        login(res.data); // guardamos el usuario y token (si lo devuelve)
        navigate("/perfil");
      })
      .catch((err) => {
        alert("Error al registrar: " + (err.response?.data?.error || "Intenta nuevamente"));
      });
  };

  */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simulando registro con datos:", form);
  
    const datosFalsos = {
      token: "falso-token-123",
      usuario: {
        id: 1,
        nombre: form.nombre,
        email: form.email
      }
    };
  
    // Simulamos el login como si viniera del backend
    login(datosFalsos);
    navigate("/perfil");
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={form.direccion}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrarme</button>
    </form>
  );
}

export default Register;
