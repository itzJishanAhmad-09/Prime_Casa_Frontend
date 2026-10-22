// src/pages/AboutUs.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    title: '1. Passionate',
    desc: 'Driven by a deep love of real estate — finding not just properties, but long-term opportunities that fit your life goals.',
  },
  {
    title: '2. Professional',
    desc: 'Market knowledge that keeps every deal transparent, reliable and backed by data and RERA compliance.',
  },
  {
    title: '3. Full support',
    desc: 'Search, site visits, financing and possession — end-to-end support for a zero-stress experience.',
  },
];

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-page">
      <Seo
        title="About Us"
        description="Learn about Prime Casa – our story, core values, and commitment to excellence in Noida real estate."
      />

      {/* ================================================== */}
      {/* HERO                                                */}
      {/* ================================================== */}
      <section className="au-hero banner-enter">
        <div className="au-hero-bg banner-bg" aria-hidden="true" />
        <div className="au-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="au-hero-inner">
          <nav className="au-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="au-crumb-current">About</span>
          </nav>

          <h1 className="au-hero-title d2">
            Welcome to<br />
            <em>Prime Casa.</em>
          </h1>

          <p className="au-hero-sub d3">
            Turning dreams into addresses — with trust, transparency
            and outstanding service.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* WELCOME                                             */}
      {/* ================================================== */}
      <section className="au-welcome">
        <div className="au-welcome-inner">
          <p className="au-welcome-lead" data-reveal data-reveal-delay="1">
            Prime Casa Realty Pvt. Ltd. specialises in the sale of residential
            and commercial real-estate projects, with a decade of experience
            marketing some of India&rsquo;s most prestigious properties.
          </p>
          <p className="au-welcome-body" data-reveal data-reveal-delay="2">
            Through Prime Casa Wealth Management we help individuals, families
            and businesses build and preserve wealth — investment management,
            retirement and real-estate planning, tax strategy and risk
            management. We succeed when you do, and we build relationships on
            trust, transparency and outstanding service.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* DETAILS                                             */}
      {/* ================================================== */}
      <section className="about-details">
        <div className="container">
          <div className="about-details-grid">
            <div className="about-details-images" data-reveal data-reveal-delay="1">
              <div className="about-details-img-main">
                <img
                  src="/assets/images/aboutus1.webp"
                  alt="Prime Casa property"
                  loading="lazy"
                  width="600"
                  height="420"
                  onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
                />
              </div>
              <div className="about-details-img-small">
                <img
                  src="/assets/images/aboutus2.webp"
                  alt="Luxury home"
                  loading="lazy"
                  width="280"
                  height="200"
                  onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
                />
              </div>
            </div>

            <div className="about-details-text" data-reveal data-reveal-delay="2">
              <span className="about-details-label">About Us</span>
              <h2 className="about-details-title">About Prime Casa Wealth Management</h2>
              <p className="about-details-desc">
                At Prime Casa Wealth Management, we are dedicated to helping
                individuals, families, and businesses build and preserve wealth
                for the long term. With a client-first approach and a team of
                seasoned financial professionals, we provide personalized wealth
                management solutions tailored to meet your unique goals and
                financial aspirations.
              </p>
              <p className="about-details-desc">
                Our expertise spans diverse areas, including investment
                management, retirement planning, real estate planning, tax
                strategies, and risk management. Whether you are planning for
                the future, looking to grow your investments, or seeking to
                protect your legacy, we offer comprehensive strategies to guide
                you at every stage.
              </p>
              <p className="about-details-desc">
                At Prime Casa Wealth Management, we succeed when you do. Our
                commitment is to building lasting relationships founded on
                trust, transparency, and outstanding service.
              </p>
              <p className="about-details-desc">
                Our agency is the industry&apos;s top luxury producer with over
                10 years of experience in marketing India&apos;s most
                prestigious properties. Choosing the right real estate agency
                is crucial for a successful and stress-free property
                transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* WHY CHOOSE US                                       */}
      {/* ================================================== */}
      <section className="au-why">
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
            {PILLARS.map((p, idx) => (
              <article
                className="au-why-card"
                key={p.title}
                data-reveal
                data-reveal-delay={String(idx + 1)}
              >
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
              data-reveal
              data-reveal-delay="1"
            >
              Connect with us
            </Link>
            <Link
              to="/our-team"
              className="au-why-btn au-why-btn--outline"
              data-reveal
              data-reveal-delay="2"
            >
              Meet our team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;