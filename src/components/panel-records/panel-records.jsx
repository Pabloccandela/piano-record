import "./panel-records.css";
export const PanelRecords = ({handleRecordTimer,handleStopPlay,handlePlayRecord,RecordTimeMs, RecordState, RecordPlay, screenText, handlePower,PowerState,HandleSelectRecord }) => {
    
    // Función para mostrar la lista de notas grabadas y traerlas del local storage
    const handleListRecord = () => {
        let recordList = JSON.parse(localStorage.getItem("recordList"));
        if (recordList) {
            console.log(recordList);
        }
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
                    <p>{screenText}</p>
                    <p onClick={handleListRecord}></p>
                </div>
                <div className="button-panel">
                    <button className={ PowerState ? "button button-activate":"button"} onClick={handlePower}>
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
