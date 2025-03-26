import GaleriaPublicaciones from "../components/GaleriaPublicaciones";
import '../assets/css/Home.css';
import { FaSearch, FaTwitter, FaFacebook, FaInstagram, FaShoppingBag, FaUser } from 'react-icons/fa';
import  Banner from "../components/Banner";
function Home() {
    return (
        <div className="home-container">
            {/* Banner Principal */}
           <Banner />

            {/* Sección de Búsqueda y Galería */}
            <div className="search-section">
                <div>
                    <div className="gallery-icon">
                        <FaShoppingBag color="white" size={60} />
                    </div>
                    <p className="gallery-title">Galería de publicaciones</p>
                </div>
                <div className="search-container">
                    <div className="search-box">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Buscar" 
                        />
                        <button className="search-button">
                            <FaSearch color="#666" size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Publicaciones destacadas */}
            <h2 className="publications-heading">Publicaciones destacadas</h2>
            <GaleriaPublicaciones />
        </div>
    );
}

export default Home;