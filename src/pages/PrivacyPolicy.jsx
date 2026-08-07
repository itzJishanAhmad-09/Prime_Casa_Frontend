// src/pages/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const PrivacyPolicy = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll spy for sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.privacy-section[id]');
      const navLinks = document.querySelectorAll('.privacy-sidebar-nav a');
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
        title="Privacy Policy"
        description="Read Prime Casa's privacy policy – how we collect, use, and protect your personal information."
      />

      {/* ===== HERO BANNER ===== */}
      <section className="privacy-hero-banner">
        <div className="privacy-hero-bg"></div>
        <div className="privacy-hero-overlay"></div>
        <div className="privacy-hero-container">
          <div className="privacy-hero-content">
            <ul className="privacy-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Privacy Policy</li>
            </ul>
            <h1 className="privacy-hero-title">Privacy Policy</h1>
            <p className="privacy-hero-sub">
              Your trust is our most valuable asset. Learn how Prime Casa protects and respects your personal information.
            </p>
            <div className="privacy-hero-date">Last Updated: July 2026</div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="privacy-page-wrapper">
        {/* Sidebar (desktop) */}
        <aside className="privacy-sidebar">
          <div className="privacy-sidebar-inner">
            <div className="privacy-sidebar-header">
              <Link to="/" className="privacy-back-link">
                <i className="ti ti-arrow-left"></i> Back to Home
              </Link>
              <h4>On this page</h4>
            </div>
            <nav className="privacy-sidebar-nav">
              <a href="#introduction" className="active">
                <i className="ti ti-shield"></i> Introduction
              </a>
              <a href="#data-collection">
                <i className="ti ti-database"></i> Data Collection
              </a>
              <a href="#how-we-use">
                <i className="ti ti-settings"></i> How We Use Data
              </a>
              <a href="#security">
                <i className="ti ti-lock"></i> Data Security
              </a>
              <a href="#rights">
                <i className="ti ti-gavel"></i> User Rights
              </a>
              <a href="#contact">
                <i className="ti ti-mail"></i> Contact Info
              </a>
            </nav>
            <div className="privacy-sidebar-footer">
              <span>Last updated: July 2026</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="privacy-main">
          <div className="privacy-sections">
            {/* Section: Introduction */}
            <section id="introduction" className="privacy-section">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-shield"></i></span>
                <h2>Introduction</h2>
              </div>
              <div className="privacy-section-body">
                <p>
                  At <strong>Prime Casa</strong>, we understand that real estate transactions involve sensitive personal and financial data. Our commitment to privacy is absolute. This Privacy Policy outlines the types of information we collect, how we handle it, and the rigorous standards we employ to ensure its safety. By using our services, you entrust us with your information, and we take that responsibility with the utmost professionalism.
                </p>
              </div>
            </section>

            {/* Section: Data Collection */}
            <section id="data-collection" className="privacy-section">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-database"></i></span>
                <h2>Data Collection</h2>
              </div>
              <div className="privacy-grid-2col">
                <div className="privacy-card">
                  <h3>Identity &amp; Contact</h3>
                  <p>We collect your full name, email address, phone numbers, and physical mailing address to facilitate property viewings and contracts.</p>
                </div>
                <div className="privacy-card">
                  <h3>Property Preferences</h3>
                  <p>Information about your search criteria, including location preferences, budget ranges, and specific home features you desire.</p>
                </div>
                <div className="privacy-card">
                  <h3>Financial Credentials</h3>
                  <p>For pre-qualification, we may collect information regarding your creditworthiness and mortgage eligibility as provided by you.</p>
                </div>
                <div className="privacy-card">
                  <h3>Digital Interactions</h3>
                  <p>IP addresses, browser types, and interaction history on the Prime Casa portal to improve our technological offerings.</p>
                </div>
              </div>
            </section>

            {/* Section: How We Use Data */}
            <section id="how-we-use" className="privacy-section">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-settings"></i></span>
                <h2>How We Use Data</h2>
              </div>
              <div className="privacy-section-body privacy-use-list">
                <div className="privacy-use-item">
                  <i className="ti ti-check"></i>
                  <div>
                    <h4>Service Delivery</h4>
                    <p>To match you with luxury listings and coordinate with sellers, buyers, and legal entities during the closing process.</p>
                  </div>
                </div>
                <div className="privacy-use-item">
                  <i className="ti ti-check"></i>
                  <div>
                    <h4>Communications</h4>
                    <p>Providing critical updates on property status, market reports, and administrative notifications regarding your account.</p>
                  </div>
                </div>
                <div className="privacy-use-item">
                  <i className="ti ti-check"></i>
                  <div>
                    <h4>Legal Compliance</h4>
                    <p>Fulfilling our regulatory obligations within the real estate industry, including anti-money laundering (AML) checks.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Data Security */}
            <section id="security" className="privacy-section privacy-section-dark">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-lock"></i></span>
                <h2>Data Security</h2>
              </div>
              <div className="privacy-section-body">
                <p>
                  Prime Casa employs institutional‑grade security protocols. Our data centers utilize multi‑factor authentication, end‑to‑end encryption for all sensitive files, and 24/7 monitoring systems.
                </p>
                <div className="privacy-tags">
                  <span>AES‑256 ENCRYPTION</span>
                  <span>SSL/TLS SECURED</span>
                  <span>ISO 27001 COMPLIANT</span>
                </div>
              </div>
            </section>

            {/* Section: User Rights */}
            <section id="rights" className="privacy-section">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-gavel"></i></span>
                <h2>User Rights</h2>
              </div>
              <div className="privacy-table-wrap">
                <table className="privacy-table">
                  <thead>
                    <tr>
                      <th>Right</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Access</td>
                      <td>Request a complete copy of the personal data we hold about you.</td>
                    </tr>
                    <tr>
                      <td>Rectification</td>
                      <td>Update or correct inaccurate or incomplete information in our records.</td>
                    </tr>
                    <tr>
                      <td>Erasure</td>
                      <td>Request the deletion of your personal data where it is no longer required.</td>
                    </tr>
                    <tr>
                      <td>Portability</td>
                      <td>Obtain your data in a structured, commonly used machine‑readable format.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section: Contact Information */}
            <section id="contact" className="privacy-section privacy-section-cta">
              <div className="privacy-section-header">
                <span className="privacy-section-icon"><i className="ti ti-mail"></i></span>
                <h2>Contact Information</h2>
              </div>
              <div className="privacy-contact-grid">
                <div>
                  <p><i className="ti ti-mail"></i> crm@theprimecasa.com</p>
                  <p><i className="ti ti-phone"></i> +91 8130504183</p>
                  <p><i className="ti ti-map-pin"></i>Unit No 1230,TOWER-B, Bhutani Alphathum, Sector 90, Noida, Uttar Pradesh 201304</p>
                </div>
                <div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Back to Top Button */}
      <button
        className="privacy-back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="ti ti-arrow-up"></i>
      </button>
    </>
  );
};

export default PrivacyPolicy;