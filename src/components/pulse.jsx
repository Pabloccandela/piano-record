import { useId, useRef, useState } from "react"
import { useEffect } from "react"
import * as Tone from 'tone'
import "./tecla.css"


export const Pulse = () => {

    // Teclado properties
    const [teclas, setTeclas] = useState([]);
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

    // Record properties
    const recordInterval = useRef(null);
    const [recordTimeMs, setRecordTimeMs] = useState(0);
    const recordEvent = useRef([]);
    const [records, setRecords] = useState([]);

    // record Play
    const recordPlayInterval = useRef(null);
    const [recordPlayTimeMs, setRecordPlayTimeMs] = useState(0);
    
    // Teclado events
    useEffect(() => {
        const handleKeyDown = (event) => {

          // verifico si toco una nota valida y si relativamente no genera un evento de tecla repetido
          let nota = notas.find((nota)=>nota.key==event.key);
          if (nota && !teclas.includes(event.key)) {

            // guardo la tecla que se presiono
            setTeclas([...teclas, event.key]);
            // toco la nota
            synth.triggerAttackRelease(nota.cifrado, "8n");

            // guardo el evento de presionar la tecla
            if(recordTimeMs>0){
              let eventKeyDown={
                nota,
                event: "keyDown",
                time: recordTimeMs
              }
              recordEvent.current.push(eventKeyDown);
            }

          }
        };
    
        const handleKeyUp = (event) => {

          // verifico si toco una nota valida y si relativamente no genera un evento de tecla repetido
          let nota = notas.find((nota)=>nota.key==event.key);
            if(teclas.includes(event.key)){
              // filtro por la tecla que se solto y la elimino
              setTeclas(teclas.filter((tecla)=>tecla!=event.key));  
              // guardo el evento de soltar la tecla
              let eventKeyUp={
                nota,
                event: "keyUp",
                time: recordTimeMs
              }
              // guardo el evento de soltar la tecla
              // recordEvent.current.push(eventKeyUp);
            }
        };
    
        //  Agrego los eventos de teclado
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [recordTimeMs, teclas]);


    // Record events
    const handleRecord = () => {
      // si esta grabando
      if(recordInterval.current){
        // detengo el intervalo
        clearInterval(recordInterval.current);
        // guardo los eventos
        console.log(recordEvent.current);
        setRecords([...records, {events: recordEvent.current, duration: recordTimeMs/1000, date: new Date(), id: records.length}]);
        // limpio los eventos y el recordTimeMs
        recordInterval.current = null;
        recordEvent.current = [];
        setRecordTimeMs(0);

        console.log(records);
      }
      // si no esta grabando
      else{
        // comienzo a grabar
        recordInterval.current = setInterval(() => {
          // incremento el tiempo en 100ms
          setRecordTimeMs((recordTimeMs) => recordTimeMs + 100);
        }, 100);
      }
    }

    const stopRecordPlay = ()=>{
      clearInterval(recordPlayInterval.current)
      setRecordPlayTimeMs(0)
      setRecordTimeMs(0)
      recordInterval.current = null;
    }

    const handleRecordPlay = (recordId) => {
      // si esta reproduciendo
      if(recordPlayInterval.current){
        console.log(recordId);
        stopRecordPlay()
      }
      // si no esta reproduciendo
      else{
        let record = records.find((record)=>record.id==recordId)
        let events = record.events
        let time = 0
        let i = 0
        recordPlayInterval.current = setInterval(() => {
          if(i<events.length){
            if(events[i].time<=time){
              if(events[i].event=="keyDown"){
                synth.triggerAttackRelease(events[i].nota.cifrado, "8n");
              }
              i++
            }
          }
          time+=100
          setRecordPlayTimeMs(time)
          if(i>=events.length){
            console.log("TERMINOOO");
            stopRecordPlay()
          }
        }, 100);
      }
    }

    return (
        <main>
          <div className="teclado">
            <div className={teclas.includes("a")?"tecla pulsar":"tecla"}><p className="nota">DO</p></div>
            <div className={teclas.includes("s")?"tecla pulsar":"tecla"}><p className="nota">RE</p></div>
            <div className={teclas.includes("d")?"tecla pulsar":"tecla"}><p className="nota">MI</p></div>
            <div className={teclas.includes("f")?"tecla pulsar":"tecla"}><p className="nota">FA</p></div>
            <div className={teclas.includes("g")?"tecla pulsar":"tecla"}><p className="nota">SOL</p></div>
            <div className={teclas.includes("h")?"tecla pulsar":"tecla"}><p className="nota">LA</p></div>
            <div className={teclas.includes("j")?"tecla pulsar":"tecla"}><p className="nota">SI</p></div>
        </div>
        <div>
          <button onClick={handleRecord}>Record</button>
          <div>{recordTimeMs/1000}</div>
        </div>
        <div>
          <ul>
            {records.map((record) => (
              <li className="listRecord" key={record.id}>
                <p>{record.id+")"}</p>
                <div>
                  <p>
                    Duracion: {record.duration} seg
                  </p>
                </div>
                <div>
                  <p>
                    Fecha: {record.date.toLocaleString()}
                  </p>
                </div>
                <button onClick={()=>{handleRecordPlay(record.id)}}>Escuchar</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    )
}
