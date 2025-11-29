import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('Enviando...');

        try {
            const response = await fetch('http://localhost/3dprint/server/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email, 
                    contrasena: password 
                }),
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                setMensaje('✅ Login exitoso: ' + data.usuario.nombre);
            } else {
                setMensaje('❌ Error: ' + data.message);
            }
        } catch (error) {
            setMensaje('❌ Error de conexión: ' + error.message);
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                
                {mensaje && <p>{mensaje}</p>}
                
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default LoginForm;