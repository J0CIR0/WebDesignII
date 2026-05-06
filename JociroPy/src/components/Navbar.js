import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import billeteraService from '../services/billeteraService';

const Navbar = () => {
  const { usuario, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      cargarSaldo();
    }
  }, [isAuthenticated]);

  const cargarSaldo = async () => {
    try {
      const saldoActual = await billeteraService.obtenerSaldo();
      setSaldo(saldoActual);
    } catch (error) {
      console.error('Error al cargar saldo');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          JociroPY
        </Link>
        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/productos" className="nav-link">
                Productos
              </Link>
              <Link to="/subastas" className="nav-link">
                Subastas
              </Link>
              <div className="nav-user">
                <span className="nav-saldo">💰 {saldo} GanaCoins</span>
                <span>Hola, {usuario?.nombre}</span>
                <button onClick={handleLogout} className="nav-logout">
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="nav-link">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="nav-link nav-registro">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;