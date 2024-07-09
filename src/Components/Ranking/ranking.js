import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import './../Ranking/ranking.css';
import {FaTrophy} from "react-icons/fa";
import {GoChevronDown} from "react-icons/go";

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
    const [search, setSearch] = useState('');
    const [currentTeam, setCurrentTeam] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    useEffect(() => {
        getRanking().then(setRanking);
    }, []);

    function filterRanking(ranking) {
        return ranking
            .filter((team) => {
                return (
                    (cityFilter ? team.city === cityFilter : true) &&
                    (playerFilter ? team.playerAmount === playerFilter : true) &&
                    (fairplayFilter ? team.stars === fairplayFilter : true)
                );
            })
            .map((team, index) => {
                return { team: search ? team.name.toLowerCase().includes(search.toLowerCase()) ? team : {} : team, index };
            })
    }

    useEffect(() => {
        const filtered = filterRanking(ranking).filter(item => item !== null && item !== undefined);
        const currentUserTeam = filtered.find((item) => item && item.team && item.team.id && item.team.id.toString() === currentUserId);
        const currentUserIndex = filtered.findIndex((item) => item && item.team && item.team.id && item.team.id.toString() === currentUserId);
        setCurrentTeam(currentUserTeam ? currentUserTeam.team : null);
        setCurrentIndex(currentUserIndex !== -1 ? currentUserIndex : null);
    }, [ranking, currentUserId, cityFilter, playerFilter, fairplayFilter, search]);


    return (
        <div className={"home-container"}>
            <div className="ranking-header">
                <button className="back-button3" onClick={handleBack}>
                    <MdOutlineKeyboardBackspace size={24}/>
                </button>
                <h1 className="title">Ranking</h1>
            </div>
            <div className="team-list">
                <input
                    type="text"
                    placeholder="Buscar equipo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bar"
                />
                <button onClick={togglePopup}>Filtrar</button>
                {showPopup && (
                    <div className="filters">
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
                            <GoChevronDown className={"dropdown-icon"}/>
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
                            <GoChevronDown className={"dropdown-icon"}/>
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
                            <GoChevronDown className={"dropdown-icon"}/>
                        </div>
                    </div>
                )}
                {currentTeam && (
                    <div key={currentTeam.id} className="team-card">
                        <h2>{currentIndex + 1}. {currentTeam.name}(tú)<br/> <FaTrophy/> {currentTeam.elo}</h2>
                        <button onClick={() => navigate(`/profile`)} className={"botonHomo"}>Ver Perfil
                        </button>
                    </div>
                )}
                {!currentTeam && (filterRanking(ranking).length === 0 || filterRanking(ranking).every(item => Object.keys(item.team).length === 0)) ? (
                    <p>No se encontraron equipos.</p>
                ) : (
                    filterRanking(ranking).filter(item => item && item.team !== currentTeam && Object.keys(item.team).length !== 0).map(({
                                                                                                                                             team,
                                                                                                                                             index
                                                                                                                                         }) => (
                        <div key={team.id} className="team-card" onClick={() => navigate(`/profile/${team.id}`)}>
                            <div className="rank-info">
                                <h2 className="team-index">{index + 1}.</h2>
                                <h2 className="team-name">{team.name}</h2>
                            </div>
                            <div className="team-elo">
                                <FaTrophy className="trophy-icon"/>
                                <p>{team.elo}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}


export default Ranking;


