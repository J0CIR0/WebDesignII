import api from './api';

const billeteraService = {
    obtenerSaldo: async () => {
        const response = await api.get('/usuarios/saldo');
        return response.data.saldo;
    },

    recargarCredits: async (monto) => {
        const response = await api.post('/usuarios/recargar', { monto });
        return response.data;
    }
};

export default billeteraService;