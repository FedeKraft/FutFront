import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import './profile.css';
import { FaTrophy, FaStar } from "react-icons/fa";

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        city: '',
        playerAmount: '',
        number: '',
        status: '',
        elo: '',
        stars: ''
    });

    const location = useLocation();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleBack = () => {
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    const toggleActiveStatus = async () => {
        const newStatus = profile.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

        try {
            const response = await fetch(`http://localhost:8080/auth/users/toggle-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            if (response.ok) {
                const updatedProfile = { ...profile, status: newStatus };
                setProfile(updatedProfile);
                localStorage.setItem('profile', JSON.stringify(updatedProfile));
            } else {
                throw new Error('Error al cambiar el estado del usuario');
            }
        } catch (error) {
            console.error('Error de red', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/profile', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                    localStorage.setItem('profile', JSON.stringify(data));
                } else {
                    console.error('Error al obtener el perfil');
                }
            } catch (error) {
                console.error('Error de red', error);
            }
        };
        fetchData();
    }, [token]);


    return (
        <div className="home-container">
            <button className="back-button" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={30}/>
            </button>
            <h1 className="title">Perfil</h1>
            <hr/>
            <div>
                <div className="line">
                    <p className="kk">Nombre de equipo:</p>
                    <p className="kk">{profile.name}</p>
                </div>
                <div className="line">
                    <p className="kk">Localidad:</p>
                    <p className="kk">{profile.city}</p>
                </div>
                <div className="line">
                    <p className="kk">Cantidad de jugadores:</p>
                    <p className="kk">{profile.playerAmount}</p>
                </div>
                <div className="line">
                    <p className="kk">Número de teléfono:</p>
                    <p className="kk">{profile.number}</p>
                </div>
                <div className="line">
                    <p className="kk">Elo:</p>
                    <div className="elo">
                        <FaTrophy size={15} className="trof"/>
                        <p className="kk">{profile.elo}</p>
                    </div>
                </div>
                <div className="line">
                    <p className="kk">Fairplay:</p>
                    <div className="star-container">
                        {[...Array(5)].map((_, i) => i < Number(profile.stars) ?
                            <FaStar key={i} color="#FFD700" size={20}/> :
                            <FaStar key={i} color="#D3D3D3" size={20}/> // color gris para estrellas vacías
                        )}
                    </div>
                </div>
                <hr className="separation"/>
                <div className="line">
                    <p className="kk">Mostrar tu equipo a otros:</p>
                    <button onClick={toggleActiveStatus} className={`active-button ${profile.status === 'ACTIVE' ? 'active' : ''}`}>
                        <div className="thumb"></div>
                    </button>
                </div>
                <hr />
                <button className="profile-buttons" onClick={() => navigate('/EditProfile')}>Editar</button>
            </div>
        </div>
    );
}

export default Profile;
