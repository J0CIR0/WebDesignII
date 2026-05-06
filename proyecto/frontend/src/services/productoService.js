import api from './api';

const productoService = {
  obtenerProductos: async () => {
    const response = await api.get('/productos');
    return response.data.productos;
  },
  crearProducto: async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },
  actualizarProducto: async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },
  eliminarProducto: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};

export default productoService;