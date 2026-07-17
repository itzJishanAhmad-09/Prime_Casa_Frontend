// src/components/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredSector: formData.sector,
          message: formData.message,
          enquiryType: 'contact',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '✅ Your enquiry has been sent! We will get back to you within 24 hours.',
        });
        setFormData({ name: '', email: '', phone: '', sector: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" id="contact">
      <div className="section-header">
        <div className="section-label">Get In Touch</div>
        <div className="section-title">Let’s Start Your Journey</div>
        <div className="section-sub">Fill in your details and we'll get back to you within 24 hours.</div>
      </div>

      <div className="contact-grid">
        <div className="contact-form">
          {status.message && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              background: status.type === 'success' ? '#D1FAE5' : '#FEE2DE',
              color: status.type === 'success' ? '#065F46' : '#96281B',
              fontWeight: '500',
            }}>
              {status.message}
            </div>
          )}

          <form onSubmit={submitContact}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="sector"
              placeholder="Preferred Sector / Project"
              value={formData.sector}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Tell us about your requirements…"
              rows="4"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit" className="btn-red" disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry →'}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-item"><i className="ti ti-phone"></i> +91 8130504183</div>
          <div className="info-item"><i className="ti ti-mail"></i> hr@theprimecasa.in</div>
          <div className="info-item"><i className="ti ti-map-pin"></i> Noida, Uttar Pradesh</div>
          <div className="info-item"><i className="ti ti-clock"></i> Tue–Sun · 11 AM – 7 PM</div>
          <div style={{ marginTop: '16px' }}>
            <a
              href="https://wa.me/918130504183"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#fff',
                border: 'none',
                borderRadius: '9px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              <i className="ti ti-brand-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;