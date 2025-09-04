import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';

function Login() {
    return (
        <>
            <div className="main">
                <div className="loginheader">
                    <h1>Riff and Rate</h1>
                    <p>Inicie Sesión </p>
                </div>
                <LoginForm />
                <footer>© 2025 Marketplace Músicos - Todos los derechos reservados.</footer>
            </div>
        </>
    )
}

export default Login