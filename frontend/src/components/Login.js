import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Completa todos los campos');
      return;
    }

    setCargando(true);
    try {
      await login(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      let mensajeError = 'Error al iniciar sesion';
      if (err.response?.data?.mensaje) {
        mensajeError = err.response.data.mensaje;
      } else if (err.response?.status === 401) {
        mensajeError = 'Credenciales incorrectas';
      } else if (err.response?.status === 404) {
        mensajeError = 'Usuario no encontrado';
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
    <div className="login-container">
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error-mensaje">{error}</div>}
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
            placeholder="Contraseña"
          />
        </div>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Cargando' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;