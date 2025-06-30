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