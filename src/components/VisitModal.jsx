// src/components/VisitModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { projects } from '../data/projects';
import { submitEnquiry } from '../services/api';

const TIME_SLOTS = ['11 AM – 1 PM', '1 PM – 4 PM', '4 PM – 7 PM'];

const VisitModal = ({ isOpen, onClose, projectId }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    project: '',
    date: '',
    slot: 2,
  });
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({
        ...f,
        project: projectId ? String(projectId) : '',
        slot: 2,
      }));
      setDone(false);
      setError('');
      setTimeout(() => firstFieldRef.current?.focus(), 100);
    }
  }, [isOpen, projectId]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (key) => (e) => {
    let value = e.target.value;
    if (key === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, [key]: value }));
    setError('');
  };

  const validate = () => {
    if (form.name.trim().length < 2) return 'Please enter your full name.';
    if (!/^[6-9]\d{9}$/.test(form.phone)) return 'Please enter a valid 10-digit mobile number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'That email looks invalid.';
    if (form.date) {
      const d = new Date(form.date + 'T12:00:00');
      if (d.getDay() === 1) return 'We are closed on Mondays — please pick Tue–Sun.';
    }
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    const selected = projects.find((p) => p.id === parseInt(form.project));
    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredSector: selected?.loc?.split(',')[0] || 'Noida',
        message: `Site visit request for ${selected?.title || 'Not specified'}\nDate: ${form.date || 'Flexible'}\nSlot: ${TIME_SLOTS[form.slot]}`,
        enquiryType: 'site-visit',
      });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setForm({ name: '', phone: '', email: '', project: '', date: '', slot: 2 });
    setDone(false);
    setError('');
  };

  return (
    <div className="vm-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vm-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vm-close" onClick={onClose} aria-label="Close">
          <IconX size={18} />
        </button>

        {!done ? (
          <form onSubmit={submit} className="vm-form" noValidate>
            <span className="vm-eyebrow">Zero brokerage · RERA verified</span>

            <h2 className="vm-title">
              Book a <em>site visit.</em>
            </h2>

            <div className="vm-row">
              <div className="vm-field">
                <label htmlFor="vm-name">Full name</label>
                <input
                  ref={firstFieldRef}
                  id="vm-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={update('name')}
                  required
                />
              </div>
              <div className="vm-field">
                <label htmlFor="vm-phone">Phone number</label>
                <input
                  id="vm-phone"
                  type="tel"
                  placeholder="10-digit mobile"
                  value={form.phone}
                  onChange={update('phone')}
                  required
                  maxLength={10}
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="vm-field">
              <label htmlFor="vm-project">Project</label>
              <select id="vm-project" value={form.project} onChange={update('project')}>
                <option value="">Not sure yet — advise me</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} · {p.loc.split(',')[0]}
                  </option>
                ))}
              </select>
            </div>

            <div className="vm-row">
              <div className="vm-field">
                <label htmlFor="vm-date">Preferred date</label>
                <input id="vm-date" type="date" value={form.date} onChange={update('date')} />
              </div>
              <div className="vm-field">
                <label htmlFor="vm-email">Email (optional)</label>
                <input
                  id="vm-email"
                  type="email"
                  placeholder="name@domain.com"
                  value={form.email}
                  onChange={update('email')}
                />
              </div>
            </div>

            <div className="vm-field">
              <span className="vm-slots-label">Time slot · Tue–Sun</span>
              <div className="vm-slots" role="group" aria-label="Choose a time slot">
                {TIME_SLOTS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    className={`vm-slot ${form.slot === i ? 'is-active' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, slot: i }))}
                    aria-pressed={form.slot === i}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="vm-error" role="alert">{error}</p>}

            <button type="submit" className="vm-submit" disabled={loading}>
              {loading ? 'Sending…' : 'Confirm visit request'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        ) : (
          <div className="vm-done">
            <span className="vm-done-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.4"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
            </span>
            <h3 className="vm-done-title">Visit requested.</h3>
            <p className="vm-done-text">
              Thanks, {form.name.split(' ')[0] || 'there'} — an advisor will call
              you on {form.phone} within 24 hours.
            </p>
            <div className="vm-done-buttons">
              <button type="button" className="vm-done-primary" onClick={onClose}>
                Done
              </button>
              <button type="button" className="vm-done-ghost" onClick={reset}>
                Send another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitModal;