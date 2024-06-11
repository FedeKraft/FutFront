import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../Home/home.css';


function Incidents() {
    const { id } = useParams();
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

    useEffect(() => {
        fetchForm();
    }, [id]);

    return (
        <div>
            <h1>Incidentes</h1>
            {forms.map((form, index) => (
                <div key={index}>
                    <h3>{form.user.name}</h3>
                    <p>{form.comment}</p>
                </div>))}
        </div>
    );
}

export default Incidents;