import { useState } from "react";
import API from "../../services/api"; // axios con JWT
import "./CrearProducto.css";

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categorias: "",
    marca: "",
    img: "",
  });

  // const [debug, setDebug] = useState<string>(""); // <- debug comentado

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        stock: Number(form.stock),
        categorias: form.categorias ? [form.categorias.trim()] : [],
        marca: form.marca,
        img: form.img || undefined,
      };

      // console.log("Payload a enviar:", payload);
      // setDebug(`Payload a enviar:\n${JSON.stringify(payload, null, 2)}`);

      const response = await API.post("/productos", payload);

      // console.log("Respuesta del backend:", response);
      // setDebug(prev => prev + `\nRespuesta del backend:\n${JSON.stringify(response.data, null, 2)}`);

      alert("Producto creado con éxito!");

      // resetear form
      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categorias: "",
        marca: "",
        img: "",
      });
    } catch (error: any) {
      console.error("Error en creación:", error);
      // if (error.response) {
      //   setDebug(`Error del backend (${error.response.status}):\n${JSON.stringify(error.response.data, null, 2)}`);
      // } else {
      //   setDebug(`Error en frontend:\n${error.message}`);
      // }

      alert("Hubo un error creando el producto. Revisá la consola.");
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
          />
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input
            name="precio"
            type="number"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <input name="categorias" value={form.categorias} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Marca</label>
          <input name="marca" value={form.marca} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>URL Imagen</label>
          <input name="img" value={form.img} onChange={handleChange} />
        </div>

        <button className="btn-crear" type="submit">
          Publicar
        </button>
      </form>

      {/* {debug && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap", background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
          <strong>Debug:</strong>
          <br />
          {debug}
        </div>
      )} */}
    </div>
  );
}
