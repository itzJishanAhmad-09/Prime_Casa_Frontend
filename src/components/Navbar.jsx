// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenu2 } from '@tabler/icons-react';

const Navbar = ({ scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    closeMenu();
  };

  const handleAboutClick = () => {
    navigate('/about');
    closeMenu();
  };

  const handlePropertiesClick = () => {
    navigate('/properties');
    closeMenu();
  };

  const handleBlogClick = () => {
    navigate('/blog');
    closeMenu();
  };

  const handleServicesClick = () => {
    navigate('/services');
    closeMenu();
  };

  const handleContactClick = () => {
    navigate('/contact');
    closeMenu();
  };

  const handleBookVisit = () => {
    if (location.pathname.startsWith('/project/')) {
      const projectId = location.pathname.split('/').pop();
      navigate(`/schedule/${projectId}`);
    } else {
      navigate('/schedule');
    }
    closeMenu();
  };

  const navBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--txt2)',
    padding: '0.5rem 0',
    fontFamily: 'inherit',
  };

  return (
    <nav>
      <div className="nav-left">
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <IconMenu2 size={24} />
        </button>

        <div className="nav-logo" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
          <img
            src="/primecasa.webp"
            alt="The Prime Casa"
            style={{ height: '90px', width: 'auto' }}
            width="200"
            height="90"
          />
        </div>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button onClick={handleHomeClick} style={navBtnStyle}>Home</button>
        <button onClick={handleAboutClick} style={navBtnStyle}>About Us</button>
        <button onClick={handlePropertiesClick} style={navBtnStyle}>Properties</button>
        <button onClick={handleServicesClick} style={navBtnStyle}>Services</button>
        <button onClick={handleBlogClick} style={navBtnStyle}>Blog</button>
        <button onClick={handleContactClick} style={navBtnStyle}>Contact</button>
      </div>

      <div className="nav-cta-container">
        <button
          onClick={handleBookVisit}
          className="nav-cta"
          style={{
            border: 'none',
            background: 'var(--red)',
            color: '#fff',
            padding: '0.5rem 1.2rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '8px',
          }}
        >
          Book Site Visit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;