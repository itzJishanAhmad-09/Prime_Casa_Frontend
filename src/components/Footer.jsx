// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconArrowUp,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin,
} from '@tabler/icons-react';

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'About',      path: '/about' },
  { label: 'Properties', path: '/properties' },
  { label: 'Services',   path: '/services' },
  { label: 'Blog',       path: '/blog' },
  { label: 'Contact',    path: '/contact' },
];

// These use router state so the Homepage can smooth-scroll to #toolkit
const TOOLKIT_LINKS = [
  { label: 'ROI Calculator',  state: { scrollTo: 'toolkit' } },
  { label: 'EMI Planner',     state: { scrollTo: 'toolkit' } },
  { label: 'NRI Realty Edge', state: { scrollTo: 'toolkit' } },
];

const SOCIAL_LINKS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/theprimecasa',                            Icon: IconBrandFacebook  },
  { label: 'Instagram', href: 'https://www.instagram.com/theprimecasa',                           Icon: IconBrandInstagram },
  { label: 'YouTube',   href: 'https://www.youtube.com/@theprimecasa',                            Icon: IconBrandYoutube   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/the-prime-casa-realty-pvt-ltd',   Icon: IconBrandLinkedin  },
];

const WA_GENERAL =
  'https://wa.me/918130504183?text=' +
  encodeURIComponent('Hi Prime Casa, I’d like help finding a property in Noida.');

const Footer = () => {
  const handleScrollTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const handleBookVisit = () => {
    window.dispatchEvent(new CustomEvent('openVisit', { detail: {} }));
  };

  return (
    <footer className="ft-root">
      <div className="ft-bg" aria-hidden="true">
        <img
          src="/assets/videos/hero.webp"
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="ft-bg-scrim" />
      </div>

      <div className="ft-inner">

        {/* Top: CTA + contact card */}
        <div className="ft-top">
          <div className="ft-cta">
            <span className="ft-cta-eyebrow">Start your journey</span>
            <h2 className="ft-cta-title">
              Ready to find<br />your <em>address?</em>
            </h2>
            <div className="ft-cta-buttons">
              <button
                type="button"
                className="ft-btn ft-btn--red"
                onClick={handleBookVisit}
              >
                Book a site visit
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.2"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a
                href={WA_GENERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="ft-btn ft-btn--ivory"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="1.8"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="ft-contact">
            <a href="tel:+918130504183" className="ft-contact-row">
              <span className="ft-contact-label">Call</span>
              <span className="ft-contact-value">+91 81305 04183</span>
            </a>
            <a href="mailto:crm@theprimecasa.in" className="ft-contact-row">
              <span className="ft-contact-label">Email</span>
              <span className="ft-contact-value ft-contact-value--email">
                crm@theprimecasa.in
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Unit+No.+302+Regus+Tower+3rd+Floor+Sector+142+Noida+Uttar+Pradesh+201304"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-contact-row"
            >
              <span className="ft-contact-label">Visit</span>
              <span className="ft-contact-value ft-contact-value--sm">
                Unit No. 302, Regus Tower, 3rd Floor, Sector 142, Noida, Uttar Pradesh 201304
              </span>
            </a>
            <div className="ft-contact-row ft-contact-row--static">
              <span className="ft-contact-label">Hours</span>
              <span className="ft-contact-value ft-contact-value--sm">
                Tue–Sun · 11 AM – 7 PM
              </span>
            </div>
          </div>
        </div>

        {/* Middle: brand + link columns */}
        <div className="ft-links">
          <div className="ft-brand">
            <Link to="/" className="ft-brand-logo" aria-label="The Prime Casa — home">
              <img src="/theprimecasa.webp" alt="" width="52" height="52" />
              <span className="ft-brand-meta">
                <span className="ft-brand-name">The Prime Casa Realty Pvt. Ltd.</span>
                <span className="ft-brand-tagline">Turning dreams into addresses</span>
              </span>
            </Link>
            <p className="ft-brand-desc">
              Trusted property advisor across all Noida sectors. RERA
              registered. Zero brokerage.
            </p>

            <div className="ft-social">
              <span className="ft-social-title">Follow Us:</span>
              <div className="ft-social-icons">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-social-link"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={20} stroke={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="ft-col">
            <h3 className="ft-col-title">Company</h3>
            <ul>
              {NAV_LINKS.map((n) => (
                <li key={n.path}>
                  <Link to={n.path} className="ft-link">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3 className="ft-col-title">Toolkit</h3>
            <ul>
              {TOOLKIT_LINKS.map((t) => (
                <li key={t.label}>
                  <Link to="/" state={t.state} className="ft-link">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: legal + back-to-top */}
        <div className="ft-legal">
          <span className="ft-legal-text">
            © {new Date().getFullYear()} The Prime Casa Realty Pvt. Ltd.
            RERA registered. All property rates are indicative as of June 2026.
            Always verify with the relevant authority before any purchase decision.
          </span>
          <div className="ft-legal-right">
            <Link to="/terms" className="ft-legal-link">Terms</Link>
            <Link to="/privacy-policy" className="ft-legal-link">Privacy Policy</Link>
            <button
              type="button"
              className="ft-top-btn"
              onClick={handleScrollTop}
              aria-label="Back to top"
            >
              <IconArrowUp size={18} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;