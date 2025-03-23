import React from "react";
import '../assets/css/header.css'

const Header = () =>(
    <header className="d-flex flex-column justify-content-center aligh-items-center" id="FondoHeader">
        <h1 className="text-light text-center">¡Pizzería Mamma Mia!</h1>
        <p className="text-light text-center">
            Tenemos las mejores pizzas que podrás encontrar
        </p>
        <div className="container">
            <hr className="custom-hr"/>
        </div>
    </header>
);

export default Header;