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
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend or email
    console.log('Booking submitted:', { project: project.title, ...formData });
    setSubmitted(true);
    // Optionally redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ padding: '60px 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          background: '#D1FAE5', 
          padding: '40px', 
          borderRadius: '16px',
          border: '2px solid #065F46'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ color: '#065F46' }}>Booking Confirmed!</h2>
          <p style={{ color: '#065F46', fontSize: '18px', marginTop: '12px' }}>
            We have received your site visit request for <strong>{project.title}</strong>.
          </p>
          <p style={{ color: '#065F46', fontSize: '16px', marginTop: '8px' }}>
            Our team will contact you shortly to confirm the visit details.
          </p>
          <Link to="/" style={{ 
            display: 'inline-block', 
            marginTop: '20px',
            background: '#065F46',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

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

        <div style={{ 
          background: 'var(--bg1)', 
          padding: '16px', 
          borderRadius: '12px', 
          marginBottom: '24px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <strong>Builder:</strong> {project.builder}
            </div>
            <div>
              <strong>Price:</strong> {project.price}
            </div>
            <div>
              <strong>Status:</strong> {project.status}
            </div>
          </div>
        </div>

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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="Enter your full name"
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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="your@email.com"
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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="+91 98765 43210"
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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
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
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  background: '#fff'
                }}
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
                value={formData.people || ''}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="e.g., 2"
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
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'Inter, sans-serif'
              }}
              placeholder="Any special requests or additional information..."
            />
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-red" style={{ padding: '14px 40px' }}>
              <i className="ti ti-calendar-event"></i> Confirm Site Visit
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