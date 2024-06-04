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
        <div>
            <h1 className={"title"}>Perfil de {profile.name}</h1>
            <p className={"kk"}>Email: {profile.email}</p>
            <p className={"kk"}>Ciudad: {profile.city}</p>
            <p className={"kk"}>Cantidad de jugadores: {profile.playerAmount}</p>
            <div className="elo">
                <p className={"kk"}><FaTrophy/> {profile.elo}</p>
            </div>
            <div className="stars">
                <p className={"kk"}>Fairplay: </p>{[...Array(Number(profile.stars))].map((_, i) =>
                <FaStar key={i} color="yellow"/>)}
            </div>
            <br/>
            <button onClick={() => navigate(`/incidents/${id}`)}>Ver incidentes de este usuario</button>
            <button onClick={handleMatch}>Solicitar Match</button>
            <button onClick={() => navigate('/MatchHistory')}>Ver historial de partidos</button>
            <button onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={24}/>
            </button>
        </div>
    );
}

export default OtherProfile;