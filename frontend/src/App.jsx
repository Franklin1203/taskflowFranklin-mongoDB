
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


