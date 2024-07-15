import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../futmatchLogo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [ user, setUser ] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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

    async function handleGoogleLogin(googleEmail, googlePassword) {
        try {
            const res = await fetch('http://localhost:8080/auth/googleLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: googleEmail,
                    password: googlePassword }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.userExists) {
                    localStorage.setItem('token', data.token.token);
                    console.log(localStorage.getItem('token'));
                    setEmail('');
                    setPassword('');
                    navigate('/home', { replace: true });
                } else {
                    localStorage.setItem('email', googleEmail);
                    localStorage.setItem('password', googlePassword);
                    navigate('/googleRegister');                }
            } else {
                console.error('Error during Google login');
            }
        } catch (error) {
            console.error('Network error', error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        handleGoogleLogin(res.data.email, res.data.id);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home', { replace: true });
        }
    }, []);


    return (
        <>
            <ToastContainer /> {/* Aquí se incluye ToastContainer */}
            <div className="container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo"/>
                </div>
                <hr/>
                <h2>Inicio de sesión</h2>
                <hr className="first-line"/>
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
                    <hr/>
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
                    <hr/>
                    <button type="submit">Iniciar sesión</button>
                    <button onClick={() => navigate('/register')}>Registrarse</button>
                </form>
                <div className="forgot-password">
                    <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="line-with-text">
                    <hr/>
                    <span>O</span>
                    <hr/>
                </div>
                <button onClick={googleLogin} className="google-login-button">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span>Iniciar sesión con Google</span>
                </button>
            </div>
        </>
    );
}

export default Login;