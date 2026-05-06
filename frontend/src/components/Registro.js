import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Registro = ({ onSuccess, onSwitchToLogin }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { registrar } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!nombre || !email || !password || !confirmarPassword) {
      setError('Completa todos los campos');
      return;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setCargando(true);
    try {
      await registrar(nombre, email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      let mensajeError = 'Error al registrarse';
      if (err.response?.data?.mensaje) {
        mensajeError = err.response.data.mensaje;
      } else if (err.response?.status === 400) {
        mensajeError = err.response.data?.mensaje || 'Datos inválidos';
      } else if (err.response?.status === 500) {
        mensajeError = 'Error en el servidor';
      } else if (err.message === 'Network Error') {
        mensajeError = 'No se puede conectar con el servidor';
      } else if (err.code === 'ECONNREFUSED') {
        mensajeError = 'Servidor no disponible';
      }

      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-mensaje">{error}</div>}
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required
            placeholder="Tu nombre"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="tu@email.com"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div className="form-group">
          <label>Confirmar Contraseña:</label>
          <input 
            type="password" 
            value={confirmarPassword} 
            onChange={(e) => setConfirmarPassword(e.target.value)} 
            required
            placeholder="Repite tu contraseña"
          />
        </div>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Cargando' : 'Registrarse'}
        </button>
      </form>
      <p className="switch-link">
        ¿Ya tienes cuenta? <button onClick={onSwitchToLogin} className="link-button">Ingresar</button>
      </p>
    </div>
  );
};

export default Registro;