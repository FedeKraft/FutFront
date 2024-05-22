import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';


async function updateProfile(profile) {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/auth/EditProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(profile)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
    }

    return await response.json();
}

function EditProfile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        city: '',
        playerAmount: '',
        number: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
        }
    }, []);

    const handleChange = (event) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedProfile = await updateProfile(profile);
            setProfile(updatedProfile);
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            navigate('/profile');
        } catch (error) {
            console.error('Error al actualizar el perfil', error);
        }
    };

    return (
        <div>
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nombre de equipo:
                        <input type="text" name="name" value={profile.name} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>
                        Correo electrónico:
                        <input type="email" name="email" value={profile.email} onChange={handleChange} required/>
                    </label>
                </div>
                <div>
                    <label>Localidad:</label>
                    <select
                        className="dropdown" name="city" value={profile.city} onChange={handleChange} required
                    >
                        <option value="">Selecciona una opción</option>
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
                <div>
                    <label>Cantidad de jugadores:</label>
                    <select
                        className="dropdown" name="playerAmount" value={profile.playerAmount} onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="11">11</option>
                    </select>
                </div>
                <label>
                    Número de teléfono:
                    <input type="text" name="number" value={profile.number} onChange={handleChange} required/>
                </label>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default EditProfile;