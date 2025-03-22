import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import defaultAvatar from '../assets/img/cat-avatar.jpg';
import "../assets/css/profile.css";

const Profile = () => {
    const { getProfile, logout } = useContext(UserContext);
    const [profile, setProfile] = useState(null);
    const [avatar, setAvatar] = useState(null); // Estado para manejar la imagen del avatar
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userProfile = await getProfile(); // Llama a getProfile y espera la respuesta
                setProfile(userProfile); // Actualiza el estado con la información del perfil
                // Aquí puedes establecer el avatar si está disponible en userProfile
                setAvatar(userProfile.avatar); // Asegúrate de que userProfile tenga la propiedad avatar
            } catch (error) {
                console.error('Error al cargar el perfil:', error);
            }
        };

        fetchProfile(); // Llama a la función para obtener el perfil
    }, [getProfile]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="container" id="container">
            <h1>Perfil</h1>
            {profile ? (
                <div>
                    <img id="avatar" src={avatar || defaultAvatar} alt="Avatar" /> {/* Mostrar el avatar */}
                    <p>Email: {profile.email}</p>
                    <button className="btn btn-danger" id="logoutButton" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <p>Cargando perfil ...</p>
            )}
        </div>
    );
};

export default Profile;