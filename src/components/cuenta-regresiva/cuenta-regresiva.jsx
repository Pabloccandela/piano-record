import React, { useState, useEffect } from "react";
import "./cuenta-regresiva.css";

const CountdownTimer = ({ initialTimeMs, onFinish }) => {
  const [timeRemainingMs, setTimeRemainingMs] = useState(initialTimeMs);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingMs(prevTimeMs => {
        if (prevTimeMs <= 0) {
          clearInterval(timer);
          onFinish(); // Llama a la función onFinish cuando el tiempo ha terminado
          return 0;
        } else {
          return prevTimeMs - 1000; // Restar 1000 ms (1 segundo)
        }
      });
    }, 1000); // Actualizar el tiempo cada segundo

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, [initialTimeMs, onFinish]);

  // Convertir el tiempo restante de ms a minutos y segundos
  const minutes = Math.floor(timeRemainingMs / (1000 * 60));
  const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);

  // Agregar un cero delante si los segundos son menores que 10
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div className="timer-container">
      <div className={`timer ${timeRemainingMs === 0 && "timer-finished"}`}>
        Tiempo restante: {minutes}:{formattedSeconds}
      </div>
    </div>
  );
};

export default CountdownTimer;
