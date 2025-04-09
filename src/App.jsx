import React from 'react'
import "./index.css"
import "./output.css"
import Background from './components/Background'
import Forground from './components/Forground'
function App() {
  return (
    <>
      <div className=' relative w-full h-screen bg-zinc-700'>
        <Background />
        <Forground />
    </div>

    </>
  )
}

export default App