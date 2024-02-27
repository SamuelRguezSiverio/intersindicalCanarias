// Laboral.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Laboral.css'

const Laboral = () => {
  const categoriasLaborales = [
    'adjuntoCardiologia',
    'adjuntoGeriatria',
    'auxiliarAdministrativoFuncionAdministrativa',
    'auxiliarEnfermeria',
    'enfermera',
    'limpiador',
  ]

  const [busqueda, setBusqueda] = useState('')

  const categoriasFiltradas =
    busqueda.length === 0
      ? categoriasLaborales
      : categoriasLaborales.filter((categoria) =>
          categoria.toLowerCase().includes(busqueda.toLowerCase())
        )

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
            to={`/laboral/${categoria}`}
            className="animated-button"
          >
            {categoria.replace(/([A-Z])/g, ' $1').trim()}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Laboral
