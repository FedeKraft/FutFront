import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import logo from '../../todo.png';
import { GrTrophy } from 'react-icons/gr'; // Importa el ícono de trofeo

async function getTeams() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/auth/users', {
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

function HomePage() {
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        getTeams().then(setTeams);
    }, []);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="Logo" className="logo" />
                <button className="menu-button" onClick={handleMenuToggle}>☰</button>
            </header>
            <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
                <button onClick={() => navigate('/profile')}>Mi Perfil</button>
                <button onClick={() => navigate('/notifications')}>Notificaciones</button>
                <button onClick={() => navigate('/ranking')}>Ranking</button>
                <button onClick={() => navigate('/MatchHistory')}>Historial</button>
                <button onClick={() => navigate('/incidents')}>Incidentes</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className="team-list">
                {teams.map((team) => (
                    <div key={team.id} className="team-card" onClick={() => navigate(`/profile/${team.id}`)}>
                        <div className="team-info">
                            <h2>{team.name}</h2>
                            <p className="team-city">{team.city}</p>
                        </div>
                        <div className="team-elo-container">
                            <GrTrophy className="trophy-icon" />
                            <p className="team-elo">{team.elo}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
