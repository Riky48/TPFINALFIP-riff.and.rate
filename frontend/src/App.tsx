import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Inicio } from "./Pages/feed/Inicio";
import { Nav } from "./components/Nav/Nav";

import CartPanel from "./components/Context/CartPanel";
import PaymentPanel from "./Pages/PaymentPanel";
import Login from "./Pages/Login/Login";
import Register from "./components/RegisterForm/RegisterForm";
import { Home } from "./Pages/Home";
import Perfil from "./Pages/Perfil/Perfil";
import { ArticlePage } from "./components/Peticion_feed/FeedContainer/CardFeed/ArticleCard/ArticlePage/ArticlePage";

import CrearProducto from "./Pages/Marketplace/CrearProducto";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Marketplace from "./Pages/Marketplace/Marketplace";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const userId = 1; // temporal, reemplazar luego

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Nav visible solo en ciertas rutas */}
        <Routes>
          <Route
            path="/marketplace"
            element={
              <Nav
                navOpen={navOpen}
                setNavOpen={setNavOpen}
                setCartOpen={setCartOpen}
              />
            }
          />
          <Route
            path="/inicio"
            element={
              <Nav
                navOpen={navOpen}
                setNavOpen={setNavOpen}
                setCartOpen={setCartOpen}
              />
            }
          />
          <Route
            path="/perfil"
            element={
              <Nav
                navOpen={navOpen}
                setNavOpen={setNavOpen}
                setCartOpen={setCartOpen}
              />
            }
          />
        </Routes>

        {/* Overlay del nav */}
        <div
          className={`overlay ${navOpen ? "show" : ""}`}
          onClick={() => setNavOpen(false)}
        ></div>

        {/* Contenido principal */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/inicio"
              element={
                <PrivateRoute>
                  <Inicio />
                </PrivateRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PrivateRoute>
                  <Marketplace />
                </PrivateRoute>
              }
            />
            <Route
              path="/crear-producto"
              element={
                <PrivateRoute>
                  <CrearProducto />
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            <Route
              path="/article/:id"
              element={
                <PrivateRoute>
                  <ArticlePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>

        {/* Carrito */}
        <CartPanel
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onBuy={() => setPaymentOpen(true)}
          userId={userId}
        />

        {/* Pagos */}
        {paymentOpen && (
          <PaymentPanel
            open={paymentOpen}
            onClose={() => setPaymentOpen(false)}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
