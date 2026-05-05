import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const Navbar = () => {
  const { usuario, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Web4Community
        </Link>
        <div className="nav-menu">
          {isAuthenticated ? (
            <>
              <Link to="/productos" className="nav-link">
                Productos
              </Link>
              <div className="nav-user">
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