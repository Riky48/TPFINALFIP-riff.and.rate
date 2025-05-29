'use strict';

// 1. Menú desplegable
const btninav = document.getElementById('btninav');
const dropdown = document.getElementById('dropdown-menu');

btninav.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!btninav.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// 2. API productos (ASIDE)
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const aside = document.querySelector('aside');

    data.slice(0, 2).forEach(product => {
      const div = document.createElement('div');
      div.classList.add('divcontenido');

      const div2 = document.createElement('div');
      div2.classList.add('imgaside');
      div2.innerHTML = `
        <a href="#"><img src="${product.image}" alt="${product.title}" class="asideimg" width="50vw"></a>
      `;

      const div3 = document.createElement('div');
      div3.classList.add('textaside');
      div3.innerHTML = `
        <a href="#"><h4>${product.title}</h4><p>$${product.price}</p></a>
      `;

      div.append(div2, div3);
      aside.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error al cargar productos:', error);
  });

// 3. Usuario actual (imagen en dos lugares)
const usuariosApi = 'https://randomuser.me/api/?results=10';

fetch(usuariosApi)
  .then(res => res.json())
  .then(data => {
    const usuarioUnico = data.results[0];

    const imgHtml = `<a href="#"><img src="${usuarioUnico.picture.medium}" alt=""></a>`;
    document.getElementById('userImg').innerHTML = imgHtml;
    document.getElementById('publishusr').innerHTML = imgHtml;
  });

// 4. Publicaciones combinando usuarios + imágenes
const apiImg = 'https://picsum.photos/v2/list?page=2&limit=10';
const comments = 'https://jsonplaceholder.typicode.com/comments';
Promise.all([
  fetch(usuariosApi).then(res => res.json()),
  fetch(apiImg).then(res => res.json()),
  fetch(comments).then(res => res.json())
])
  .then(([userData, imgData,comments]) => {
    const users = userData.results;
    const contenedor = document.getElementById('contentPosted');
    users.forEach((usr, i) => {
      const imgPost = imgData[i];
      const commentuser = comments[i];
      
      const post = document.createElement('div');
      post.classList.add('usercontentPosted');
      post.innerHTML = `
        
        <div class="user">
        <img src="${usr.picture.medium}" alt="Foto de ${usr.name.first}">
          <p><strong>${usr.name.first} ${usr.name.last}</strong> (${usr.gender})</p>
        </div>
          <div class="imagecontent">
          <p>${commentuser.body}</p>
          <img src="${imgPost.download_url}" alt="Imagen aleatoria">
        </div>
        <div class="reactions">
          <img src="assets/like.svg" alt="Imagen aleatoria">
          <img src="assets/comentar.svg" alt="Imagen aleatoria">
          <img src="assets/compartir.svg" alt="Imagen aleatoria">
          <img src="assets/compartir1.svg" alt="Imagen aleatoria">
        </div>
        
      `;

      contenedor.appendChild(post);
    });
  })
  .catch(err => {
    console.error('Error al generar publicaciones:', err);
  });

  // contactos sugeridos 

  const contacts =  document.querySelector('.contacts');
  fetch('https://randomuser.me/api/?results=4')
    .then(res => res.json())
    .then(data => {
      const contactsSugeridos = data.results;

      contactsSugeridos.forEach(contact => {
        const contacto = document.createElement('div');
        contacto.classList.add('contacto');
        contacto.innerHTML = `
        
          <div class="contacto-add">
            <a href="#"><img src="assets/vector.svg" alt=""></a>
          </div>
          <div class="contacto-img">
            <img src="${contact.picture.medium}" alt="">
          </div>
          <div class="contacto-info">
            <p>${contact.name.first} ${contact.name.last}</p>
          </div>
       
        `;
        contacts.appendChild(contacto);
      });
    })
    .catch(error => {
      console.error('Error al cargar contactos:', error);
    }); 