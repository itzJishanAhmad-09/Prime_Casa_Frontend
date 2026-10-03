// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { submitEnquiry } from '../services/api';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Prime Casa – we'll help you find your dream property in Noida."
      />

      {/* ---------- HERO ---------- */}
      <section className="cp-hero">
        <div className="cp-hero-bg" aria-hidden="true" />
        <div className="cp-hero-scrim" aria-hidden="true" />

        <div className="cp-hero-inner">
          <nav className="cp-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="cp-crumb-current">Contact</span>
          </nav>

          <h1 className="cp-hero-title">
            Let&rsquo;s find your <em>address.</em>
          </h1>

          <p className="cp-hero-sub">
            Tell us your budget, sector and horizon — an advisor gets back
            to you within 24 hours.
          </p>
        </div>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="cp-body">
        <div className="cp-body-inner">

          {/* ---------- LEFT: Info list ---------- */}
          <aside className="cp-info">

            <div className="cp-info-block">
              <span className="cp-info-label">Head Office</span>
              <p className="cp-info-value">
                Unit No. 302, Regus Tower, 3rd Floor,<br />
                Sector 142, Noida,<br />
                Uttar Pradesh 201304
              </p>
              <a
                className="cp-info-link"
                href="https://www.google.com/maps/search/?api=1&query=Unit+No.+302+Regus+Tower+3rd+Floor+Sector+142+Noida+Uttar+Pradesh+201304"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Open in Google Maps</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="cp-info-block">
              <span className="cp-info-label">Phone Support</span>
              <p className="cp-info-value">+91 81305 04183</p>
              <a className="cp-info-link" href="tel:+918130504183">
                <span>Call now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="cp-info-block">
              <span className="cp-info-label">Email</span>
              <p className="cp-info-value">crm@theprimecasa.in</p>
              <a className="cp-info-link" href="mailto:crm@theprimecasa.in">
                <span>Write to us</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="cp-info-block">
              <span className="cp-info-label">Business Hours</span>
              <p className="cp-info-value">Tue – Sun · 11 AM – 7 PM</p>
            </div>

          </aside>

          {/* ---------- RIGHT: Form card ---------- */}
          <div className="cp-form-card">
            <h2 className="cp-form-title">Send us a message</h2>
            <p className="cp-form-sub">
              Our team is ready to assist you with any inquiry.
            </p>

            {status.message && (
              <div className={`cp-status ${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <form onSubmit={submitContact} className="cp-form" noValidate>
              <div className="cp-row">
                <div className="cp-field">
                  <label htmlFor="cp-name">Full name</label>
                  <input
                    id="cp-name"
                    type="text"
                    name="name"
                    placeholder="Vikramaditya Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="cp-field">
                  <label htmlFor="cp-phone">Phone number</label>
                  <input
                    id="cp-phone"
                    type="tel"
                    name="phone"
                    placeholder="10 digit mobile"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength="10"
                    pattern="\d{10}"
                    disabled={loading}
                  />
                  {phoneError && <span className="cp-field-err">{phoneError}</span>}
                </div>
              </div>

              <div className="cp-row">
                <div className="cp-field">
                  <label htmlFor="cp-email">Email address</label>
                  <input
                    id="cp-email"
                    type="email"
                    name="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="cp-field">
                  <label htmlFor="cp-sector">Preferred sector / project</label>
                  <input
                    id="cp-sector"
                    type="text"
                    name="sector"
                    placeholder="e.g. Sector 128 / Max Estates"
                    value={formData.sector}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="cp-field cp-field-full">
                <label htmlFor="cp-message">Your message</label>
                <textarea
                  id="cp-message"
                  name="message"
                  rows="5"
                  placeholder="Share your investment horizon, property specifications, or questions…"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="cp-actions">
                <button
                  type="submit"
                  className="cp-submit"
                  disabled={loading || !!phoneError}
                >
                  <span>{loading ? 'Sending…' : 'Send message'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2.2"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default ContactPage;