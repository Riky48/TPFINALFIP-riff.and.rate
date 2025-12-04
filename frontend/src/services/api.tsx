import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor JWT simple
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Cast a any para evitar errores de tipos
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});



// ======================
// PRODUCTOS
// ======================
export const getProductos = () => API.get("/productos");
export const getProducto = (id: number) => API.get(`/productos/${id}`);
export const searchProductos = (nombre: string) => API.get(`/productos/search/${nombre}`);
export const crearProducto = (data: any) => API.post("/productos", data);
export const updateProducto = (id: number, data: any) => API.put(`/productos/${id}`, data);
export const deleteProducto = (id: number) => API.delete(`/productos/${id}`);

// ======================
// CARRITO
// ======================
export const addProductoCarrito = (productoId: number, cantidad: number) =>
  API.post(`/carrito/add`, { productoId, cantidad });

export const clearCarrito = () =>
  API.delete(`/carrito/clear`);

export const removeProductoCarrito = (productoId: number) =>
  API.delete(`/carrito/remove/${productoId}`);


// ======================
// PEDIDOS
// ======================
export const createPedido = (userId: number) => API.post(`/pedido/checkout`);
export const getPedidos = () => API.get(`/pedido`);


// ======================
// CATEGORÍAS
// ======================
export const getCategorias = () => API.get("/categorias");

// ======================
// MARCAS
// ======================
export const getMarcas = () => API.get("/marcas");

export default API;
