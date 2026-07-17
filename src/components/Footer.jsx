import React from 'react';

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTool = (tool) => {
    // This will trigger the modal from App.jsx
    // We need to use a global event or context
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
            <a className="social-btn" href="#" aria-label="Facebook">
              <i className="ti ti-brand-facebook"></i>
            </a>
            <a className="social-btn" href="#" aria-label="Instagram">
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
          <a onClick={() => scrollTo('sectors')}>Sector 150 (Ultra-Premium)</a>
          <a onClick={() => scrollTo('sectors')}>Sector 128 (Green Belt)</a>
          <a onClick={() => scrollTo('sectors')}>Sector 107 (Mid-Premium)</a>
          <a onClick={() => scrollTo('sectors')}>Noida Extension</a>
          <a onClick={() => scrollTo('sectors')}>Greater Noida West</a>
          <a onClick={() => scrollTo('sectors')}>Yamuna Expressway</a>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <a onClick={() => scrollTo('services')}>Buy Property</a>
          <a onClick={() => scrollTo('services')}>Rent Property</a>
          <a onClick={() => openTool('nri')}>NRI Investment</a>
          <a onClick={() => scrollTo('services')}>Property Valuation</a>
          <a onClick={() => scrollTo('services')}>RERA Consultation</a>
          <a onClick={() => openTool('emi')}>Home Loans</a>
        </div>

        <div className="footer-col">
          <h4>Toolkit</h4>
          <a onClick={() => openTool('roi')}>ROI Calculator</a>
          <a onClick={() => openTool('emi')}>EMI Planner</a>
          <a onClick={() => openTool('nri')}>NRI Realty Edge</a>
          <a onClick={() => openTool('iq')}>AI Property Advisor</a>
          <a onClick={() => openTool('valuation')}>Property Valuation</a>
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
        <a href="#" style={{ color: 'var(--txt3)' }}>Terms</a> 
        &nbsp;|&nbsp; 
        <a href="#" style={{ color: 'var(--txt3)' }}>Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;