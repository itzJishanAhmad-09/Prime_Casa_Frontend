// src/pages/ScheduleVisit.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ScheduleVisit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectIndex = parseInt(id);
  const project = projects[projectIndex];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  if (!project) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Prepare data for backend
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredSector: project.loc.split(',')[0] || 'Noida',
        message: `Site visit request for ${project.title}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nNumber of People: ${formData.people || 1}\nAdditional Info: ${formData.message || ''}`,
        enquiryType: 'site-visit',
        property: project.id, // Optional: if your model supports it
      };

      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '✅ Your site visit request has been sent! We will confirm within 24 hours.',
        });
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
      setStatus({
        type: 'error',
        message: '⚠️ Cannot connect to server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Home
      </Link>

      <div style={{
        background: 'var(--bg)',
        borderRadius: '20px',
        padding: '40px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '32px',
          marginBottom: '8px'
        }}>
          Schedule a Site Visit
        </h1>
        <p style={{ color: 'var(--txt2)', fontSize: '16px', marginBottom: '24px' }}>
          Book a visit for <strong>{project.title}</strong> at {project.loc}
        </p>

        {/* Status messages */}
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

        {/* Project summary */}
        <div style={{
          background: 'var(--bg1)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div><strong>Builder:</strong> {project.builder}</div>
            <div><strong>Price:</strong> {project.price}</div>
            <div><strong>Status:</strong> {project.status}</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                placeholder="+91 98765 43210"
                disabled={loading}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                disabled={loading}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Preferred Time
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#fff' }}
                disabled={loading}
              >
                <option value="">Select time slot</option>
                <option value="9:00 AM">9:00 AM – 10:00 AM</option>
                <option value="10:00 AM">10:00 AM – 11:00 AM</option>
                <option value="11:00 AM">11:00 AM – 12:00 PM</option>
                <option value="12:00 PM">12:00 PM – 1:00 PM</option>
                <option value="2:00 PM">2:00 PM – 3:00 PM</option>
                <option value="3:00 PM">3:00 PM – 4:00 PM</option>
                <option value="4:00 PM">4:00 PM – 5:00 PM</option>
                <option value="5:00 PM">5:00 PM – 6:00 PM</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                Number of People
              </label>
              <input
                type="number"
                name="people"
                min="1"
                max="10"
                value={formData.people}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                placeholder="e.g., 2"
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
              Special Requests
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
              placeholder="Any special requests or additional information..."
              disabled={loading}
            />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-red" style={{ padding: '14px 40px' }} disabled={loading}>
              {loading ? 'Submitting...' : (
                <>
                  <i className="ti ti-calendar-event"></i> Confirm Site Visit
                </>
              )}
            </button>
            <Link to={`/project/${projectIndex}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              border: '1px solid var(--border-s)',
              borderRadius: '9px',
              color: 'var(--txt)',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              <i className="ti ti-arrow-left"></i> Back to Property
            </Link>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '16px' }}>
            * Required fields. Our team will confirm your visit within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ScheduleVisit;