import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import './../Profile/profile.css';

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

function getOpponentId(match) {
    const token = localStorage.getItem('token');
    const currentUserId = jwtDecode(token).id;

    if (match.fromUser.id === currentUserId) {
        return match.toUser.id;
    }
    else {
        return match.fromUser.id;
    }
}

function History(){
    const navigate = useNavigate();
    const location = useLocation();
    const [history, setHistory] = useState([]);

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    useEffect(() => {
        getHistory().then(setHistory);
    }, []);
    return (
        <div className="container">
            <button className="back-button2" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={24}/>
            </button>
            <h1 className="title">Historial de Partidos</h1>
            {history.map((match) => (
                <button key={match.id} className="match-container" onClick={() => navigate(`/profile/${getOpponentId(match)}`)}>
                    {match.fromUser.name} ({match.fromUserForm.goalsInFavor}) -
                    ({match.toUserForm.goalsInFavor}) {match.toUser.name}
                </button>
            ))}
        </div>
    );
}

export default History;