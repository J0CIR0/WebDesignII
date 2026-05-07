import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import ProductoCard from './ProductoCard';
import ProductoForm from './ProductoForm';

const ProductoLista = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await productoService.obtenerProductos();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setCargando(false);
    }
  };

  const handleCrear = async (productoData) => {
    try {
      await productoService.crearProducto(productoData);
      setMostrarFormulario(false);
      cargarProductos();
    } catch (err) {
      setError('Error al crear producto');
    }
  };

  const handleActualizar = async (productoData) => {
    try {
      await productoService.actualizarProducto(productoEditando.id, productoData);
      setProductoEditando(null);
      setMostrarFormulario(false);
      cargarProductos();
    } catch (err) {
      setError('Error al actualizar producto');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await productoService.eliminarProducto(id);
        cargarProductos();
      } catch (err) {
        setError('Error al eliminar producto');
      }
    }
  };

  if (cargando) {
    return <div className="cargando">Cargando productos...</div>;
  }

  return (
    <div className="productos-container">
      <div className="header">
        <h2>Mis Productos</h2>
        <button className="btn-nuevo" onClick={() => { setProductoEditando(null); setMostrarFormulario(true); }}>
          + Nuevo Producto
        </button>
      </div>
      {error && <div className="error-mensaje">{error}</div>}
      {mostrarFormulario && (
        <ProductoForm
          productoInicial={productoEditando}
          onGuardar={productoEditando ? handleActualizar : handleCrear}
          onCancelar={() => { setMostrarFormulario(false); setProductoEditando(null); }}
        />
      )}
      {productos.length === 0 ? (
        <div className="sin-productos">
          <p>No tienes productos.</p>
          <p>Haz clic en "Nuevo Producto" para comenzar.</p>
        </div>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onEditar={(productoSeleccionado) => {
                setProductoEditando(productoSeleccionado);
                setMostrarFormulario(true);
              }}
              onEliminar={handleEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductoLista;