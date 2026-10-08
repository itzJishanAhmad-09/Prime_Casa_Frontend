// src/components/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';

const EXCLUSIVES = [
  {
    n: '01',
    title: 'Expert home inspection',
    desc: 'Detailed structural checks for carpet-area variance, construction quality, seepage and MEP safety — so you invest with complete peace of mind.',
  },
  {
    n: '02',
    title: 'Hassle-free home loans',
    desc: 'End-to-end loan assistance with top banks and financial institutions for the lowest repo-linked rates and fast approvals.',
  },
  {
    n: '03',
    title: 'Exclusive interior benefits',
    desc: 'Pre-negotiated architectural rates with premier design studios to curate custom luxury interiors for your penthouse or villa.',
  },
  {
    n: '04',
    title: 'Dedicated post-sales care',
    desc: 'Concierge support that continues after purchase — managing developer milestones, builder-buyer agreements and possession formalities.',
  },
  {
    n: '05',
    title: 'NRI investment desk',
    desc: 'Specialised cross-border desk resolving FEMA guidelines, NRE/NRO repatriation, Power of Attorney handling and rental management.',
  },
  {
    n: '06',
    title: 'RERA consultation',
    desc: 'Statutory verification of UP-RERA registration, quarterly progress reports, sanctioned layouts and legal dispute audits.',
  },
];

const Services = () => (
  <section className="exc-section" id="services">
    <div className="exc-inner">

      {/* ---------- Left editorial intro ---------- */}
      <div className="exc-intro" data-reveal>
        <div className="exc-eyebrow" data-reveal data-reveal-delay="1">
          <span className="exc-eyebrow-dot" aria-hidden="true" />
          Prime Casa Exclusives
        </div>

        <h2 className="exc-title" data-reveal data-reveal-delay="2">
          Beyond just<br />
          helping you <em>buy.</em>
        </h2>

        <p className="exc-sub" data-reveal data-reveal-delay="3">
          Exclusive services that make your real-estate journey smooth,
          secure and rewarding — long after the booking amount clears.
        </p>

        <Link to="/services" className="exc-cta" data-reveal data-reveal-delay="4">
          <span>Explore all services</span>
          <IconArrowRight size={18} />
        </Link>
      </div>

      {/* ---------- Right: 6 numbered cards ---------- */}
      <div className="exc-grid">
        {EXCLUSIVES.map((s, index) => (
          <article
            className="exc-card"
            key={s.n}
            data-reveal
            data-reveal-delay={String(index + 1)}
          >
            <span className="exc-card-num">{s.n}</span>
            <h3 className="exc-card-title">{s.title}</h3>
            <p className="exc-card-desc">{s.desc}</p>
          </article>
        ))}
      </div>

    </div>
  </section>
);

export default Services;