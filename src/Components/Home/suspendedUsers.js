import React, {useEffect, useState} from 'react';
import './home.css';
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";
function SuspendedUsers() {
    const navigate = useNavigate();
    const location = useLocation();
    const [suspended, setSuspended] = useState([]);

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    async function getSuspended() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/auth/suspended', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error al obtener los equipos');
            return [];
        }
    }

    async function activateTeam(id) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/auth/activate/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.ok) {
            const updatedSuspended = await getSuspended();
            setSuspended(updatedSuspended);
        } else {
            console.error('Error al activar el equipo');
        }
    }

    useEffect(() => {
        getSuspended().then(setSuspended);
    }, []);

    return (
        <div className="home-container">
            <button className="back-button" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={30}/>
            </button>
            <h1 className="title">Equipos suspendidos</h1>
            {suspended.length === 0 ? (
                <p className="no-incidents">No hay incidentes.</p>
            ) : (
                suspended.map((sus) => (
                    <div className="incidents">
                        <h3>{sus.name}</h3>
                        <button onClick={() => activateTeam(sus.id)}>Reactivar</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default SuspendedUsers;