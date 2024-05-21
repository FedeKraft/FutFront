import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                body: JSON.stringify({ name, email, password, city, playerAmount, number}),
            });
            if (response.ok) {
                console.log('Usuario autenticado con éxito');
                // Limpia los campos y redirige a la página de inicio de sesión
                setName('')
                setEmail('');
                setPassword('');
                setCity('')
                setPlayerAmount('')
                setNumber('')
                navigate('/login');
            } else {
                console.error('Error al Registrarse');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    return (
        <div>
            <h2>Registro de usuario:</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Equipo:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required

                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Número de teléfono:</label>
                    <input
                        type="number"
                        placeholder={"(+54)"}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Localidad:</label>
                    <select
                        className="dropdown"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una opción</option>
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
                </div>
                <div>
                    <label>Cantidad de jugadores:</label>
                    <select
                        className="dropdown"
                        value={playerAmount}
                        onChange={(e) => setPlayerAmount(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="11">11</option>
                    </select>
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <button onClick={() => navigate('/login')}>Volver</button>
        </div>
    )
}

export default Register;