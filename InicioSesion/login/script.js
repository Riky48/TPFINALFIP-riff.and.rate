let loginButton = document.querySelector("#login");

let emailEj = "tomas.propato@outlook.com";
let passEj = "123123123";

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email != emailEj || password != passEj) {
        alert("Uno de los campos es incorrecto.");
    } else {
        alert("Inicio de sesión exitoso!");
        window.location.replace('http://localhost:5500/inicio/inicio.html') // redirección a la página principal con Live Server (puerto 5500)
    }
})
