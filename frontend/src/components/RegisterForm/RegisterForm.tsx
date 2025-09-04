import { useState } from 'react';
import './RegisterForm.css';

export function RegisterForm() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            alert('Las contraseñas no coinciden.')
            return;
        } else {
            alert('Usuario creado correctamente.')
            console.log('Usuario:', user);
            console.log('Email:', email);
            console.log('Contraseña:', password);
        }
    }

    return (
        <>
            <div className="signupdiv">
                <form onSubmit={handleSubmit}>
                    <div id="signup">
                        <label htmlFor="user">Nombre de usuario</label>
                        <input type="text" id="user" placeholder="Pepito123" required value={user} onChange={(e) => setUser(e.target.value)} />
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="correoejemplo@outlook.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" placeholder="123123123" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="verifypassword">Confirme su contraseña</label>
                        <input type="password" id="verifypassword" placeholder="123123123" required value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                    </div>
                        <div className="signupbtn">
                            <button type="submit" className="signupButton">Registrarse</button>
                            <p>¿Ya tiene una cuenta? <a href="../login/index.html">Inicie sesión aquí.</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}
