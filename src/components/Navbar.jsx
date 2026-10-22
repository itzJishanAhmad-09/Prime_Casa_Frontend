// src/components/Navbar.jsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconPhone,
  IconMenu2,
  IconX,
  IconChevronDown,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Location menu — 9 cities                                          */
/* ------------------------------------------------------------------ */
const LOCATION_LINKS = [
  { label: 'Property in Noida',     to: '/properties?city=Noida' },
  { label: 'Property in Delhi',     to: '/properties?city=Delhi' },
  { label: 'Property in Gurugram',  to: '/properties?city=Gurugram' },
  { label: 'Property in Lucknow',   to: '/properties?city=Lucknow' },
  { label: 'Property in Pune',      to: '/properties?city=Pune' },
  { label: 'Property in Mumbai',    to: '/properties?city=Mumbai' },
  { label: 'Property in Bangalore', to: '/properties?city=Bangalore' },
  { label: 'Property in Faridabad', to: '/properties?city=Faridabad' },
  { label: 'Property in Ghaziabad', to: '/properties?city=Ghaziabad' },
];

/* ------------------------------------------------------------------ */
/*  Primary navigation                                                 */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Our Team',              to: '/our-team' },
      { label: 'Rewards & Recognition', to: '/rewards'  },
    ],
  },
  { label: 'Services', path: '/services' },
  {
    label: 'Properties',
    path: '/properties',
    children: [
      { label: 'New Launch Properties',  to: '/new-launch'  },
      { label: 'Premium Properties',     to: '/premium'     },
      { label: 'Commercial Properties',  to: '/commercial'  },
      { label: 'Residential Properties', to: '/residential' },
      { label: 'Plots & Land',           to: '/plots'       },
    ],
  },
  {
    label: 'Locations',
    path: '/properties',
    children: LOCATION_LINKS,
  },
  { label: 'Blog', path: '/blog' },
  {
    label: 'Contact',
    path: '/contact',
    children: [
      { label: 'Careers', to: '/career' },
    ],
  },
];

const Navbar = ({ scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen]             = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [openDropdown, setOpenDropdown]     = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  /* ---------- sticky scroll state ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- close menus on route change ---------- */
  useEffect(() => {
    setOpenDropdown(null);
    setMobileExpanded(null);
    setMenuOpen(false);
  }, [location.pathname, location.hash, location.search]);

  /* ---------- outside click + Escape for desktop dropdown ---------- */
  useEffect(() => {
    if (!openDropdown) return;

    const onDoc = (e) => {
      if (!e.target.closest('.nav-drop')) setOpenDropdown(null);
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };

    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, [openDropdown]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  const handleNavClick = useCallback(
    (path) => {
      if (path === '/' && location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(path);
      }
      closeMenu();
    },
    [navigate, location.pathname, closeMenu]
  );

  const handleChildClick = useCallback(
    (to) => {
      navigate(to);
      setOpenDropdown(null);
      closeMenu();
    },
    [navigate, closeMenu]
  );

  const handleBookVisit = useCallback(() => {
    const match = location.pathname.match(/^\/project\/(\d+)/);
    const projectId = match ? parseInt(match[1], 10) : null;
    window.dispatchEvent(
      new CustomEvent('openVisit', { detail: { projectId } })
    );
    closeMenu();
  }, [location.pathname, closeMenu]);

  // ✅ UPDATED isActive to distinguish between Properties and Locations
  const isActive = (label, path, children) => {
    if (path === '/') return location.pathname === '/';
    
    const hasCityParam = new URLSearchParams(location.search).has('city');

    if (label === 'Locations') {
      return location.pathname === '/properties' && hasCityParam;
    }

    if (label === 'Properties') {
      if (location.pathname === '/properties' && hasCityParam) return false;
      if (location.pathname.startsWith('/properties')) return true;
    }

    if (location.pathname.startsWith(path)) return true;
    
    if (Array.isArray(children)) {
      return children.some((c) => {
        const clean = c.to.split('?')[0].split('#')[0];
        return clean !== path && location.pathname.startsWith(clean);
      });
    }
    return false;
  };

  const openDrop = (label) => {
    clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };

  const themeClass = scrolled ? 'light small' : 'dark';

  return (
    <div className="navwrap">
      <header className={`navcap ${themeClass}`}>
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

        <nav className="navlinks" aria-label="Primary">
          {NAV_LINKS.map(({ label, path, children }) => {
            // ✅ Pass label to isActive
            const active = isActive(label, path, children);
            const hasChildren = Array.isArray(children) && children.length > 0;
            const isOpen = openDropdown === label;

            if (!hasChildren) {
              return (
                <button
                  key={path}
                  type="button"
                  className={`nl ${active ? 'on' : ''}`}
                  aria-current={active ? 'page' : 'false'}
                  onClick={() => handleNavClick(path)}
                >
                  <span className="roll">
                    <span>{label}</span>
                    <span aria-hidden="true">{label}</span>
                  </span>
                </button>
              );
            }

            return (
              <div
                key={label}
                className="nav-drop"
                onMouseEnter={() => openDrop(label)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`nl nl--has-drop ${active ? 'on' : ''}`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => handleNavClick(path)}
                >
                  <span className="roll">
                    <span>{label}</span>
                    <span aria-hidden="true">{label}</span>
                  </span>
                  <IconChevronDown
                    size={14}
                    className="nl-caret"
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="nav-drop-menu" role="menu">
                    {children.map((c) => (
                      <button
                        key={c.to}
                        type="button"
                        role="menuitem"
                        className="nav-drop-item"
                        onClick={() => handleChildClick(c.to)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="navactions">
          <a
            href="tel:+918130504183"
            className="navicon navcta"
            aria-label="Call +91 81305 04183"
          >
            <IconPhone size={18} className="ic" />
          </a>

          <button type="button" className="navbook" onClick={handleBookVisit}>
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
            {menuOpen ? (
              <IconX size={20} className="ic" />
            ) : (
              <IconMenu2 size={20} className="ic" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navmenu">
          {NAV_LINKS.map(({ label, path, children }) => {
            const active = isActive(label, path, children);
            const hasChildren = Array.isArray(children) && children.length > 0;

            if (!hasChildren) {
              return (
                <button
                  key={path}
                  type="button"
                  className={`navmenu-link ${active ? 'on' : ''}`}
                  onClick={() => handleNavClick(path)}
                >
                  {label}
                </button>
              );
            }

            const expanded = mobileExpanded === label;

            return (
              <div key={label} className="navmenu-group">
                <button
                  type="button"
                  className={`navmenu-link navmenu-link--group ${
                    active ? 'on' : ''
                  }`}
                  aria-expanded={expanded}
                  onClick={() =>
                    setMobileExpanded(expanded ? null : label)
                  }
                >
                  <span>{label}</span>
                  <IconChevronDown
                    size={18}
                    className={`navmenu-caret ${expanded ? 'is-open' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {expanded && (
                  <div className="navmenu-sub">
                    {children.map((c) => (
                      <button
                        key={c.to}
                        type="button"
                        className="navmenu-sublink"
                        onClick={() => handleChildClick(c.to)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

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