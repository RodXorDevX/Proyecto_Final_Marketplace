import React from "react";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { PizzaProvider } from './context/PizzaContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Footer from "./components/Footer";
import "./assets/css/App.css";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';




   function App() {

   const [totalGlobal, setTotal] = useState(0);

   return (
    <UserProvider>
        <PizzaProvider>
            <CartProvider>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Rutas protegidas para usuarios NO autenticados */}
                        <Route 
                            path="/register" 
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            } 
                        />
                        <Route 
                            path="/login" 
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            } 
                        />
                        
                        {/* Rutas protegidas para usuarios autenticados */}
                        <Route 
                            path="/profile" 
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/pizza/:id" Component={Pizza} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                    <Footer />
                </Router>
           </CartProvider>  
        </PizzaProvider>
    </UserProvider>
  );
}

export default App;
