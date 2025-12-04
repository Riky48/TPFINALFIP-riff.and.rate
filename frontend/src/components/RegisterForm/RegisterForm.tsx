import { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [country, setCountry] = useState("argentina");

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (password !== verifyPassword || email !== confirm) {
      alert("Contraseña o email incorrectos.");
      return;
    }

    console.log("BODY QUE SE ENVÍA:", {
      name,
      lastName,
      email,
      password,
    });

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastName,
          email,
          password,
        }),
      });
      console.log(
        "RAW REQUEST:",
        JSON.stringify(
          {
            name,
            lastName,
            email,
            password,
          },
          null,
          2
        )
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Error en el registro");
        return;
      }

      alert("Registro exitoso! Por favor, inicie sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="containRegister">
      <div className="signupdiv">
        <form onSubmit={handleSubmit}>
          <div id="signup">
            <div className="name separate">
              <div>
                <label htmlFor="user">Nombre</label>
                <input
                  type="text"
                  id="user"
                  placeholder="Nombre"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Apellido"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="email separate">
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  placeholder="correoejemplo@outlook.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm">Repetir E-mail</label>
                <input
                  type="email"
                  id="confirm"
                  placeholder="correoejemplo@outlook.com"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>

            <div className="password separate">
              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="123123123"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="verifypassword">Confirme su contraseña</label>
                <input
                  type="password"
                  id="verifypassword"
                  placeholder="123123123"
                  required
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="country separate">
              <div>
                <label htmlFor="country">País</label>
                <select
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="argentina">Argentina</option>
                  <option value="bolivia">Bolivia</option>
                  <option value="brasil">Brasil</option>
                  <option value="chile">Chile</option>
                  <option value="colombia">Colombia</option>
                  <option value="ecuador">Ecuador</option>
                  <option value="paraguay">Paraguay</option>
                  <option value="peru">Perú</option>
                  <option value="uruguay">Uruguay</option>
                  <option value="venezuela">Venezuela</option>
                  <option value="costa rica">Costa Rica</option>
                </select>
              </div>

              <div className="term separate">
                <input type="checkbox" id="term" required />
                <label htmlFor="term">Acepto los términos y condiciones</label>
              </div>
            </div>
          </div>

          <div className="signupbtn">
            <button type="submit" className="signupButton">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
