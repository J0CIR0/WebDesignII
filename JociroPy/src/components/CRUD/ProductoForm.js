import React, { useState, useEffect } from 'react';

const ProductoForm = ({ productoInicial, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const [errores, setErrores] = useState({});

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (productoInicial) {
      setFormData({
        nombre: productoInicial.nombre,
        descripcion: productoInicial.descripcion || '',
        precio: productoInicial.precio,
        stock: productoInicial.stock,
      });
    }
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Limpiar error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formData.precio || formData.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0';
    }

    if (formData.stock && formData.stock < 0) {
      nuevosErrores.stock = 'El stock no puede ser negativo';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onGuardar({
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock) || 0,
      });
    }
  };

  return (
    <div className="producto-form-modal">
      <div className="modal-content">
        <h3>{productoInicial ? 'Editar Producto' : 'Nuevo Producto'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Smartphone Galaxy"
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Descripción del producto..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio (Bs) *</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
              {errores.precio && <span className="error">{errores.precio}</span>}
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
              />
              {errores.stock && <span className="error">{errores.stock}</span>}
            </div>
          </div>

          <div className="modal-acciones">
            <button type="button" onClick={onCancelar} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;