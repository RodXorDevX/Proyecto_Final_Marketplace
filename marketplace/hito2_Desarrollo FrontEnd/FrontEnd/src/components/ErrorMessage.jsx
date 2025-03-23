import React from "react";
import "../assets/css/errormessage.css";

const ErrorMessage = ({ error, onRetry }) => {
    return (
        <div className="errorContainer">
            <h2 className="errorTitle">Problema al cargar API</h2>
            <p className="errorMessage">Error: {error}</p>
            <button onClick={onRetry} className="retryButton">
                Reintentar
            </button>
        </div>
    );
};
  
export default ErrorMessage;