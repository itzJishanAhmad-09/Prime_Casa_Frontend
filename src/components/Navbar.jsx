// src/components/Navbar.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconPhone, IconMenu2, IconX } from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Properties', path: '/properties' },
  { label: 'Services',   path: '/services' },
  { label: 'Blog',       path: '/blog' },
  { label: 'Contact',    path: '/contact' },
];

const Navbar = ({ scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Switch dark → light + shrink once user scrolls past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    const match = location.pathname.match(/^\/project\/(\d+)/);
    const projectId = match ? parseInt(match[1], 10) : null;
    window.dispatchEvent(
      new CustomEvent('openVisit', { detail: { projectId } })
    );
    closeMenu();
  }, [location.pathname, closeMenu]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Navbar theme: dark glass over hero, light glass after scroll
  const themeClass = scrolled ? 'light small' : 'dark';

  return (
    <div className="navwrap">
      <header className={`navcap ${themeClass}`}>

        {/* ---------- Logo + Wordmark ---------- */}
        <button
          type="button"
          className="navbrand"
          onClick={() => handleNavClick('/')}
          aria-label="The Prime Casa — home"
        >
          <span className="navlogo">
            <img src="/theprimecasa.webp" alt="" width="44" height="44" />
          </span>
          <span className="navword serif">The Prime Casa</span>
        </button>

        {/* ---------- Center nav links ---------- */}
        <nav className="navlinks" aria-label="Primary">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              type="button"
              className={`nl ${isActive(path) ? 'on' : ''}`}
              aria-current={isActive(path) ? 'page' : 'false'}
              onClick={() => handleNavClick(path)}
            >
              <span className="roll">
                <span>{label}</span>
                <span aria-hidden="true">{label}</span>
              </span>
            </button>
          ))}
        </nav>

        {/* ---------- Right: phone + book + burger ---------- */}
        <div className="navactions">
          <a
            href="tel:+918130504183"
            className="navicon navcta"
            aria-label="Call +91 81305 04183"
          >
            <IconPhone size={18} className="ic" />
          </a>

          <button
            type="button"
            className="navbook"
            onClick={handleBookVisit}
          >
            <span className="roll">
              <span>Book site visit</span>
              <span aria-hidden="true">Book site visit</span>
            </span>
          </button>

          <button
            type="button"
            className="burger navicon"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <IconX size={20} className="ic" />
              : <IconMenu2 size={20} className="ic" />}
          </button>
        </div>
      </header>

      {/* ---------- Mobile dropdown menu ---------- */}
      {menuOpen && (
        <div className="navmenu">
          {NAV_LINKS.map(({ label, path }) => (
            <button
              key={path}
              type="button"
              className={`navmenu-link ${isActive(path) ? 'on' : ''}`}
              onClick={() => handleNavClick(path)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="navmenu-book"
            onClick={handleBookVisit}
          >
            Book site visit
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;