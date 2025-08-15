import './Nav.css'
import './Navresponsive.css'
import imagenNav from '../../assets/DALL_E-2025-04-25-16.46-removebg-preview.png'
import { Link } from 'react-router-dom';
import { IconHover } from '../IconHover/IconHover';
import house1 from '../../assets/house-regular.svg'
import house2 from '../../assets/house_hover.svg'
import userIcon1 from '../../assets/circle-user-regular.svg'
import userIcon2 from '../../assets/circle-user-solid.svg'
import mercado from '../../assets/shop-solid-full.svg'
import mercado1 from '../../assets/shop-solid-full (1).svg'
import bell1 from '../../assets/bell-solid-full.svg'
import bell2 from '../../assets/bell-solid-full1.svg'
import msg1 from '../../assets/envelope-regular-full.svg'
import msg2 from '../../assets/envelope-solid-full.svg'
import contact1 from '../../assets/user-group-solid-full.svg'
import contact2 from '../../assets/user-group-solid-full (1).svg'
import { useEffect, useRef } from 'react';

export function Nav() {
  const navRef = useRef<HTMLElement | null>(null);
  let startX = 0;
  let endX = 0;
  
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (window.innerWidth > 768) return;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const distance = endX - startX;

      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          // Swipe derecha → abrir nav
          nav.style.left = '0';
        } else {
          // Swipe izquierda → cerrar nav
          nav.style.left = '-95vw';
        }
      }
    };

    nav.addEventListener('touchstart', handleTouchStart);
    nav.addEventListener('touchend', handleTouchEnd);

    return () => {
      nav.removeEventListener('touchstart', handleTouchStart);
      nav.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <nav ref={navRef}>
      <div className="imgnav">
        <img src={imagenNav} alt="" />
      </div>
      <div className="searchnav">
        <form action="">
          <input type="search" name="buscador" id="buscadornav" placeholder="Buscar" />
        </form>
      </div>
      <div className="optionsnav">
        <Link to="/"><IconHover icon1={house1} icon2={house2} alt="inicio" enlace='Inicio' /></Link>
        <Link to=""><IconHover icon1={mercado} icon2={mercado1} alt='mercado' enlace='Mercado' /></Link>
        <Link to=""><IconHover icon1={bell1} icon2={bell2} alt='notificaciones' enlace='Notificaciones' /></Link>
        <Link to=""><IconHover icon1={msg1} icon2={msg2} alt='mensajes' enlace='Mensajes' /></Link>
        <Link to=""><IconHover icon1={contact1} icon2={contact2} alt='contactos' enlace='Contactos' /></Link>
        <Link to=""><IconHover icon1={userIcon1} icon2={userIcon2} alt='usuario' enlace='Usuario' /></Link>
      </div>
    </nav>
  );
}
