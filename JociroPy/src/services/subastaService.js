import api from './api';

const subastaService = {
    obtenerSubastas: async () => {
        const response = await api.get('/subastas');
        return response.data.subastas;
    },

    obtenerSubastaPorId: async (id) => {
        const response = await api.get(`/subastas/${id}`);
        return response.data;
    },

    crearSubasta: async (datos) => {
        const response = await api.post('/subastas', datos);
        return response.data;
    },

    realizarPuja: async (id, monto) => {
        const response = await api.post(`/subastas/${id}/pujar`, { monto });
        return response.data;
    },

    misSubastas: async () => {
        const response = await api.get('/subastas/mis/subastas');
        return response.data.subastas;
    },

    misPujas: async () => {
        const response = await api.get('/subastas/mis/pujas');
        return response.data.pujas;
    }
};

export default subastaService;