import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

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

    useEffect(() => {
        getRanking().then(setRanking);
    }, []);

    return (
        <div>
            <h1>Ranking</h1>
            {ranking.map((team) => {
                if (team.id.toString() === currentUserId) {
                    return (
                        <div key={team.id} className="team-card">
                            <h2>{ranking.findIndex(obj => obj === team) + 1}. {team.name} {team.elo}</h2>
                            <button onClick={() => navigate(`/profile`)}>Ver Perfil</button>
                        </div>
                    )
                }
                else return (
                    <div key={team.id} className="team-card">
                        <h3>{ranking.findIndex(obj => obj === team) + 1}. {team.name} {team.elo}</h3>
                        <button onClick={() => navigate(`/profile/${team.id}`)}>Ver Perfil</button>
                    </div>
                )
            })}
        </div>
    )
}


export default Ranking;


