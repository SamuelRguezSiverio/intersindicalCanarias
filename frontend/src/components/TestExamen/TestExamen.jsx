// TestExamen.js
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import './TestExamen.css';

const TestExamen = () => {
  const { preguntas } = useLoaderData();
  const [indiceActual, setIndiceActual] = useState(0);
  const [seleccionado, setSeleccionado] = useState(null);
  const [temporizador, setTemporizador] = useState(120); // Iniciar con 2 minutos por pregunta
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    if (!finalizado) {
      const timer = setTimeout(() => {
        if (temporizador > 0) {
          setTemporizador(temporizador - 1);
        } else {
          setFinalizado(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [temporizador, finalizado]);

  const manejarRespuesta = (respuesta) => {
    setSeleccionado(respuesta);
    if (respuesta !== preguntas[indiceActual].correct_answer) {
      setTimeout(() => {
        alert(`La respuesta correcta era: ${preguntas[indiceActual].correct_answer}`);
        siguientePregunta();
      }, 1000);
    } else {
      siguientePregunta();
    }
  };

  const siguientePregunta = () => {
    const siguienteIndice = indiceActual + 1;
    if (siguienteIndice < preguntas.length) {
      setIndiceActual(siguienteIndice);
      setSeleccionado(null);
      setTemporizador(120);
    } else {
      setFinalizado(true);
    }
  };

  if (!preguntas || preguntas.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <div className="test-container">
      <div className="test-wrapper">
        {finalizado ? (
          <div className="test-finalizado">Examen finalizado</div>
        ) : (
          <>
            <p className="test-timer">Temporizador: {temporizador}</p>
            <div>
              <p className="test-question">{preguntas[indiceActual].question}</p>
              {[
                preguntas[indiceActual].correct_answer,
                ...preguntas[indiceActual].incorrect_answers,
              ].sort().map((respuesta, index) => (
                <button
                  key={index}
                  onClick={() => manejarRespuesta(respuesta)}
                  className={`test-button ${
                    seleccionado === respuesta
                      ? respuesta === preguntas[indiceActual].correct_answer
                        ? 'test-button-correct'
                        : 'test-button-incorrect'
                      : ''
                  }`}
                  disabled={!!seleccionado}
                >
                  {respuesta}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestExamen;
