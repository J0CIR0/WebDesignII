import api from './api';
const productoService = {
  obtenerProductos: async () => {
    try {
      const response = await api.get('/productos');
      return response.data.productos;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al cargar productos' };
    }
  },
  obtenerProductoPorId: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data.producto;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener producto' };
    }
  },
  crearProducto: async (producto) => {
    try {
      const response = await api.post('/productos', producto);
      return response.data.producto;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al crear producto' };
    }
  },
  actualizarProducto: async (id, producto) => {
    try {
      const response = await api.put(`/productos/${id}`, producto);
      return response.data.producto;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al actualizar producto' };
    }
  },
  eliminarProducto: async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al eliminar producto' };
    }
  },
};
export default productoService;