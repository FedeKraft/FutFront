import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function getTeams() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/auth/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
    match
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        const teams = await response.json();
        return teams;
    } else {
        console.error('Error al obtener los equipos');
        return [];
    }
}

function HomePage() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTeams().then(setTeams);
    }, []);

    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página de inicio de nuestra aplicación.</p>
            {teams.map((team) => (
                <div key={team.id} className="team-card">
                    <h2>{team.name}</h2>
                    <p>{team.city}</p>
                    <p>{team.playerAmount}</p>
                    <button onClick={() => navigate(`/profile/${team.id}`)}>Ver Perfil</button>
                </div>
            ))}
            <button onClick={() => navigate('/profile')}>Ver perfil</button>
            <button onClick={() => navigate('/notifications')}>Notificaciones</button>

        </div>
    );
}

export default HomePage;