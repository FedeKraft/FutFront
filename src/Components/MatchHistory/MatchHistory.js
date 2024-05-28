import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

async function getHistory() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/auth/match-history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        const history = await response.json();
        return history;
    } else {
        console.error('Error al obtener el historial de partidos');
        return [];
    }

}

function History(){
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const token = localStorage.getItem('token');
    const currentUserId = jwtDecode(token).id;

    useEffect(() => {
        getHistory().then(setHistory);
    }, []);
    return (
        <div>
            <h1>Historial</h1>
            {history.map((match) => (
                currentUserId === match.fromUser.id ? (
                    <div key={match.id} className="match-card">
                        <h2>{match.fromUser.name} ({match.fromUserForm.goalsInFavor}) - ({match.toUserForm.goalsInFavor}) {match.toUser.name}</h2>
                        <button onClick={() => navigate(`/profile/${match.toUser.id}`)}>Ver Perfil</button>
                    </div>
                ) : (
                    <div key={match.id} className="match-card">
                        <h2>{match.fromUser.name} ({match.fromUserForm.goalsInFavor}) - ({match.toUserForm.goalsInFavor}) {match.toUser.name}</h2>
                        <button onClick={() => navigate(`/profile/${match.fromUser.id}`)}>Ver Perfil</button>
                    </div>
                )
            ))}
            <button onClick={() => navigate('/home')}>Volver a la página de inicio</button>
        </div>
    )
}

export default History;