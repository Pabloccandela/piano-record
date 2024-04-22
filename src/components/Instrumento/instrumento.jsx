import { useContext, useId, useRef, useState } from "react"
import { useEffect } from "react"
import * as Tone from 'tone'
import "./instrumento.css"
import PianoContext from "../../context/piano-context"


export const Instrumento = ({recordState,handleInputNote,synth, PowerState,PlayRecord}) => {

    // Teclado properties
    const [teclas, setTeclas] = useState([]);

    const notas = useContext(PianoContext).notesConfigurations;
    
    // Teclado events
    useEffect(() => {
        const handleKeyDown = (event) => {

          // verifico si toco una nota valida y si relativamente no genera un evento de tecla repetido
          let nota = notas.find((nota)=>nota.key==event.key);
          if (nota && !teclas.includes(event.key)) {

            // guardo la tecla que se presiono
            setTeclas([...teclas, event.key]);

            handleTouchNote(nota);
          }
        };
    
        const handleKeyUp = (event) => {
          // verifico si toco una nota valida y si relativamente no genera un evento de tecla repetido
          let nota = notas.find((nota)=>nota.key==event.key);
            if(teclas.includes(event.key)){
              // filtro por la tecla que se solto y la elimino
              setTeclas(teclas.filter((tecla)=>tecla!=event.key));  
            }
        };
    
        //  Agrego los eventos de teclado
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [teclas, notas,recordState,handleInputNote,synth, PowerState]);
    
    const handleTouchNote = (nota)=>{
      if(PowerState && !PlayRecord){
        synth.triggerAttackRelease(nota.cifrado, "8n");
        if(recordState){
          let eventKeyDown={
            nota,
            event: "keyDown"
          }
          handleInputNote(eventKeyDown);
        }
      }
    }

    const onKeyClick = (value) => {
      let nota = notas.find((nota)=>nota.key==value.key);
      if (nota && !teclas.includes(value.key)) {

        // guardo la tecla que se presiono
        setTeclas([...teclas, value.key]);

        handleTouchNote(nota);
      }
    };

    const onKeyClickUp=(value)=>{
      setTimeout(() => {
        setTeclas(teclas.filter((tecla)=>tecla!=value.key));
      }, 100);
    }

    return (
  <main>
    <div className="teclado">
      {notas.map((nota, index) => (
        <div
          key={index}
          className={`tecla ${teclas.includes(nota.key) ? "pulsar" : ""} ${nota.isSharp ? "negra" : ""}`}
          onPointerDown={() => onKeyClick(nota)}
          onPointerUp={() => onKeyClickUp(nota)}
        >
          <p className="nota">{nota.nota}</p>
        </div>
      ))}
    </div>
  </main>
);
}
