import '../assets/css/Footer.css';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="copyright">
                TREND'S 2025
            </div>
            <div className="social-container">
                <p>Encuentranos en:</p>
                <div className="social-links">
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
