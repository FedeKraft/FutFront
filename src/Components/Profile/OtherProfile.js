import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function OtherProfile() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [notifications, setNotifications] = useState([]);

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

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/notifications`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            if (response.ok) {
                const notificationsData = await response.json();
                setNotifications(notificationsData);
            } else {
                console.error('Error al obtener las notificaciones');
            }
        };
        fetchNotifications();
    }, []);

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
                user1Id: currentUserId,
                user2Id: id
            })
        });
        if (response.ok) {
            alert('Match solicitado');
        } else {
            alert('Ya has solicitado un match con este usuario y está pendiente de respuesta.');
        }
    };

    if (!profile) {
        return <div>Cargando perfil...</div>;
    }

    return (
        <div>
            <h1>Perfil de {profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Ciudad: {profile.city}</p>
            <p>Cantidad de jugadores: {profile.playerAmount}</p>
            <p>Número: {profile.number}</p>
            <button onClick={handleMatch}>Solicitar Match</button>
            <button onClick={() => navigate('/home')}>Volver al inicio</button>
        </div>
    );
}

export default OtherProfile;