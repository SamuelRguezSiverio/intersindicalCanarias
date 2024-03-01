// CategoryCard.js
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CategoryCard.css'

const CategoryCard = () => {
  let { categoria } = useParams()
  let navigate = useNavigate()

  const onIniciarExamen = () => {
    navigate(`/laboral/${categoria}`)
  }

  // Configuración basada en el grupo de la categoría
  const configuracionExamen = {
    adjuntoCardiologia: { tiempoMax: 120, maxPreguntas: 100 },
    adjuntoGeriatria: { tiempoMax: 120, maxPreguntas: 100 },
    auxiliarAdministrativoFuncionAdministrativa: {
      tiempoMax: 90,
      maxPreguntas: 50,
    },
    auxiliarAlmacen: {tiempoMax: 90, maxPreguntas: 50},
    auxiliarEnfermeria: { tiempoMax: 90, maxPreguntas: 50 },
    ayudanteCocina: {tiempoMax: 90, maxPreguntas: 50},
    costureraLavanderaPlanchadora: {tiempoMax: 90, maxPreguntas: 50},
    enfermera: { tiempoMax: 120, maxPreguntas: 90 },
    lencera: {tiempoMax: 90, maxPreguntas: 50},
    limpiador: { tiempoMax: 90, maxPreguntas: 50 },
    tecnicoTituladoSuperior: {tiempoMax: 120, maxPreguntas: 100}
  }

  // Función para formatear el nombre de la categoría para la visualización
  const formatearNombreCategoria = (categoria) => {
    const formatos = {
      adjuntoCardiologia: 'Adjunto/a Cardiología',
      adjuntoGeriatria: 'Adjunto/a Geriatría',
      auxiliarAdministrativoFuncionAdministrativa:
        'Auxiliar Administrativo Función Administrativa',
      auxiliarAlmacen: 'Auxiliar Almacén',
      auxiliarEnfermeria: 'Auxiliar Enfermería',
      ayudanteCocina: 'Ayudante Cocina',
      costureraLavanderaPlanchadora: 'Costurera, Lavandera Planchadora',
      enfermera: 'Enfermero/a',
      lencera: 'Lencero/a',
      limpiador: 'Limpiador/a',
      tecnicoTituladoSuperior: 'Tecnico/a Titulado Superior',
    }
    return formatos[categoria] || categoria
  }

  // Obtener la configuración para la categoría actual
  const { tiempoMax, maxPreguntas } = configuracionExamen[categoria] || {
    tiempoMax: 0,
    maxPreguntas: 0,
  }

  return (
    <div className="category-card">
      <h2>{formatearNombreCategoria(categoria)}</h2>
      <h4>
        Recuerda que dispones de un tiempo de "{tiempoMax} minutos" para la
        realización de un cuestionario de "{maxPreguntas} preguntas". <br/>¡Ánimo y a
        por ello!
      </h4>
      <button onClick={onIniciarExamen}>Iniciar Examen</button>
    </div>
  )
}

export default CategoryCard
