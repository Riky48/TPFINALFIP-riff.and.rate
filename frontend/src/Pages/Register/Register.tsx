import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import './Register.css';

function Register() {
    return (
        <>
            <div className="main">
                <div className="signupheader">
                    <h1>Riff and Rate</h1>
                    <p>Cree su cuenta</p>
                </div>
                <RegisterForm />
                <footer>© 2025 Marketplace Músicos - Todos los derechos reservados.</footer>
            </div>
        </>
    )
}

export default Register