import './App.css'
import { Inicio } from './Pages/Inicio'
import { Nav } from '../src/components/Nav/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
