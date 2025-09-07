import { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
    
    const testEmail = 'correoejemplo@outlook.com'
    const testPassword = '123123123'

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        if (id === 'email') {
          setEmail(value);
        } else if (id === 'password') {
          setPassword(value);
        }
    };




    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if ((email !== testEmail) || (password !== testPassword)) {
            alert('Uno de los campos es incorrecto.')
            return;
        } else {
            alert('¡Bienvenido a Riff and Raff!')
        }
    }

    return (
    <div className="main">
        <div className="logindiv">
            <form onSubmit={handleSubmit}>
                <div className="logindata">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" placeholder="Ej: tomas.propato@outlook.com" value={email} onChange={handleChange}/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="123123123" value={password} onChange={handleChange}/>
                </div>
                <div className="loginbtn">
                    <button id="login" type="submit">Iniciar sesión</button>
                    <p>¿No tiene una cuenta?{' '}<a href="../registro/index.html">Puede crear una aquí.</a></p>
                </div>
            </form>
        </div>
    </div>
  );
}
export default LoginForm