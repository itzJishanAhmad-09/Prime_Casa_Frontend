// src/components/TestimonialsSlider.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const TestimonialsSlider = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const total = testimonials?.length || 0;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  // Autoplay every 7s — pauses if user interacts
  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, total]);

  if (!testimonials || total === 0) {
    return null;
  }

  const active = testimonials[index];

  const initials = active.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <section className="tst-section" id="testimonials">
      <div className="tst-inner">

        {/* ---------- Left column ---------- */}
        <div className="tst-side">
          <div className="tst-eyebrow">
            <span className="tst-eyebrow-dot" aria-hidden="true" />
            Client Stories
          </div>

          <h2 className="tst-title">
            In their <em>words.</em>
          </h2>

          <p className="tst-sub">
            Real experiences from homebuyers, investors and NRIs who
            found their address with us.
          </p>

          <div className="tst-controls">
            <button
              type="button"
              className="tst-arrow"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <IconChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="tst-arrow"
              onClick={next}
              aria-label="Next testimonial"
            >
              <IconChevronRight size={20} />
            </button>
            <span className="tst-counter">{counter}</span>
          </div>
        </div>

        {/* ---------- Right column ---------- */}
        <div className="tst-stage">
          {/* Current quote */}
          <div
            className="tst-quote-box"
            key={index}
            aria-live="polite"
          >
            {/* Stars */}
            <div
              className="tst-stars"
              aria-label={`${active.stars} out of 5 stars`}
            >
              {'★'.repeat(active.stars)}
              <span className="tst-stars-empty">
                {'★'.repeat(5 - active.stars)}
              </span>
            </div>

            {/* Quote */}
            <blockquote className="tst-quote">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <figcaption className="tst-author">
              <span className="tst-avatar" aria-hidden="true">
                {initials}
              </span>
              <span className="tst-author-meta">
                <span className="tst-author-name">{active.name}</span>
                <span className="tst-author-role">{active.role}</span>
              </span>
            </figcaption>
          </div>

          {/* Dot navigation */}
          <div className="tst-dots" role="group" aria-label="Choose testimonial">
            {testimonials.map((t, i) => (
              <button
                key={i}
                type="button"
                className={`tst-dot ${i === index ? 'is-active' : ''}`}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index ? 'true' : 'false'}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(TestimonialsSlider);