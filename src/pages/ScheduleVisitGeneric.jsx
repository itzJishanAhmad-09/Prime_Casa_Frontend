// src/pages/ScheduleVisitGeneric.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

const ScheduleVisitGeneric = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectId: '',
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const selectedProject = projects.find(p => p.id === parseInt(formData.projectId));

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredSector: selectedProject?.loc?.split(',')[0] || 'Noida',
        message: `Site visit request for ${selectedProject?.title || 'Not specified'}\nPreferred Date: ${formData.date}\nPreferred Time: ${formData.time}\nNumber of People: ${formData.people || 1}\nAdditional Info: ${formData.message || ''}`,
        enquiryType: 'site-visit',
      };

      const response = await fetch(`${API_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: '✅ Your site visit request has been sent!' });
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
    <div style={{ padding: '80px 2rem 60px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Home
      </Link>

      <div style={{ background: 'var(--bg)', borderRadius: '20px', padding: '40px', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '8px' }}>
          Book a Site Visit
        </h1>
        <p style={{ color: 'var(--txt2)', marginBottom: '24px' }}>
          Select a project and choose your preferred date and time.
        </p>

        {status.message && (
          <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', background: status.type === 'success' ? '#D1FAE5' : '#FEE2DE', color: status.type === 'success' ? '#065F46' : '#96281B' }}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Select Project *</label>
            <select name="projectId" required value={formData.projectId} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading}>
              <option value="">Choose a project...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.title} – {p.loc}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Email Address *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Preferred Date *</label>
              <input type="date" name="date" required value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Preferred Time</label>
              <select name="time" value={formData.time} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading}>
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
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Number of People</label>
              <input type="number" name="people" min="1" max="10" value={formData.people} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px' }} disabled={loading} />
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Special Requests</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="3" style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', resize: 'vertical' }} disabled={loading} />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-red" style={{ padding: '14px 40px' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm Site Visit'}
            </button>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', border: '1px solid var(--border-s)', borderRadius: '9px', color: 'var(--txt)', textDecoration: 'none', fontWeight: '500' }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleVisitGeneric;