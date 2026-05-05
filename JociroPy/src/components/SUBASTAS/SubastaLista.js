import React, { useState, useEffect } from 'react';
import subastaService from '../services/subastaService';
import SubastaCard from './SubastaCard';
import { useNavigate } from 'react-router-dom';

const SubastaLista = () => {
    const [subastas, setSubastas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
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

    const handleClickSubasta = (id) => {
        navigate(`/subasta/${id}`);
    };

    if (cargando) {
        return <div className="cargando">Cargando subastas...</div>;
    }

    return (
        <div className="subastas-container">
            <h2>Subastas Activas</h2>
            {error && <div className="error-mensaje">{error}</div>}
            {subastas.length === 0 ? (
                <div className="sin-subastas">
                    <p>No hay subastas activas en este momento.</p>
                </div>
            ) : (
                <div className="subastas-grid">
                    {subastas.map((subasta) => (
                        <SubastaCard
                            key={subasta.id}
                            subasta={subasta}
                            onClick={handleClickSubasta}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubastaLista;