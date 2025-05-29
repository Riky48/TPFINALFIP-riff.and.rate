let buttonSignup = document.querySelector("#signupButton");

let usernames = []
let emails = []
let passwords = []

buttonSignup.addEventListener('click', (e) => {
    e.preventDefault();
    let user = document.querySelector("#user");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let passwordCheck = document.querySelector("#verifypassword");
    if (password.value != passwordCheck.value) {
        alert("Las contraseñas no coinciden.")
    } else {
        usernames.push(user.value);
        emails.push(email.value);
        passwords.push(password.value);
        
        alert("Gracias por registrarse!")
    }
    console.log(usernames);
    console.log(emails);
    console.log(passwords);
})