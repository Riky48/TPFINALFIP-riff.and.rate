import { Producto, useCart } from '../../components/Context/CartContext';
import './Marketplace.css';
import { useState } from 'react';




const categories = ['Todos', 'Baterías', 'Guitarras', 'Teclados', 'Micrófonos', 'Accesorios'];

const productos: Producto[] = [
  { id: 1, nombre: 'Batería electrónica Roland', categoria: 'Baterías', precio: 120000, img: '/bateria.jpg' },
  { id: 2, nombre: 'Guitarra Fender Stratocaster', categoria: 'Guitarras', precio: 80000, img: '/guitarra.jpg' },
  { id: 3, nombre: 'Teclado Yamaha PSR', categoria: 'Teclados', precio: 50000, img: '/teclado.jpg' },
  { id: 4, nombre: 'Micrófono Shure SM58', categoria: 'Micrófonos', precio: 25000, img: '/mic.jpg' },
  { id: 5, nombre: 'Set de baquetas Pro', categoria: 'Accesorios', precio: 5000, img: '/baquetas.jpg' },
  { id: 6, nombre: 'Amplificador guitarra 30W', categoria: 'Accesorios', precio: 40000, img: '/ampli.jpg' },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart(); // usamos el hook

  const filteredProducts = productos.filter(p => 
    (activeCategory === 'Todos' || p.categoria === activeCategory) &&
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="marketplace-container">
      <h1>Marketplace de Instrumentos</h1>
      <p>Aquí vas a poder comprar y vender instrumentos</p>

      {/* Buscador */}
      <div className="search-marketplace">
        <input 
          type="search" 
          placeholder="Buscar productos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categorías */}
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

      {/* Grid de productos */}
      <div className="productos-grid">
        {filteredProducts.map(producto => (
          <div key={producto.id} className="producto-card">
            <img src={producto.img} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>
            <button onClick={() => addToCart(producto)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
