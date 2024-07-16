import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import './profile.css';
import { FaStar, FaTrophy } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function OtherProfileForAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState(null);
    const { id } = useParams();

    async function handleSuspend() {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/auth/suspend/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (response.ok) {
            toast.success('Usuario suspendido', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: { width: 'auto', maxWidth: '600px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px' }
            });
            navigate('/adminHome');
        } else {
            console.error('Error');
        }
    }

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/auth/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            if (response.ok) {
                const profileData = await response.json();
                setProfile(profileData);
            } else {
                console.error('Error al obtener el perfil');
            }
        };
        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>No existe el perfil.</div>;
    }


    return (
        <div className="home-container">
            <ToastContainer /> {/* Aquí se incluye ToastContainer */}
            <button className="back-button" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={30} />
            </button>
            <h1 className="title">Perfil de <br /> {profile.name}</h1>
            <hr />
            <div>
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
                <div className="profile-buttons">
                    <button onClick={() => navigate(`/incidents/${id}`)}>Ver incidentes de este
                        usuario
                    </button>
                    <button onClick={() => navigate('/MatchHistory')}>Ver historial de partidos
                    </button>
                    <button onClick={() => handleSuspend()}>Suspender</button>
                </div>
            </div>
        </div>
    );
}

export default OtherProfileForAdmin;
