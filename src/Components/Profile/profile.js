import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        city: '',
        playerAmount: '',
        number: ''
    });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Borra el token del almacenamiento local
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/profile', {
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                localStorage.setItem('profile', JSON.stringify(data));
            } else {
                console.error('Error al obtener el perfil');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };
    fetchData();
}, [token]);

return (
    <div>
        <h1>Perfil</h1>
        <div>
            <p>Nombre de equipo: {profile.name}</p>
            <p>Correo electrónico: {profile.email}</p>
            <p>Localidad: {profile.city}</p>
            <p>Cantidad de jugadores: {profile.playerAmount}</p>
            <p>Número de teléfono: {profile.number}</p>
            <button onClick={() => navigate('/EditProfile')}>editar</button>
        </div>
        <button onClick={handleLogout}>Cerrar sesión</button>
        <button onClick={() => navigate('/home')}>Volver al inicio</button>
    </div>
);
}

export default Profile;