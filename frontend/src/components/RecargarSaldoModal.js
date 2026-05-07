import React, { useState } from 'react';

const RecargarSaldoModal = ({ onCerrar, onRecargar, cargando }) => {
  const [monto, setMonto] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numero = Number(monto);
    if (Number.isNaN(numero) || numero <= 0) {
      setError('Ingresa un monto valido mayor a 0');
      return;
    }

    setError('');
    await onRecargar(numero);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Recargar GanaCoins</h3>
        <p>Ingresa el monto que deseas agregarte a tu saldo de prueba.</p>
        {error && <div className="error-mensaje">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Monto</label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Ej. 100"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          <div className="modal-acciones">
            <button type="button" className="btn-cancelar" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" disabled={cargando}>
              {cargando ? 'Recargando...' : 'Recargar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecargarSaldoModal;