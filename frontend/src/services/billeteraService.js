import api from './api';

const billeteraService = {
  obtenerSaldo: async () => {
    const response = await api.get('/usuarios/saldo');
    return response.data.saldo;
  },
  agregarSaldo: async (monto) => {
    const response = await api.post('/usuarios/saldo/agregar', { monto });
    return response.data;
  }
};

export default billeteraService;