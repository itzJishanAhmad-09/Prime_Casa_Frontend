// src/pages/TermsPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const TermsPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll spy for sidebar (runs after mount)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('article[id]');
      const navLinks = document.querySelectorAll('.sidebar-nav a');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 120) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms and conditions for using Prime Casa's website and real estate services."
      />

      {/* ===== HERO BANNER ===== */}
      <section className="terms-hero-banner">
        <div className="terms-hero-bg"></div>
        <div className="terms-hero-overlay"></div>
        <div className="terms-hero-container">
          <div className="terms-hero-content">
            <ul className="terms-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Terms of Service</li>
            </ul>
            <h1 className="terms-hero-title">Terms of Service</h1>
            <p className="terms-hero-sub">
              By accessing or using The Prime Casa services, you agree to be bound by the legal standards outlined in these Terms.
            </p>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="terms-page-wrapper">
        {/* Sidebar (desktop) */}
        <aside className="terms-sidebar">
          <div className="terms-sidebar-inner">
            <div className="terms-sidebar-header">
              <Link to="/" className="terms-back-link">
                <i className="ti ti-arrow-left"></i> Back to Home
              </Link>
              <h4>Legal Sections</h4>
            </div>
            <nav className="sidebar-nav">
              <a href="#acceptance" className="active">
                <i className="ti ti-gavel"></i> Acceptance
              </a>
              <a href="#description">
                <i className="ti ti-info-circle"></i> Description
              </a>
              <a href="#privacy">
                <i className="ti ti-shield"></i> Privacy
              </a>
              <a href="#conduct">
                <i className="ti ti-user-check"></i> User Conduct
              </a>
              <a href="#contact">
                <i className="ti ti-mail"></i> Contact
              </a>
            </nav>
            <div className="terms-sidebar-footer">
              <span>Last updated: July 2026</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="terms-main">
          <div className="terms-articles">
            {/* Section 1 */}
            <article id="acceptance" className="terms-card">
              <div className="terms-card-header">
                <span className="terms-card-icon"><i className="ti ti-gavel"></i></span>
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p>
                Welcome to The Prime Casa. By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </article>

            {/* Section 2 */}
            <article id="description" className="terms-card">
              <h2>2. Description of Service</h2>
              <p>
                The Prime Casa provides real estate services, including property listings, consulting, and management in Noida, Uttar Pradesh, and surrounding areas.
              </p>
            </article>

            {/* Section 3 */}
            <article id="privacy" className="terms-card">
              <h2>3. Privacy Policy</h2>
              <p>
                Your use of our service is also governed by our Privacy Policy, which describes how we collect and use your personal information.
              </p>
            </article>

            {/* Section 4 */}
            <article id="conduct" className="terms-card">
              <h2>4. User Conduct</h2>
              <p className="mb-3">
                Users agree not to use the service for any unlawful purposes or to engage in any conduct that harms The Prime Casa or its users.
              </p>
              <ul className="terms-list">
                <li><i className="ti ti-check"></i> No unauthorized access to data.</li>
                <li><i className="ti ti-check"></i> Accurate representation in all communications.</li>
              </ul>
            </article>

            {/* Section 5 */}
            <article className="terms-card">
              <h2>5. Intellectual Property</h2>
              <p>
                All content on this site, including logos, text, and images, is the property of The Prime Casa and is protected by copyright laws.
              </p>
            </article>

            {/* Section 6 */}
            <article className="terms-card terms-card-highlight">
              <h2>6. Limitation of Liability</h2>
              <blockquote>
                The Prime Casa shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </blockquote>
            </article>

            {/* Section 7 */}
            <article className="terms-card">
              <h2>7. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever.
              </p>
            </article>

            {/* Section 8 */}
            <article className="terms-card">
              <h2>8. Governing Law</h2>
              <p>
                These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
              </p>
            </article>

            {/* Section 9 */}
            <article className="terms-card">
              <h2>9. Changes to Terms</h2>
              <p>
                We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page.
              </p>
            </article>

            {/* Section 10 – Contact (dark background) */}
            <article id="contact" className="terms-card terms-card-dark">
              <h2>10. Contact Information</h2>
              <div className="terms-contact-grid">
                <div>
                  <p><i className="ti ti-mail"></i> crm@theprimecasa.in</p>
                  <p><i className="ti ti-phone"></i> +91 8130504183</p>
                </div>
                <div>
                  <p><i className="ti ti-map-pin"></i>Unit No 1230,TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201304</p>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>

      {/* Back to Top Button */}
      <button
        className="terms-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="ti ti-arrow-up"></i>
      </button>
    </>
  );
};

export default TermsPage;