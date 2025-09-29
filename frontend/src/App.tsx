import './App.css';
import { Inicio } from './Pages/feed/Inicio';
import { Nav } from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Marketplace from './Pages/Marketplace/Marketplace';
import { useState } from 'react';
import { CartProvider } from './components/Context/CartContext';
import CartPanel from './components/Context/CartPanel';
import PaymentPanel from './Pages/PaymentPanel';
import Login from './Pages/Login/Login';
import Register from './components/RegisterForm/RegisterForm';
import { Home } from './Pages/Home';
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app-container">

          {/* Nav solo visible en Marketplace */}
          <Routes>
            <Route path="/marketplace" element={<Nav navOpen={navOpen} setNavOpen={setNavOpen} setCartOpen={setCartOpen} />} />
            <Route path="/inicio" element={<Nav navOpen={navOpen} setNavOpen={setNavOpen} setCartOpen={setCartOpen} />} />
          </Routes>

          {/* Overlay del nav */}
          <div 
            className={`overlay ${navOpen ? 'show' : ''}`} 
            onClick={() => setNavOpen(false)}
          ></div>

          {/* Contenido principal */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
          </div>

          {/* Panel del carrito */}
          <CartPanel 
            open={cartOpen} 
            onClose={() => setCartOpen(false)} 
            onBuy={() => setPaymentOpen(true)} 
          />

          {/* Panel de pagos */}
          {paymentOpen && (
            <PaymentPanel 
              open={paymentOpen} 
              onClose={() => setPaymentOpen(false)} 
            />
          )}

        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
