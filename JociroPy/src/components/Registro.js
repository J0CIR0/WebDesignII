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
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setCargando(true);
    try {
      await registrar(nombre, email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.mensaje || 'Error al registrarse');
    } finally {
      setCargando(false);
    }
  };
  return (
    <div className="registro-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-mensaje">{error}</div>}
        <div className="form-group">
          <label>Nombre completo:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Tu nombre completo"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="correo@ejemplo.com"
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
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
            placeholder="Repite tu contraseña"
          />
        </div>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className="switch-link">
        ¿Ya tienes cuenta?{' '}
        <button onClick={onSwitchToLogin} className="link-button">
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};
export default Registro;