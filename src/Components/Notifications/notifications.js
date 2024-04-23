import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function getNotifications() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/notifications', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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

async function acceptNotification(notificationId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/${notificationId}/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        const match = await response.json();
        const message = `La solicitud ha sido aceptada. El número de teléfono es ${match.phoneNumber}.`;
        const notificationResponse = await fetch('http://localhost:8080/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: match.userId,
                message: message
            })
        });
        if (!notificationResponse.ok) {
            console.error('Error al enviar la notificación');
        }
    } else {
        console.error('Error al aceptar la notificación');
    }
}

async function rejectNotification(notificationId) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/${notificationId}/reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        const match = await response.json();
        const message = `La solicitud ha sido rechazada.`;
        const notificationResponse = await fetch('http://localhost:8080/api/notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                userId: match.userId,
                message: message
            })
        });
        if (!notificationResponse.ok) {
            console.error('Error al enviar la notificación');
        }
    } else {
        console.error('Error al rechazar la notificación');
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
                    <button onClick={() => acceptNotification(notification.id)}>Aceptar</button>
                    <button onClick={() => rejectNotification(notification.id)}>Rechazar</button>
                </div>
            ))}
            <button onClick={() => navigate('/home')}>Volver a la página de inicio</button>
        </div>
    );
}

export default Notifications;