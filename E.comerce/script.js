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

// --- NUEVOS ELEMENTOS PARA EDITAR ---
const editSection = document.getElementById("edit-product-section");
const editForm = document.getElementById("edit-product-form");
const editName = document.getElementById("edit-name");
const editDescription = document.getElementById("edit-description");
const editPrice = document.getElementById("edit-price");
const editStock = document.getElementById("edit-stock");
const cancelEdit = document.getElementById("cancel-edit");

let productoActualIndex = null; // Para saber qué producto estamos editando

// Mostrar productos
function cargarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `

  <img src="${producto.imagen}" alt="${producto.nombre}" />
  <h3>${producto.nombre}</h3>
  <p class="stock-text">Stock: ${producto.stock}</p>
  <p class="price">$${producto.precio}</p>
  <input type="number" min="1" max="${producto.stock}" value="1" class="producto-cantidad">
  <button class="producto-agregar" data-id="${index}">Agregar al carrito</button>
  <button class="producto-editar">Editar</button>
  <button class="producto-eliminar">Eliminar</button>
`;


    const btnAgregar = div.querySelector(".producto-agregar");
    btnAgregar.addEventListener("click", () => {
      const cantidad = parseInt(div.querySelector(".producto-cantidad").value);
      if (cantidad > 0 && cantidad <= producto.stock) { 
        producto.stock -= cantidad;
        div.querySelector(".stock-text").textContent = `Stock: ${producto.stock}`;

        agregarAlCarrito(producto, cantidad);
      }else{
        alert("No hay stock del producto");
      }
    });

    // Botón editar
    const btnEditar = div.querySelector(".producto-editar");
    btnEditar.addEventListener("click", () => {
      mostrarFormularioEdicion(index);
    });

    // Botón eliminar
    const btnEliminar = div.querySelector(".producto-eliminar");
    btnEliminar.addEventListener("click", () => {
      if (confirm(`¿Querés eliminar el producto "${producto.nombre}"?`)) {
        productos.splice(index, 1);
        cargarProductos();
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

// Mostrar formulario de edición con datos actuales
function mostrarFormularioEdicion(index) {
  productoActualIndex = index;
  const producto = productos[index];
  editName.value = producto.nombre;
  editDescription.value = producto.descripcion || "";
  editPrice.value = producto.precio;
  editStock.value = producto.stock;
  editSection.style.display = "block";  // Mostrar el formulario
  window.scrollTo(0, document.body.scrollHeight); // Scroll para que se vea
}

// Manejar envío del formulario de edición
editForm.addEventListener("submit", e => {
  e.preventDefault();
  if (productoActualIndex === null) return;

  // Actualizar producto
  productos[productoActualIndex].nombre = editName.value;
  productos[productoActualIndex].descripcion = editDescription.value;
  productos[productoActualIndex].precio = parseFloat(editPrice.value);
  productos[productoActualIndex].stock = parseInt(editStock.value);

  // Ocultar formulario y refrescar lista
  editSection.style.display = "none";
  productoActualIndex = null;
  cargarProductos();
});

// Cancelar edición
cancelEdit.addEventListener("click", () => {
  editSection.style.display = "none";
  productoActualIndex = null;
});

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
  reader.readAsDataURL(file); // Mostrar imagen local
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
