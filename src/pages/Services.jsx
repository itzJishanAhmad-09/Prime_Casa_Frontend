// src/pages/Services.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const Services = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer for scroll‑reveal
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Seo
        title="Services"
        description="Professional real estate services: Property Management, Consulting, and Home Sales. Turning dreams into addresses."
      />

      {/* ===== HERO ===== */}
      <section className="services-hero">
        <div className="services-hero-bg"></div>
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <h1 className="services-hero-title">Turning Dreams Into Addresses</h1>
          <p className="services-hero-sub">
            Discover exclusive residential and commercial properties curated by industry experts who value architectural integrity and market excellence.
          </p>
        </div>
      </section>

      {/* ===== SERVICES CARDS ===== */}
      <section className="services-cards">
        <div className="services-cards-header reveal-on-scroll">
          <span className="services-label">Our Expertise</span>
          <h2 className="services-title">Tailored Real Estate Solutions</h2>
          <div className="services-divider"></div>
        </div>

        <div className="services-card-grid">
          {/* Card 1: Property Management */}
          <div className="service-card reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
            <div className="service-card-image">
              <div
                className="service-card-bg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8n_8FFIP1Tzhba4LIO3FMTPwv9nBCJmCHCamOpS1fFkhnzGN5-nqaoe6zTbpCr3bSzsj8oNH94QN9ARLheVQv9z6ptX1vE5WrA5kfTz6mZmD43z3BMPujsTwMfYB8F1iiDPFDLol15nNjO5lktgEFo-0ayJVfZcuqeD8e4pNF68BtAVP816DM-qXT7iPCPE9N4LzR4OtLepgM3SithWLceoZ59xckBtWKdmLXOlWaAjxcrCe5TBRKaA')",
                }}
              ></div>
            </div>
            <div className="service-card-icon-title">
              <i className="ti ti-building-community"></i>
              <h3>Property Management</h3>
            </div>
            <p className="service-card-desc">
              Professional management for residential and commercial assets. We ensure your investments are maintained to the highest standards while maximizing yield and tenant satisfaction.
            </p>
            <ul className="service-card-list">
              <li>
                <i className="ti ti-circle-check"></i> Tenant Procurement &amp; Screening
              </li>
              <li>
                <i className="ti ti-circle-check"></i> Maintenance &amp; Oversight
              </li>
            </ul>
          </div>

          {/* Card 2: Real Estate Consulting */}
          <div className="service-card reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="service-card-image">
              <div
                className="service-card-bg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfIqxKgBfKILXBuWYk7qNFuc0QKv_6XZ1Itx1WQOVe2VC2jZvadUzKTzz5RPHIkoInuBRIRQ1LFIBm_LPCuN-ttOXfzbci4Ydatt-4fGWTUluCWtxQF66Cln3fFcsdbNIoQteKNS8LbDd9zTZSFpxr-wkqryF62MKNxpjG6Nr33pImluijRMlziFyMEHv3_pezI7JTVjqnmVFWTWrrmiruiOaDfXIwRKnP1GbhO8ca_FfBzodCVH9BqA')",
                }}
              ></div>
            </div>
            <div className="service-card-icon-title">
              <i className="ti ti-chart-bar"></i>
              <h3>Real Estate Consulting</h3>
            </div>
            <p className="service-card-desc">
              Expert advice on market trends, investment strategies, and large-scale development projects. Navigate complex markets with data-driven insights and local expertise.
            </p>
            <ul className="service-card-list">
              <li>
                <i className="ti ti-circle-check"></i> Market Feasibility Studies
              </li>
              <li>
                <i className="ti ti-circle-check"></i> Investment Portfolio Analysis
              </li>
            </ul>
          </div>

          {/* Card 3: Home Sales */}
          <div className="service-card reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
            <div className="service-card-image">
              <div
                className="service-card-bg"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWSfnGn1y4PeFyQFRfq58-iJmaTmF6WuHo4NwNLw5DhvbOuEDAnirWPML0hVNjQItidnLfHqI1oI7zp2CzG7L_xxtGVZn6rhZ2wctxlpHRc95KZmQ8d5-WKjadGHsmYRujinUEL4HjdhGyASkroXaAJbc3iatqXdMiu3CqDofaUQk_btEVEPOOyIEU3WRwOQcpyVY7V-coymuiaRAw8XQV4-1ZGg6ROPJ2zVS6vK2ApEoeOUiWlJ4dAg')",
                }}
              ></div>
            </div>
            <div className="service-card-icon-title">
              <i className="ti ti-handshake"></i>
              <h3>Home Sales</h3>
            </div>
            <p className="service-card-desc">
              Personalized assistance for buyers and sellers to find their perfect match. From luxury penthouses to family estates, we handle every detail of the transaction.
            </p>
            <ul className="service-card-list">
              <li>
                <i className="ti ti-circle-check"></i> High-Value Property Listing
              </li>
              <li>
                <i className="ti ti-circle-check"></i> Exclusive Buyer Representation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== CTA / STATS ===== */}
      <section className="services-cta">
        <div className="services-cta-content">
          <h2>Ready to move into your future?</h2>
          <p>
            Join over 5,000 clients who found their dream properties and secured their investments with The Prime Casa.
          </p>
          <div className="services-stats">
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2.4k</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Retention</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;