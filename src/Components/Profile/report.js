import React, { useState } from 'react';
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {jwtDecode} from "jwt-decode";

function Report() {
    const navigate = useNavigate();
    const location = useLocation();
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const currentUserId = jwtDecode(token).id;

        try {
            const response = await fetch('http://localhost:8080/auth/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    fromUserId: currentUserId,
                    toUserId: id,
                    comment: comment
                })
            });
            if (response.ok) {
                toast.success('Reporte enviado', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: { width: 'auto', maxWidth: '600px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px' }
                });
                setComment('');
            } else {
                console.error('Error');
            }
        } catch (error) {
            console.error('Error de red', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleBack = () => {
        // Evita volver si ya estás en la página de inicio
        if (location.pathname !== '/home') {
            navigate(-1);
        }
    }


    return (
        <div className="home-container">
            <ToastContainer /> {/* Aquí se incluye ToastContainer */}
            <button className="back-button" onClick={handleBack}>
                <MdOutlineKeyboardBackspace size={30}/>
            </button>
            <h1 className="title">Reportar un problema</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-container3">
                    <input
                        type="text"
                        placeholder="Comentario"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button className="register-button" type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default Report;