import "./panel-records.css";
import { useState } from "react";

export const PanelRecords = ({handleRecordTimer,handleStopPlay,handlePlayRecord,RecordTimeMs, RecordState, RecordPlay, screenText, handlePower,PowerState,HandleSelectRecord }) => {
    
    const [recordList, setRecordList] = useState([]);
    const [selectedList, setSelectedList] = useState(false); 
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    // Función para mostrar la lista de notas grabadas y traerlas del local storage
    const handleListRecord = () => {
        if(!PowerState) return
        if(!selectedList){
            let recordListLocal = JSON.parse(localStorage.getItem("recordList"));
            if (recordList) {
                setSelectedList(true)
                setRecordList(recordListLocal);
            }
            return
        }
        setSelectedList(false)
    }

    const handleSelect= (record) => {
        HandleSelectRecord(record)
    }

    return (
        <div className="panel fx-goma">
            <div className="buttons-panel">
                <div className="button-panel">
                    <button className={RecordState? "button button-activate":"button"} onClick={handleRecordTimer}>
                        <p className={RecordState? "rotate":""}><i className="fa-solid fa-compact-disc "></i></p>
                    </button>
                </div>
                <div className="button-panel">
                    <button className={RecordPlay? "button button-activate":"button"} onClick={()=>RecordPlay?handleStopPlay():handlePlayRecord()}>
                        <i className={RecordPlay ? "fa-solid fa-hourglass-half":"fa-solid fa-circle-play"}></i>
                    </button>
                </div>
                <div className={PowerState?"pantalla-panel":"pantalla-panel power-off"}>
                    <div className="pantalla-container">
                        <p style={{marginTop:".5rem"}}>{screenText}</p>
                        { selectedList ?
                            <ul>
                                {recordList.map((record, index) => (
                                    <li key={index}>
                                        <p  onClick={() => handleSelect(record)}>{"Record "+index + " ->"}<i className="fa-solid fa-headphones" style={{fontSize:"1.1rem",marginLeft:".5rem"}}></i></p>
                                    </li>
                                ))}
                            </ul>:null
                        }
                    </div>
                </div>
                <div className="button-panel">
                    <button className={ PowerState ? "button button-activate":"button poweroff-btn"} onClick={handlePower}>
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
                <div className="button-panel">
                    <button className="button " onClick={handleListRecord}>
                        <i className="fa-solid fa-list-ul"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
