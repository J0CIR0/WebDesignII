import React, { useState, useEffect } from 'react';

const SubastaCard = ({ subasta, onClick }) => {
  const [tiempoRestante, setTiempoRestante] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const fechaFin = new Date(subasta.fecha_fin);
      const ahora = new Date();
      const diff = fechaFin - ahora;

      if (diff <= 0) {
        setTiempoRestante('Finalizada');
      } else {
        const horas = Math.floor(diff / (1000 * 60 * 60));
        const minutos = Math.floor((diff % 3600000) / 60000);
        setTiempoRestante(`${horas}h ${minutos}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [subasta.fecha_fin]);

  return (
    <div className="subasta-card" onClick={() => onClick(subasta.id)}>
      <h3>{subasta.producto_nombre}</h3>
      <div className="precios">
        <span>Inicial: ${subasta.precio_inicial}</span>
        <span>Actual: ${subasta.oferta_actual}</span>
      </div>
      <div className="tiempo">Tiempo restante: {tiempoRestante}</div>
      <div>Vendedor: {subasta.vendedor_nombre}</div>
    </div>
  );
};

export default SubastaCard;