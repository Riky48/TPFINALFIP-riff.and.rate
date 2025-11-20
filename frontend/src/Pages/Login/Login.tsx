import LoginForm from '../../components/LoginForm/LoginForm';
import './Login.css';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useState} from 'react';



function Login() {
    const [isLogin, setIsLogin] = useState(true);
    
    const toggleForm = () => setIsLogin(!isLogin);



    return (
        <>
            <div className="body">
                <div className="header">
                    <h1>Riff and Rate</h1>
                    <p>¡Bienvenido!</p>
                </div>

                <div className="forms">
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                    <div className="toggleLoginReg">
                        <p onClick={() => { console.log('Click'); toggleForm(); }}>{isLogin ? "¿No tenés una cuenta? Podés crear una aquí" : "¿Ya tenés una cuenta? Iniciá sesión"}</p>
                    </div>
                </div>
            </div>
            <div className="footer">© 2025 Marketplace Músicos - Todos los derechos reservados.</div>
        </>
    )
}

export default Login