import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

   /*
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    axios.post("http://localhost:3000/login", { email, password })
    .then((res) => {
        login(res.data); // Aquí guardamos el usuario y token en contexto
        navigate("/perfil"); // Redirigimos al perfil o donde quieras
      })
      .catch((err) => {
        alert("Credenciales inválidas");
      });
  };
*/

const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Simulando login con:", email);
  
    // Simulación de usuario
    const datosFalsos = {
      token: "falso-token-456",
      usuario: {
        id: 1,
        nombre: "Alejandra",
        email: email,
      },
    };
  
    login(datosFalsos);
    navigate("/perfil");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}

export default Login;
