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