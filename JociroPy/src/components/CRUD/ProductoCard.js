import React from 'react';

const ProductoCard = ({ producto, onEditar, onEliminar }) => {
  const estaDisponible = producto.stock > 0;

  return (
    <div className={`producto-card ${estaDisponible ? 'disponible' : 'agotado'}`}>
      <h3>{producto.nombre}</h3>
      <p className="descripcion">{producto.descripcion || 'Sin descripción'}</p>
      <p className="precio">${producto.precio}</p>
      <p className="stock">
        {estaDisponible ? `Stock: ${producto.stock}` : 'Agotado'}
      </p>
      <div className="acciones">
        <button onClick={() => onEditar(producto)} className="btn-editar">
          Editar
        </button>
        <button onClick={() => onEliminar(producto.id)} className="btn-eliminar">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;