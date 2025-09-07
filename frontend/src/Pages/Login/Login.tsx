import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useState} from 'react';



function Login() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    

    const handleLogin = () => {
        const footer = document.querySelector('.footer') as HTMLElement;
        setShowLogin(true);
        setShowRegister(false);
        footer.style.marginTop = '20px';
    }

    const handleRegister = () => {
        const footer = document.querySelector('.footer') as HTMLElement;
        setShowLogin(false);
        setShowRegister(true);
        footer.style.marginTop = '100px';
    }



    return (
        <div className="body">
            <div className="main">
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
        </div>
    )
}

export default Login