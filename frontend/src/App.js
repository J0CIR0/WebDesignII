import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import ProductosPage from './pages/ProductosPage';
import SubastasPage from './pages/SubastasPage';
import SubastaDetallePage from './pages/SubastaDetallePage';
import PerfilPage from './pages/PerfilPage';
import './App.css';

const RutaProtegida = ({ children }) => {
  const { isAuthenticated, cargando } = useAuth();
  if (cargando) {
    return <div className="cargando">Cargando...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/" element={<RutaProtegida><SubastasPage /></RutaProtegida>} />
        <Route path="/productos" element={<RutaProtegida><ProductosPage /></RutaProtegida>} />
        <Route path="/subastas" element={<RutaProtegida><SubastasPage /></RutaProtegida>} />
        <Route path="/subasta/:id" element={<RutaProtegida><SubastaDetallePage /></RutaProtegida>} />
        <Route path="/perfil" element={<RutaProtegida><PerfilPage /></RutaProtegida>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;