import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function OtherProfile() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

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
            <h1>Perfil de {profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Ciudad: {profile.city}</p>
            <p>Cantidad de jugadores: {profile.playerAmount}</p>
            <button onClick={handleMatch}>Solicitar Match</button>
            <button onClick={() => navigate('/home')}>Volver al inicio</button>
            <button onClick={() => navigate('/MatchHistory')}>Ver historial de partidos</button>
        </div>
    );
}

export default OtherProfile;