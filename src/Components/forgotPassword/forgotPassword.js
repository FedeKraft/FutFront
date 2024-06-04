import React, { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');

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
                console.log('Correo de recuperación enviado');
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
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Enviar correo de recuperación</button>
            </form>
        </div>
    );
}

export default ForgotPassword;

