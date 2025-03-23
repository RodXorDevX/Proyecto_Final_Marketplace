import React, { useContext } from "react";
import iconoPizza from '../assets/img/pizzaIcon.png';
import { CartContext } from "../context/CartContext";

import { useNavigate, Link } from "react-router-dom";
import { formatNumber } from "../utils/FormatNumber";//
import '../assets/css/cardpizza.css';
const CardPizza = ({ id, name, price, ingredients, img }) => {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        addToCart({ id, name, price, img });
    };
    const handleVerMas = () =>{
        navigate(`/pizza/${id}`);
    }
    return (
        <div className="card">
            <img src={img} className="card-img-top" alt={name} />
            <div className="card-body" >
                <h5 className="card-title text-center text-capitalize">Pizza {name}</h5>
                <hr/>
                <p className="card-text">
                    <small className="text-muted">
                    <img src={iconoPizza} alt="IconoPizza" className="iconoPizza" />
                        Ingredientes: {ingredients.join(", ")}
                    </small>
                    
                </p>
                <p className="card-text">Precio: ${formatNumber(price)}</p>
                <div className="d-flex w-100">
                <button className="btn btn-outline-dark" onClick={handleVerMas}>Ver mas&nbsp;<i className="bi bi-info-circle"></i></button>
                <button className="btn btn-dark ms-auto" onClick={handleAddToCart}>Añadir&nbsp;<i className="bi bi-cart4"></i></button>
                </div>
                   
            </div>
        </div>
    );
};

export default CardPizza;
