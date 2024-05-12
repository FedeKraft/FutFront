import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

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
        return await response.json();
    } else {
        console.error('Error al obtener las notificaciones');
        return [];
    }
}

async function acceptNotification(matchId, setNotifications, notifications) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            matchId: matchId
        })
    });
    if (response.ok) {
        // Encuentra el índice de la notificación que se está aceptando
        const index = notifications.findIndex(notification => notification.match.id === matchId);
        if (index !== -1) {
            // Crea una copia de las notificaciones
            const newNotifications = [...notifications];
            // Elimina la notificación de la copia
            newNotifications.splice(index, 1);
            // Establece el estado de las notificaciones a la copia modificada
            setNotifications(newNotifications);
        }
    } else {
        console.error('Error al aceptar el match');
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
        getNotifications().then(notifications => {
            setNotifications(notifications);
        });
    }, []);

    return (
        <div>
            <h1>Notificaciones</h1>
            {notifications.map((notification) => {
                return (
                    <div key={notification.id} className="notification-card">
                        {notification.match.status === 'PENDING' ? (
                            <>
                                <p>{notification.message}</p>
                                <button onClick={() => acceptNotification(notification.match.id, setNotifications, notifications)}>Aceptar</button>
                                <button onClick={() => rejectNotification(notification.id)}>Rechazar</button>
                            </>
                        ) : (
                            <p>{notification.message}</p>
                        )}
                    </div>
                );
            })}
            <button onClick={() => navigate('/home')}>Volver a la página de inicio</button>
        </div>
    );
}

export default Notifications;