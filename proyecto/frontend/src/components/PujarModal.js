import React, { useState } from 'react';

const PujarModal = ({ subasta, onPujar, onCerrar, cargando }) => {
  const [montoPersonalizado, setMontoPersonalizado] = useState('');
  const [error, setError] = useState('');

  const ofertaActual = subasta.oferta_actual;
  const montosSugeridos = [
    ofertaActual + 10,
    ofertaActual + 50,
    ofertaActual + 100
  ];

  const handlePujarConMonto = (monto) => {
    if (monto <= ofertaActual) {
      setError(`El monto debe ser mayor a ${ofertaActual}`);
      return;
    }
    setError('');
    onPujar(monto);
  };

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
        {error && <div className="error-mensaje">{error}</div>}
        <div className="montos-sugeridos">
          <button onClick={() => handlePujarConMonto(montosSugeridos[0])}>+10 (Bs. {montosSugeridos[0]})</button>
          <button onClick={() => handlePujarConMonto(montosSugeridos[1])}>+50 (Bs. {montosSugeridos[1]})</button>
          <button onClick={() => handlePujarConMonto(montosSugeridos[2])}>+100 (Bs. {montosSugeridos[2]})</button>
        </div>
        <div className="monto-personalizado">
          <input type="number" placeholder="Monto personalizado" value={montoPersonalizado} onChange={(e) => setMontoPersonalizado(e.target.value)} />
          <button onClick={handlePujarPersonalizado} disabled={cargando}>Pujar</button>
        </div>
        <button className="btn-cerrar" onClick={onCerrar}>Cancelar</button>
      </div>
    </div>
  );
};

export default PujarModal;