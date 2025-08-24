import './Marketplace.css';
import { useState } from 'react';

const categories = ['Todos', 'Electrónica', 'Hogar', 'Ropa', 'Deportes', 'Otros'];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const productos = [
    {
      id: 1,
      nombre: 'Batería electrónica',
      precio: '$120.000',
      categoria: 'Electrónica',
      img: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Guitarra eléctrica',
      precio: '$80.000',
      categoria: 'Electrónica',
      img: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      nombre: 'Micrófono profesional',
      precio: '$25.000',
      categoria: 'Electrónica',
      img: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      nombre: 'Sillón reclinable',
      precio: '$50.000',
      categoria: 'Hogar',
      img: 'https://via.placeholder.com/150'
    },
  ];

  const filteredProducts =
    activeCategory === 'Todos'
      ? productos
      : productos.filter(p => p.categoria === activeCategory);

  return (
    <div className="marketplace-container">
      {/* --- Buscador y título --- */}
      <h1>Marketplace de Instrumentos</h1>
      <p>Aquí vas a poder comprar y vender instrumentos</p>
      <div className="search-marketplace">
        <input type="search" placeholder="Buscar productos..." />
      </div>

      {/* --- Barra de categorías --- */}
      <div className="categories-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- Grid de productos --- */}
      <div className="productos-grid">
  {filteredProducts.map(producto => (
    <div key={producto.id} className="producto-card">
      <img src={producto.img} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p className="precio">{producto.precio}</p>
      <button>Comprar</button>
    </div>
  ))}
</div>

    </div>
  );
}
