import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './../Home/home.css';


function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/auth/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });
            if (response.ok) {
                alert('Contraseña restablecida con éxito');
                navigate('/login');
            } else {
                alert('Error al restablecer la contraseña');
            }
        } catch (error) {
            alert('Error de red', error);
        }
    };

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            <h2>Escriba su nueva contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <h2>Confirme su nueva contraseña</h2>
                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Restablecer contraseña</button>
                <button onClick={() => navigate('/forgotPassword')} className="volver">Volver</button>
            </form>
        </div>
    );
}

export default ResetPassword;