import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import './../Home/home.css';

function CongratsPage() {
    const notification = useLocation().state.notification;
    const opponentUser = notification.fromUser;
    const currentUser = notification.toUser;
    const navigate = useNavigate();

    return (
        <div>
            <h1>¡¡Felicidades, es un match!!</h1>
            <h1>{currentUser.name} vs {opponentUser.name}</h1>
            <h3>Contacta al número:</h3>
            <p>{opponentUser.number}</p>
            <button onClick={() => navigate('/notifications')}>Volver a Notificaciones</button>
        </div>
    );
}

export default CongratsPage;