import React from 'react';

const LOGO_B64 = "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";

const Navbar = ({ scrollTo }) => {
  return (
    <nav>
      <div className="nav-logo">
        <img
          src={`data:image/jpeg;base64,${LOGO_B64}`}
          alt="The Prime Casa"
          style={{ height: '46px', width: 'auto' }}
        />
      </div>
      <div className="nav-links">
        <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>Projects</a>
        <a href="#sectors" onClick={(e) => { e.preventDefault(); scrollTo('sectors'); }}>Sectors</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a>
        <a href="#toolkit" onClick={(e) => { e.preventDefault(); scrollTo('toolkit'); }}>Toolkit</a>
        <a href="#insights" onClick={(e) => { e.preventDefault(); scrollTo('insights'); }}>Insights</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
      </div>
      <div className="nav-right">
        <a className="nav-wa" href="https://wa.me/8130504006" target="_blank" rel="noopener noreferrer">
          <i className="ti ti-brand-whatsapp"></i> WhatsApp
        </a>
        <a href="#contact-cta" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('contact-cta'); }}>
          Book Site Visit
        </a>
      </div>
    </nav>
  );
};

export default Navbar;