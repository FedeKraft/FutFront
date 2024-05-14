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
        alert('Match aceptado');
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

async function rejectNotification(matchId, setNotifications, notifications) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/reject`, {
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
        alert('Match rechazado')
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

async function matchCanceled(notificationId, setNotifications, notifications) {
    // Encuentra el índice de la notificación que se está cancelando
    const index = notifications.findIndex(notification => notification.id === notificationId);
    if (index !== -1) {
        // Crea una copia de las notificaciones
        const newNotifications = [...notifications];
        // Elimina la notificación de la copia
        newNotifications.splice(index, 1);
        // Establece el estado de las notificaciones a la copia modificada
        setNotifications(newNotifications);
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
            {notifications.map(notification => {
                if (notification.match.status !== 'PENDING' && notification.message.includes('iniciado')) {
                    return null;
                }
                if (notification.match.status !== 'PENDING' && notification.message.includes('Informar')) {
                    return (
                        <div key={notification.id} className="notification-card">
                            <p>{notification.message}</p>
                            <button onClick={() => navigate('/form')}>Informar resultado</button>
                            <button onClick={() => matchCanceled(notification.id, setNotifications, notifications)}>Partido cancelado</button>
                        </div>
                    )
                }
                return (
                    <div key={notification.id} className="notification-card">
                        {notification.match.status === 'PENDING' ? (
                            <>
                                <p>{notification.message}</p>
                                <button onClick={() => acceptNotification(notification.match.id, setNotifications, notifications)}>Aceptar</button>
                                <button onClick={() => rejectNotification(notification.match.id, setNotifications, notifications)}>Rechazar</button>
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