import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';

const SubastaForm = ({ onGuardar, onCancelar }) => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    producto_id: '',
    precio_inicial: '',
    precio_minimo: '',
    duracion_horas: 24,
    tiempo_extra_minutos: 5,
    fecha_inicio: ''
  });

  useEffect(() => {
    cargarProductos();
    const ahora = new Date();
    const fechaLocal = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000);
    setFormData(prev => ({
      ...prev,
      fecha_inicio: fechaLocal.toISOString().slice(0, 16)
    }));
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await productoService.obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar({
      ...formData,
      precio_inicial: parseFloat(formData.precio_inicial),
      precio_minimo: parseFloat(formData.precio_minimo),
      duracion_horas: parseInt(formData.duracion_horas),
      tiempo_extra_minutos: parseInt(formData.tiempo_extra_minutos)
    });
  };

  return (
    <div className="subasta-form-modal">
      <div className="modal-content">
        <h3>Crear Nueva Subasta</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Producto</label>
            <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
              <option value="">Seleccionar producto</option>
              {productos.map(producto => (
                <option key={producto.id} value={producto.id}>{producto.nombre} - Bs. {producto.precio_fijo}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio Inicial</label>
              <input type="number" name="precio_inicial" value={formData.precio_inicial} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-group">
              <label>Precio Minimo</label>
              <input type="number" name="precio_minimo" value={formData.precio_minimo} onChange={handleChange} step="0.01" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Duracion (horas)</label>
              <input type="number" name="duracion_horas" value={formData.duracion_horas} onChange={handleChange} min="1" max="168" required />
            </div>
            <div className="form-group">
              <label>Tiempo Extra (minutos)</label>
              <input type="number" name="tiempo_extra_minutos" value={formData.tiempo_extra_minutos} onChange={handleChange} min="1" max="30" required />
            </div>
          </div>
          <div className="form-group">
            <label>Fecha de Inicio</label>
            <input type="datetime-local" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
          </div>
          <div className="modal-acciones">
            <button type="button" onClick={onCancelar} className="btn-cancelar">Cancelar</button>
            <button type="submit" className="btn-guardar">Crear Subasta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubastaForm;