import './App.css';
import { Inicio } from './Pages/feed/Inicio';
import { Nav } from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './Pages/Marketplace/Marketplace';
import { useState } from 'react';
import Login from './Pages/Login/Login';
import Perfil from './Pages/Perfil/Perfil';

function App() {
  
  const [cartOpen, setCartOpen] = useState(false); // panel de carrito cerrado
  const [navOpen, setNavOpen] = useState(false); // panel de nav en moviles, cerrado
  const [paymentOpen, setPaymentOpen] = useState(false);

  

  return (
  <BrowserRouter>
    <CartProvider>
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

        <CartPanel 
          open={cartOpen} 
          onClose={() => setCartOpen(false)} 
          onBuy={() => setPaymentOpen(true)} 
        />

        {paymentOpen && (
          <PaymentPanel 
            open={paymentOpen} 
            onClose={() => setPaymentOpen(false)} 
          />
        )}
      </div>
    </CartProvider>
  </BrowserRouter>
)};


export default App;
