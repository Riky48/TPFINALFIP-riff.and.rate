import { useState } from 'react';
import './LoginForm.css';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: { target: { id: string; value: string } }) => {
        const { id, value } = e.target;
        if (id === 'email') setEmail(value);
        else if (id === 'password') setPassword(value);
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || 'Error en el inicio de sesión');
                return;
            }

            // Guardar token en contexto
            login(data.token);

            alert('Bienvenido a Riff & Rate!');
            navigate('/inicio');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error de conexión con el servidor');
        }
    };

    return (
        <div className="main">
            <div className="logindiv">
                <form onSubmit={handleSubmit}>
                    <div className="logindata">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="correoejemplo@outlook.com"
                            value={email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="123123123"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="loginbtn">
                        <button id="login" type="submit">
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
