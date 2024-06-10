import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {MdOutlineKeyboardBackspace} from "react-icons/md";

function Notifications() {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const location = useLocation();

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

    async function acceptNotification(notification) {
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
            navigate('/congratsPage', {state: {notification}})
        } else {
            console.error('Error al aceptar el match');
        }
    }

    async function rejectNotification(notification) {
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

    async function matchCanceled(notification) {
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
                                <button onClick={() => matchCanceled(notification)}>Partido
                                    cancelado
                                </button>
                            </div>
                        )
                    } else return (
                        <div key={notification.id} className="notification-card">
                            {notification.match.status === 'PENDING' ? (
                                <>
                                    <p>{notification.message}</p>
                                    <button
                                        onClick={() => acceptNotification(notification)}>Aceptar
                                    </button>
                                    <button
                                        onClick={() => rejectNotification(notification)}>Rechazar
                                    </button>
                                </>
                            ) : (
                                <p>{notification.message}</p>
                            )}
                        </div>
                    )
                }
            })}
            <button onClick={() => navigate('/home')}>
                <MdOutlineKeyboardBackspace size={24}/>
            </button>
        </div>
    )
}

export default Notifications;