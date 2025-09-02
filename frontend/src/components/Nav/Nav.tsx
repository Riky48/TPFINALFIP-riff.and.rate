import './Nav.css';
import { Link } from 'react-router-dom';
import imagenNav from '../../assets/DALL_E-2025-04-25-16.46-removebg-preview.png';
import house from '../../assets/house-regular.svg';
import mercado from '../../assets/shop-solid-full.svg';
import bell from '../../assets/bell-solid-full.svg';
import msg from '../../assets/envelope-regular-full.svg';
import contact from '../../assets/user-group-solid-full.svg';
import userIcon from '../../assets/circle-user-regular.svg';

type NavProps = {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
};

export function Nav({ navOpen, setNavOpen }: NavProps) {
  const options = [
    { icon: house, label: 'Inicio', link: '/' },
    { icon: mercado, label: 'Mercado', link: '/marketplace' },
    { icon: bell, label: 'Notificaciones', link: '#' },
    { icon: msg, label: 'Mensajes', link: '#' },
    { icon: contact, label: 'Contactos', link: '#' },
    { icon: userIcon, label: 'Usuario', link: '#' },
  ];

  return (
    <>
      <button className="hamburger" onClick={() => setNavOpen(!navOpen)}>☰</button>
      <nav className={navOpen ? 'open' : ''}>
        <div className="imgnav">
          <img src={imagenNav} alt="Logo" />
        </div>
        <div className="searchnav">
          <form>
            <input type="search" placeholder="Buscar" />
          </form>
        </div>
        <div className="optionsnav">
          {options.map(opt => (
            <Link key={opt.label} to={opt.link}>
              <div className="iconhover">
                <img src={opt.icon} alt={opt.label} />
                <p>{opt.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
