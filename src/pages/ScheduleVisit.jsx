// src/pages/ScheduleVisit.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Seo from '../components/Seo';

const ScheduleVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const defaultProjectId = id ? projects.find(p => p.id === parseInt(id))?.id || '' : '';

  const [formData, setFormData] = useState({
    projectId: defaultProjectId,
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData({ ...formData, [name]: digitsOnly });
      setPhoneError(digitsOnly.length === 10 ? '' : 'Phone must be exactly 10 digits');
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }
    setLoading(true);
    setStatus({ type: '', message: '' });

    const selectedProject = projects.find(p => p.id === parseInt(formData.projectId));

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredSector: selectedProject?.loc?.split(',')[0] || 'Noida',
        message: `Site visit request for ${selectedProject?.title || 'Not specified'}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nAdditional Info: ${formData.message || ''}`,
        enquiryType: 'site-visit',
      };

      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Your site visit request has been sent!' });
        setTimeout(() => navigate('/'), 3000);
      } else {
        setStatus({ type: 'error', message: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="schedule-visit-page">
      <Seo
        title="Schedule a Visit"
        description="Book a private viewing of our premium properties. Choose your preferred estate, date, and time."
      />

      <section className="schedule-hero">
        <div className="schedule-hero-bg"></div>
        <div className="schedule-hero-overlay"></div>
        <div className="schedule-hero-content">
          <span className="schedule-hero-badge">Experience Excellence</span>
          <h1 className="schedule-hero-title">Visit Your Future Home</h1>
          <p className="schedule-hero-sub">
            Step into a world of architectural mastery. We offer private, guided tours tailored to your schedule and investment goals.
          </p>
        </div>
      </section>

      <section className="schedule-form-section">
        <div className="schedule-form-grid">
          <div className="schedule-info">
            <h2>Concierge-Level Service</h2>
            <p>Our advisors are available to guide you through every detail of the estate, from structural integrity to smart-home integration.</p>
            <div className="schedule-info-items">
              <div className="info-item">
                <i className="ti ti-map-pin"></i>
                <div>
                  <h4>Location</h4>
                  <p> Unit No 1230,TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201304</p>
                </div>
              </div>
              <div className="info-item">
                <i className="ti ti-phone"></i>
                <div>
                  <h4>Direct Line</h4>
                  <p>+91 8130504183</p>
                </div>
              </div>
              <div className="info-item">
                <i className="ti ti-shield"></i>
                <div>
                  <h4>Secure Viewing</h4>
                  <p>NDAs available for high-profile clients.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="schedule-form-wrapper">
            {status.message && (
              <div
                className={`schedule-status ${status.type}`}
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

            <form onSubmit={handleSubmit} className="schedule-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Johnathan Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="j.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    maxLength="10"
                    pattern="\d{10}"
                  />
                  {phoneError && (
                    <div style={{ color: '#C0392B', fontSize: '14px', marginTop: '4px' }}>
                      {phoneError}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="projectId">Preferred Estate</label>
                  <select
                    id="projectId"
                    name="projectId"
                    value={formData.projectId}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Select a property</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Preferred Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Special Requirements</label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Tell us about any specific details you wish to see..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn-red schedule-submit"
                disabled={loading || !!phoneError}
              >
                {loading ? 'Sending...' : 'Confirm Viewing Schedule →'}
              </button>
              <p className="schedule-legal">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="schedule-showcase">
        <div className="showcase-header">
          <h3>Curated Previews</h3>
          <div className="showcase-divider"></div>
        </div>
        <div className="showcase-grid">
          {[
            {
              image: '/assets/images/img1.jpg',
              label: 'Yamuna Expressway',
              title: 'Eldeco Whispers of Wonder'
            },
            {
              image: '/assets/images/img2.png',
              label: 'Noida, Sector 107 Noida',
              title: 'Ace Mahagun Medalleo'
            },
            {
              image: '/assets/images/img3.png',
              label: 'Sector 128 Noida',
              title: 'Max Estate '
            }
          ].map((card, idx) => (
            <div className="showcase-card" key={idx}>
              <div className="showcase-card-image" style={{ backgroundImage: `url(${card.image})` }}></div>
              <div className="showcase-card-body">
                <span className="showcase-card-label">{card.label}</span>
                <h4>{card.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScheduleVisit;