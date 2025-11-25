import { useState } from "react";
import "./CrearProducto.css"; 
import { crearProducto } from "../../services/api"; 

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: "",
    marca: "",
    img: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userId = 1; // después lo sacamos del usuario logueado
      await crearProducto(userId, form);
      alert("Producto creado con éxito!");
    } catch (e) {
      console.error(e);
      alert("Hubo un error creando el producto");
    }
  };

  return (
    <div className="crear-producto-container">
      <h2>Subir Producto</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            rows={4}
            value={form.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input name="categoria" value={form.categoria} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Marca</label>
          <input name="marca" value={form.marca} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>URL Imagen</label>
          <input name="img" value={form.img} onChange={handleChange} />
        </div>

        <button className="btn-crear" type="submit">Publicar</button>
      </form>
    </div>
  );
}
