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
      <div className="au-why-header">
        <div className="au-why-eyebrow">
          <span className="au-why-eyebrow-line" aria-hidden="true" />
          <span>Why choose us</span>
        </div>
        <h2 className="au-why-title">
          The Prime Casa <em>difference.</em>
        </h2>
      </div>

      <div className="au-why-grid">
        {PILLARS.map((p) => (
          <article className="au-why-card" key={p.n}>
            <span className="au-why-num">{p.n}</span>
            <h3 className="au-why-card-title">{p.title}</h3>
            <p className="au-why-card-desc">{p.desc}</p>
          </article>
        ))}
      </div>

      <div className="au-why-actions">
        <Link
          to="/"
          state={{ scrollTo: 'contact' }}
          className="au-why-btn au-why-btn--red"
        >
          Connect with us
        </Link>
        <Link to="/properties" className="au-why-btn au-why-btn--outline">
          View properties
        </Link>
      </div>
    </div>
  </section>
);

export default WhyUs;