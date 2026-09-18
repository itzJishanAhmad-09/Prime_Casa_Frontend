// src/components/Contact.jsx
import React, { useState } from 'react';
import { IconPhone, IconMail, IconMapPin, IconClock, IconBrandWhatsapp } from '@tabler/icons-react';
import { submitEnquiry } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: '',
    message: '',
  });
  const [status, setStatus]       = useState({ type: '', message: '' });
  const [loading, setLoading]     = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length > 10) return;
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      setPhoneError(digitsOnly.length === 10 ? '' : 'Phone number must be exactly 10 digits.');
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
        name:            formData.name,
        email:           formData.email,
        phone:           formData.phone,
        preferredSector: formData.sector,
        message:         formData.message,
        enquiryType:     'contact',
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
    <div className="section" id="contact">
      <div className="section-header">
        <div className="section-label">Get In Touch</div>
        <div className="section-title">Let's Start Your Journey</div>
        <div className="section-sub">Fill in your details and we'll get back to you within 24 hours.</div>
      </div>

      <div className="contact-grid">
        <div className="contact-form">
          {status.message && (
            <div
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
            onSubmit={submitContact}
            data-wmcp='{"name":"contactQuick","description":"Quick enquiry form on homepage","endpoint":"POST /api/enquiries","type":"contact"}'
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              data-wmcp='{"label":"Your Name","type":"string","required":true,"description":"Your full name"}'
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              data-wmcp='{"label":"Your Email","type":"email","required":true,"description":"Your email address"}'
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (10 digits)"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
              maxLength="10"
              pattern="\d{10}"
              title="Please enter exactly 10 digits"
              data-wmcp='{"label":"Phone Number","type":"tel","required":true,"pattern":"\\d{10}","maxLength":10,"description":"10-digit mobile number"}'
            />
            {phoneError && (
              <div style={{ color: '#C0392B', fontSize: '14px', marginTop: '-6px', marginBottom: '8px' }}>
                {phoneError}
              </div>
            )}
            <input
              type="text"
              name="sector"
              placeholder="Preferred Sector / Project"
              value={formData.sector}
              onChange={handleChange}
              disabled={loading}
              data-wmcp='{"label":"Preferred Sector","type":"string","required":false,"description":"Preferred sector or project name"}'
            />
            <textarea
              name="message"
              placeholder="Tell us about your requirements…"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              data-wmcp='{"label":"Message","type":"textarea","required":false,"description":"Your requirements details"}'
            />
            <button type="submit" className="btn-red" disabled={loading || !!phoneError}>
              {loading ? 'Sending...' : 'Send Enquiry →'}
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <IconPhone size={22} color="var(--red)" /> +91 8130504183
          </div>
          <div className="info-item">
            <IconMail size={22} color="var(--red)" /> crm@theprimecasa.in
          </div>
          <div className="info-item">
            <IconMapPin size={22} color="var(--red)" /> Noida, Uttar Pradesh
          </div>
          <div className="info-item">
            <IconClock size={22} color="var(--red)" /> Tue–Sun · 11 AM – 7 PM
          </div>
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
              <IconBrandWhatsapp size={20} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;