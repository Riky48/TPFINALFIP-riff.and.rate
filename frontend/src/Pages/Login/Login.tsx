import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useState} from 'react';



function Login() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    

    const handleLogin = () => {
        setShowLogin(true);
        setShowRegister(false);
    }

    const handleRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    }



    return (
        <>
            <div className="body">
                <div className="header">
                    <h1>Riff and Rate</h1>
                    <p>¡Bienvenido!</p>
                </div>

                <div className="forms">
                    {showLogin && <LoginForm />}
                    {showRegister && <RegisterForm />}
                </div>

                <div className="buttons">
                    <button className="loginButton" onClick={handleLogin}>Iniciar Sesión</button>
                    <button className="registerButton" onClick={handleRegister}>Crear una cuenta</button>
                </div>
            </div>
            <div className="footer">© 2025 Marketplace Músicos - Todos los derechos reservados.</div>
        </>
    )
}

export default Login