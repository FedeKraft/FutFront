import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../Login/login.css';
import {toast, ToastContainer} from "react-toastify";
import logo from "../../futmatchLogo.png";

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
                toast.success('Correo de recuperación enviado', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {width: 'auto', maxWidth: '800px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px'}
                });
                setEmail('');
            } else {
                toast.error('Correo electrónico inválido', {
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
            console.error('Error de red', error);
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
                <h2>Recupera tu contraseña</h2>
                <hr className="first-line"/>
                <p className="text">Introduce tu correo electrónico y te enviaremos las instrucciones para restablecer
                    tu contraseña.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="register-button" type="submit">Enviar</button>
                </form>
                <button className="return-button" onClick={() => navigate('/login')}>Volver</button>
            </div>
        </>
    );
}

export default ForgotPassword;

