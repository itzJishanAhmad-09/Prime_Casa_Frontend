// src/components/HowItWorks.jsx
import React from 'react';

const STEPS = [
  {
    n: 1,
    title: 'Tell us your needs',
    desc: 'Share your budget, preferred corridor and target property category with our senior advisory team.',
  },
  {
    n: 2,
    title: 'Get verified options',
    desc: 'We curate filtered, RERA-approved properties tailored specifically to your capital gain and lifestyle horizon.',
  },
  {
    n: 3,
    title: 'Site visit & assistance',
    desc: 'Private chauffeur-driven site walk-throughs, comparative valuation analysis and financing assistance.',
  },
  {
    n: 4,
    title: 'Book & grow wealth',
    desc: 'Lock in zero-brokerage pricing with institutional documentation safeguards from registration to possession.',
  },
];

const HowItWorks = () => (
  <section className="steps-section" id="how-it-works">
    <div className="steps-inner">

      {/* ---------- Header ---------- */}
      <header className="steps-header">
        <div className="steps-eyebrow">
          <span className="steps-eyebrow-dot" aria-hidden="true" />
          The Process
        </div>
        <h2 className="steps-title">
          Four steps to your <em>address.</em>
        </h2>
      </header>

      {/* ---------- Steps grid ---------- */}
      <div className="steps-grid-wrap">
        {/* Connecting line (desktop only) */}
        <div className="steps-line" aria-hidden="true" />

        <div className="steps-grid">
          {STEPS.map((s) => (
            <article className="step-item" key={s.n}>
              <div className={`step-num ${s.n === 4 ? 'is-accent' : ''}`}>
                {s.n}
              </div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default HowItWorks;