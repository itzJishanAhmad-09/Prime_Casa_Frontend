// src/components/Contact.jsx
import React, { useState } from 'react';
import { submitEnquiry } from '../services/api';

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
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      setPhoneError(
        digitsOnly.length === 10 ? '' : 'Phone number must be exactly 10 digits.'
      );
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitContact = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredSector: formData.sector,
        message: formData.message,
        enquiryType: 'contact',
      });

      setStatus({
        type: 'success',
        message: 'Your enquiry has been sent! We will get back to you within 24 hours.',
      });
      setFormData({ name: '', email: '', phone: '', sector: '', message: '' });
      setPhoneError('');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ct-section" id="contact">
      <div className="ct-inner">
        <div className="ct-card">

          {/* ---------- Left: red statement panel ---------- */}
          <aside className="ct-panel">
            <div className="ct-panel-top">
              <span className="ct-eyebrow">Get In Touch</span>

              <h2 className="ct-title">
                Let&rsquo;s start your <em>journey.</em>
              </h2>

              <p className="ct-desc">
                Share your acquisition preferences and a dedicated senior
                advisor will reach out within 24 hours with confidential
                property dossiers.
              </p>

              <div className="ct-contact-list">
                <a href="tel:+918130504183" className="ct-contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.8"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                  <span>+91 81305 04183</span>
                </a>
                <a href="mailto:crm@theprimecasa.in" className="ct-contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.8"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  <span>crm@theprimecasa.in</span>
                </a>
                <span className="ct-contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="1.8"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span>Tue – Sun · 11 AM – 7 PM</span>
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/918130504183"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-wa-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.8"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </aside>

          {/* ---------- Right: form ---------- */}
          <div className="ct-form-wrap">
            {status.message && (
              <div className={`ct-status ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <form onSubmit={submitContact} className="ct-form">
              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="ct-name">Full name *</label>
                  <input
                    id="ct-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Vikramaditya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-phone">Phone number *</label>
                  <input
                    id="ct-phone"
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="10"
                    pattern="\d{10}"
                  />
                  {phoneError && <span className="ct-field-err">{phoneError}</span>}
                </div>
              </div>

              <div className="ct-row">
                <div className="ct-field">
                  <label htmlFor="ct-email">Email address</label>
                  <input
                    id="ct-email"
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="ct-field">
                  <label htmlFor="ct-sector">Preferred sector / project</label>
                  <input
                    id="ct-sector"
                    type="text"
                    name="sector"
                    placeholder="e.g. Sector 128 / Max Estates"
                    value={formData.sector}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="ct-field ct-field-full">
                <label htmlFor="ct-message">Your message</label>
                <textarea
                  id="ct-message"
                  name="message"
                  rows="4"
                  placeholder="Share your investment horizon, property specifications, or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="ct-actions">
                <button
                  type="submit"
                  className="ct-submit"
                  disabled={loading || !!phoneError}
                >
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>

                <span className="ct-privacy">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <span>Strict Privacy · Zero Spam Guarantee</span>
                </span>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;