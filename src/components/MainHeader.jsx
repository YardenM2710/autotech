import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';

export function MainHeader() {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbar = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((isMenuOpen) => (isMenuOpen = !isMenuOpen));
  };

  useEffect(() => {
    isMenuOpen
      ? (navbar.current.style.transform = 'translate(0)')
      : (navbar.current.style.transform = 'translate(100%)');
  }, [isMenuOpen]);

  return (
    <header className="app-header">
      {isMenuOpen && <div onClick={toggleMenu} className="screen"></div>}
      <section>
        <h1 onClick={() => history.push('/')} className="logo">
          AutoTech
        </h1>
        <div onClick={toggleMenu} className="menu">
          <MenuIcon />
        </div>
        <nav ref={navbar} className="navbar">
          <Link onClick={toggleMenu} to="/">
            Home
          </Link>
          <Link onClick={toggleMenu} to="/contact">
            Contacts
          </Link>
        </nav>
      </section>
    </header>
  );
}
