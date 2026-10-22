// src/pages/Rewards.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const AWARDS = [
  {
    year: '2025',
    title: 'Real Estate Excellence Award',
    org: 'CREDAI Western UP',
    desc: 'Recognised for outstanding client satisfaction scores and zero-brokerage advocacy across the Noida market.',
    img: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2025',
    title: 'Top Channel Partner — North',
    org: 'Max Estates',
    desc: 'Ranked among the top three channel partners for Max Estate 128 by annual booking volume.',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2024',
    title: 'Best Luxury Property Advisor',
    org: 'NCR Realty Conclave',
    desc: 'Awarded for advisory leadership across the Sector 128–150 luxury belt.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2024',
    title: 'RERA Compliance Champion',
    org: 'UP-RERA',
    desc: 'For 100% compliance across every project listed, with zero buyer complaints filed.',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2023',
    title: 'Emerging Brokerage of the Year',
    org: 'Realty+ Conclave',
    desc: 'Fastest growing advisory firm in the Noida and Greater Noida corridor.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2023',
    title: 'Client Choice Award',
    org: 'Times Realty Icons',
    desc: 'Voted by more than 2,000 verified homebuyers as their preferred advisory partner.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
];

const STATS = [
  { value: '10+',    label: 'Industry awards' },
  { value: '2,400+', label: 'Families served' },
  { value: '100%',   label: 'RERA compliance' },
  { value: '0%',     label: 'Brokerage charged' },
];

const MILESTONES = [
  { n: '01', title: '100% RERA-verified inventory', desc: 'Every project we list carries a valid UP-RERA registration number, verifiable on the official portal.' },
  { n: '02', title: 'Zero brokerage, always', desc: 'Our advisory is compensated by developers — never by the buyer. Published as a written policy since day one.' },
  { n: '03', title: '2,400+ families served', desc: 'From first-time buyers in Noida Extension to HNI investors on the Yamuna Expressway corridor.' },
  { n: '04', title: '98% repeat & referral rate', desc: 'Most of our new clients come from referrals by existing clients — the only metric we truly care about.' },
  { n: '05', title: 'NRI desk across 3 continents', desc: 'Active clients across the UAE, US, UK and Singapore with end-to-end remote execution.' },
  { n: '06', title: 'Zero buyer complaints filed', desc: 'A record we intend to keep. No UP-RERA complaint has ever been lodged against a Prime Casa-advised transaction.' },
];

const Rewards = () => {
  return (
    <div className="sp-page">
      <Seo
        title="Rewards & Recognition"
        description="Awards and recognitions earned by The Prime Casa across the Noida real-estate market."
      />

      {/* HERO */}
      <section className="sp-hero sp-hero--rewards banner-enter">
        <div className="sp-hero-bg sp-hero-bg--rewards banner-bg" aria-hidden="true" />
        <div className="sp-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />
        <div className="sp-hero-inner">
          <nav className="sp-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/about">About</Link>
            <span>/</span>
            <span className="sp-crumb-current">Rewards &amp; Recognition</span>
          </nav>
          <h1 className="sp-hero-title d2">
            Recognition,<br />
            <em>earned one deal at a time.</em>
          </h1>
          <p className="sp-hero-sub d3">
            We don&rsquo;t chase awards — but when the industry hands them
            out, we take them as a signal that we&rsquo;re doing right by
            our clients.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="metrics-bar" aria-label="Recognition metrics" data-reveal>
        <div className="metrics-bar-inner">
          {STATS.map((m, idx) => (
            <div
              className="metric"
              key={m.label}
              data-reveal
              data-reveal-delay={String(idx + 1)}
            >
              <span className="metric-value is-accent">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AWARDS GRID */}
      <section className="rewards-grid">
        <div className="career-inner">
          <div className="sp-eyebrow" data-reveal data-reveal-delay="1">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Awards &amp; Honours</span>
          </div>
          <h2
            className="sp-included-title"
            data-reveal
            data-reveal-delay="2"
          >
            The shelf, <em>so far.</em>
          </h2>
          <div className="award-grid">
            {AWARDS.map((a, idx) => (
              <article
                className="award-card"
                key={a.title}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                {a.img && (
                  <div className="award-card-image">
                    <img
                      src={a.img}
                      alt={a.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/assets/images/placeholder.webp';
                      }}
                    />
                  </div>
                )}

                <div className="award-card-body">
                  <div className="award-card-head">
                    <span className="award-year">{a.year}</span>
                  </div>
                  <h3 className="award-title">{a.title}</h3>
                  <p className="award-org">{a.org}</p>
                  <p className="award-desc">{a.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="sp-included">
        <div className="sp-included-inner">
          <div className="sp-eyebrow" data-reveal data-reveal-delay="1">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Milestones</span>
          </div>
          <h2
            className="sp-included-title"
            data-reveal
            data-reveal-delay="2"
          >
            What the numbers <em>say.</em>
          </h2>
          <div className="sp-included-grid">
            {MILESTONES.map((item, idx) => (
              <article className="sp-included-card" key={item.n} data-reveal data-reveal-delay={String(idx + 1)}>
                <span className="sp-included-num">{item.n}</span>
                <h3 className="sp-included-card-title">{item.title}</h3>
                <p className="sp-included-card-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <h2
            className="sp-cta-title"
            data-reveal
            data-reveal-delay="1"
          >
            Want the same standard<br />
            <em>applied to your deal?</em>
          </h2>
          <div className="sp-cta-buttons">
            <Link
              to="/contact"
              className="sp-cta-btn sp-cta-btn--red"
              data-reveal
              data-reveal-delay="2"
            >
              Talk to an advisor
            </Link>
            <Link
              to="/properties"
              className="sp-cta-btn sp-cta-btn--outline"
              data-reveal
              data-reveal-delay="3"
            >
              Browse properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rewards;