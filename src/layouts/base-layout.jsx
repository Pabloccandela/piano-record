import { Instrumento } from "../components/Instrumento/instrumento"
import { PanelRecords } from "../components/panel-records/panel-records"
import { useState, useRef } from "react"
import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination();

export const BaseLayout = () => {

  // parametros para grabar
  const [recordState, setRecordState] = useState(false)
  const [recordTimeMs, setRecordTimeMs] = useState(0)
  const recordInterval = useRef(null)
  const [recordNotes, setRecordNotes] = useState([])
  const [recordPlay, setRecordPlay] = useState(false)

  // panel de control
  const [screenText, setScreenText] = useState("Piano Record!")
  const [power, setPower] = useState(false)

  // funcion para grabar
  const handleRecordTimer = ()=>{
    if(recordPlay || !power) return
    // reseteo la configuraciones
    resetConfigs()
    // si esta grabando
    if(recordState){
      // detengo la grabacion
      setRecordState(false)
      // guardar grabacion en la lista del local storage como objeto
      if(recordNotes.length>0){
        let recordList = JSON.parse(localStorage.getItem("recordList")) || []
        recordList.push(recordNotes)
        localStorage.setItem("recordList", JSON.stringify(recordList))
        // accion para guardar (Modal, etc)
        setScreenText("Grabacion guardada!")
      }else{
        setScreenText("No hay grabacion para guardar!")
      }
      setTimeout(() => {
        setScreenText("Piano Record!")
      },1000)
      console.log(recordNotes)
      // returno de la funcion
      return
    }
    // si no esta grabando
    // seteo contador de grabacion
    setRecordNotes([])
    setRecordState(true)
    setScreenText("Grabando..")
    recordInterval.current = setInterval(()=>{
      setScreenText("Grabando..");
      setRecordTimeMs((prev)=>prev+10)
    }, 10)
  }

  // funcion para resetear las configuraciones
  const resetConfigs = ()=>{
    clearInterval(recordInterval.current)
    recordInterval.current = null
    setRecordTimeMs(0)
  }

  // funcion para entrada de notas en el instrumento
  const handleInputNote = (note)=>{
    setRecordNotes([...recordNotes,{...note,time:recordTimeMs}])
  }


const handlePlayRecord = (recordNotesList) => {
  if(!power) return
  if (!recordPlay && recordNotesList.length > 0) {
      setRecordPlay(true);
      setScreenText("Reproduciendo...");

      let startTime = Tone.now();
      recordNotesList.forEach((record, index) => {
          if (record.nota) {
              const timeToPlay = startTime + ((record.time * 1.3) / 1000); // en segundos
              synth.triggerAttackRelease(record.nota.cifrado, "8n", timeToPlay);
          }
          const totalTime = recordNotesList[recordNotesList.length - 1].time * 1.3  + 1000;
          setTimeout(() => {
              setRecordPlay(false);
              setScreenText("Piano Record!");
          }, totalTime);
      });
      return;
  }
  setScreenText("Selecciona o realiza una grabación para reproducir!");
  setTimeout(() => {
    setScreenText("Piano Record!")
  },2000)
};

  // funcion para setear las notas
  const handleSetPlayRecord = (recordNotesList)=>{
    setRecordNotes(recordNotesList)
  }

  // funcion para prender piano
  const handlePower = ()=>{

    if(!power){
      setPower(true)
      setScreenText("Prendiedo...")
      setTimeout(() => {
        setScreenText("Piano Record!")
      }, 1000);
    }else{
      setScreenText("Apagando...")
      setTimeout(()=>{
        setPower(false)
        setRecordNotes([])
      },1000)
    }
  }

  return (
    <main className="base">
      <section className="base-panel">
        <PanelRecords PowerState={power} handlePower={handlePower} screenText={screenText} handleRecordTimer={handleRecordTimer} handlePlayRecord={()=>handlePlayRecord(recordNotes)} RecordTimeMs={recordTimeMs} RecordState={recordState} RecordPlay={recordPlay}/>
      </section>
      <section className="base-teclado">
        <Instrumento  PowerState={power} recordState={recordState} handleInputNote={handleInputNote} synth={synth} />
      </section>
    </main>
  )
}
