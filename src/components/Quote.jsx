// src/components/Quote.jsx
import React from 'react';

const Quote = () => (
  <section className="quote-banner" aria-label="Editorial quote">
    <div className="quote-banner-inner">
      <div className="quote-banner-card">

        {/* ---- Left: image ---- */}
        <div className="quote-banner-media">
          <img
            src="/assets/videos/hero.webp"
            alt="Architectural excellence by The Prime Casa"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
          />
        </div>

        {/* ---- Right: quote ---- */}
        <figure className="quote-banner-content">
          <span className="quote-banner-mark" aria-hidden="true">"</span>

          <blockquote className="quote-banner-text">
            Don&rsquo;t wait to buy real estate. Buy real estate and wait.
          </blockquote>

          <figcaption>
            <cite className="quote-banner-cite">— Will Rogers</cite>
            <p className="quote-banner-note">
              Real estate rewards patience, delivers generational wealth,
              and secures tangible stability beyond volatile public markets.
            </p>
          </figcaption>
        </figure>

      </div>
    </div>
  </section>
);

export default Quote;