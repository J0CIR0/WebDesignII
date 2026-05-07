import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import billeteraService from '../services/billeteraService';
import RecargarSaldoModal from '../components/RecargarSaldoModal';

const DashboardPage = () => {
  const { usuario } = useAuth();
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [mostrandoModal, setMostrandoModal] = useState(false);
  const [cargandoRecarga, setCargandoRecarga] = useState(false);

  const handleAgregarSaldo = async (numero) => {
    setMensaje('');
    setError('');

    try {
      setCargandoRecarga(true);
      const data = await billeteraService.agregarSaldo(numero);
      setMensaje(`Saldo actualizado. Nuevo saldo: ${data.saldo} GanaCoins`);
      setMostrandoModal(false);
      window.dispatchEvent(new Event('saldoActualizado'));
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo actualizar el saldo');
    } finally {
      setCargandoRecarga(false);
    }
  };

  return (
    <div className="container">
      <h1>Bienvenido, {usuario?.nombre}</h1>
      <p>Sistema de Subastas JociroPY</p>
      <div>
        <h3>Que puedes hacer?</h3>
        <ul>
          <li>Gestionar tus productos (CRUD)</li>
          <li>Crear subastas para tus productos</li>
          <li>Participar en subastas de otros usuarios</li>
          <li>Gestionar tu billetera GanaCoins</li>
        </ul>
      </div>
      <div className="billetera-panel">
        <h3>Tu billetera</h3>
        <p>Saldo disponible para tus pruebas: GanaCoins.</p>
        <button type="button" onClick={() => setMostrandoModal(true)}>Recargar saldo</button>
        {mensaje && <p className="exito-mensaje">{mensaje}</p>}
        {error && <p className="error-mensaje">{error}</p>}
      </div>
      {mostrandoModal && (
        <RecargarSaldoModal
          onCerrar={() => setMostrandoModal(false)}
          onRecargar={handleAgregarSaldo}
          cargando={cargandoRecarga}
        />
      )}
    </div>
  );
};

export default DashboardPage;