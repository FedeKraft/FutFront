import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './congrats.css';
import {MdOutlineKeyboardBackspace} from "react-icons/md"; // Asegúrate de que el path al CSS esté correcto

function CongratsPage() {
    const notification = useLocation().state.notification;
    const opponentUser = notification.fromUser;
    const currentUser = notification.toUser;
    const navigate = useNavigate();

    return (
        <div className="congrats-container">
            <button onClick={() => navigate('/home')}>
                <MdOutlineKeyboardBackspace size={24}/>
            </button>
            <h1 className="congrats-header">¡¡Felicidades, es un match!!</h1>
            <h1 className="match-details">{currentUser.name} vs {opponentUser.name}</h1>
            <h3 className="contact-info">Contacta al número:</h3>
            <p className="contact-number">{opponentUser.number}</p>
        </div>
    );
}

export default CongratsPage;
