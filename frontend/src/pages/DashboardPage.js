import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { usuario } = useAuth();

  return (
    <div className="container">
      <h1>Bienvenido, {usuario?.nombre}</h1>
      <p>Sistema de Subastas JociroPY</p>
      <div>
        <h3>Que puedes hacer?</h3>
        <ul>
          <li>Gestionar tus productos (CRUD)</li>
          <li>Crear subastas para tus productos</li>
          <li>Participar en subastas de otros usuarios</li>
          <li>Gestionar tu billetera GanaCoins</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;