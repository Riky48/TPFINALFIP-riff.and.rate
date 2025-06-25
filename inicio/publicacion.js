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
 
  
// Contenido textual del post

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

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      imageContent.appendChild(img);

      //Una vez que se carga la imagen, agregamos todo el post
      divPost.innerHTML = userHtml;
      divPost.appendChild(imageContent);
      divPost.innerHTML += `
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
      contenedor.prepend(divPost); // Muestra la publicación arriba de todo
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

    };
    reader.readAsDataURL(file);
  } else {
    // Si no hay imagen, solo agregamos el contenido textual
    divPost.innerHTML = userHtml;
    divPost.appendChild(imageContent);
    divPost.innerHTML += `
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
    contenedor.prepend(divPost); // Muestra la publicación arriba de todo
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

  // Limpiar inputs
  postInput.value = '';
  fileInput.value = '';
  imagePreviewContainer.style.display = 'none';
});

