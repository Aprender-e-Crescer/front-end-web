import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
        <div className={`bar ${menuOpen ? 'open' : ''}`} />
      </div>
      <ul className={`menu-items ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/">SUDOTEC</Link>
        </li>
        <li>
          <Link to="/portal">PORTAL DA TRANSPARÊNCIA</Link>
        </li>
        <li>
          <Link to="/inclusao">INCLUSÃO DIGITAL</Link>
        </li>
        <li>
          <Link to="/maker">MAKER SPACE</Link>
        </li>
        <li>
          <Link to="/aprender">APRENDER & CRESCER</Link>
        </li>
        <li>
          <Link to="/incubadora">INCUBADORA TECNOLÓGICA</Link>
        </li>
        <li>
          <Link to="/imprensa">IMPRENSA</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
