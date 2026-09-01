// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconPhone,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';

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

  const sectors = [
    'Sector 150 (Ultra-Premium)',
    'Sector 128 (Green Belt)',
    'Sector 107 (Mid-Premium)',
    'Noida Extension',
    'Greater Noida West',
    'Yamuna Expressway'
  ];

  const services = [
    'Buy Property',
    'Rent Property',
    'NRI Investment',
    'Property Valuation',
    'RERA Consultation',
    'Home Loans'
  ];

  const toolkitItems = [
    { label: 'ROI Calculator', tool: 'roi' },
    { label: 'EMI Planner', tool: 'emi' },
    { label: 'NRI Realty Edge', tool: 'nri' },
    { label: 'Property Valuation', tool: 'valuation' }
  ];

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src="//primecasa.webp"
            alt="The Prime Casa"
            style={{ height: '90px', width: 'auto' }}
            width="200"
            height="90"
          />
          <p>
            Trusted property dealer across all Noida sectors. RERA registered.
            <span className="rera-tag">RERA ✓</span>
          </p>
          <div className="footer-social">
            <a className="social-btn" href="https://www.facebook.com/theprimecasa" target="_blank" rel="noopener noreferrer">
              <IconBrandFacebook size={20} />
            </a>
            <a className="social-btn" href="https://www.instagram.com/theprimecasa" target="_blank" rel="noopener noreferrer">
              <IconBrandInstagram size={20} />
            </a>
            <a className="social-btn" href="https://www.youtube.com/@theprimecasa" target="_blank" rel="noopener noreferrer">
              <IconBrandYoutube size={20} />
            </a>
            <a className="social-btn" href="https://www.linkedin.com/company/the-prime-casa-realty-pvt-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
              <IconBrandLinkedin size={20} />
            </a>
            <a className="social-btn" href="https://wa.me/918130504183" target="_blank" rel="noopener noreferrer">
              <IconBrandWhatsapp size={20} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Popular Sectors</h4>
          {sectors.map((sector, i) => (
            <NavButton key={i} onClick={() => {}}>{sector}</NavButton>
          ))}
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          {services.map((service, i) => (
            <NavButton
              key={i}
              onClick={() => {
                if (service === 'NRI Investment') openTool('nri');
                else if (service === 'Home Loans') openTool('emi');
                else scrollTo('services');
              }}
            >
              {service}
            </NavButton>
          ))}
        </div>

        <div className="footer-col">
          <h4>Toolkit</h4>
          {toolkitItems.map((item, i) => (
            <NavButton key={i} onClick={() => openTool(item.tool)}>
              {item.label}
            </NavButton>
          ))}
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <a href="tel:+918130504183" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconPhone size={16} /> +91 8130504183
          </a>
          <a href="mailto:crm@theprimecasa.in" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconMail size={16} /> crm@theprimecasa.in
          </a>
          <NavButton onClick={() => scrollTo('contact')}>
            <span style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <IconMapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              Unit No 1230,TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201304
            </span>
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