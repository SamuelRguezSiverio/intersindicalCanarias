// Results.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css'
const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const porcentajeAciertos = ((state.aciertos / state.total) * 100).toFixed(0);

  return (
    <div className="results-container">
      <h1>Resultados del Examen</h1>
      <p className='bodyText'>Tu puntuación es de un </p>
      <p className='percentText'>{porcentajeAciertos}%</p>
      <p className='bodyText'>({state.aciertos} de {state.total} preguntas)</p>
      <button className='results-button' onClick={() => navigate(-2)}>Empecemos de nuevo</button>
    </div>
  );
};

export default Results;
