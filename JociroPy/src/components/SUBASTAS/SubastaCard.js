import React from 'react';

const SubastaCard = ({ subasta, onClick }) => {
    const fechaFin = new Date(subasta.fecha_fin);
    const ahora = new Date();
    const tiempoRestante = Math.max(0, fechaFin - ahora);
    const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (3600000)) / 60000);

    return (
        <div className="subasta-card" onClick={() => onClick(subasta.id)}>
            <h3>{subasta.producto_nombre}</h3>
            <p className="descripcion">{subasta.producto_descripcion?.substring(0, 100)}</p>
            <div className="precios">
                <span>Inicial: ${subasta.precio_inicial}</span>
                <span>Actual: ${subasta.oferta_actual}</span>
            </div>
            <div className="tiempo">
                <span>Tiempo restante: {horas}h {minutos}m</span>
            </div>
            <div className="vendedor">
                <span>Vendedor: {subasta.vendedor_nombre}</span>
            </div>
        </div>
    );
};

export default SubastaCard;