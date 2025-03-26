import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FormularioPublicacion from './pages/FormularioPublicacion';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import DetallePublicacion from './pages/DetallePublicacion';
import Navbar from './components/Navbar';
import RutaProtegida from './components/RutaProtegida';
import Carrito from './pages/Carrito';
import Footer from './components/Footer';


function App() {
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
        <Perfil />
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
      </Routes>
      <Footer />
      
    </>
  );
}

export default App;
