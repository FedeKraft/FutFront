import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import logo from '../../futmatchLogo.png';

function AdminHome() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

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

    return (
        <div className="home-container">
            <img src={logo} alt="Logo" className="logo-home" />
            {!menuOpen && (
                <button className="menu-button-open" onClick={handleMenuOpen}>☰</button>
            )}
            <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
                <button className="menu-button-close" onClick={handleMenuClose}>☰</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
            <div className="section">
                <h1 className="title">Página de inicio del administrador</h1>
                <div className="section-content">
                    <h2>Informes de conflictos</h2>
                    {/* Aquí es donde se mostrarán los informes de conflictos */}
                </div>
                <div className="section-content">
                    <h2>Perfiles de usuarios</h2>
                    {/* Aquí es donde se mostrarán los perfiles de los usuarios */}
                </div>
                <div className="section-content">
                    <h2>Resolución de conflictos</h2>
                    {/* Aquí es donde el administrador podrá resolver conflictos */}
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
