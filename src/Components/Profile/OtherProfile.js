import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import './profile.css';
import {FaStar, FaTrophy} from "react-icons/fa";


function OtherProfile() {
    const {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(null);

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/auth/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            if (response.ok) {
                const profileData = await response.json();
                setProfile(profileData);
            } else {
                console.error('Error al obtener el perfil');
            }
        };
        fetchProfile();
    }, [id]);

    const handleMatch = async () => {
        const token = localStorage.getItem('token');
        const currentUserId = jwtDecode(token).id;

        const response = await fetch(`http://localhost:8080/auth/match`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                fromUserId: currentUserId,
                toUserId: id
            })
        });
        if (response.ok) {
            alert('Match solicitado');
        } else {
            alert('Ya has solicitado un match con este usuario y está pendiente de respuesta.');
        }
    };

    if (!profile) {
        return <div>No existe el perfil.</div>;
    }

    return (
        <div className="container">
            <div className="profile-header">
                <button className="back-button2" onClick={handleBack}>
                    <MdOutlineKeyboardBackspace size={24}/>
                </button>
                <h1 className="title">Perfil de {profile.name}</h1>
            </div>
            <div>
                <p className="kk">Localidad: {profile.city}</p>
                <p className="kk">Cantidad de jugadores: {profile.playerAmount}</p>
                <div className="elo">
                    <p className="kk"><FaTrophy/> {profile.elo}</p>
                </div>
                <div className="stars">
                    <span className="kk">Fairplay:</span>
                    <div className="star-container">
                        {[...Array(5)].map((_, i) => i < Number(profile.stars) ?
                            <FaStar key={i} color="#FFD700" size={20}/> :
                            <FaStar key={i} color="#D3D3D3" size={20}/> // color gris para estrellas vacías
                        )}
                    </div>
                </div>
                
            <br/>
                <div className="button-container">
                    <button className="incidentes" onClick={() => navigate(`/incidents/${id}`)}>Ver incidentes de este usuario</button>
                    <button className="solicitar-match" onClick={handleMatch}>Solicitar Match</button>
                    <button className="historial" onClick={() => navigate('/MatchHistory')}>Ver historial de partidos</button>
                </div>
        </div>
</div>
)
    ;
}

export default OtherProfile;