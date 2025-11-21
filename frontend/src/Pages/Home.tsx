import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';
import { useEffect, useRef } from 'react';

export function Home() {

  const cards = [
    {
      title: "Publicá tu CV musical",
      text: "Mostrá quién sos, qué tocás y encontrá oportunidades reales."
    },
    {
      title: "Buscá bandas o músicos",
      text: "Filtrá por estilo, instrumento o zona y encontrá tu próxima conexión musical."
    },
    {
      title: "Comprá y vendé instrumentos o servicios",
      text: "Como un mercado libre… pero hecho solo para la comunidad musical."
    },
    {
      title: "Conectá con una comunidad que vibra como vos",
      text: "Músicos ayudando músicos. Porque la escena se arma entre todos."
    },
    {
      title: "Promocioná tus proyectos",
      text: "Mostrá tu banda, tu arte o tus servicios y hacete ver donde importa."
    }
  ];
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateWidth() {
      const track = trackRef.current;
      if (!track) return;

      const cards = Array.from(track.children) as HTMLElement[];

      const totalWidth = cards.reduce(
        (sum, card) => sum + card.offsetWidth,
        0
      );

      // mitad (porque duplicamos el set)
      const half = totalWidth / 2;

      track.style.setProperty("--half-width", `${half}px`);
      track.style.setProperty("--scroll-time", `${20}s`);
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <main className="containerHome">

      <header className="hero">
        <img src={logo} alt="Logo" className="icon" />
        <div>
          <h1>RIFF AND RATE</h1>
          <p>La escena se arma acá. Sumate a la comunidad que vibra música.<br />Tu talento merece ser encontrado</p>
        </div>
        <img src={logo} alt="Logo" className="icon" />
      </header>

      <section className="grid-container">
        <div className="track" ref={trackRef}>

          {/* original */}
          {cards.map((c, i) => (
            <div className="card" key={i}>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </div>
          ))}

          {/* duplicado para loop */}
          {cards.map((c, i) => (
            <div className="card" key={`copy-${i}`}>
              <h2>{c.title}</h2>
              <p>{c.text}</p>
            </div>
          ))}

        </div>
      </section>

      <div className="buttons">
        <Link to="/login" className="btn">LOGIN/REGISTER</Link>
        <Link to="/marketplace" className="btn">IR AL MARKETPLACE</Link>
      </div>

    </main>
  );
}
