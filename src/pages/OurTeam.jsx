// src/pages/OurTeam.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

/* ------------------------------------------------------------------ */
/*  Leaders data                                                       */
/* ------------------------------------------------------------------ */

const LEADERS = [
  {
    name: 'Mrs. SUDHI YADAV',
    role: 'Founder & Director',
    img: '/assets/images/Sudhi_Yadav.webp',
    highlight:
      'MBA (2015) and real-estate leader since 2016, driving growth through strategic vision and lasting client relationships.',
    desc: 'Sudhi Yadav is the Founder and Director of The Prime Casa Realty Pvt. Ltd. With an MBA completed in 2015 and experience in real estate since 2016, she brings expertise in business development, sales, marketing, and client relationships. With a strong strategic vision and leadership approach, she drives the company’s growth while delivering innovative and customer-focused real estate solutions.',
  },
  {
    name: 'Mr. ROBIN SINGH',
    role: 'Director',
    img: '/assets/images/Robin_Singh.webp',
    highlight:
      '14 years across hospitality, education and real estate, with professional exposure in Singapore, Malaysia, Hong Kong and India.',
    desc: 'With 14 years of experience across Hospitality, Education, and Real Estate, including professional exposure in Singapore, Malaysia, Hong Kong, and India, I bring a global perspective to business, leadership, and client relationships. I focus on building strong relationships, creating opportunities, and delivering results.',
  },
  {
    name: 'Mr. SAJAL GUPTA',
    role: 'Senior Sales Manager',
    img: '/assets/images/Sajal_Gupta.webp',
    highlight:
      'BA Economics, 4 years of business ownership and 3 years in real estate — pairing economic insight with market exposure.',
    desc: 'Sajal Gupta is a B. A. Economics graduate with 4 years of business ownership experience and 3 years in real estate. He combines economic understanding with practical market exposure to deliver strategic, client-focused solutions in business and property.',
  },
  {
    name: 'Mr. RONIT VARSHNEY',
    role: 'Senior Sales Manager',
    img: '/assets/images/Ronit_Varshney.webp',
    highlight:
      'BBA graduate with 5 years in real estate specialising in sales, client relationships and business development.',
    desc: 'BBA graduate with 5 years of experience in real estate, specializing in sales, client relationship management, and business development. With strong communication skills and a customer-focused approach, he is committed to delivering effective property solutions, building lasting client relationships, and driving business growth.',
  },
  {
    name: 'Miss. ANJALI VASHISHTH',
    role: 'Assistant Sales Manager',
    img: '/assets/images/Anjali_Vashisht.webp',
    highlight:
      'BCA graduate with 2 years in real estate focused on client relationships, property advisory and customer-centric solutions.',
    desc: 'Anjali Vashishth is a BCA graduate with 2 years of experience in real estate. She specializes in client relationships, property advisory, and sales, with a strong focus on delivering professional and customer-centric real estate solutions.',
  },
  {
    name: 'Mr. Radhey Shyam Sharma',
    role: 'Admin Head',
    img: '/assets/images/Radhe_Shyam_Sharma.webp',
    highlight:
      'Administrative specialist with 4 years in real estate office operations, facility management and vendor coordination.',
    desc: 'Radhey Shyam Sharma is an experienced administrative professional with up to 4 years of experience in the real estate industry, specializing in office administration, facility management, staff supervision, vendor coordination, and daily operations. He holds a Master of Arts (M.A.), a Bachelor of Arts (B.A.), and a Diploma in Financial Accounting. He is committed to operational efficiency, team coordination, and maintaining a well-organized workplace.',
  },
  {
    name: 'Md. Jishan Ahmad',
    role: 'Marketing Manager',
    img: '/assets/images/Jishan_Ahmad.webp',
    highlight:
      'BCA graduate and web developer leading digital marketing, lead generation and business development at Prime Casa.',
    desc: 'Jishan Ahmad is a BCA graduate and web developer working as a Marketing Manager at Prime Casa Pvt. Ltd. He specializes in digital marketing, lead generation, and business development, combining technical expertise with strategic marketing to drive business growth.',
  },
  {
    name: 'Mr. Devendra Singh',
    role: 'Assistant Marketing Manager',
    img: '/assets/images/Devendra_Singh.webp',
    highlight:
      'BA (Hons) graduate driving social media management, lead generation and brand development across Prime Casa’s digital presence.',
    desc: 'Devendra Singh is a BA (Hons) graduate and digital marketing professional at Prime Casa Pvt. Ltd. He specializes in social media management, lead generation, and brand development, focusing on strengthening the company’s online presence and driving business growth through effective marketing strategies.',
  },
  {
    name: 'Mr. Saurav Yadav',
    role: 'Assistant Sales Manager',
    img: '/assets/images/Saurav_Yadav.webp',
    highlight:
      'Real-estate consultant with 3 years across Noida’s residential and commercial markets full transaction-cycle expertise.',
    desc: 'Saurav Yadav is a Real Estate Consultant with 3 years of real estate experience, a Bachelor of Arts degree, and hands-on expertise in Noida’s commercial and residential property markets. He manages the full transaction cycle lead generation, site visits, negotiations, and deal closing—helping clients buy, sell, and invest with confidence.',
  },
  {
    name: 'Miss. Pallavi Singh',
    role: 'Assistant Sales Manager',
    img: '/assets/images/Pallavi_Singh.webp',
    highlight:
      'BBA graduate with 2 years of real estate experience, specializing in property advisory, client relationships, and investment solutions.',
    desc: 'Pallavi Singh is a BBA graduate with 2 years of experience in real estate. She combines market insight, strategic thinking, and client-focused service to deliver personalized property solutions, helping clients make informed investment decisions and achieve long-term financial growth.',
  },
];

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23eee"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';

/* ------------------------------------------------------------------ */
/*  Leader card                                                        */
/* ------------------------------------------------------------------ */

// `...rest` forwards data-reveal / data-reveal-delay so the CARD itself
// is the reveal target — not a wrapper that would break the grid slot.
const LeaderCard = ({ member, isFounder = false, ...rest }) => (
  <div
    className={
      'about-leadership-card' +
      (isFounder ? ' about-leadership-card--founder' : '')
    }
    {...rest}
  >
    <div className="about-leadership-card-img">
      <img
        src={member.img || PLACEHOLDER}
        alt={member.name}
        loading="lazy"
        onError={(e) => {
          e.target.src = PLACEHOLDER;
        }}
      />
    </div>
    <div className="about-leadership-card-content">
      <span className="about-leadership-card-role">{member.role}</span>
      <h3 className="about-leadership-card-name">{member.name}</h3>

      {/* Full bio — hidden on small phones */}
      <p className="about-leadership-card-desc">{member.desc}</p>

      {/* Short highlight — shown on phones only */}
      <p className="about-leadership-card-highlight">{member.highlight}</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const OurTeam = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-page">
      <Seo
        title="Our Team"
        description="Meet the leaders behind The Prime Casa — a team of seasoned real-estate professionals driving growth across Noida."
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
            <Link to="/about">About</Link>
            <span>/</span>
            <span className="au-crumb-current">Our Team</span>
          </nav>

          <h1 className="au-hero-title d2">
            The people behind
            <br />
            <em>the addresses.</em>
          </h1>

          <p className="au-hero-sub d3">
            Vision, dedication and excellence — meet the leaders who make
            Prime Casa work for every client.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* LEADERSHIP GRID                                     */}
      {/* ================================================== */}
      <section className="about-leadership" id="our-leaders">
        <div className="container">
          <div className="about-leadership-header" data-reveal>
            <span className="about-leadership-label">Our Leaders</span>
            <h2 className="about-leadership-title">Leaders Behind the Wheel</h2>
            <p className="about-leadership-desc">
              Leadership is the backbone of any successful organization, and
              our leaders exemplify vision, dedication, and excellence.
            </p>
          </div>

          <div className="about-leadership-founder-container">
            <LeaderCard
              member={LEADERS[0]}
              isFounder
              data-reveal
              data-reveal-delay="1"
            />
          </div>

          <div className="about-leadership-grid">
            {LEADERS.slice(1).map((member, idx) => (
              <LeaderCard
                key={member.name}
                member={member}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* CTA                                                 */}
      {/* ================================================== */}
      <section className="au-why">
        <div className="au-why-inner">
          <div className="au-why-header" data-reveal>
            <div className="au-why-eyebrow" data-reveal data-reveal-delay="1">
              <span className="au-why-eyebrow-line" aria-hidden="true" />
              <span>Join us</span>
            </div>
            <h2 className="au-why-title" data-reveal data-reveal-delay="2">
              Want to build with <em>this team?</em>
            </h2>
          </div>

          <div className="au-why-actions">
            <Link
              to="/career"
              className="au-why-btn au-why-btn--red"
              data-reveal
              data-reveal-delay="1"
            >
              View open roles
            </Link>
            <Link
              to="/contact"
              className="au-why-btn au-why-btn--outline"
              data-reveal
              data-reveal-delay="2"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;