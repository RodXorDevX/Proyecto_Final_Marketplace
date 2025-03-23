import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PizzaContext } from "../context/PizzaContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import '../assets/css/cardpizza.css';

const Pizza = () => {
    const { id } = useParams();
    const { loading, error, getPizzaById } = useContext(PizzaContext);
    const pizza = getPizzaById(id);

    if(loading) {
        return <LoadingSpinner />;
    }

    if(error) {
        return <ErrorMessage error={error} />;
    }

    if(!pizza) {
        return <div>Pizza no encontrada</div>;
    }

    return (
        <div className="container text-center mt-2">
            <div className="card mb-3 w-100">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={pizza.img} className="img-fluid rounded-start" alt={`Imagen de ${pizza.name}`} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title text-capitalize">Pizza {pizza.name}</h5>
                            <p className="card-text">${pizza.price.toLocaleString()}</p>
                            <p className="card-text">Ingredientes:
                                {pizza.ingredients.map((ingredient, index) => (
                                    <span key={index} className="badge bg-light me-1 text-dark text-capitalize">
                                        {ingredient}
                                    </span>
                                ))}
                            </p>
                            <p className="card-text">{pizza.desc}</p>
                            <button className="btn btn-dark ms-auto my-2">Añadir&nbsp;<i className="bi bi-cart4"></i></button>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default Pizza;
