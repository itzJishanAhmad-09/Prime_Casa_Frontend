// src/components/Navbar.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconMenu2 } from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About Us',   path: '/about' },
  { label: 'Properties', path: '/properties' },
  { label: 'Services',   path: '/services' },
  { label: 'Blog',       path: '/blog' },
  { label: 'Contact',    path: '/contact' },
];

const Navbar = ({ scrollTo }) => {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback((path) => {
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
    closeMenu();
  }, [navigate, location.pathname, closeMenu]);

  const handleBookVisit = useCallback(() => {
    if (location.pathname.startsWith('/project/')) {
      const projectId = location.pathname.split('/').pop();
      navigate(`/schedule/${projectId}`);
    } else {
      navigate('/schedule');
    }
    closeMenu();
  }, [navigate, location.pathname, closeMenu]);

  return (
    <nav>
      <div className="nav-left">
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <IconMenu2 size={24} />
        </button>

        <div
          className="nav-logo"
          onClick={() => handleNavClick('/')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
          style={{ cursor: 'pointer' }}
          aria-label="Go to homepage"
        >
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
        {NAV_LINKS.map(({ label, path }) => (
          <button
            key={path}
            className="nav-link-btn"
            onClick={() => handleNavClick(path)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="nav-cta-container">
        <button onClick={handleBookVisit} className="nav-cta">
          Book Site Visit
        </button>
      </div>
    </nav>
  );
};

export default Navbar;