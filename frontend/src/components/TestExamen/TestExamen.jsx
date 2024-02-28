// TestExamen.js
import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import './TestExamen.css';

// Función para mezclar las preguntas
const mezclarPreguntas = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

const TestExamen = () => {
  const { preguntas } = useLoaderData();
  const [preguntasMezcladas, setPreguntasMezcladas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [temporizador, setTemporizador] = useState(null);
  const [finalizado, setFinalizado] = useState(false);
  const navigate = useNavigate();

  // Configuración basada en el grupo de la categoría
  const configuracionExamen = {
    'A1': { maxPreguntas: 100, tiempoMax: 120 },
    'A2': { maxPreguntas: 90, tiempoMax: 120 },
    'default': { maxPreguntas: 50, tiempoMax: 90 }
  };

  // Establecer configuración inicial basada en el grupo de la categoría
  useEffect(() => {
    if (preguntas && preguntas.length > 0) {
      // Asumimos que todas las preguntas tienen el mismo grupo
      const grupoCategoria = preguntas[0].group;
      const { maxPreguntas, tiempoMax } = configuracionExamen[grupoCategoria] || configuracionExamen['default'];
      setPreguntasMezcladas(mezclarPreguntas([...preguntas]).slice(0, maxPreguntas));
      // Solo establece el temporizador si aún no se ha establecido
      if (temporizador === null) {
        setTemporizador(tiempoMax * 60); // Convertir minutos a segundos
      }
    }
    // Asegúrate de que 'configuracionExamen' y 'temporizador' no cambien en cada renderización,
    // de lo contrario, crea una referencia constante fuera del componente o usa useMemo.
  }, [preguntas]);
  

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
    setRespuestaSeleccionada(respuesta);
  };

  const siguientePregunta = () => {
    const siguienteIndice = indiceActual + 1;
    if (siguienteIndice < preguntasMezcladas.length) {
      setIndiceActual(siguienteIndice);
      setRespuestaSeleccionada(null);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciarExamen = () => {
    navigate(-1); // Vuelve a la pantalla anterior
  };

  if (!preguntasMezcladas || preguntasMezcladas.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  const preguntaActual = preguntasMezcladas[indiceActual];
  const opciones = [
    preguntaActual.correct_answer,
    ...preguntaActual.incorrect_answers,
  ];

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
              <p className="test-timer">Tiempo restante: {Math.floor(temporizador / 60)}:{('0' + temporizador % 60).slice(-2)}</p>
            </div>
            <div>
              <p className="test-question">{preguntaActual.question}</p>
              {opciones.map((respuesta, index) => (
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

export default TestExamen;
