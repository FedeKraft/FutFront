import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import logo from '../../futmatchLogo.png';
import { jwtDecode } from 'jwt-decode';
import {toast} from "react-toastify";

async function getReports() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/auth/reports', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Error al obtener los reportes');
        return [];
    }
}

async function handleDelete(report, setReports) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/auth/deleteReport/${report.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    if (response.ok) {
        console.log('Reporte eliminado');
        const updatedReports = await getReports();
        setReports(updatedReports);
    } else {
        console.error('Error al eliminar el reporte');
    }
}

async function handleWin(id, report, setReports) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/auth/winReport/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({report: report})
    });
    if (response.ok) {
        toast.success('Resultados actualizados', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: { width: 'auto', maxWidth: '600px', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '18px' }
        });
        const updatedReports = await getReports();
        setReports(updatedReports);
    } else {
        console.error('Error al resolver el reporte');
    }
}

async function handleDraw(report, setReports) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/auth/deleteForms/${report.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    if (response.ok) {
        console.log('Resultados actualizados');
        const updatedReports = await getReports();
        setReports(updatedReports);
    } else {
        console.error('Error al eliminar el reporte');
    }
}

function AdminHome() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const { role } = decodedToken;
            if (role === 'USER') {
                navigate('/home');
            }
        }
    }, [navigate]);

    const handleMenuOpen = () => {
        setMenuOpen(true);
    };

    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        getReports().then(setReports);
    }, []);

    return (
        <div className="home-container">
            <img src={logo} alt="Logo" className="logo-home" />
            {!menuOpen && (
                <button className="menu-button-open" onClick={handleMenuOpen}>☰</button>
            )}
            <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
                <button className="menu-button-close" onClick={handleMenuClose}>☰</button>
                <button onClick={() => navigate('/suspendedUsers')}>Equipos suspendidos</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <h1 className="title2">Página de inicio del administrador</h1>
            {reports.length === 0 || reports.every(form => form.comment === '' || form.comment === null) ? (
                <p className="no-reports">No hay reportes.</p>
            ) : (
                reports.map((report) => (
                    (report.fromUserForm === null && report.toUserForm === null) ? (
                        <div>
                            <h2>Informe de conflicto</h2>
                            <div className="incidents" key={report.id}>
                                <div className="report">
                                    <span>Reporte del usuario: </span>
                                    <Link className="link"
                                          to={`/otherProfileForAdmin/${report.fromUser.id}`}>{report.fromUser.name}</Link>
                                </div>
                                <div className="report">
                                    <span>Usuario reportado: </span>
                                    <Link className="link"
                                          to={`/otherProfileForAdmin/${report.toUser.id}`}>{report.toUser.name}</Link>
                                </div>
                                <p>{report.comment}</p>
                                <div className="report-button">
                                    <button onClick={() => handleDelete(report, setReports)}>Borrar</button>
                                </div>
                            </div>
                        </div>
                ) : (
                        <div>
                            <h2>Informe de partido con resultados distintos</h2>
                            <div className="incidents" key={report.id}>
                                <div className="report">
                                    <span>Usuario involucrado: </span>
                                    <Link className="link"
                                          to={`/otherProfileForAdmin/${report.fromUser.id}`}>{report.fromUser.name}</Link>
                                </div>
                                <div className="report">
                                    <span>Usuario involucrado: </span>
                                    <Link className="link"
                                          to={`/otherProfileForAdmin/${report.toUser.id}`}>{report.toUser.name}</Link>
                                </div>
                                <p>{report.comment}</p>
                                <p>Resultado enviado
                                    por {report.fromUser.name}: {report.fromUserForm.goalsInFavor} - {report.fromUserForm.goalsAgainst}</p>
                                <p>Resultado enviado
                                    por {report.toUser.name}: {report.toUserForm.goalsInFavor} - {report.toUserForm.goalsAgainst}</p>
                                <div className="report-button">
                                    <button onClick={() => handleWin(report.fromUser.id, report, setReports)}>Dar por ganado
                                        a {report.fromUser.name}</button>
                                    <button onClick={() => handleWin(report.toUser.id, report, setReports)}>Dar por ganado
                                        a {report.toUser.name}</button>
                                    <button onClick={() => handleDraw(report, setReports)}>Dar por empatado</button>
                                    <button onClick={() => handleDelete(report, setReports)}>Resultado inconcluso</button>
                                </div>
                            </div>
                        </div>
                    )
                ))
            )}
        </div>
    );
}

export default AdminHome;
