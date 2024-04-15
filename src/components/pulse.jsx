import { useRef } from "react"
import { useEffect } from "react"
import "./tecla.css"
export const Pulse = () => {
    const teclas = useRef([])
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (!teclas.current.includes(event.key)) {
            console.log(!teclas.current.includes(event.key));
            teclas.current.push(event.key);
            console.log(teclas.current);
          }
        };
    
        const handleKeyUp = (event) => {
          const index = teclas.current.indexOf(event.key); // Find index of released key
          if (index !== -1) {
            teclas.current.splice(index, 1); // Remove released key from array
            console.log(teclas.current); // Log when a key is released
          }
        };
    
        // Add event listeners on component mount
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    
        // Clean up function to remove event listeners on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [teclas.current]);

    return (
        <div className="teclado">
            <div className={"tecla " + teclas.current.includes("a")?"pulsar":""}></div>
            <div className={"tecla " + teclas.current.includes("b")?"pulsar":""}></div>
            <div className={"tecla " + teclas.current.includes("c")?"pulsar":""}></div>
            <div className={"tecla " + teclas.current.includes("d")?"pulsar":""}></div>
            <div className={"tecla " + teclas.current.includes("e")?"pulsar":""}></div>
        </div>
    )
}
