import { useState } from "react"
import { useEffect } from "react"
import * as Tone from 'tone'
import "./tecla.css"
export const Pulse = () => {

    const [teclas, setTeclas] = useState([])
    const synth = new Tone.Synth().toDestination();
    const notas = [
      {
        key: "a",
        cifrado: "C4",
        nota: "Do"
      },
      {
        key: "s",
        cifrado: "D4",
        nota: "Re"
      },
      {
        key: "d",
        cifrado: "E4",
        nota: "Mi"
      },
      {
        key: "f",
        cifrado: "F4",
        nota: "Fa"
      },
      {
        key: "g",
        cifrado: "G4",
        nota: "Sol"
      },
      {
        key: "h",
        cifrado: "A4",
        nota: "La"
      },
      {
        key: "j",
        cifrado: "B4",
        nota: "Si"
      }
    ];
    
    useEffect(() => {
        const handleKeyDown = (event) => {
          let nota = notas.find((nota)=>nota.key==event.key);
          if (nota && !teclas.includes(event.key)) {
            setTeclas([...teclas, event.key]);
            synth.triggerAttackRelease(nota.cifrado, "8n");
          }
        };
    
        const handleKeyUp = (event) => {
          if(teclas.includes(event.key)){
            setTeclas(teclas.filter((tecla)=>tecla!=event.key))
            console.log(teclas);
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [teclas]);

    return (
        <main>
          <div className="teclado">
            <div className={teclas.includes("a")?"tecla pulsar":"tecla"}>DO</div>
            <div className={teclas.includes("s")?"tecla pulsar":"tecla"}>RE</div>
            <div className={teclas.includes("d")?"tecla pulsar":"tecla"}>MI</div>
            <div className={teclas.includes("f")?"tecla pulsar":"tecla"}>FA</div>
            <div className={teclas.includes("g")?"tecla pulsar":"tecla"}>SOL</div>
            <div className={teclas.includes("h")?"tecla pulsar":"tecla"}>LA</div>
            <div className={teclas.includes("j")?"tecla pulsar":"tecla"}>SI</div>
        </div>
        
      </main>
    )
}
