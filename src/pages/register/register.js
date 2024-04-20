import React, { useState } from 'react';

function Register() {
    // Define los estados para almacenar el correo electrónico y la contraseña
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [playerAmount, setPlayerAmount] = useState('');
    const [numero, setNumero] = useState('');


    // Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, localidad, playerAmount, numero }),
            });
            if (response.ok) {
                // Manejar la respuesta exitosa (por ejemplo, redirigir al usuario a una página de inicio)
                console.log('Usuario autenticado con éxito');
                // Limpia los campos de correo electrónico y contraseña
                setName('')
                setEmail('');
                setPassword('');
                setLocalidad('')
                setPlayerAmount('')
                setNumero('')
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
                    <label>Numero de telefono:</label>
                    <input
                        type="number"
                        placeholder={"(+54)"}
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Localidad:</label>
                    <select
                        className="dropdown"
                        value={localidad}
                        onChange={(e) => setLocalidad(e.target.value)}
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
                    <label>Numero de jugadores:</label>
                    <select
                        className="dropdown"
                        value={playerAmount}
                        onChange={(e) => setPlayerAmount(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="11">11</option>
                    </select>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
        ;
}

export default Register;