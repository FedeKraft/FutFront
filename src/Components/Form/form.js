import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
        <div>
            <h1>Formulario</h1>
            <h2>{currentUser.name} vs {opponentUser.name}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Goles a favor:
                    <input type="number" value={goalsInFavor} onChange={(e) => setGoalsInFavor(e.target.value)} required />
                </label>
                <label>
                    Goles en contra:
                    <input type="number" value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)} required />
                </label>
                <label>
                    ¿Como fue tu experiencia con el equipo rival?
                    <select value={fairPlay} onChange={(e) => setFairPlay(e.target.value)} required>
                        <option value="">Selecciona una opción</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>
                    Comentario (opcional):
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
                </label>
                <button type="submit">Enviar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
}

export default Form;