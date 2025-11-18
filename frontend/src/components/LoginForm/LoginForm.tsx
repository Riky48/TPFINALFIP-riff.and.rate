import { useState } from 'react';
import './LoginForm.css';
import { useAuth } from '../../context/authContext';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';  


function LoginForm() {
    
    const { login } = useAuth();
    const navigate = useNavigate();

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




    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = await loginUser(email, password);
        if (!data.token) {
            alert(data.message || 'Error en el inicio de sesión');
            return;
        }
        
        login (data.token);

        alert('Bienvenido a Riff & Rate!');
        navigate('/inicio');
    }

    return (
    <div className="main">
        <div className="logindiv">
            <form onSubmit={handleSubmit}>
                <div className="logindata">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" placeholder="correoejemplo@outlook.com" value={email} onChange={handleChange}/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="123123123" value={password} onChange={handleChange}/>
                </div>
                <div className="loginbtn">
                    <button id="login" type="submit">Iniciar sesión</button>
                </div>
            </form>
        </div>
    </div>
  );
}
export default LoginForm