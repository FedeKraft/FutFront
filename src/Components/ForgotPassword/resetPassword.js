import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './../Login/login.css';
import {toast, ToastContainer} from "react-toastify";
import logo from "../../futmatchLogo.png";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {width: 'auto', maxWidth: '800px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px'}
            });
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
                toast.success('Contraseña restablecida con éxito', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {width: 'auto', maxWidth: '800px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px'}
                });
                navigate('/login');
            } else {
                toast.error('Error al restablecer la contraseña', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {width: 'auto', maxWidth: '800px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px'}
                });
            }
        } catch (error) {
            console.error('Network error', error);
        }
    };


    return (
        <>
            <ToastContainer /> {/* Aquí se incluye ToastContainer */}
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
                <hr/>
                <h2>Restablecer contraseña</h2>
                <hr className="first-line"/>
                <p className="text">Escriba su nueva contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Confirmar nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="register-button" type="submit">Restablecer contraseña</button>
                </form>
                <button className="return-button" onClick={() => navigate('/forgotPassword')}>Volver</button>
            </div>
        </>
    );
}

export default ResetPassword;