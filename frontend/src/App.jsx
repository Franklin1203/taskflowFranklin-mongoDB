import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TareasPage from './pages/TareasPage'

export default function App() {

    return(
      <Routes>
          
          <Route path='/' element={<TareasPage/>}/>

      </Routes>
    )
  
}


