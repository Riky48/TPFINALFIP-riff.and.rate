import './App.css';
import { Inicio } from './Pages/feed/Inicio';
import { Nav } from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './Pages/marketplace/Marketplace';
import { useState } from 'react';

function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
        <div className={`overlay ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)}></div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/marketplace" element={<Marketplace />} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
