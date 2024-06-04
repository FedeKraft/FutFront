import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Incidents() {
    const { id } = useParams();
    const [incidents, setIncidents] = useState([]);

    const fetchIncidents = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/auth/users/${id}/incidents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        if (response.ok) {
            const incidentsData = await response.json();
            setIncidents(incidentsData);
        } else {
            console.error('Error al obtener los incidentes');
        }
    };

    useEffect(() => {
        fetchIncidents();
    }, [id]);

    return (
        <div>
            <h1>Incidentes</h1>
            {incidents.map((incident, index) => (
                <p key={index}>{incident}</p>
            ))}
        </div>
    );
}

export default Incidents;