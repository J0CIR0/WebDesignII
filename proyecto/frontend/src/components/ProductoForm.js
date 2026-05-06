import React, { useState, useEffect } from 'react';

const ProductoForm = ({ productoInicial, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio_fijo: '',
    stock: ''
  });

  useEffect(() => {
    if (productoInicial) {
      setFormData({
        nombre: productoInicial.nombre,
        descripcion: productoInicial.descripcion || '',
        precio_fijo: productoInicial.precio_fijo,
        stock: productoInicial.stock
      });
    }
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...formData,
      precio_fijo: parseFloat(formData.precio_fijo),
      stock: parseInt(formData.stock) || 0
    });
  };

  return (
    <div className="producto-form-modal">
      <div className="modal-content">
        <h3>{productoInicial ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Descripcion</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio (Bs.)</label>
              <input type="number" name="precio_fijo" value={formData.precio_fijo} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} min="0" />
            </div>
          </div>
          <div className="modal-acciones">
            <button type="button" onClick={onCancelar} className="btn-cancelar">Cancelar</button>
            <button type="submit" className="btn-guardar">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;