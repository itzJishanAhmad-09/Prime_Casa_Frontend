// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';  // ← ADD THIS IMPORT

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTool = (tool) => {
    const event = new CustomEvent('openTool', { detail: tool });
    window.dispatchEvent(event);
  };

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
            <a className="social-btn" href="https://www.facebook.com/theprimecasa?rdid=TQDk6DaFrXolxrfQ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CprxvKoxJ%2F#" aria-label="Facebook">
              <i className="ti ti-brand-facebook"></i>
            </a>
            <a className="social-btn" href="https://www.instagram.com/theprimecasa?igsh=b3dzNzViMGZjMGZw&utm_source=qr" aria-label="Instagram">
              <i className="ti ti-brand-instagram"></i>
            </a>
            <a className="social-btn" href="#" aria-label="YouTube">
              <i className="ti ti-brand-youtube"></i>
            </a>
            <a className="social-btn" href="#" aria-label="LinkedIn">
              <i className="ti ti-brand-linkedin"></i>
            </a>
            <a 
              className="social-btn" 
              href="https://wa.me/918130504183" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <i className="ti ti-brand-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Popular Sectors</h4>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Sector 150 (Ultra-Premium)</a>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Sector 128 (Green Belt)</a>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Sector 107 (Mid-Premium)</a>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Noida Extension</a>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Greater Noida West</a>
          <a onClick={() => scrollTo('sectors')} style={{ cursor: 'pointer' }}>Yamuna Expressway</a>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <a onClick={() => scrollTo('services')} style={{ cursor: 'pointer' }}>Buy Property</a>
          <a onClick={() => scrollTo('services')} style={{ cursor: 'pointer' }}>Rent Property</a>
          <a onClick={() => openTool('nri')} style={{ cursor: 'pointer' }}>NRI Investment</a>
          <a onClick={() => scrollTo('services')} style={{ cursor: 'pointer' }}>Property Valuation</a>
          <a onClick={() => scrollTo('services')} style={{ cursor: 'pointer' }}>RERA Consultation</a>
          <a onClick={() => openTool('emi')} style={{ cursor: 'pointer' }}>Home Loans</a>
        </div>

        <div className="footer-col">
          <h4>Toolkit</h4>
          <a onClick={() => openTool('roi')} style={{ cursor: 'pointer' }}>ROI Calculator</a>
          <a onClick={() => openTool('emi')} style={{ cursor: 'pointer' }}>EMI Planner</a>
          <a onClick={() => openTool('nri')} style={{ cursor: 'pointer' }}>NRI Realty Edge</a>
          <a onClick={() => openTool('iq')} style={{ cursor: 'pointer' }}>AI Property Advisor</a>
          <a onClick={() => openTool('valuation')} style={{ cursor: 'pointer' }}>Property Valuation</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+918130504183">
            <i className="ti ti-phone" style={{ fontSize: '13px' }}></i> +91 8130504183
          </a>
          <a href="mailto:hr@theprimecasa.in">
            <i className="ti ti-mail" style={{ fontSize: '13px' }}></i> hr@theprimecasa.in
          </a>
          <a href="#" onClick={() => scrollTo('contact')}>
            <i className="ti ti-map-pin" style={{ fontSize: '13px' }}></i> Noida, Uttar Pradesh
          </a>
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