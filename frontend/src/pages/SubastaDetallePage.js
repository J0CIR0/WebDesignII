import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import subastaService from '../services/subastaService';
import PujarModal from '../components/PujarModal';
import { useAuth } from '../contexts/AuthContext';

const SubastaDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, usuario } = useAuth();
  const [subasta, setSubasta] = useState(null);
  const [ofertas, setOfertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pujando, setPujando] = useState(false);
  const [error, setError] = useState('');
  const [tiempoRestante, setTiempoRestante] = useState('');

  useEffect(() => {
    cargarSubasta();
  }, [id]);

  useEffect(() => {
    if (subasta) {
      const interval = setInterval(() => {
        actualizarTiempo();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [subasta]);

  const actualizarTiempo = () => {
    if (!subasta) return;
    const fechaFin = new Date(subasta.fecha_fin);
    const ahora = new Date();
    const diff = fechaFin - ahora;

    if (diff <= 0) {
      setTiempoRestante('Finalizada');
      return;
    }

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % 3600000) / 60000);
    const segundos = Math.floor((diff % 60000) / 1000);
    setTiempoRestante(`${horas}h ${minutos}m ${segundos}s`);
  };

  const cargarSubasta = async () => {
    try {
      setCargando(true);
      const data = await subastaService.obtenerSubastaPorId(id);
      setSubasta(data.subasta);
      setOfertas(data.ofertas);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cargar la subasta');
    } finally {
      setCargando(false);
    }
  };

  const handlePujar = async (monto) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setPujando(true);
    try {
      await subastaService.realizarPuja(id, monto);
      await cargarSubasta();
      setMostrarModal(false);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al realizar puja');
    } finally {
      setPujando(false);
    }
  };

  if (cargando) {
    return <div className="cargando">Cargando...</div>;
  }

  if (error) {
    return <div className="error-mensaje">{error}</div>;
  }

  if (!subasta) {
    return <div className="error-mensaje">Subasta no encontrada</div>;
  }

  const esMiSubasta = usuario && subasta.vendedor_id === usuario.id;
  const puedePujar = isAuthenticated && !esMiSubasta && subasta.activa && tiempoRestante !== 'Finalizada';

  return (
    <div className="subasta-detalle">
      <button className="btn-volver" onClick={() => navigate('/subastas')}>Volver</button>
      <h2>{subasta.producto_nombre}</h2>
      <div className="detalle-info">
        <p>{subasta.producto_descripcion}</p>
        <p><strong>Vendedor:</strong> {subasta.vendedor_nombre}</p>
        <p><strong>Precio inicial:</strong> Bs. {subasta.precio_inicial}</p>
        <p><strong>Precio minimo:</strong> Bs. {subasta.precio_minimo}</p>
        <p><strong>Oferta actual:</strong> Bs. {subasta.oferta_actual}</p>
        <p><strong>Tiempo restante:</strong> {tiempoRestante}</p>
      </div>
      {puedePujar && (
        <button className="btn-pujar" onClick={() => setMostrarModal(true)}>Realizar Puja</button>
      )}
      {esMiSubasta && subasta.activa && (
        <div className="tu-subasta-info"><p>Esta es tu subasta. No puedes pujar.</p></div>
      )}
      <div className="ofertas-list">
        <h3>Historial de Ofertas</h3>
        {ofertas.length === 0 ? (
          <p>No hay ofertas aún. ¡Sé el primero!</p>
        ) : (
          <table>
            <thead>
              <tr><th>Usuario</th><th>Monto</th><th>Referencia</th></tr>
            </thead>
            <tbody>
              {ofertas.map((oferta) => (
                <tr key={oferta.id}>
                  <td>{oferta.usuario_nombre}</td>
                  <td>Bs. {oferta.monto}</td>
                  <td>#{oferta.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {mostrarModal && (
        <PujarModal subasta={subasta} onPujar={handlePujar} onCerrar={() => setMostrarModal(false)} cargando={pujando} />
      )}
    </div>
  );
};

export default SubastaDetallePage;