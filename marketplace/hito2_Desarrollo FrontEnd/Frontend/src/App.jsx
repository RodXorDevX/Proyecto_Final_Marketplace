import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FormularioPublicacion from './pages/FormularioPublicacion';
import Register from './pages/Register';
import MiPerfil from './pages/MiPerfil';
import DetallePublicacion from './pages/DetallePublicacion';
import Navbar from './components/Navbar';
import RutaProtegida from './components/RutaProtegida';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';
import Publicaciones from './pages/Publicaciones';
import Pedidos from './pages/Pedidos';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    alert("Para Iniciar sesión entra con cualquier mail y contraseña");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route
        path="/perfil"
        element={
        <RutaProtegida>
        <MiPerfil />
        </RutaProtegida>
    }
  />
      <Route path="/publicacion/:id" element={<DetallePublicacion />} />
      <Route
      path="/carrito"
      element={
      <RutaProtegida>
      <Carrito />
      </RutaProtegida>
  }
/>
        <Route
      path="/publicar"
      element={
      <RutaProtegida>
        <FormularioPublicacion />
      </RutaProtegida>
    }
  />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route
          path="/pedidos"
          element={
            <RutaProtegida>
              <Pedidos />
            </RutaProtegida>
          }
        />
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
