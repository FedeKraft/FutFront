import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [goalsFor, setGoalsFor] = useState('');
    const [goalsAgainst, setGoalsAgainst] = useState('');
    const [punctuality, setPunctuality] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        // Por ejemplo, puedes hacer una solicitud a tu API para guardar los datos del formulario
        navigate('/home');
    };

    const handleCancel = () => {
        navigate('/notifications');
    };

    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Goles a favor:
                    <input type="number" value={goalsFor} onChange={(e) => setGoalsFor(e.target.value)} required />
                </label>
                <label>
                    Goles en contra:
                    <input type="number" value={goalsAgainst} onChange={(e) => setGoalsAgainst(e.target.value)} required />
                </label>
                <label>
                    Puntualidad:
                    <input type="number" value={punctuality} onChange={(e) => setPunctuality(e.target.value)} required />
                </label>
                <label>
                    Comentario (opcional):
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </label>
                <button type="submit">Enviar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </form>
        </div>
    );
}

export default Form;