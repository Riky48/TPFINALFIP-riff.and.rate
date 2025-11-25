import "./Marketplace.css";
import { useState, useEffect } from "react";
import { useCart } from "../../components/Context/CartContext";
import { getProductos, addProductoCarrito } from "../../services/api";
import { Link } from "react-router-dom";

const categories = [
  "Todos",
  "Baterías",
  "Guitarras",
  "Teclados",
  "Micrófonos",
  "Accesorios",
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [productos, setProductos] = useState<any[]>([]);
  const { addToCart, removeFromCart } = useCart();
  const userId = 1; // temporal, después sacalo del usuario logueado

  useEffect(() => {
    getProductos()
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = productos.filter(
    (p) =>
      (activeCategory === "Todos" ||
        p.categorias?.some((c: any) => c.nombre === activeCategory)) &&
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (producto: any) => {
    // Primero lo agregamos al carrito local
    addToCart(producto);

    try {
      const res = await addProductoCarrito(userId, producto.id, 1);
      console.log("Producto agregado al carrito en back:", res.data);
    } catch (err) {
      console.error("Error agregando al carrito en backend:", err);
      // Opcional: revertir el addToCart si falla el backend
      removeFromCart(producto.id);
      alert("No se pudo agregar el producto al carrito. Intenta de nuevo.");
    }
  };

  return (
    <div className="marketplace-container">
      <h1>Marketplace de Instrumentos</h1>
      <p>Aquí vas a poder comprar y vender instrumentos</p>

      <Link to="/crear-producto" className="boton-crear">
        Subir producto
      </Link>

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
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="productos-grid">
        {filteredProducts.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img
              src={producto.img || "/placeholder.jpg"}
              alt={producto.nombre}
            />
            <h3>{producto.nombre}</h3>
            <p className="precio">
              ${Number(producto.precio).toLocaleString("es-AR")}
            </p>
            <button onClick={() => handleAddToCart(producto)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
