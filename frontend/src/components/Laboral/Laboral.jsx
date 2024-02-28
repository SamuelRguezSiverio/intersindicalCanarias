// Laboral.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Laboral.css';

const Laboral = () => {
  const categoriasLaborales = [
    'adjuntoCardiologia',
    'adjuntoGeriatria',
    'auxiliarAdministrativoFuncionAdministrativa',
    'auxiliarEnfermeria',
    'enfermera',
    'limpiador',
  ];

  const [busqueda, setBusqueda] = useState('');

  const categoriasFiltradas =
    busqueda.length === 0
      ? categoriasLaborales
      : categoriasLaborales.filter((categoria) =>
          categoria.toLowerCase().includes(busqueda.toLowerCase())
        );

  // Función para formatear el nombre de la categoría para la visualización
  const formatearNombreCategoria = (categoria) => {
    const formatos = {
      'adjuntoCardiologia': 'Adjunto/a Cardiología',
      'adjuntoGeriatria': 'Adjunto/a Geriatría',
      'auxiliarAdministrativoFuncionAdministrativa': 'Auxiliar Administrativo Función Administrativa',
      'auxiliarEnfermeria': 'Auxiliar Enfermería',
      'enfermera': 'Enfermero/a',
      'limpiador': 'Limpiador/a',
    };
    return formatos[categoria] || categoria;
  };

  return (
    <div className="laboral-container">
      <h2>Categorías Laborales</h2>
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="search-input"
      />

      <div className="categories-container">
        {categoriasFiltradas.map((categoria, index) => (
          <Link
            key={index}
            to={`/laboral/categoria/${categoria}`}
            className="animated-button"
          >
            {formatearNombreCategoria(categoria)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Laboral;
