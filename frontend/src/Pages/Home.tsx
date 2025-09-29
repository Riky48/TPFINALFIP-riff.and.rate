// Home.tsx
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png'; // cambia al path correcto

export function Home() {
  return (
    <main className="container">
      <header className="hero">
        <img src={logo} alt="Logo" className="icon" />
        <div>
          <h1>RIFF AND RATE</h1>
          <p>
            La escena se arma acá. Sumate a la comunidad que vibra música. Tu talento merece ser encontrado
          </p>
        </div>
        <img src={logo} alt="Logo" className="icon" />
      </header>

      <section className="grid-container">
        <div className="card">
          <h2>Publicá tu CV musical</h2>
          <p>Mostrá quién sos, qué tocás y encontrá oportunidades reales.</p>
        </div>
        <div className="card">
          <h2>Buscá bandas o músicos</h2>
          <p>Filtrá por estilo, instrumento o zona y encontrá tu próxima conexión musical.</p>
        </div>
        <div className="card large">
          <h2>Comprá y vendé instrumentos o servicios</h2>
          <p>Como un mercado libre… pero hecho solo para la comunidad musical.</p>
        </div>
        <div className="card">
          <h2>Conectá con una comunidad que vibra como vos</h2>
          <p>Músicos ayudando músicos. Porque la escena se arma entre todos.</p>
        </div>
        <div className="card">
          <h2>Promocioná tus proyectos</h2>
          <p>Mostrá tu banda, tu arte o tus servicios y hacete ver donde importa.</p>
        </div>
      </section>

      <div className="buttons">
        <Link to="/login" className="btn">LOGIN</Link>
        <Link to="/register" className="btn">REGISTER</Link>
        <Link to="/marketplace" className="btn">IR AL MARKETPLACE</Link>
      </div>
    </main>
  );
}
