import React, { useState } from 'react';

// Define el componente de inicio de sesión
function Login() {
    // Define los estados para almacenar el correo electrónico y la contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí debes enviar el correo electrónico y la contraseña al backend para autenticación
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                // Manejar la respuesta exitosa (por ejemplo, redirigir al usuario a una página de inicio)
                console.log('Usuario autenticado con éxito');
                // Limpia los campos de correo electrónico y contraseña
                setEmail('');
                setPassword('');
                // Redirige a otra página (por ejemplo, App.js)
            } else {
                // Manejar errores de autenticación (por ejemplo, mostrar un mensaje de error)
                console.error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
