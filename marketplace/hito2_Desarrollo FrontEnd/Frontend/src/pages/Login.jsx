import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import loginImg from "../assets/img/Register/LoginPic.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const datosFalsos = {
      token: "falso-token-456",
      usuario: {
        id: 1,
        nombre: "Alejandra",
        email: "ale@example.com"
      },
    };

    login(datosFalsos);
    navigate("/perfil");
  };

  return (
    <div className="login-container">
      <div className="box">
        <div className="login-img">
          <img src={loginImg} alt="Promo login" />
        </div>

        <div className="login-form">
          <h2>INICIO DE SESIÓN</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">INICIAR SESIÓN</button>
          </form>
          <p className="registro-link">
            ¿No tienes cuenta? <span onClick={() => navigate("/registro")}>Regístrate aquí</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;