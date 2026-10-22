// src/pages/Career.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { submitEnquiry } from '../services/api';
import {
  IconMapPin,
  IconBriefcase,
  IconUpload,
  IconFile,
  IconX,
  IconArrowUpRight,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const VALUES = [
  { n: '01', title: 'Own the outcome',          desc: 'We take responsibility, follow through, and celebrate the impact — not just the effort.' },
  { n: '02', title: 'Make trust visible',       desc: 'We choose transparency in every conversation, detail, and recommendation.' },
  { n: '03', title: 'Stay relentlessly curious', desc: 'We learn the market, challenge assumptions, and keep raising the standard.' },
  { n: '04', title: 'Institutional support',    desc: 'CRM, legal desk, loan desk and marketing engine — the entire back-office is built so you can focus on clients.' },
  { n: '05', title: 'Fast-track promotions',    desc: 'Merit over tenure. Advisors have grown from Executive to Senior Manager inside 24 months.' },
  { n: '06', title: 'Noida is our home ground', desc: 'Deep local relationships with every major developer — Eldeco, Max, M3M, Godrej, Ace and more.' },
];

const ROLES = [
  { title: 'Senior Sales Manager',         dept: 'Sales & Advisory',  loc: 'Sector 142, Noida',    type: 'Full-time' },
  { title: 'Real Estate Sales Executive',  dept: 'Sales & Advisory',  loc: 'Sector 142, Noida',    type: 'Full-time' },
  { title: 'Client Relationship Manager',  dept: 'Client Experience', loc: 'Sector 142, Noida',    type: 'Full-time' },
  { title: 'Digital Marketing Specialist', dept: 'Marketing',         loc: 'Noida / Hybrid',       type: 'Full-time' },
  { title: 'Legal & Compliance Executive', dept: 'Legal',             loc: 'Sector 142, Noida',    type: 'Full-time' },
  { title: 'Interior Design Consultant',   dept: 'Design Studio',     loc: 'Noida / Client Sites', type: 'Full-time' },
];

const FILTER_OPTIONS = ['All', 'Sales', 'Advisory', 'Marketing', 'Legal', 'Design'];

const POSITION_OPTIONS = ROLES.map((r) => r.title).concat(['Other / Open Application']);

const MAX_RESUME_BYTES = 20 * 1024 * 1024;   // 20 MB
const ALLOWED_EXTS = ['.pdf', '.doc', '.docx'];

/* ------------------------------------------------------------------ */
/*  Application form                                                   */
/* ------------------------------------------------------------------ */

const CareerForm = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    position: '', startDate: '', address: '', coverLetter: '',
  });
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, phone: digits }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    if (!file) return '';
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!ALLOWED_EXTS.includes(ext)) return 'Only PDF, DOC, or DOCX files are accepted.';
    if (file.size > MAX_RESUME_BYTES)  return 'File size must be less than 20 MB.';
    return '';
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setResume(null); setResumeError(''); return; }
    const err = validateFile(file);
    if (err) {
      setResumeError(err);
      setResume(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setResume(file);
    setResumeError('');
  };

  const clearFile = () => {
    setResume(null);
    setResumeError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (form.phone.length !== 10) {
      setStatus({ type: 'error', message: 'Please enter a valid 10-digit mobile number.' });
      return;
    }
    if (!resume) {
      setResumeError('Please attach your resume.');
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredSector: form.address,
        message:
          `Application for: ${form.position}\n` +
          `Available from: ${form.startDate || 'Flexible'}\n` +
          `Resume file: ${resume.name}\n\n` +
          `Cover letter:\n${form.coverLetter}`,
        enquiryType: 'career',
      });

      setStatus({
        type: 'success',
        message: 'Application received! Our HR team will reach out within 3 working days.',
      });
      setForm({ name: '', email: '', phone: '', position: '', startDate: '', address: '', coverLetter: '' });
      clearFile();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const prettySize = resume ? `${(resume.size / (1024 * 1024)).toFixed(2)} MB` : '';

  return (
    <section className="ct-section" id="apply">
      <div className="ct-inner">

        <div className="career-apply-head" data-reveal>
          <span className="ct-eyebrow" style={{ color: 'var(--red)' }}>
            Join the team
          </span>
          <h2 className="cp-form-title" data-reveal data-reveal-delay="1">
            We are happy to announce we are <em>hiring.</em>
          </h2>
          <p className="cp-form-sub" data-reveal data-reveal-delay="2">
            Our objective is to promote transparency within organisations
            through our mission. We believe a company&rsquo;s greatest asset
            lies within its people — and by highlighting and acknowledging
            them, everyone within the organisation reaps the benefits.
          </p>
        </div>

        <div className="cp-form-card" data-reveal>

          {status.message && (
            <div className={`cp-status ${status.type}`} role="alert">
              {status.message}
            </div>
          )}

          <form onSubmit={submit} className="cp-form" noValidate>

            {/* Row 1 — Name · Email · Contact */}
            <div className="career-form-row">
              <div className="cp-field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="cp-field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="cp-field">
                <label htmlFor="cf-phone">Contact No.</label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  placeholder="ex. 012345678"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  inputMode="numeric"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 2 — Position · Start date · Address */}
            <div className="career-form-row">
              <div className="cp-field">
                <label htmlFor="cf-position">Applying for Position:</label>
                <select
                  id="cf-position"
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  <option value="">Select a role…</option>
                  {POSITION_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="cp-field">
                <label htmlFor="cf-start">When can you start?</label>
                <input
                  id="cf-start"
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="cp-field">
                <label htmlFor="cf-address">Address</label>
                <input
                  id="cf-address"
                  name="address"
                  type="text"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Resume */}
            <div className="cp-field cp-field-full">
              <label htmlFor="cf-resume">
                Upload Resume <span className="cf-hint">(file size less than 20MB)</span>
              </label>

              <input
                ref={fileInputRef}
                id="cf-resume"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFile}
                className="cf-file-input"
                disabled={loading}
              />

              <div className="cf-file-row">
                <label htmlFor="cf-resume" className="cf-file-btn" aria-hidden="true">
                  <IconUpload size={16} />
                  <span>Choose file</span>
                </label>

                <span className="cf-file-name">
                  {resume ? (
                    <>
                      <IconFile size={16} aria-hidden="true" />
                      <span className="cf-file-name-text">{resume.name}</span>
                      <span className="cf-file-size">{prettySize}</span>
                      <button
                        type="button"
                        className="cf-file-clear"
                        onClick={clearFile}
                        aria-label="Remove file"
                      >
                        <IconX size={14} />
                      </button>
                    </>
                  ) : (
                    'No file chosen'
                  )}
                </span>
              </div>

              {resumeError && <span className="cp-field-err">{resumeError}</span>}
            </div>

            {/* Cover letter */}
            <div className="cp-field cp-field-full">
              <label htmlFor="cf-cover">Cover Letter</label>
              <textarea
                id="cf-cover"
                name="coverLetter"
                rows="5"
                placeholder="Message"
                value={form.coverLetter}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="cp-actions">
              <button
                type="submit"
                className="cp-submit"
                disabled={loading}
              >
                <span>{loading ? 'Sending…' : 'Apply Now'}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const Career = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRoles = ROLES.filter((role) => {
    if (activeFilter === 'All') return true;
    return role.dept.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="sp-page">
      <Seo
        title="Careers"
        description="Build your real-estate career with The Prime Casa. Open roles in sales, marketing, legal and design across Noida."
      />

      {/* HERO */}
      <section className="career-hero banner-enter">
        <div className="career-hero-bg banner-bg" aria-hidden="true" />
        <div className="career-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="career-hero-inner">
          <nav className="career-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/about">About</Link>
            <span>/</span>
            <span className="career-crumb-current">Career</span>
          </nav>

          <h1 className="career-hero-title d2">
            Build a career<br />
            that <em>compounds.</em>
          </h1>

          <p className="career-hero-sub d3">
            Join a team that treats real estate like a craft. Uncapped
            earnings, institutional support, and mentors who&rsquo;ve
            closed thousands of deals across NCR.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="career-values">
        <div className="career-inner">

          <div className="sp-eyebrow" data-reveal data-reveal-delay="1">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Why Prime Casa</span>
          </div>

          <h2
            className="sp-included-title"
            data-reveal
            data-reveal-delay="2"
          >
            A place for people<br />
            who care <em>deeply.</em>
          </h2>

          <p
            className="career-intro"
            data-reveal
            data-reveal-delay="3"
          >
            Real estate changes lives. That&rsquo;s why we&rsquo;re building a
            team of listeners, learners, and doers who believe the experience
            matters as much as the outcome.
          </p>

          <div className="career-grid">
            {VALUES.map((v, idx) => (
              <article
                className="career-card"
                key={v.n}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                <span className="career-card-num">{v.n}</span>
                <h3 className="career-card-title">{v.title}</h3>
                <p className="career-card-desc">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="career-jobs">
        <div className="career-inner">
          <div className="sp-eyebrow" data-reveal data-reveal-delay="1">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>come work with us</span>
          </div>

          <h2 className="sp-included-title" data-reveal data-reveal-delay="2">
            Find your&rsquo;<em>next role.</em>
          </h2>

          <div className="career-filter" data-reveal data-reveal-delay="3">
            {FILTER_OPTIONS.map((filter) => (
              <button
                key={filter}
                className={`career-filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="career-jobs-list">
            {filteredRoles.map((r, idx) => (
              <div
                className="job-row"
                key={r.title}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                <div>
                  <h3 className="job-title">{r.title}</h3>
                  <span className="job-meta">{r.dept}</span>
                </div>

                <span className="job-meta">
                  <IconMapPin size={14} aria-hidden="true" /> {r.loc}
                </span>

                <span className="job-meta">
                  <IconBriefcase size={14} aria-hidden="true" /> {r.type}
                </span>

                <a href="#apply" className="job-apply" aria-label="Apply for this role">
                  <IconArrowUpRight size={20} stroke={1.5} />
                </a>
              </div>
            ))}

            {filteredRoles.length === 0 && (
              <div className="job-row" style={{ gridTemplateColumns: '1fr', textAlign: 'center', padding: '40px 0' }}>
                <p className="job-meta">No roles found for this category. Please try another filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OPEN APPLICATION BANNER */}
      <section className="career-open-app">
        <div className="career-inner career-open-app-inner">
          <div className="career-open-app-text">
            <span className="career-open-app-eyebrow">Don't see the perfect role?</span>
            <h2 className="career-open-app-title">
              Great people don't always fit in a box.
            </h2>
          </div>
        </div>
      </section>

      {/* FORM */}
      <CareerForm />

      {/* CTA */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <h2 className="sp-cta-title" data-reveal data-reveal-delay="1">
            Prefer to talk first?<br />
            <em>That works too.</em>
          </h2>

          <div className="sp-cta-buttons">
            <Link
              to="/contact"
              className="sp-cta-btn sp-cta-btn--red"
              data-reveal
              data-reveal-delay="2"
            >
              Talk to HR
            </Link>
            <a
              href="mailto:careers@theprimecasa.in"
              className="sp-cta-btn sp-cta-btn--outline"
              data-reveal
              data-reveal-delay="3"
            >
              Email careers@theprimecasa.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;