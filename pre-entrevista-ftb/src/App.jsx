import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tabla from './components/Tabla/Tabla.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/tabla" element={<Tabla />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
