import GaleriaPublicaciones from "../components/GaleriaPublicaciones";
import '../assets/css/Home.css';
import { FaSearch, FaTwitter, FaFacebook, FaInstagram, FaShoppingBag, FaUser } from 'react-icons/fa';

function Home() {
    return (
        <div className="home-container">
            {/* Banner Principal */}
            <div className="banner">
                <div className="banner-content">
                    <div className="new-arrival">
                        <div className="yellow-bar"></div>
                        <div className="arrival-text">New</div>
                    </div>
                    <h1 className="banner-title">Arrival Fashion Women</h1>
                    <p className="banner-product">Blazer for women</p>
                </div>
                <span className="banner-date">21/01/2029</span>
                <div className="banner-image">
                    <img src="/ruta-a-imagen-modelos-blazer.jpg" alt="Women wearing blazers" />
                    <div className="product-text">BLAZER FOR WOMEN</div>
                    <div className="discount-banner">50% OFF</div>
                </div>
            </div>

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