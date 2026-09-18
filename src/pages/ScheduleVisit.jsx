// src/pages/ScheduleVisit.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Seo from '../components/Seo';
import { IconMapPin, IconPhone, IconShield } from '@tabler/icons-react';
import { submitEnquiry } from '../services/api';
import { isImagePath } from '../utils/helpers';

// Show the first 3 projects as "Curated Previews" — stays in sync with projects data
const SHOWCASE_PROJECTS = projects.slice(0, 3);

const ScheduleVisit = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const defaultProjectId = id
    ? (projects.find((p) => p.id === parseInt(id))?.id ?? '')
    : '';

  const [formData, setFormData] = useState({
    projectId: defaultProjectId,
    name:      '',
    email:     '',
    phone:     '',
    date:      '',
    time:      '',
    message:   '',
  });
  const [status, setStatus]         = useState({ type: '', message: '' });
  const [loading, setLoading]       = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      setPhoneError(digitsOnly.length === 10 ? '' : 'Phone must be exactly 10 digits');
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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

    const selectedProject = projects.find((p) => p.id === parseInt(formData.projectId));

    try {
      await submitEnquiry({
        name:            formData.name,
        email:           formData.email,
        phone:           formData.phone,
        preferredSector: selectedProject?.loc?.split(',')[0] || 'Noida',
        message: `Site visit request for ${selectedProject?.title || 'Not specified'}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nAdditional Info: ${formData.message || ''}`,
        enquiryType: 'site-visit',
      });

      setStatus({ type: 'success', message: 'Your site visit request has been sent!' });
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
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
        <div className="schedule-hero-bg" />
        <div className="schedule-hero-overlay" />
        <div className="schedule-hero-content">
          <span className="schedule-hero-badge">Experience Excellence</span>
          <h1 className="schedule-hero-title">Visit Your Future Home</h1>
          <p className="schedule-hero-sub">
            Step into a world of architectural mastery. We offer private, guided tours tailored to
            your schedule and investment goals.
          </p>
        </div>
      </section>

      <section className="schedule-form-section">
        <div className="schedule-form-grid">
          <div className="schedule-info">
            <h2>Concierge-Level Service</h2>
            <p>
              Our advisors are available to guide you through every detail of the estate, from
              structural integrity to smart-home integration.
            </p>
            <div className="schedule-info-items">
              <div className="info-item">
                <IconMapPin size={22} color="var(--red)" />
                <div>
                  <h4>Location</h4>
                  <p>Unit No 1230, TOWER-B, Bhutani Alphathum, Sector 90, Noida, UP 201304</p>
                </div>
              </div>
              <div className="info-item">
                <IconPhone size={22} color="var(--red)" />
                <div>
                  <h4>Direct Line</h4>
                  <p>+91 8130504183</p>
                </div>
              </div>
              <div className="info-item">
                <IconShield size={22} color="var(--red)" />
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
                  background: status.type === 'success' ? '#F9FAFB' : '#FEE2DE',
                  color:      status.type === 'success' ? '#1F2937'  : '#96281B',
                  fontWeight: '500',
                  border:     status.type === 'success' ? '1px solid #E5E7EB' : 'none',
                }}
              >
                {status.message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="schedule-form"
              data-wmcp='{"name":"scheduleVisit","description":"Book a site visit / property viewing appointment","endpoint":"POST /api/enquiries","type":"site-visit"}'
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Aarav Mehta"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    data-wmcp='{"label":"Full Name","type":"string","required":true,"description":"Full name of the visitor"}'
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="aarav.mehta@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    data-wmcp='{"label":"Email Address","type":"email","required":true,"description":"Email address for confirmation"}'
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
                    data-wmcp='{"label":"Phone Number","type":"tel","required":true,"pattern":"\\d{10}","maxLength":10,"description":"10-digit mobile number"}'
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
                    data-wmcp='{"label":"Preferred Estate","type":"select","required":false,"description":"Select a property project to visit"}'
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
                    data-wmcp='{"label":"Preferred Date","type":"date","required":true,"description":"Desired date for the site visit"}'
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
                    data-wmcp='{"label":"Preferred Time","type":"time","required":true,"description":"Desired time for the site visit"}'
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
                  data-wmcp='{"label":"Special Requirements","type":"textarea","required":false,"description":"Any special requirements or details the visitor wants to see"}'
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

      {/* Curated Previews — driven by projects data, always in sync */}
      <section className="schedule-showcase">
        <div className="showcase-header">
          <h3>Curated Previews</h3>
          <div className="showcase-divider" />
        </div>
        <div className="showcase-grid">
          {SHOWCASE_PROJECTS.map((project) => (
            <div className="showcase-card" key={project.id}>
              <div className="showcase-card-image">
                <img
                  src={isImagePath(project.emoji) ? project.emoji : '/assets/images/placeholder.jpg'}
                  alt={project.title}
                  loading="lazy"
                  width="400"
                  height="200"
                  onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                />
              </div>
              <div className="showcase-card-body">
                <span className="showcase-card-label">{project.loc}</span>
                <h4>{project.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScheduleVisit;