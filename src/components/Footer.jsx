// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openTool = (tool) => {
    window.dispatchEvent(new CustomEvent('openTool', { detail: tool }));
  };

  const handleKeyDown = (callback) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  // Helper to create a button-like element for navigation
  const NavButton = ({ onClick, children, className }) => (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={handleKeyDown(onClick)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.75rem',
        color: 'var(--txt2)',
        display: 'block',
        marginBottom: '0.3rem',
        padding: 0,
        textAlign: 'left',
        width: '100%',
        fontFamily: 'inherit',
      }}
      className={className}
    >
      {children}
    </button>
  );

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src="/primecasa.jpg"
            alt="The Prime Casa"
            style={{ height: '90px', width: 'auto' }}
          />
          <p>
            Trusted property dealer across all Noida sectors. RERA registered.
            <span className="rera-tag">RERA ✓</span>
          </p>
          <div className="footer-social">
            <a className="social-btn" href="https://www.facebook.com/theprimecasa" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-facebook"></i>
            </a>
            <a className="social-btn" href="https://www.instagram.com/theprimecasa" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-instagram"></i>
            </a>
            <a className="social-btn" href="https://www.youtube.com/@theprimecasa" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-youtube"></i>
            </a>
            <a className="social-btn" href="https://www.linkedin.com/company/the-prime-casa-realty-pvt-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-linkedin"></i>
            </a>
            <a className="social-btn" href="https://wa.me/918130504183" target="_blank" rel="noopener noreferrer">
              <i className="ti ti-brand-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Popular Sectors</h4>
          <NavButton onClick={() => {}}>Sector 150 (Ultra-Premium)</NavButton>
          <NavButton onClick={() => {}}>Sector 128 (Green Belt)</NavButton>
          <NavButton onClick={() => {}}>Sector 107 (Mid-Premium)</NavButton>
          <NavButton onClick={() => {}}>Noida Extension</NavButton>
          <NavButton onClick={() => {}}>Greater Noida West</NavButton>
          <NavButton onClick={() => {}}>Yamuna Expressway</NavButton>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <NavButton onClick={() => scrollTo('services')}>Buy Property</NavButton>
          <NavButton onClick={() => scrollTo('services')}>Rent Property</NavButton>
          <NavButton onClick={() => openTool('nri')}>NRI Investment</NavButton>
          <NavButton onClick={() => scrollTo('services')}>Property Valuation</NavButton>
          <NavButton onClick={() => scrollTo('services')}>RERA Consultation</NavButton>
          <NavButton onClick={() => openTool('emi')}>Home Loans</NavButton>
        </div>

        <div className="footer-col">
          <h4>Toolkit</h4>
          <NavButton onClick={() => openTool('roi')}>ROI Calculator</NavButton>
          <NavButton onClick={() => openTool('emi')}>EMI Planner</NavButton>
          <NavButton onClick={() => openTool('nri')}>NRI Realty Edge</NavButton>
          <NavButton onClick={() => openTool('valuation')}>Property Valuation</NavButton>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+918130504183">
            <i className="ti ti-phone" style={{ fontSize: '13px' }}></i> +91 8130504183
          </a>
          <a href="mailto:crm@theprimecasa.in">
            <i className="ti ti-mail" style={{ fontSize: '13px' }}></i> crm@theprimecasa.in
          </a>
          <NavButton onClick={() => scrollTo('contact')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Unit No 1230,TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201304
          </NavButton>
          <a>Tue–Sun · 11 AM – 7 PM</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 The prime casa realty pvt. Ltd. RERA Registered. All property rates are indicative as of June 2026.
        Always verify with the relevant authority before any purchase decision.
        &nbsp;|&nbsp;
        <Link to="/terms" style={{ color: 'var(--txt3)', textDecoration: 'none' }}>Terms</Link>
        &nbsp;|&nbsp;
        <Link to="/privacy-policy" style={{ color: 'var(--txt3)', textDecoration: 'none' }}>Privacy Policy</Link>
      </div>
    </footer>
  );
};

export default Footer;