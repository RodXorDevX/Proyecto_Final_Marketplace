import React from "react";
import "../assets/css/loadingspinner.css";

const LoadingSpinner = () => {
    return (
        <div className="spinnerContainer">
            <div className="spinner"></div>
            <p className="loadingText">Obteniendo Lista de Pizzas ...</p>
        </div>
    );
};

export default LoadingSpinner;