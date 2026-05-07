import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import billeteraService from '../services/billeteraService';
import RecargarSaldoModal from '../components/RecargarSaldoModal';

const PerfilPage = () => {
  const { usuario } = useAuth();
  const [saldo, setSaldo] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const s = await billeteraService.obtenerSaldo();
        setSaldo(s);
      } catch (e) {}
    };
    cargar();
  }, []);

  const handleRecargar = async (monto) => {
    setCargando(true);
    try {
      const res = await billeteraService.agregarSaldo(monto);
      if (res && res.saldo !== undefined) {
        setSaldo(res.saldo);
        window.dispatchEvent(new Event('saldoActualizado'));
      }
      setModalOpen(false);
    } catch (e) {}
    setCargando(false);
  };

  return (
    <div className="perfil-page">
      <h2>Mi Perfil</h2>
      <div className="perfil-detalles">
        <p><strong>Nombre:</strong> {usuario?.nombre}</p>
        <p><strong>Email:</strong> {usuario?.email}</p>
        <p><strong>Saldo:</strong> {saldo} GanaCoins</p>
        <button onClick={() => setModalOpen(true)} className="btn-recargar">Recargar saldo</button>
      </div>

      {modalOpen && (
        <RecargarSaldoModal onCerrar={() => setModalOpen(false)} onRecargar={handleRecargar} cargando={cargando} />
      )}
    </div>
  );
};

export default PerfilPage;
