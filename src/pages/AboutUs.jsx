// src/pages/AboutUs.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const LEADERS = [
  {
    name: 'SUDHI YADAV',
    role: 'Founder & Director',
    img: '/assets/images/Sudhi_Yadav.webp',
    desc: 'Sudhi Yadav is the Founder and Director of The Prime Casa Realty Pvt. Ltd. With an MBA completed in 2015 and experience in real estate since 2016, she brings expertise in business development, sales, marketing, and client relationships. With a strong strategic vision and leadership approach, she drives the company’s growth while delivering innovative and customer-focused real estate solutions.'
  },
  {
    name: 'ROBIN SINGH',
    role: 'Director',
    img: '/assets/images/Robin_Singh.webp',
    desc: 'With 14 years of experience across Hospitality, Education, and Real Estate, including professional exposure in Singapore, Malaysia, Hong Kong, and India, I bring a global perspective to business, leadership, and client relationships. I focus on building strong relationships, creating opportunities, and delivering results.',
  },
  {
    name: 'SAJAL GUPTA',
    role: 'Senior Sales Manager',
    img: '/assets/images/Sajal_Gupta.webp',
    desc: 'Sajal Gupta is a B. A. Economics graduate with 4 years of business ownership experience and 3 years in real estate. He combines economic understanding with practical market exposure to deliver strategic, client-focused solutions in business and property.',
  },
  {
    name: 'RONIT VARSHNEY',
    role: 'Senior Sales Manager',
    img: '/assets/images/Ronit_Varshney.webp',
    desc: 'BBA graduate with 5 years of experience in real estate, specializing in sales, client relationship management, and business development. With strong communication skills and a customer-focused approach, he is committed to delivering effective property solutions, building lasting client relationships, and driving business growth.',
  },

   {
    name: 'ANJALI VASHISHTH',
    role: 'Assistant Sales Manager',
    img: '/assets/images/Anjali_Vashisht.webp',
    desc: 'Anjali Vashisht is a B Economics graduate with 4 years of business ownership experience and 3 years in real estate. She combines economic understanding with practical market exposure to deliver strategic, client-focused solutions in business and property.',
  },
];

const PILLARS = [
  {
    n: 'i.',
    title: 'Passionate',
    desc: 'Driven by a deep love of real estate — finding not just properties, but long-term opportunities that fit your life goals.',
  },
  {
    n: 'ii.',
    title: 'Professional',
    desc: 'Market knowledge that keeps every deal transparent, reliable and backed by data and RERA compliance.',
  },
  {
    n: 'iii.',
    title: 'Full support',
    desc: 'Search, site visits, financing and possession — end-to-end support for a zero-stress experience.',
  },
];

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23eee"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-page">
      <Seo
        title="About Us"
        description="Learn about Prime Casa – our story, core values, leadership team, and commitment to excellence in Noida real estate."
      />

      {/* ================================================== */}
      {/* HERO                                                */}
      {/* ================================================== */}
      <section className="au-hero">
        <div className="au-hero-bg" aria-hidden="true" />
        <div className="au-hero-scrim" aria-hidden="true" />

        <div className="au-hero-inner">
          <nav className="au-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="au-crumb-current">About</span>
          </nav>

          <h1 className="au-hero-title">
            Welcome to<br />
            <em>Prime Casa.</em>
          </h1>

          <p className="au-hero-sub">
            Turning dreams into addresses — with trust, transparency
            and outstanding service.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* WELCOME — two-column intro                          */}
      {/* ================================================== */}
      <section className="au-welcome">
        <div className="au-welcome-inner">
          <p className="au-welcome-lead">
            Prime Casa Realty Pvt. Ltd. specialises in the sale of residential
            and commercial real-estate projects, with a decade of experience
            marketing some of India&rsquo;s most prestigious properties.
          </p>
          <p className="au-welcome-body">
            Through Prime Casa Wealth Management we help individuals, families
            and businesses build and preserve wealth — investment management,
            retirement and real-estate planning, tax strategy and risk
            management. We succeed when you do, and we build relationships on
            trust, transparency and outstanding service.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* DETAILS — image + text                              */}
      {/* ================================================== */}
      <section className="about-details">
        <div className="container">
          <div className="about-details-grid">
            <div className="about-details-images">
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

            <div className="about-details-text">
              <span className="about-details-label">About Us</span>
              <h3 className="about-details-title">About Prime Casa Wealth Management</h3>
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
      {/* LEADERSHIP                                          */}
      {/* ================================================== */}
      <section className="about-leadership">
        <div className="container">
          <div className="about-leadership-header">
            <span className="about-leadership-label">Our Leaders</span>
            <h3 className="about-leadership-title">Leaders Behind the Wheel</h3>
            <p className="about-leadership-desc">
              Leadership is the backbone of any successful organization, and
              our leaders exemplify vision, dedication, and excellence. With
              years of experience and a commitment to innovation, they guide
              us toward growth and success. Each leader in our team brings
              unique expertise and a deep understanding of our mission. Their
              strategic thinking and passion for excellence inspire every
              member of our organization to strive for the best.
            </p>
            <p className="about-leadership-desc">
              Through integrity, hard work, and a people-first approach, our
              leaders ensure that we continue to grow while maintaining our
              core values. They believe in teamwork, transparency, and making
              a lasting impact on our industry and community. Under their
              leadership, we are not just achieving milestones—we are setting
              new benchmarks for success.
            </p>
          </div>

          <div className="about-leadership-grid">
            {LEADERS.map((member, idx) => (
              <div key={idx} className="about-leadership-card">
                <div className="about-leadership-card-img">
                  <img
                    src={member.img || PLACEHOLDER}
                    alt={member.name}
                    loading="lazy"
                    width="200"
                    height="200"
                    onError={(e) => { e.target.src = PLACEHOLDER; }}
                  />
                </div>
                <div className="about-leadership-card-content">
                  <span className="about-leadership-card-role">{member.role}</span>
                  <h5 className="about-leadership-card-name">{member.name}</h5>
                  <p className="about-leadership-card-desc">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* WHY CHOOSE US                                       */}
      {/* ================================================== */}
      <section className="au-why">
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

    </div>
  );
};

export default AboutUs;