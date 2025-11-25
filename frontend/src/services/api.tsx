import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Puerto del back
});

// Productos
export const getProductos = () => API.get('/productos');

// Carrito
export const addProductoCarrito = (userId: number, productoId: number, cantidad: number) =>
  API.post(`/carrito/${userId}/add`, { productoId, cantidad });

export const clearCarrito = (userId: number) =>
  API.delete(`/carrito/${userId}/clear`);

// Pedidos
export const createPedido = (userId: number) =>
  API.post(`/pedido/${userId}/checkout`);

// Categorías
export const getCategorias = () => API.get('/categorias');

// Marcas
export const getMarcas = () => API.get('/marcas');

// Crear producto
export const crearProducto = (userId: number, data: any) =>
  API.post('/productos', data);


