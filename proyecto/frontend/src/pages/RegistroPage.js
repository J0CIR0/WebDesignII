import React from 'react';
import { useNavigate } from 'react-router-dom';
import Registro from '../components/Registro';

const RegistroPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  const handleSwitchToLogin = () => {
    navigate('/login');
  };

  return <Registro onSuccess={handleSuccess} onSwitchToLogin={handleSwitchToLogin} />;
};

export default RegistroPage;