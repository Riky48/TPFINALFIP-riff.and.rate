'use strict'

const btninav = document.getElementById('btninav');
const dropdown = document.getElementById('dropdown-menu');

btninav.addEventListener('click', (e) => {
  e.preventDefault(); // evita enviar el formulario
  dropdown.classList.toggle('show');
});

// Cerrar el menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!btninav.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});



// API PRODUCTOS (Cambiar por una de productos musicales proximamente) (ASIDE)


fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data => {
              console.log(data);
              
            
let aside = document.querySelector('aside');
        
data.slice(0,2).forEach( product => {

  const div = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  
  div2.innerHTML = `<a href=""><img src="${product.image}" alt="${product.title}" class="asideimg" width="50vw"></a>`;
  aside.appendChild(div);
  div.appendChild(div2);
  div.appendChild(div3);
  div3.innerHTML = `<a href=""><h4> ${product.title}</h4>
                  <p>$${product.price}</p></a>
`
  div.classList = ('divcontenido')
  div2.classList = ('imgaside')
  div3.classList = ('textaside')
});
})
            .catch(error => {

              console.log('A ocurrido un error al consumir la API(Productos):',error);
              
            });

// Api para generar usuarios random

const usuariosApi = 'https://randomuser.me/api/?results=3';

fetch(usuariosApi)
            .then(res => res.json())
            .then(usuarios => {
              console.log(usuarios);

let contenedorImg = document.getElementById('userImg');
let contenedorImg2 = document.getElementById('publishusr')

usuarios.results.slice(0,1).forEach(usuarioUnico =>{
  contenedorImg.innerHTML = `<a href="#"><img src="${usuarioUnico.picture.medium}" alt=""></a>`
  contenedorImg2.innerHTML = `<a href="#"><img src="${usuarioUnico.picture.medium}" alt=""></a>`

}
)







let contenedor = document.getElementById('contentPosted');

usuarios.results.forEach( usr => {
let divusr = document.createElement('div');

  divusr.innerHTML = `<p>${usr.gender}</p>
                      <p>${usr.name.title}</p>    
                      <p>${usr.name.first}</p>
                      <p>${usr.name.last}</p>               
  `;
  contenedor.appendChild(divusr);

});
            });