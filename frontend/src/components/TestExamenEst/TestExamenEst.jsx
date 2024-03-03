import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './TestExamenEst.css';

// Función para mezclar elementos de un array
const mezclarElementos = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // Mientras queden elementos a mezclar...
  while (0 !== currentIndex) {
    // Seleccionar un elemento sin mezclar...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E intercambiarlo con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const TestExamenEst = () => {
  const { preguntas } = useLoaderData();
  const [preguntasMezcladas, setPreguntasMezcladas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const temporizadorRef = useRef(null);
  const navigate = useNavigate();

  // Configuración basada en el grupo de la categoría
  const configuracionExamen = {
    A1: { maxPreguntas: 100, tiempoMax: 120 },
    A2: { maxPreguntas: 90, tiempoMax: 120 },
    default: { maxPreguntas: 50, tiempoMax: 90 },
  };

  // Establecer configuración inicial basada en el grupo de la categoría
  useEffect(() => {
    if (preguntas && preguntas.length > 0 && temporizadorRef.current === null) {
      const grupoCategoria = preguntas[0].group;
      const { maxPreguntas, tiempoMax } =
        configuracionExamen[grupoCategoria] || configuracionExamen['default'];

      const preguntasConOpcionesMezcladas = preguntas.map((pregunta) => {
        const opcionesMezcladas = mezclarElementos([
          pregunta.correct_answer,
          ...pregunta.incorrect_answers,
        ]);
        return { ...pregunta, opciones: opcionesMezcladas };
      });

      setPreguntasMezcladas(
        mezclarElementos(preguntasConOpcionesMezcladas).slice(0, maxPreguntas)
      );

      temporizadorRef.current = tiempoMax * 60; // Convertir minutos a segundos
      setTiempoRestante(temporizadorRef.current); // Actualizamos el estado para reflejar en el DOM
    }
  }, [preguntas, configuracionExamen]);

  // Nuevo useEffect para manejar el temporizador
  useEffect(() => {
    const tick = () => {
      temporizadorRef.current -= 1;
      setTiempoRestante(temporizadorRef.current); // Actualizamos el estado para reflejar en el DOM
      if (temporizadorRef.current === 0) {
        setFinalizado(true);
      }
    };

    if (!finalizado && temporizadorRef.current > 0) {
      const timerId = setInterval(tick, 1000);
      return () => clearInterval(timerId);
    }
  }, [finalizado]);

  const manejarRespuesta = (respuesta) => {
    setRespuestaSeleccionada(respuesta);
    if (respuesta === preguntasMezcladas[indiceActual].correct_answer) {
      setAciertos(aciertos + 1);
    }
  };

  const siguientePregunta = () => {
    const siguienteIndice = indiceActual + 1;
    if (siguienteIndice < preguntasMezcladas.length) {
      setIndiceActual(siguienteIndice);
      setRespuestaSeleccionada(null);
    } else {
      navigate('/results', {
        state: { aciertos, total: preguntasMezcladas.length },
      });
    }
  };

  const reiniciarExamen = () => {
    navigate(-1); // Vuelve a la pantalla anterior
  };

  if (!preguntasMezcladas || preguntasMezcladas.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  const preguntaActual = preguntasMezcladas[indiceActual];

  return (
    <div className="test-container">
      <div className="test-wrapper">
        {finalizado ? (
          <div className="test-finalizado">Examen finalizado</div>
        ) : (
          <>
            <div className="test-header">
              <span className="test-progreso">
                {indiceActual + 1}/{preguntasMezcladas.length}
              </span>
              <button onClick={reiniciarExamen} className="test-reiniciar-btn">
                Reiniciar
              </button>
              <p className="test-timer">
                Tiempo restante: {Math.floor(tiempoRestante / 60)}:
                {('0' + (tiempoRestante % 60)).slice(-2)}
              </p>
            </div>
            <div>
              <p className="test-question">{preguntaActual.question}</p>
              {preguntaActual.opciones.map((respuesta, index) => (
                <button
                  key={index}
                  onClick={() => manejarRespuesta(respuesta)}
                  className={`test-button ${
                    respuestaSeleccionada
                      ? respuesta === preguntaActual.correct_answer
                        ? 'test-button-correct'
                        : respuesta === respuestaSeleccionada
                        ? 'test-button-incorrect'
                        : ''
                      : ''
                  }`}
                  disabled={respuestaSeleccionada != null}
                >
                  {respuesta}
                </button>
              ))}
            </div>
            <button
              className="nextQuestion"
              onClick={siguientePregunta}
              disabled={respuestaSeleccionada == null}
            >
              Siguiente Pregunta
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestExamenEst;
