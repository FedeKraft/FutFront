import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function HomePage() {
    const navigate = useNavigate(); // Crea una instancia de navigate

    return (
        <div>
            <h1>Bienvenido a la página de inicio</h1>
            <p>Esta es la página de inicio de nuestra aplicación.</p>
            <button onClick={() => navigate('/profile')}>Ver perfil</button> {/* Agrega el botón que redirige a la página de perfil */}
        </div>
    );
}

export default HomePage;