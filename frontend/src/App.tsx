import './App.css';
import { Inicio } from './Pages/feed/Inicio';
import { Nav } from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './Pages/marketplace/Marketplace';
import { useState } from 'react';
import Login from './Pages/Login/Login';
import Perfil from './Pages/Perfil/Perfil';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav navOpen={navOpen} setNavOpen={setNavOpen}/>
        <div className={`overlay ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)}></div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
