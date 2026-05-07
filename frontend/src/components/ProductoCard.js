import React from 'react';

const ProductoCard = ({ producto, onEditar, onEliminar }) => {
  return (
    <div className="producto-card">
      <h3>{producto.nombre}</h3>
      <p className="descripcion">{producto.descripcion || 'Sin descripcion'}</p>
      <p className="precio">Bs. {producto.precio_fijo}</p>
      <div className="acciones">
        <button onClick={() => onEditar(producto)} className="btn-editar">Editar</button>
        <button onClick={() => onEliminar(producto.id)} className="btn-eliminar">Eliminar</button>
      </div>
    </div>
  );
};

export default ProductoCard;