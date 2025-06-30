'use strict';

// 2. API productos (ASIDE)
async function productos(){
  try{
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    const aside = document.querySelector('aside');

    data.slice(8, 12).forEach(product => {
      const div = document.createElement('div');
      div.classList.add('divcontenido');

      const div2 = document.createElement('div');
      div2.classList.add('imgaside');
      div2.innerHTML = `
        <a href="#"><img src="${product.image}" alt="${product.title}" class="asideimg" ></a>
      `;

      const div3 = document.createElement('div');
      div3.classList.add('textaside');
      div3.innerHTML = `
        <a href="#"><h4>${product.title}</h4><p>$${product.price}</p></a>
      `;

      div.append(div2, div3);
      aside.appendChild(div);
    });
  })}
  catch(error) {
    console.error('Error al cargar productos:', error);
  }};
  productos();

// 3. Usuario actual (imagen en dos lugares)

let usuarioUnico = null;
async function usuarioActual(){
  try{
    const usuariosApi = 'https://randomuser.me/api/?results=10';
    fetch(usuariosApi)
      .then(res => res.json())
      .then(data => {
        usuarioUnico = data.results[1];

        const imgHtml = `<a href="../perfil/perfil.html"><img src="${usuarioUnico.picture.medium}" alt=""></a>`;
        document.getElementById('userImg').innerHTML = imgHtml;
        document.getElementById('publishusr').innerHTML = imgHtml;
      });
  }
  catch(error){
    console.error('Error al cargar usuario:', error);
  }
}
usuarioActual();

  // 4. Publicaciones combinando usuarios + imágenes

async function publicaciones(){
  try{
    const apiImg = 'https://picsum.photos/v2/list?page=2&limit=10';
    const comments = 'https://jsonplaceholder.typicode.com/comments';
    const usuariosApi = 'https://randomuser.me/api/?results=10';
    
    const [userData, imgData,commentData] = await Promise.all([
      fetch(usuariosApi).then(res => res.json()),
      fetch(apiImg).then(res => res.json()),
      fetch(comments).then(res => res.json())
    ]);

    const users = userData.results;
    const contenedor = document.getElementById('contentPosted');

    users.forEach((usr, i) => {
      const imgPost = imgData[i];
      const commentuser = commentData[i];
      
      const post = document.createElement('div');
      post.classList.add('usercontentPosted');
      post.innerHTML = `
        
        <div class="user">
        <img src="${usr.picture.medium}" alt="Foto de ${usr.name.first}">
          <p>${usr.name.first} ${usr.name.last}</p>
        </div>
          <div class="imagecontent">
          <p>${commentuser.body}</p>
          <img src="${imgPost.download_url}" alt="Imagen aleatoria">
        </div>
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

      contenedor.appendChild(post);
      
      
        const likeBtn = document.querySelector('.like-btn');
        const likeCount = likeBtn.querySelector('.like-count');
        let liked = false;
  
        likeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          liked = !liked;
  
          if (liked) {
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
            likeBtn.classList.add('liked');
            console.log("Ta like");
            
          } else {
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            likeBtn.classList.remove('liked');
            console.log("Ta dislike");
          }
        });
    })
  }
  catch(err) {
    console.error('Error al generar publicaciones:', err);
  }
};

publicaciones();


  // contactos sugeridos 

async function contactosSugeridos(){
  try{
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
      })}
      catch(error){
        console.error('Error al cargar contactos:', error);
      }; 
    }
contactosSugeridos();
 

async function reels() {
  try {
    const API_KEY = '6bazFI50wrY3krzR0JjGa16r5yNvnkU2wzgaiHOIeoULaBPoCIrof2YF';
    const response = await fetch('https://api.pexels.com/videos/popular?per_page=10', {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

   
    const reelsContainer = document.getElementById('reels');

    const divR = document.createElement('div');
    divR.classList.add('reel');

    data.videos.slice(0,3).forEach(video => {
      const videoFile = video.video_files.find(v => v.quality === 'hd');
      if (videoFile) {
        const short = document.createElement('video');
        short.src = videoFile.link;
        short.controls = true;
        short.autoplay = false;
        short.muted = true;
        short.loop = true;
        reelsContainer.appendChild(divR);
        divR.appendChild(short);
        

      }
    });
    
  } catch (error) {
    console.error('Error al cargar reels:', error);
  }
};

reels();



// 
// AÑADIR: INTERACION EN LOS BOTONES DE COMPARTIR, ENVIAR, COMENTAR Y LIKE
// AÑADIR: FUNCIONAMIENTO EN EL MOMENTO DE CREAR UNA PUBLICACION(AÑADIR IMAGEN, CREAR EVENTO O ARTICULO)(TAMBIEN QUE SE PUEDA CREAR LA PUBLICACION (CRUD))
// 
//  
// 
// 
// 
// 


//Crear una publicacion
