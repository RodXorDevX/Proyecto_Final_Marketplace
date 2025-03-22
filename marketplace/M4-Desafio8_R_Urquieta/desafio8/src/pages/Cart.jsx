import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Cart.css';

const Cart = () => {
    const { pizzaCart, total, aumentarCant, disminuirCant } = useContext(CartContext);
    const { token } = useContext(UserContext);
    const [successMessage, setSuccessMessage] = useState('');

    const handlePay = async () => {
        if (!token) {
            alert('Por favor inicia sesión para realizar el pago');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:5000/api/checkouts', { cart: pizzaCart }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccessMessage('¡Pago realizado con éxito!');
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Hubo un problema al procesar el pago.');
        }
    };

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="cart-items">
                {pizzaCart.length > 0 ? (
                    pizzaCart.map((pizza, index) => (
                        <div className="card mb-3" style={{ width: 540 + 'px' }} id={pizza.id} key={index}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={pizza.img} className="img-fluid rounded-start" alt={`${pizza.name}`} />
                                </div>
                                <div className="col-md-5">
                                    <div className="card-body">
                                        <h5 className="card-title">Pizza {pizza.name}</h5>
                                        <p className="card-text">Precio unitario: ${pizza.price.toLocaleString()}</p>
                                        <p className="card-text">Cantidad: {pizza.count}</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex align-items-center justify-content-center mt-5">
                                        <button className="btn btn-outline-dark me-2" onClick={() => disminuirCant(index)}><i className="bi bi-dash-circle-fill"></i></button>
                                        <button className="btn btn-outline-dark me-2" onClick={() => aumentarCant(index)}><i className="bi bi-plus-circle-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : (
                        <p>No hay pizzas en el carro</p>
                    )
                }
            </div>

            <div className="cart-footer">
                <div className="cart-total">
                    <h3>Total: ${total.toLocaleString()}</h3>
                </div>
                
                {!token ? (
                    <div className="login-message">
                        <p>Para realizar el pago, por favor <Link to="/login">inicia sesión</Link></p>
                    </div>
                ) : null}

                <button 
                    className={`pay-button ${!token ? 'disabled' : ''}`}
                    onClick={handlePay}
                    disabled={!token}
                >
                    Pagar
                </button>
            </div>
        </div>
    );
}

export default Cart;
