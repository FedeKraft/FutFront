import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function getNotifications() {
    const response = await fetch('http://localhost:8080/api/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const notifications = await response.json();
        return notifications;
    } else {
        console.error('Error al obtener las notificaciones');
        return [];
    }
}

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        getNotifications().then(setNotifications);
    }, []);

    return (
        <div>
            <h1>Notificaciones</h1>
            {notifications.map((notification) => (
                <div key={notification.id} className="notification-card">
                    <p>{notification.message}</p>
                    {/* Agrega aquí más detalles de la notificación según sea necesario */}
                </div>
            ))}
            <button onClick={() => navigate('/home')}>Volver a la página de inicio</button>
        </div>
    );
}

export default Notifications;