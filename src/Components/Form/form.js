import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../Profile/profile.css';
import {GoChevronDown} from "react-icons/go";

function Form() {
    const [goalsInFavor, setGoalsInFavor] = useState('');
    const [goalsAgainst, setGoalsAgainst] = useState('');
    const [fairPlay, setFairPlay] = useState('');
    const [comment, setComment] = useState('');
    const notification = useLocation().state.notification;
    const opponentUser = notification.fromUser;
    const currentUser = notification.toUser;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:8080/auth/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    goalsInFavor: goalsInFavor,
                    goalsAgainst: goalsAgainst,
                    fairPlay: fairPlay,
                    comment: comment,
                    fromNotificationId: notification.id
                }),
            });

            // Comprueba si los goles a favor y en contra son números enteros y mayores o iguales a cero
            if (!Number.isInteger(Number(goalsInFavor)) || Number(goalsInFavor) < 0) {
                alert('Los goles a favor deben ser un número entero positivo');
                return;
            }
            if (!Number.isInteger(Number(goalsAgainst)) || Number(goalsAgainst) < 0) {
                alert('Los goles en contra deben ser un número entero positivo');
                return;
            }

            if (response.ok) {
                console.log('Formulario enviado con éxito');
                // Limpia los campos y redirige a la página de inicio
                setGoalsInFavor('')
                setGoalsAgainst('');
                setFairPlay('');
                setComment('');
                navigate('/notifications');
            } else {
                console.error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    const handleCancel = () => {
        navigate('/notifications');
    };

    return (
        <div className="home-container">
            <h1 className="title2">Formulario</h1>
            <h3>{currentUser.name} vs {opponentUser.name}</h3>
            <form onSubmit={handleSubmit}>
                <label className="change">
                    Goles a favor:
                    <input type="number" value={goalsInFavor} onChange={(e) => setGoalsInFavor(e.target.value)}
                           required/>
                </label>
                <label className="change">
                    Goles en contra:
                    <input type="number" value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)}
                           required/>
                </label>
                <label className="change">
                    ¿Como fue tu experiencia con el rival?
                    <div className="rating">
                        <input type="radio" name="star" id="1star" onChange={() => setFairPlay("1")}/>
                        <label htmlFor="1star"></label>
                        <input type="radio" name="star" id="2star" onChange={() => setFairPlay("2")}/>
                        <label htmlFor="2star"></label>
                        <input type="radio" name="star" id="3star" onChange={() => setFairPlay("3")}/>
                        <label htmlFor="3star"></label>
                        <input type="radio" name="star" id="4star" onChange={() => setFairPlay("4")}/>
                        <label htmlFor="4star"></label>
                        <input type="radio" name="star" id="5star" onChange={() => setFairPlay("5")}/>
                        <label htmlFor="5star"></label>
                    </div>
                </label>
                <label className="change">
                    Queja acerca del rival (opcional):
                    <input type="text" name="name" onChange={(e) => setComment(e.target.value)}/>
                </label>
                <div className="profile-buttons">
                    <button type="submit">Enviar</button>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default Form;