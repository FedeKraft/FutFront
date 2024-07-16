import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './../Profile/profile.css';
import {MdOutlineKeyboardBackspace} from "react-icons/md";


function Incidents() {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const [forms, setForms] = useState([]);

    const fetchForm = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/auth/users/${id}/incidents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        if (response.ok) {
            const formsData = await response.json();
            setForms(formsData);
        } else {
            console.error('Error al obtener los incidentes');
        }
    };

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    useEffect(() => {
        fetchForm();
    }, [id]);

    return (
        <div className="home-container">
            <button className="back-button" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={30}/>
            </button>
            <h1 className="title">Incidentes</h1>
            {forms.length === 0 || forms.every(form => form.comment === '' || form.comment === null) ? (
                <p className="no-incidents">No hay incidentes.</p>
            ) : (
                forms.map((form) => (
                    form.comment !== '' ? (
                        <div className="incidents">
                            <h3>{form.user.name}</h3>
                            <p>{form.comment}</p>
                        </div>
                    ) : null
                ))
            )}
        </div>
    );
}

export default Incidents;