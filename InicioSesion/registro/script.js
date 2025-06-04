let buttonSignup = document.querySelector("#signupButton");

buttonSignup.addEventListener('click', (e) => {
    e.preventDefault();
    let user = document.querySelector("#user");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let passwordCheck = document.querySelector("#verifypassword");
    if (password.value != passwordCheck.value) {
        alert("Las contraseñas no coinciden.")
    } else {
        alert("Gracias por registrarse!");

        window.location.replace("../login/index.html")
    }
})