import React from "react";
import PianoContext from "./piano-context";
import { notesConfigurations } from "../data/noteConfigurations";

const PianoProvider = ({ children }) => {
  return (
    <PianoContext.Provider value={{ notesConfigurations }}>
      {children}
    </PianoContext.Provider>
  );
};

export default PianoProvider;