import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import logo from '../../futmatchLogo.png';
import { GoChevronDown } from "react-icons/go";
import {toast} from "react-toastify";


function GoogleRegister() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [playerAmount, setPlayerAmount] = useState('');
    const [number, setNumber] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, city, playerAmount, number}),
            });
            if (response.ok) {
                console.log('Usuario registrado con éxito');
                toast.success('Registro exitoso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { width: 'auto', maxWidth: '600px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px' }
                });
                setName('');
                setCity('');
                setPlayerAmount('');
                setNumber('');
                localStorage.clear();
                navigate('/login');
            } else {
                console.error('Error al registrarse');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home', { replace: true });
        }
    }, []);


    return (
        <div className="container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <hr/>
            <h2>Registro de usuario</h2>
            <hr className="first-line"/>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Nombre de Equipo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="number"
                        placeholder="Número de teléfono"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <select
                        className="dropdown"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una localidad</option>
                        <option value="Almirante Brown">Almirante Brown</option>
                        <option value="Avellaneda">Avellaneda</option>
                        <option value="Berazategui">Berazategui</option>
                        <option value="Berisso">Berisso</option>
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Cañuelas">Cañuelas</option>
                        <option value="Ensenada">Ensenada</option>
                        <option value="Escobar">Escobar</option>
                        <option value="Ezeiza">Ezeiza</option>
                        <option value="Esteban Echeverría">Esteban Echeverría</option>
                        <option value="Florencio Varela">Florencio Varela</option>
                        <option value="General Las Heras">General Las Heras</option>
                        <option value="General Rodríguez">General Rodríguez</option>
                        <option value="General San Martín">General San Martín</option>
                        <option value="Hurlingham">Hurlingham</option>
                        <option value="Ituzaingó">Ituzaingó</option>
                        <option value="José C. Paz">José C. Paz</option>
                        <option value="La Matanza">La Matanza</option>
                        <option value="La Plata">La Plata</option>
                        <option value="Lanús">Lanús</option>
                        <option value="Lomas de Zamora">Lomas de Zamora</option>
                        <option value="Luján">Luján</option>
                        <option value="Malvinas Argentinas">Malvinas Argentinas</option>
                        <option value="Marcos Paz">Marcos Paz</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Merlo">Merlo</option>
                        <option value="Moreno">Moreno</option>
                        <option value="Morón">Morón</option>
                        <option value="Navarro">Navarro</option>
                        <option value="Pilar">Pilar</option>
                        <option value="Presidente Perón">Presidente Perón</option>
                        <option value="Quilmes">Quilmes</option>
                        <option value="San Andrés de Giles">San Andrés de Giles</option>
                        <option value="San Antonio de Areco">San Antonio de Areco</option>
                        <option value="San Fernando">San Fernando</option>
                        <option value="San Isidro">San Isidro</option>
                        <option value="San Martín">San Martín</option>
                        <option value="San Miguel">San Miguel</option>
                        <option value="San Miguel del Monte">San Miguel del Monte</option>
                        <option value="San Vicente">San Vicente</option>
                        <option value="Tigre">Tigre</option>
                        <option value="Tres de Febrero">Tres de Febrero</option>
                        <option value="Vicente López">Vicente López</option>
                        <option value="Zárate">Zárate</option>
                    </select>
                    <GoChevronDown className={"dropdown-icon"}/>
                </div>
                <div className="input-container">
                    <select
                        className="dropdown"
                        value={playerAmount}
                        onChange={(e) => setPlayerAmount(e.target.value)}
                        required
                    >
                        <option value="">Cantidad de jugadores</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="11">11</option>
                    </select>
                    <GoChevronDown className={"dropdown-icon"}/>
                </div>
                <button className="register-button" type="submit">Registrarse</button>
            </form>
            <button className="return-button" onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>Volver
            </button>
        </div>
    );
}

export default GoogleRegister;
