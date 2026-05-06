import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioActual = authService.getUsuarioActual();
    setUsuario(usuarioActual);
    setCargando(false);
  }, []);

  const registrar = async (nombre, email, password) => {
    const data = await authService.registro(nombre, email, password);
    setUsuario(data.usuario);
    return data;
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUsuario(data.usuario);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUsuario(null);
  };

  const value = {
    usuario,
    cargando,
    registrar,
    login,
    logout,
    isAuthenticated: !!usuario,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};