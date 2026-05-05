import api from './api';
const authService = {
  registro: async (nombre, email, password) => {
    try {
      const response = await api.post('/usuarios/registro', {
        nombre,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },
  login: async (email, password) => {
    try {
      const response = await api.post('/usuarios/login', {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
  getUsuarioActual: () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
};
export default authService;