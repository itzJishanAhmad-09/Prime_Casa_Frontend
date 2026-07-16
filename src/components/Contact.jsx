import React from 'react';
const Contact = () => {
  const submitContact = (e) => {
    e.preventDefault();
    alert('✅ Your enquiry has been sent! We will get back to you within 24 hours.');
    e.target.reset();
  };
  return (
    <div className="section" id="contact">
      <div className="section-header">
        <div className="section-label">Get In Touch</div>
        <div className="section-title">Let’s Start Your Journey</div>
        <div className="section-sub">Fill in your details and we’ll get back to you within 24 hours.</div>
      </div>
      <div className="contact-grid">
        <div className="contact-form">
          <form onSubmit={submitContact}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <input type="text" placeholder="Preferred Sector / Project" />
            <textarea placeholder="Tell us about your requirements…" rows="4"></textarea>
            <button type="submit" className="btn-red">Send Enquiry →</button>
          </form>
        </div>
        <div className="contact-info">
          <div className="info-item"><i className="ti ti-phone"></i> +91 8130504183</div>
          <div className="info-item"><i className="ti ti-mail"></i> hr@theprimecasa.in</div>
          <div className="info-item"><i className="ti ti-map-pin"></i> Noida, Uttar Pradesh</div>
          <div className="info-item"><i className="ti ti-clock"></i> Tue–Sun · 11 AM – 7 PM</div>
          <div style={{marginTop:'16px'}}>
            <a href="https://wa.me/918130504183" target="_blank" style={{display:'inline-flex', alignItems:'center', gap:'8px', background:'#25D366', color:'#fff', border:'none', borderRadius:'9px', padding:'14px 28px', fontSize:'14px', fontWeight:'600', textDecoration:'none'}}><i className="ti ti-brand-whatsapp"></i> Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;