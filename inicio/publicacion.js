'use strict'

const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const previewContainer = document.getElementById('imagePreviewContainer');
const publishBtn = document.getElementById('publishBtn');
const postInput = document.getElementById('postinput');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      imagePreview.src = e.target.result;
      previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

function cambiarImagen() {
  const contenedorimg = document.getElementsByClassName('like-btn');
  const img = contenedorimg[0].querySelector('img');
  img.src = "assets/like.svg";
}

function cambiarImagenHover() {
  const contenedorimg = document.getElementsByClassName('like-btn');
  const img = contenedorimg[0].querySelector('img');
  img.src = "assets/likehover.svg";
}

const contenedor = document.getElementById('contentPosted');

publishBtn.addEventListener('click', () => {
  const text = postInput.value.trim();
  const file = fileInput.files[0];

  if (!text && !file) {
    alert('Escribí algo o subí una imagen.');
    return;
  }

  const divPost = document.createElement('div');
  divPost.classList.add('usercontentPosted');

  const user = usuarioUnico;
  const userHtml = `
    <div class="user">
      <img src="${user.picture.medium}" alt="Foto de ${user.name.first}">
      <p>${user.name.first} ${user.name.last}</p>
    </div>
  `;

  const imageContent = document.createElement('div');
  imageContent.classList.add('imagecontent');
  imageContent.style.width = '90%';
  imageContent.innerHTML = `<p>${text}</p>`;

  const reactionsHtml = `
    <div class="reactions">
      <a href="#" class="like-btn"><img src="assets/like.svg" alt="Imagen aleatoria">
        <p>Reaccionar <span class="like-count">0</span></p>
      </a>
      <a href="#"><img src="assets/comentar.svg" alt="Imagen aleatoria">
        <p>Comentar</p>
      </a>
      <a href="#"><img src="assets/compartir.svg" alt="Imagen aleatoria">
        <p>Compartir</p>
      </a>
      <a href="#"><img src="assets/compartir1.svg" alt="Imagen aleatoria">
        <p>Enviar</p>
      </a>
    </div>
  `;

  if (file) {
    const reader = new FileReader();
    const fileType = file.type;

    reader.onload = function (e) {
      let element;

      if (fileType.startsWith("image/")) {
        element = document.createElement("img");
        element.src = e.target.result;
      } else if (fileType.startsWith("video/")) {
        element = document.createElement("video");
        element.src = e.target.result;
        element.controls = true;
        element.style.width = "100%";
      } else if (fileType === "application/pdf") {
        element = document.createElement("embed");
        element.src = e.target.result;
        element.type = "application/pdf";
        element.style.width = "100%";
        element.style.height = "400px";
      }

      if (element) imageContent.appendChild(element);

      divPost.innerHTML = userHtml;
      divPost.appendChild(imageContent);
      divPost.innerHTML += reactionsHtml;
      contenedor.prepend(divPost);

      const likeBtn = divPost.querySelector('.like-btn');
      const likeCount = likeBtn.querySelector('.like-count');
      let liked = false;

      likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        liked = !liked;

        if (liked) {
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
          likeBtn.classList.add('liked');
          cambiarImagenHover();
        } else {
          likeCount.textContent = parseInt(likeCount.textContent) - 1;
          likeBtn.classList.remove('liked');
          cambiarImagen();
        }
      });
    };

    reader.readAsDataURL(file);
  } else {
    divPost.innerHTML = userHtml;
    divPost.appendChild(imageContent);
    divPost.innerHTML += reactionsHtml;
    contenedor.prepend(divPost);

    const likeBtn = divPost.querySelector('.like-btn');
    const likeCount = likeBtn.querySelector('.like-count');
    let liked = false;

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      liked = !liked;

      if (liked) {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        likeBtn.classList.add('liked');
      } else {
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        likeBtn.classList.remove('liked');
      }
    });
  }

  postInput.value = '';
  fileInput.value = '';
  imagePreviewContainer.style.display = 'none';
});
