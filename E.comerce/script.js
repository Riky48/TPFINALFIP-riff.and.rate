"use strict";

// Productos precargados
let productos = [
  { id: "1", nombre: "Bajo Eléctrico Fender",descripcion: "le falta 2 cuerdas", precio: 25000, imagen: "IMG/BAJO.jpeg", stock: 10 },
  { id: "2", nombre: "Guitarra Acústica Yamaha",descripcion: "usada desde 1940", precio: 32000, imagen: "IMG/GUITARRA.jpeg", stock: 8 },
  { id: "3", nombre: "Batería Electrónica Roland",descripcion: "viene sin vaquetas", precio: 60000, imagen: "IMG/BATAELEC.jpeg", stock: 5 }
];

let carrito = [];
let totalCarrito = 0;

// Elementos del DOM
const contenedor = document.getElementById("contenedor-productos");
const form = document.getElementById("product-form");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarritoElemento = document.getElementById("total-carrito");
const btnCheckout = document.getElementById("btn-checkout");
const cartCount = document.getElementById("cart-count");

// Mostrar productos
function cargarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p>Stock: ${producto.stock}</p>
      <p class="price">$${producto.precio}</p>
      <input type="number" min="1" max="${producto.stock}" value="1" class="producto-cantidad">
      <button class="producto-agregar" data-id="${index}">Agregar al carrito</button>
    `;

    const btnAgregar = div.querySelector(".producto-agregar");
    btnAgregar.addEventListener("click", () => {
      const cantidad = parseInt(div.querySelector(".producto-cantidad").value);
      if (cantidad > 0 && cantidad <= producto.stock) { 
        producto.stock -= cantidad;
        div.querySelector("p:nth-child(3)").textContent = `Stock: ${producto.stock}`;
        agregarAlCarrito(producto, cantidad);
      }else{
        alert("No hay stock del producto");
      }
    });

    contenedor.appendChild(div);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(producto, cantidad) {
  const existente = carrito.find(p => p.nombre === producto.nombre);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }
  totalCarrito += producto.precio * cantidad;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - ${p.cantidad} x $${p.precio} = $${p.cantidad * p.precio}`;
    listaCarrito.appendChild(li);
  });
  totalCarritoElemento.textContent = totalCarrito;
  cartCount.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

// Manejar formulario nuevo producto
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const cantidadStock = parseInt(document.getElementById("cantidadStock").value);
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  if (!file) return alert("Selecciona una imagen válida");

  const reader = new FileReader();
  reader.onload = function (event) {
    const product = {
      id: Date.now().toString(),
      nombre: name,
      descripcion: description,
      precio: price,
      imagen: event.target.result,
      stock: cantidadStock
    };
    productos.push(product);
    cargarProductos();
    form.reset();
  };
  reader.readAsDataURL(file); // <- Esto permite mostrar imagen cargada localmente
});

// Finalizar compra
btnCheckout.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("No hay productos en el carrito");
    return;
  }
  alert("¡Compra realizada con éxito!");
  carrito = [];
  totalCarrito = 0;
  actualizarCarrito();
});

cargarProductos();
