// src/pages/ContactPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  // --- Form state & logic (copied from components/Contact.jsx) ---
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData({ ...formData, [name]: digitsOnly });

      if (digitsOnly.length === 10) {
        setPhoneError('');
      } else {
        setPhoneError('Phone number must be exactly 10 digits.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
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
      const response = await fetch(`${API_URL}/enquiries`, {
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
          message: 'Your enquiry has been sent! We will get back to you within 24 hours.',
        });
        setFormData({ name: '', email: '', phone: '', sector: '', message: '' });
        setPhoneError('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Failed to connect to server:', error);
      setStatus({
        type: 'error',
        message: 'Cannot connect to server. Please try again later.',
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

      {/* ===== HERO ===== */}
      <section className="contact-hero">
  <div className="contact-hero-bg"></div>
  <div className="contact-hero-overlay"></div>
  <div className="contact-hero-content">
    {/* Added breadcrumb */}
    <ul className="about-breadcrumb" style={{ justifyContent: 'center' }}> 
      <li><Link to="/">Home</Link></li>
      <li>/</li>
      <li>Contact</li>
    </ul>
    <h1 className="contact-hero-title">Contact Us</h1>
  </div>
</section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="contact-page-section">
        <div className="contact-page-grid">
          {/* Left: Info Cards */}
          <div className="contact-info-cards">
            <div className="info-card">
              <h3>Office Headquarters</h3>
              <div className="info-item">
                <i className="ti ti-map-pin"></i>
                <div>
                  <p className="info-label">Main Office</p>
                  <p className="info-value">Unit No 1230, TOWER-B, Bhutani Alphathum,<br />Sector 90, Noida, UP 201304</p>
                </div>
              </div>
              <div className="info-item">
                <i className="ti ti-phone"></i>
                <div>
                  <p className="info-label">Phone Support</p>
                  <p className="info-value">+91 8130504183</p>
                </div>
              </div>
              <div className="info-item">
                <i className="ti ti-clock"></i>
                <div>
                  <p className="info-label">Business Hours</p>
                  <p className="info-value">Tue – Sun · 11 AM – 7 PM</p>
                </div>
              </div>
            </div>

            <div className="info-card cta-card">
              <h3>Join Our Network</h3>
              <p>Become a part of the fastest-growing premium real estate ecosystem.</p>
              <Link to="/properties" className="cta-card-btn">Explore Properties</Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            <h2>Send us a message</h2>
            <p>Our dedicated team is ready to assist you with any inquiry.</p>

            {status.message && (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: status.type === 'success' ? '#D1FAE5' : '#FEE2DE',
                  color: status.type === 'success' ? '#065F46' : '#96281B',
                  fontWeight: '500',
                }}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={submitContact} className="contact-page-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  pattern="\d{10}"
                />
                {phoneError && (
                  <div style={{ color: '#C0392B', fontSize: '14px', marginTop: '4px' }}>
                    {phoneError}
                  </div>
                )}
              </div>
              <div className="form-group full-width">
                <label htmlFor="sector">Preferred Sector / Project</label>
                <input
                  type="text"
                  id="sector"
                  name="sector"
                  placeholder="e.g. Sector 150, Eldeco..."
                  value={formData.sector}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="How can we help you find your dream home?"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading || !!phoneError}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="contact-map">
        <div
          className="map-image"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/893323636/photo/unrecognizable-insurance-agent-rubbing-his-hands-while-making-a-fraud.webp?a=1&b=1&s=612x612&w=0&k=20&c=TmYlEVYv-v4VPzx6dXdkRyPRmKhxq5nkeX6LGfWH8k4=')",
          }}
        ></div>
      </section>
    </>
  );
};

export default ContactPage;