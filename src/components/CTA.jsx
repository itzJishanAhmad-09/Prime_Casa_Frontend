import React from 'react';
const CTA = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="section" id="contact-cta">
      <div className="cta-banner">
        <h2>Ready to Invest in Noida?</h2>
        <p>Get a personalised shortlist of verified, RERA-registered properties matching your budget and sector preference — within 24 hours.</p>
        <div className="cta-btns">
          <button className="btn-red" onClick={() => scrollTo('contact')}>Get Personalised Shortlist ↗</button>
          <button className="btn-outline-w" onClick={() => scrollTo('market')}>Explore Market Trends</button>
          <a href="https://wa.me/8130504183" target="_blank" style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#25D366', color:'#fff', border:'none', borderRadius:'9px', padding:'14px 28px', fontSize:'14px', fontWeight:'600', textDecoration:'none'}}><i className="ti ti-brand-whatsapp"></i> Chat on WhatsApp</a>
        </div>
      </div>
    </div>
  );
};
export default CTA;