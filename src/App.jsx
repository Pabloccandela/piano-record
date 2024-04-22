

import './App.css'
import PianoProvider from './context/piano-provider'
import { BaseLayout } from './layouts/base-layout'

function App() {

  return (
    <PianoProvider>
      {
        <BaseLayout />
      }
    </PianoProvider>
  )
}

export default App
