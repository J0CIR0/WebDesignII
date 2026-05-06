import api from './api';

const billeteraService = {
  obtenerSaldo: async () => {
    const response = await api.get('/usuarios/saldo');
    return response.data.saldo;
  }
};

export default billeteraService;