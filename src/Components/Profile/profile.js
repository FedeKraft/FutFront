import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import './profile.css';
import { FaTrophy, FaStar } from "react-icons/fa";



function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        city: '',
        playerAmount: '',
        number: '',
        userStatus: '',
        elo: '',
        stars: ''
    });
        const location = useLocation();
        const handleBack = () => {
            // Evita volver si ya estás en la página de inicio
            if (location.pathname !== '/home') {
                navigate(-1);
            }
        }
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Borra el token del almacenamiento local
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    const toggleActiveStatus = async () => { // Función para cambiar el estado de activo a inactivo y viceversa
        const newStatus = profile.userStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        try {
            const response = await fetch(`http://localhost:8080/auth/users/toggle-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            if (response.ok) {
                // Actualiza el estado del perfil en el almacenamiento local
                const updatedProfile = { ...profile, userStatus: newStatus };
                setProfile(updatedProfile);
                localStorage.setItem('profile', JSON.stringify(updatedProfile));
            } else {
                throw new Error('Error al cambiar el estado del usuario');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/auth/profile', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data);
                        localStorage.setItem('profile', JSON.stringify(data));
                    } else {
                        console.error('Error al obtener el perfil');
                    }
                } catch (error) {
                    console.error('Error de red', error);
                }
            };
            fetchData();
    }, [token]);

    return (
        <div>
            <h1 className={"title"}>Perfil</h1>
            <div>
                <p className={"kk"}>Nombre de equipo: {profile.name}</p>
                <p className={"kk"}>Correo electrónico: {profile.email}</p>
                <p className={"kk"}> Localidad: {profile.city}</p>
                <p className={"kk"}>Cantidad de jugadores: {profile.playerAmount}</p>
                <p className={"kk"}>Número de teléfono: {profile.number}</p>
                <div className="elo">
                    <p className={"kk"}><FaTrophy/> {profile.elo}</p>
                </div>
                <div className="stars">
                    <p className={"kk"}>Fairplay: </p>{[...Array(Number(profile.stars))].map((_, i) =>
                    <FaStar key={i} color="yellow"/>)}
                </div>
                <br/>
                <button onClick={() => navigate('/EditProfile')}>Editar</button>
                <button onClick={toggleActiveStatus}>{profile.userStatus === 'ACTIVE' ? 'Activo' : 'Desactivo'}</button>
            </div>
            <button onClick={handleLogout}>Cerrar sesión</button>
            <button onClick={handleBack}>
            <MdOutlineKeyboardBackspace size={24}/>
            </button>
        </div>
    );
}

export default Profile;