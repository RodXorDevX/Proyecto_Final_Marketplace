import React, { useContext } from "react";
import App from "../App";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "../utils/FormatNumber";
import { CartContext } from "../context/CartContext";
import { UserContext } from '../context/UserContext';

const NavBar = () => {
    const { total } = useContext(CartContext);
    const { token, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Cerrando sesión");
        logout();
        navigate("/");
    }
    return(
    <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand text-light" href="#">Pizzería Mamma Mia</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex" id="navbarNav">
                <ul className="navbar-nav w-100">
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/">
                            <button className="btn btn-outline-light">
                                <i className="bi bi-house"></i>
                                &nbsp;Home
                            </button>
                        </Link>                        
                    </li>
                    {token ? (
                        <>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to="/profile">
                                <button className="btn btn-outline-light">
                                    <i className="bi bi-unlock"></i>
                                    &nbsp;Profile
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                            <button className="btn btn-outline-light botonLogout" onClick={handleLogout}>
                                <i className="bi bi-lock"></i>
                                &nbsp;Logout
                            </button>
                            </a>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to="/login">
                                <button className="btn btn-outline-light">
                                    <i className="bi bi-key"></i>
                                    &nbsp;Login
                                </button>
                            </Link> 
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link text-light" to="/register">
                                <button className="btn btn-outline-light">
                                    <i className="bi bi-key"></i>
                                    &nbsp;Register
                                </button>
                            </Link>
                        </li>
                        </>
                    )}
                    <li className="nav-item ms-auto">
                        <Link className="nav-link" to="/cart">
                            <button className="btn btn-outline-info">
                                <i className="bi bi-cart3"></i>
                                &nbsp;Total: ${formatNumber(total)}
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default NavBar;
