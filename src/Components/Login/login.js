import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../futmatchLogo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Verificar si las credenciales ingresadas corresponden a un administrador
            if (email === 'admin@admin.com' && password === 'admin') {
                navigate('/adminHome');
                return;
            }

            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                console.log('Inicio de sesión exitoso');
                const res = await response.json();
                localStorage.setItem('token', res.token);
                setEmail('');
                setPassword('');
                navigate('/home');
                navigate('/home', { replace: true });
            } else {
                toast.error('Credenciales invalidas', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {width: 'auto', maxWidth: '800px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px'}
                });
                console.error('Credenciales inválidas');
                setEmail('');
                setPassword('');
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
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <hr />
                <h2>Inicio de sesión</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <hr />
                    <div className="input-container">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="show-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </span>
                    </div>
                    <hr />
                    <button type="submit">Iniciar sesión</button>
                    <button onClick={() => navigate('/register')} className="register-button">Registrarse</button>
                </form>
                <hr />
                <div className="forgot-password">
                    <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </>
    );
}

export default Login;