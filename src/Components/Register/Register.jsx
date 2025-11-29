import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasena: ''
    });

    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensaje({ tipo: '', texto: '' });
        
        // Debug: Verificar datos antes de enviar
        console.log('📤 Enviando datos:', formData);
        console.log('🔗 URL:', 'http://localhost/3dprint/server/registro.php');
        
        try {
            const response = await fetch('http://localhost/3dprint/server/registro.php', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Debug: Ver respuesta completa
            console.log('📥 Status:', response.status);
            console.log('📥 Response OK:', response.ok);

            const data = await response.json();
            console.log('📦 Datos recibidos:', data);

            if (response.ok && data.status === 'success') {
                setMensaje({ 
                    tipo: 'success', 
                    texto: data.message || 'Registro exitoso. Serás redirigido al login.' 
                });
                setTimeout(() => navigate('/micuenta'), 2000); 
            } else {
                setMensaje({ 
                    tipo: 'error', 
                    texto: data.message || 'Fallo en el registro. Inténtalo de nuevo.' 
                });
            }
        } catch (error) {
            console.error('❌ Error completo:', error);
            setMensaje({ 
                tipo: 'error', 
                texto: `Error de conexión: ${error.message}` 
            });
        } finally {
            setEnviando(false);
        }
    }

    return (
        <div className="register-container">
            <h2>Crear Cuenta</h2>
            
            {mensaje.texto && (
                <div className={`message message-${mensaje.tipo}`}>
                    {mensaje.texto}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="register-form">
                
                {/* Campo Nombre */}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre *</label>
                    <input 
                        id="nombre"
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Apellido */}
                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                        id="apellido"
                        type="text" 
                        name="apellido" 
                        placeholder="Apellido" 
                        value={formData.apellido} 
                        onChange={handleChange} 
                    />
                </div>

                {/* Campo Email */}
                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        placeholder="correo@ejemplo.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña *</label>
                    <input 
                        id="contrasena"
                        type="password" 
                        name="contrasena" 
                        placeholder="Mínimo 6 caracteres" 
                        value={formData.contrasena} 
                        onChange={handleChange} 
                        minLength="6"
                        required 
                    />
                </div>

                <button type="submit" disabled={enviando} className="register-button">
                    {enviando ? 'Registrando...' : 'Registrarse'}
                </button>
                
                <p className="login-link-text">
                    ¿Ya tienes cuenta?{' '}
                    <span onClick={() => navigate('/micuenta')} className="link-style">
                        Inicia Sesión
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;