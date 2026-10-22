// src/pages/ServicePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Blog from '../components/Blog';
import { news } from '../data/news';
import {
  IconArrowRight,
  IconHomeSearch,
  IconHome,
  IconHomeCheck,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const OFFERINGS = [
  {
    title: 'Real Estate Investment',
    desc: 'We offer a wide range of real estate services designed to meet the needs of buyers, sellers, investors, and renters alike. Whether you’re purchasing your first home, looking for an investment, or selling your existing property, our team of experienced professionals is here to provide expert guidance and ensure a seamless experience from start to finish.',
  },
  {
    title: 'Mutual Funds',
    desc: 'We specialize in providing expert mutual fund investment management designed to optimize wealth growth through diversified and carefully managed portfolios. Our experienced team delivers tailored investment solutions, ensuring alignment with your unique financial goals and objectives.',
  },
  {
    title: 'Insurance',
    desc: 'We understand that insurance is more than just a policy—it’s a critical component of your financial security and peace of mind. Our expert team is here to provide you with personalized advice and comprehensive coverage options to meet your unique needs.',
  },
];

const DREAM_STEPS = [
  {
    title: 'Find It',
    desc: 'Browse through our wide range of premium properties and discover the home that perfectly matches your lifestyle and needs.',
    Icon: IconHomeSearch,
  },
  {
    title: 'Tour It',
    desc: 'Schedule a site visit and experience the property first-hand to ensure it’s the right choice for you and your family.',
    Icon: IconHome,
  },
  {
    title: 'Secure It',
    desc: 'Finalize your dream home with transparent deals, easy payment plans, and complete end-to-end assistance.',
    Icon: IconHomeCheck,
  },
];

const EXCLUSIVES = [
  { n: '01', title: 'Expert home inspection', desc: 'Detailed property checks for quality, safety and structural integrity before you invest.' },
  { n: '02', title: 'Hassle-free home loans', desc: 'End-to-end loan assistance with top banks and financial partners for the fastest approvals.' },
  { n: '03', title: 'Exclusive interior benefits', desc: 'Special deals on premium interior solutions to customise your new home affordably.' },
  { n: '04', title: 'Dedicated post-sales care', desc: 'Support that continues after purchase — from documentation to possession.' },
  { n: '05', title: 'NRI investment desk', desc: 'Property laws, FEMA regulations, taxation and NRI loans, navigated with expert guidance.' },
  { n: '06', title: 'RERA consultation', desc: 'Verify registrations, file complaints and protect your investment legally.' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const ServicePage = () => {
  return (
    <div className="sp-page">
      <Seo
        title="Services & Advisory"
        description="Bespoke property advisory in Noida — luxury residential, commercial placements, architectural development, investment management and forensic legal counsel."
      />

      {/* ============================================================ */}
      {/* 1 · HERO                                                      */}
      {/* ============================================================ */}
      <section className="sp-hero banner-enter">
        <div className="sp-hero-bg banner-bg" aria-hidden="true" />
        <div className="sp-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="sp-hero-inner">
          <nav className="sp-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="sp-crumb-current">Services</span>
          </nav>

          <h1 className="sp-hero-title d2">
            Invest intelligently<br />
            in an <em>outperforming market.</em>
          </h1>

          <p className="sp-hero-sub d3">
            Noida&rsquo;s residential prices have surged 125% since 2019 —
            the highest appreciation among major Indian cities. Five
            advisory desks help you capture it.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2 · 3 STEPS → 1 DREAM HOME                                    */}
      {/* ============================================================ */}
      <section className="steps-section">
        <div className="steps-inner">
          <p className="steps-lead" data-reveal>
            With 12+ years of expertise in luxury real estate, we provide
            personalized consulting, market insights, and seamless property
            solutions, helping clients confidently buy, sell, or invest in
            India&rsquo;s most prestigious properties with trust and
            transparency.
          </p>

          <header className="steps-header" data-reveal data-reveal-delay="1">
            <h2 className="steps-title steps-dream-title">
              <em>3 Steps</em> 1 Dream Home
            </h2>
          </header>

          <div className="steps-dream-grid">
            {DREAM_STEPS.map((step, idx) => {
              const { Icon } = step;
              return (
                <React.Fragment key={step.title}>
                  <article
                    className="step-dream-item"
                    data-reveal
                    data-reveal-delay={String((idx % 6) + 1)}
                  >
                    <div className="step-dream-icon" aria-hidden="true">
                      <Icon size={72} stroke={1.2} />
                    </div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </article>

                  {idx < DREAM_STEPS.length - 1 && (
                    <div className="step-dream-arrow" aria-hidden="true">
                      <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                        <line
                          x1="0" y1="10" x2="70" y2="10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeDasharray="5 5"
                          strokeLinecap="round"
                        />
                        <polyline
                          points="65,4 74,10 65,16"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3 · WHAT WE OFFER                                             */}
      {/* ============================================================ */}
      <section className="sp-offerings">
        <div className="sp-offerings-inner">
          <header className="sp-offerings-header" data-reveal>
            <span className="sp-eyebrow" style={{ color: 'var(--red)', justifyContent: 'center' }}>
              <span className="sp-eyebrow-line" aria-hidden="true" />
              <span>OUR SERVICES</span>
            </span>
            <h2 className="sp-offerings-title" data-reveal data-reveal-delay="1">
              What We Offer?
            </h2>
          </header>

          <div className="sp-offerings-grid">
            {OFFERINGS.map((item, idx) => (
              <article
                className="sp-offering-card"
                key={item.title}
                data-reveal
                data-reveal-delay={String(idx + 1)}
              >
                <h3 className="sp-offering-title">{item.title}</h3>
                <p className="sp-offering-desc">{item.desc}</p>
                <Link to="/contact" className="sp-offering-btn">
                  <span>Know More</span>
                  <IconArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4 · INCLUDED WITH EVERY PURCHASE                              */}
      {/* ============================================================ */}
      <section className="sp-included">
        <div className="sp-included-inner">
          <div className="sp-eyebrow" data-reveal data-reveal-delay="1">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Included with every purchase</span>
          </div>

          <h2 className="sp-included-title" data-reveal data-reveal-delay="2">
            Beyond just helping you <em>buy.</em>
          </h2>

          <div className="sp-included-grid">
            {EXCLUSIVES.map((x, idx) => (
              <article
                className="sp-included-card"
                key={x.n}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                <span className="sp-included-num">{x.n}</span>
                <h3 className="sp-included-card-title">{x.title}</h3>
                <p className="sp-included-card-desc">{x.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5 · BLOG SLIDER                                               */}
      {/* ============================================================ */}
      <Blog news={news} />

      {/* ============================================================ */}
      {/* 6 · CLOSING CTA                                               */}
      {/* ============================================================ */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <h2 className="sp-cta-title" data-reveal data-reveal-delay="1">
            Tell us your budget, sector
            <br />
            and horizon. <em>We&rsquo;ll do the rest.</em>
          </h2>

          <div className="sp-cta-buttons">
            <Link
              to="/contact"
              className="sp-cta-btn sp-cta-btn--red"
              data-reveal
              data-reveal-delay="2"
            >
              Book a consultation
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

export default ServicePage;