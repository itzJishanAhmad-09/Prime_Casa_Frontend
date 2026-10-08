// src/components/WhyUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PILLARS = [
  {
    n: 'i. Passionate',
    desc: 'Driven by a deep love of real estate — finding not just properties, but long-term opportunities that fit your life goals.',
  },
  {
    n: 'ii. Professional',
    desc: 'Market knowledge that keeps every deal transparent, reliable and backed by data and RERA compliance.',
  },
  {
    n: 'iii. Full support',
    desc: 'Search, site visits, financing and possession — end-to-end support for a zero-stress experience.',
  },
];

const WhyUs = () => (
  <section className="au-why" id="why-us">
    <div className="au-why-inner">
      <div className="au-why-header" data-reveal>
        <div className="au-why-eyebrow" data-reveal data-reveal-delay="1">
          <span className="au-why-eyebrow-line" aria-hidden="true" />
          <span>Why choose us</span>
        </div>
        <h2 className="au-why-title" data-reveal data-reveal-delay="2">
          The Prime Casa <em>difference.</em>
        </h2>
      </div>

      <div className="au-why-grid">
        {PILLARS.map((p, index) => (
          <article
            className="au-why-card"
            key={p.n}
            data-reveal
            data-reveal-delay={String(index + 1)}
          >
            <span className="au-why-num">{p.n}</span>
            <h3 className="au-why-card-title">{p.n}</h3>
            <p className="au-why-card-desc">{p.desc}</p>
          </article>
        ))}
      </div>

      <div className="au-why-actions">
        <Link
          to="/"
          state={{ scrollTo: 'contact' }}
          className="au-why-btn au-why-btn--red"
          data-reveal
          data-reveal-delay="1"
        >
          Connect with us
        </Link>
        <Link
          to="/properties"
          className="au-why-btn au-why-btn--outline"
          data-reveal
          data-reveal-delay="2"
        >
          View properties
        </Link>
      </div>
    </div>
  </section>
);

export default WhyUs;