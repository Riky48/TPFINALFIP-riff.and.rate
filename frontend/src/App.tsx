import './App.css';
import { Inicio } from './Pages/Inicio';
import { Nav } from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './Pages/Marketplace';
import { useState } from 'react';
import { CartProvider } from './components/Context/CartContext';
import CartPanel from './components/Context/CartPanel';
import PaymentPanel from './Pages/PaymentPanel';





function App() {
  
  const [cartOpen, setCartOpen] = useState(false); // panel de carrito cerrado
  const [navOpen, setNavOpen] = useState(false); // panel de nav en moviles, cerrado
  const [paymentOpen, setPaymentOpen] = useState(false);

  

  return (
  <BrowserRouter>
    <CartProvider>
      <div className="app-container">
        <Nav 
          navOpen={navOpen} 
          setNavOpen={setNavOpen} 
          setCartOpen={setCartOpen} 
        />
        <div 
          className={`overlay ${navOpen ? 'show' : ''}`} 
          onClick={() => setNavOpen(false)}
        ></div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/marketplace" element={<Marketplace />} />
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
