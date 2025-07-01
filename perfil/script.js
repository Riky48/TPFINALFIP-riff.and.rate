  let isFollowing = false;

  document.getElementById("follow-btn").addEventListener("click", function () {
    const followersElement = document.getElementById("followers");
    let currentFollowers = parseInt(followersElement.textContent);

    if (!isFollowing) {
      currentFollowers += 1;
      this.textContent = "Siguiendo";
    } else {
      currentFollowers -= 1;
      this.textContent = "Seguir";
    }

    followersElement.textContent = currentFollowers;
    isFollowing = !isFollowing;
  });


  // Likes
document.querySelectorAll(".like-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    let current = parseInt(btn.textContent.split(" ")[1]);
    current++;
    btn.textContent = `❤️ ${current}`;
  });
});

// Comentarios
document.querySelectorAll(".btn-comentar").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const input = document.querySelectorAll(".input-comentario")[index];
    const comentariosDiv = document.querySelectorAll(".comentarios")[index];
    const texto = input.value.trim();

    if (texto !== "") {
      const nuevoComentario = document.createElement("p");
      nuevoComentario.innerHTML = `<strong>usuario:</strong> ${texto}`;
      comentariosDiv.appendChild(nuevoComentario);
      input.value = "";
    }
  });
});

let lastScroll = 0;
const nav = document.querySelector('.navegador');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // Ocultar solo si se baja más de 80px
    nav.classList.add('oculto');
  } else {
    nav.classList.remove('oculto');
  }

  lastScroll = currentScroll;
});


document.addEventListener("DOMContentLoaded", function () {
  const cerrarSesionLink = document.getElementById("cerrar-sesion");

  cerrarSesionLink.addEventListener("click", function (e) {
    e.preventDefault(); // Evita que se redirija inmediatamente

    const confirmar = confirm("¿Estás seguro de que querés cerrar sesión?");
    
    if (confirmar) {
      // Redirigir al login (o a donde tengas tu cierre de sesión)
      window.location.href = "../InicioSesion/login/index.html";
    }
  });
});