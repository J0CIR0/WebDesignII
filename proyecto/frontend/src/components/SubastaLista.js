import React, { useState, useEffect } from 'react';
import subastaService from '../services/subastaService';
import SubastaCard from './SubastaCard';
import SubastaForm from './SubastaForm';
import { useNavigate } from 'react-router-dom';

const SubastaLista = () => {
  const [subastas, setSubastas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarSubastas();
  }, []);

  const cargarSubastas = async () => {
    try {
      setCargando(true);
      const data = await subastaService.obtenerSubastas();
      setSubastas(data);
    } catch (err) {
      setError('Error al cargar subastas');
    } finally {
      setCargando(false);
    }
  };

  const handleCrearSubasta = async (datos) => {
    try {
      await subastaService.crearSubasta(datos);
      setMostrarFormulario(false);
      cargarSubastas();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al crear subasta');
    }
  };

  const handleClickSubasta = (id) => {
    navigate(`/subasta/${id}`);
  };

  if (cargando) {
    return <div className="cargando">Cargando subastas...</div>;
  }

  return (
    <div className="subastas-container">
      <div className="header">
        <h2>Subastas Activas</h2>
        <button className="btn-nuevo" onClick={() => setMostrarFormulario(true)}>+ Nueva Subasta</button>
      </div>
      {error && <div className="error-mensaje">{error}</div>}
      {mostrarFormulario && (
        <SubastaForm onGuardar={handleCrearSubasta} onCancelar={() => setMostrarFormulario(false)} />
      )}
      {subastas.length === 0 ? (
        <div className="sin-subastas">
          <p>No hay subastas activas.</p>
          <p>Crea una nueva subasta para comenzar.</p>
        </div>
      ) : (
        <div className="subastas-grid">
          {subastas.map((subasta) => (
            <SubastaCard key={subasta.id} subasta={subasta} onClick={handleClickSubasta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubastaLista;