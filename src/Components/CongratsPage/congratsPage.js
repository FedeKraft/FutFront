import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './congrats.css';
import {MdOutlineKeyboardBackspace} from "react-icons/md";

function CongratsPage() {
    const notification = useLocation().state.notification;
    const opponentUser = notification.fromUser;
    const currentUser = notification.toUser;
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="title" style={{fontFamily: "Dancing Script, cursive", fontSize: "4rem", marginTop: "0"}}>¡¡Es un Match!!</h1>
            <div className="congrats-container">
                <h1 className="match-details">{currentUser.name} <br/> vs <br/> {opponentUser.name}</h1>
                <h3 className="contact-info">Contacta al número:</h3>
                <h2 className="contact-number">{opponentUser.number}</h2>
            </div>
            <button className="profile-buttons" onClick={() => navigate('/home')}>Continuar</button>
        </div>
    );
}

export default CongratsPage;
