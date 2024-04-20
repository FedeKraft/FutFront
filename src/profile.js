import React, { useState, useEffect } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        city: '',
        playerAmount: '',
        number: ''
    });    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/auth/profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                } else {
                    console.error('Error al obtener el perfil');
                }
            } catch (error) {
                console.error('Error de red', error);
            }
        };
        fetchData();
    }, [token]);

    const handleSave = () => {
        fetch(`http://localhost:8080/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(profile)
        })
            .then(() => {
                // After successfully updating the profile, fetch the latest profile data
                fetch(`http://localhost:8080/auth/profile`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        // Update the profile state with the latest data
                        setProfile(data);
                        setIsEditing(false);
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleChange = (event) => {
        setProfile({...profile, [event.target.name]: event.target.value});
    };

    return (
        <div>
            <h1>Perfil</h1>
            {isEditing ? (
                <div>
                    <label>
                        Nombre:
                        <input type="text" name="name" value={profile.name} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={profile.email} onChange={handleChange} />
                    </label>
                    <label>
                        Ciudad:
                        <input type="text" name="city" value={profile.city} onChange={handleChange} />
                    </label>
                    <label>
                        Cantidad de jugadores:
                        <input type="number" name="playerAmount" value={profile.playerAmount} onChange={handleChange} />
                    </label>
                    <label>
                        Número:
                        <input type="number" name="number" value={profile.number} onChange={handleChange} />
                    </label>
                    <button onClick={handleSave}>Guardar</button>
                </div>
            ) : (
                <div>
                    <p>Nombre: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Ciudad: {profile.city}</p>
                    <p>Cantidad de jugadores: {profile.playerAmount}</p>
                    <p>Número: {profile.number}</p>
                    <button onClick={handleEdit}>Editar perfil</button>
                </div>
            )}
        </div>
    );
}

export default Profile;