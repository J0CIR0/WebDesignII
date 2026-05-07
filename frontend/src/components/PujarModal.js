import React, { useState, useEffect } from 'react';
import billeteraService from '../services/billeteraService';

const PujarModal = ({ subasta, onPujar, onCerrar, cargando }) => {
  const [montoPersonalizado, setMontoPersonalizado] = useState('');
  const [error, setError] = useState('');

  const ofertaActual = subasta.oferta_actual;
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    let mounted = true;
    const cargar = async () => {
      try {
        const s = await billeteraService.obtenerSaldo();
        if (mounted) setSaldo(s);
      } catch (e) {}
    };
    cargar();
    return () => { mounted = false; };
  }, []);

  const handlePujarPersonalizado = () => {
    const monto = parseFloat(montoPersonalizado);
    if (isNaN(monto)) {
      setError('Ingrese un monto valido');
      return;
    }
    if (monto <= ofertaActual) {
      setError(`El monto debe ser mayor a ${ofertaActual}`);
      return;
    }
    if (monto > saldo) {
      setError(`Saldo insuficiente. Necesitas Bs. ${monto} pero tienes Bs. ${saldo}`);
      return;
    }
    setError('');
    onPujar(monto);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Realizar Puja</h3>
        <p>Producto: {subasta.producto_nombre}</p>
        <p>Oferta actual: Bs. {subasta.oferta_actual}</p>
        <p>Precio minimo: Bs. {subasta.precio_minimo}</p>
        <p><strong>Tu saldo: Bs. {saldo}</strong></p>
        {error && <div className="error-mensaje">{error}</div>}
        <div className="monto-personalizado">
          <input type="number" placeholder="Monto personalizado" value={montoPersonalizado} onChange={(e) => setMontoPersonalizado(e.target.value)} />
          <button onClick={handlePujarPersonalizado} disabled={cargando || Number(montoPersonalizado) > saldo}>Pujar</button>
        </div>
        <button className="btn-cerrar" onClick={onCerrar}>Cancelar</button>
      </div>
    </div>
  );
};

export default PujarModal;