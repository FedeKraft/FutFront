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
    const [showPopup, setShowPopup] = useState(false);
    const [cityFilter, setCityFilter] = useState(null);
    const [playerFilter, setPlayerFilter] = useState(null);
    const [fairplayFilter, setFairplayFilter] = useState(null);
    const location = useLocation();


    function togglePopup() {
        setShowPopup(!showPopup);
      
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
        <div>
            <h1>Ranking</h1>
            <button onClick={togglePopup}>Filtrar</button>
            {showPopup && (
                <div className="popup">
                    <div className="input-container">
                        <select
                            className="dropdown"
                            value={cityFilter}
                            onChange={(e) => setCityFilter(e.target.value)}
                        >
                            <option value="">Todas las localidades</option>
                            <option value="Almirante Brown">Almirante Brown</option>
                            <option value="Avellaneda">Avellaneda</option>
                            <option value="Berazategui">Berazategui</option>
                            <option value="Berisso">Berisso</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="Cañuelas">Cañuelas</option>
                            <option value="Ensenada">Ensenada</option>
                            <option value="Escobar">Escobar</option>
                            <option value="Ezeiza">Ezeiza</option>
                            <option value="Esteban Echeverría">Esteban Echeverría</option>
                            <option value="Florencio Varela">Florencio Varela</option>
                            <option value="General Las Heras">General Las Heras</option>
                            <option value="General Rodríguez">General Rodríguez</option>
                            <option value="General San Martín">General San Martín</option>
                            <option value="Hurlingham">Hurlingham</option>
                            <option value="Ituzaingó">Ituzaingó</option>
                            <option value="José C. Paz">José C. Paz</option>
                            <option value="La Matanza">La Matanza</option>
                            <option value="La Plata">La Plata</option>
                            <option value="Lanús">Lanús</option>
                            <option value="Lomas de Zamora">Lomas de Zamora</option>
                            <option value="Luján">Luján</option>
                            <option value="Malvinas Argentinas">Malvinas Argentinas</option>
                            <option value="Marcos Paz">Marcos Paz</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="Merlo">Merlo</option>
                            <option value="Moreno">Moreno</option>
                            <option value="Morón">Morón</option>
                            <option value="Navarro">Navarro</option>
                            <option value="Pilar">Pilar</option>
                            <option value="Presidente Perón">Presidente Perón</option>
                            <option value="Quilmes">Quilmes</option>
                            <option value="San Andrés de Giles">San Andrés de Giles</option>
                            <option value="San Antonio de Areco">San Antonio de Areco</option>
                            <option value="San Fernando">San Fernando</option>
                            <option value="San Isidro">San Isidro</option>
                            <option value="San Martín">San Martín</option>
                            <option value="San Miguel">San Miguel</option>
                            <option value="San Miguel del Monte">San Miguel del Monte</option>
                            <option value="San Vicente">San Vicente</option>
                            <option value="Tigre">Tigre</option>
                            <option value="Tres de Febrero">Tres de Febrero</option>
                            <option value="Vicente López">Vicente López</option>
                            <option value="Zárate">Zárate</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <select
                            className="dropdown"
                            value={playerFilter}
                            onChange={(e) => setPlayerFilter(e.target.value)}
                        >
                            <option value="">Todas las cantidades de jugadores</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="11">11</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <select
                            className="dropdown"
                            value={fairplayFilter}
                            onChange={(e) => setFairplayFilter(e.target.value)}
                        >
                            <option value="">Todos las estrellas de fairplay</option>
                            <option value="1">1 star</option>
                            <option value="2">2 star</option>
                            <option value="3">3 star</option>
                            <option value="4">4 star</option>
                            <option value="5">5 star</option>
                        </select>
                    </div>
                </div>
            )}
            {ranking
                .filter((team) => {
                    return (
                        (cityFilter ? team.city === cityFilter : true) &&
                        (playerFilter ? team.playerAmount === playerFilter : true) &&
                        (fairplayFilter ? team.stars === fairplayFilter : true)
                    );
                })
                .map((team, index) => {
                    if (team.id.toString() === currentUserId) {
                        return (
                            <div key={team.id} className="team-card">
                                <h2>{index + 1}. {team.name}(tú)<br/> <FaTrophy/> {team.elo}</h2>
                                <button onClick={() => navigate(`/profile`)} className={"botonHomo"}>Ver Perfil</button>
                            </div>
                        )
                    } else {
                        return (
                            <div key={team.id} className="team-card">
                                <h3>{index + 1}. {team.name}<br/> <FaTrophy/> {team.elo}</h3>
                                <button onClick={() => navigate(`/profile/${team.id}`)} className={"botonHomo"}>Ver Perfil</button>
                            </div>
                        )
                    }
                })}
                <button onClick={handleBack}>
                   <MdOutlineKeyboardBackspace size={24}/>
                </button>
        </div>

    )
}

export default Ranking;


