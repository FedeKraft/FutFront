import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Home/home.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                alert('Correo de recuperación enviado');
            } else {
                console.error('Error al enviar el correo de recuperación');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    return (
        <div>
            <h1>Recupera tu contraseña</h1>
            <h2>Introduce tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
                <button onClick={() => navigate('/login')} className="volver">Volver</button>
            </form>
        </div>
    );
}

export default ForgotPassword;

