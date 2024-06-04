import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import './ranking.css';
import {FaTrophy} from "react-icons/fa";

async function getRanking() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/api/ranking', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error al obtener el Ranking');
        return [];
    }
}

function Ranking() {
    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);
    const token = localStorage.getItem('token');
    const currentUserId = jwtDecode(token).id;
    const location = useLocation();

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    useEffect(() => {
        getRanking().then(setRanking);
    }, []);

    return (
        <div className={"cont"}>
            <div className={"cabeza"}>
                <h1 className={"stat"}>Ranking</h1>
            </div>
            {ranking.map((team) => {
                if (team.id.toString() === currentUserId) {
                    return (
                        <div key={team.id} className="team-card">
                            <h2>{ranking.findIndex(obj => obj === team) + 1}. {team.name}(tú) <FaTrophy/> {team.elo}</h2>
                            <button onClick={() => navigate(`/profile`)}>Ver Perfil</button>
                        </div>
                    )
                } else return (
                    <div key={team.id} className="team-card">
                        <h2>{ranking.findIndex(obj => obj === team) + 1}. {team.name} <FaTrophy/>{team.elo}</h2>
                        <button onClick={() => navigate(`/profile/${team.id}`)}>Ver Perfil</button>
                    </div>

                )
            })}
            <button onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={24}/>
            </button>
        </div>

    )
}


export default Ranking;


