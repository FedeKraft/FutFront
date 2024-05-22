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

async function acceptNotification(notification, setNotifications, notifications) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            matchId: notification.match.id
        })
    });
    if (response.ok) {
        alert('Match aceptado');
        // Crea un arreglo con las notificaciones que no sean la notificación aceptada
        const newNotifications = notifications.filter(n => n.id !== notification.id);
        setNotifications(newNotifications);
    } else {
        console.error('Error al aceptar el match');
    }
}

async function rejectNotification(notification, setNotifications, notifications) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/matches/reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            matchId: notification.match.id
        })
    });
    if (response.ok) {
        alert('Match rechazado')
        // Crea un arreglo con las notificaciones que no sean la notificación aceptada
        const newNotifications = notifications.filter(n => n.id !== notification.id);
        setNotifications(newNotifications);
    } else {
        console.error('Error al aceptar el match');
    }
}

async function matchCanceled(notification, setNotifications) {
    const token = localStorage.getItem('token');
    const userConfirmation = window.confirm('¿Estás seguro de que quieres reportar el match como cancelado?');
    if (userConfirmation) {
        const response = await fetch(`http://localhost:8080/api/notifications/responded`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                notificationId: notification.id
            })
        });
        if (response.ok) {
            // Vuelve a obtener las notificaciones
            getNotifications().then(notifications => {
                setNotifications(notifications);
            });
        } else {
            console.error('Error al cancelar el partido');
        }
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
                if (notification.responded === false) {
                    if (notification.match.status !== 'PENDING' && notification.message.includes('iniciado')) {
                        return null;
                    }
                    if (notification.match.status !== 'PENDING' && notification.message.includes('Informar')) {
                        return (
                            <div key={notification.id} className="notification-card">
                                <p>{notification.message}</p>
                                <button onClick={async () => {
                                    navigate('/form', {state: {notification}});
                                }}>Informar resultado
                                </button>
                                <button onClick={() => matchCanceled(notification, setNotifications)}>Partido cancelado</button>
                            </div>
                        )
                    }
                    else return (
                        <div key={notification.id} className="notification-card">
                            {notification.match.status === 'PENDING' ? (
                                <>
                                    <p>{notification.message}</p>
                                    <button onClick={() => acceptNotification(notification, setNotifications, notifications)}>Aceptar</button>
                                    <button onClick={() => rejectNotification(notification, setNotifications, notifications)}>Rechazar</button>
                                </>
                            ) : (
                                <p>{notification.message}</p>
                            )}
                        </div>
                    )
                }
            })}
            <button onClick={() => navigate('/home')}>Volver a la página de inicio</button>
        </div>
    )
}

export default Notifications;