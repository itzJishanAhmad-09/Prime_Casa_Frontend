// src/pages/ServicePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { IconPlus, IconCheck, IconArrowRight } from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const METRICS = [
  {
    label: 'Noida price appreciation 2019–2026',
    value: '125%',
    desc: 'Average residential prices rose from ₹4,795 to ₹10,780 per sq ft — the highest among 11 major Indian cities tracked by ANAROCK.',
  },
  {
    label: 'Average rental yield · Q2 2026',
    value: '3.9%',
    desc: 'Up 70 bps since 2019. The IT corridor (Sectors 135/137) delivers ~4%; Sector 150 ~2.5–3% with stronger capital upside.',
  },
  {
    label: 'NCR housing sales · 2024',
    value: '₹1.53L Cr',
    desc: 'Noida captured a significant share, driven by infrastructure delivery, corporate expansion and sustained end-user demand.',
  },
];

const VERTICALS = [
  {
    n: '01',
    desk: 'Private Client Desk',
    title: 'Luxury residential acquisition & discreet brokerage',
    body: 'Average capital values in Noida rose 125% between 2019 and Q2 2026 — from ₹4,795 to ₹10,780 per sq ft, outpacing Bengaluru and Gurugram. We guide HNI buyers through premium corridors like Sector 150 (₹12,000–15,000/sq ft) and Sector 128 (₹12,500–13,500/sq ft).',
    deliverables: [
      'Off-market curation across the Sector 128–150 luxury belt',
      'Sector-wise pricing analytics & appreciation forecasting',
      'Builder price negotiation (10–15% typical savings)',
      'Escrow settlement & RERA-compliant documentation',
    ],
    statLabel: 'Noida price appreciation 2019–2026',
    stat: '125%',
    note: 'Sector 150 · ₹12,300/sq ft avg · 110–115% 5-yr appreciation · 2.07% rental yield',
    cta: 'Engage desk',
  },
  {
    n: '02',
    desk: 'Institutional & Yield Assets',
    title: 'Commercial real estate & high-yield capital placements',
    body: 'Noida holds 29.5% of NCR’s Grade-A office stock, and Sector 62 alone expects 1.8 million sq ft of new Grade-A supply between 2026 and 2029. We structure commercial investments through rigorous cap-rate and IRR underwriting.',
    deliverables: [
      'Cap-rate & IRR stress-testing across Noida corridors',
      'Institutional lease underwriting (IT/ITES & GCC tenants)',
      'Blue-chip tenant covenant verification',
      'Commercial asset repositioning & exit strategy',
    ],
    statLabel: 'Avg. commercial yield · Noida Grade-A',
    stat: '7.8–9.4%',
    note: 'Live transaction: Adobe leases 158,000 sq ft at Max Square, Noida–Greater Noida Expressway · IGBC Platinum certified',
    cta: 'Commercial mandates',
  },
  {
    n: '03',
    desk: 'Conception & Construction',
    title: 'Architectural conception & bespoke turnkey construction',
    body: 'From raw plots on the Yamuna Expressway to premium villa builds in Sector 150, we bring architectural studios, interior curators and veteran contractors under single-point accountability.',
    deliverables: [
      'Schematic blueprints & 3D architectural renders',
      'UP municipal sanctioning & RERA compliance',
      'Premium material sourcing & quality audits',
      'Milestone-based site stewardship & handover',
    ],
    statLabel: 'Active advisory projects · Noida & Greater Noida',
    stat: '12 live',
    note: 'Infrastructure catalyst: ₹2,254 Cr Aqua Line extension (Botanical Garden to Sector 142) approved · 8 elevated stations',
    cta: 'Discuss a project',
  },
  {
    n: '04',
    desk: 'Wealth & Portfolio Defense',
    title: 'Real-estate investment advisory & asset management',
    body: 'Noida rental yields improved from 3.2% in 2019 to 3.9% in Q2 2026. The IT corridor (Sectors 135/137) delivers about 4%, while Sector 150 offers ~2.5–3% with stronger long-term capital upside.',
    deliverables: [
      'Sector-wise ROI & rental-yield analysis',
      'Portfolio rebalancing across Noida corridors',
      'NRI investment structuring & FEMA compliance',
      'Discreet secondary-market exit execution',
    ],
    statLabel: 'Noida rental yield · Q2 2026',
    stat: '3.9%',
    note: 'Up 70 bps since 2019 · Avg residential price ₹10,780/sq ft · ₹1.53 lakh Cr NCR housing sales',
    cta: 'Explore management',
  },
  {
    n: '05',
    desk: 'Forensic Legal Counsel',
    title: 'Legal verification, due diligence & conveyancing',
    body: 'UP RERA lets buyers verify registrations, check construction timelines and hold builders accountable. Our legal team runs 30-year retrospective title searches, RERA compliance audits and municipal zone validations.',
    deliverables: [
      '30-year continuous title trace & encumbrance check',
      'UP RERA project registration verification',
      'Circle-rate benchmarking & stamp-duty optimisation',
      'Sub-registrar deed representation & handover',
    ],
    statLabel: 'UP RERA registered projects · Noida',
    stat: '100%',
    note: 'Noida circle rates up ~20% for 2025–26 · Premium sector plots up to ₹1,38,000/sq m · Stamp duty on the higher of circle rate or transaction value',
    cta: 'Verify an asset',
  },
];

const EXCLUSIVES = [
  {
    n: '01',
    title: 'Expert home inspection',
    desc: 'Detailed property checks for quality, safety and structural integrity before you invest.',
  },
  {
    n: '02',
    title: 'Hassle-free home loans',
    desc: 'End-to-end loan assistance with top banks and financial partners for the fastest approvals.',
  },
  {
    n: '03',
    title: 'Exclusive interior benefits',
    desc: 'Special deals on premium interior solutions to customise your new home affordably.',
  },
  {
    n: '04',
    title: 'Dedicated post-sales care',
    desc: 'Support that continues after purchase — from documentation to possession.',
  },
  {
    n: '05',
    title: 'NRI investment desk',
    desc: 'Property laws, FEMA regulations, taxation and NRI loans, navigated with expert guidance.',
  },
  {
    n: '06',
    title: 'RERA consultation',
    desc: 'Verify registrations, file complaints and protect your investment legally.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const ServicePage = () => {
  // Default open accordion = index 3 (matches the screenshot)
  const [openIndex, setOpenIndex] = useState(3);

  const toggleVertical = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <div className="sp-page">
      <Seo
        title="Services & Advisory"
        description="Bespoke property advisory in Noida — luxury residential, commercial placements, architectural development, investment management and forensic legal counsel."
      />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section className="sp-hero">
        <div className="sp-hero-bg" aria-hidden="true" />
        <div className="sp-hero-scrim" aria-hidden="true" />

        <div className="sp-hero-inner">
          <nav className="sp-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="sp-crumb-current">Services</span>
          </nav>

          <h1 className="sp-hero-title">
            Invest intelligently<br />
            in an <em>outperforming market.</em>
          </h1>

          <p className="sp-hero-sub">
            Noida&rsquo;s residential prices have surged 125% since 2019 —
            the highest appreciation among major Indian cities. Five
            advisory desks help you capture it.
          </p>
        </div>
      </section>

      {/* ================================================================ */}
      {/* METRICS                                                           */}
      {/* ================================================================ */}
      <section className="sp-metrics">
        <div className="sp-metrics-inner">
          {METRICS.map((m) => (
            <article className="sp-metric-card" key={m.label}>
              <span className="sp-metric-label">{m.label}</span>
              <span className="sp-metric-value">{m.value}</span>
              <p className="sp-metric-desc">{m.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* ADVISORY VERTICALS (ACCORDION)                                    */}
      {/* ================================================================ */}
      <section className="sp-verticals">
        <div className="sp-verticals-inner">
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Advisory Verticals</span>
          </div>

          <div className="sp-accordion">
            {VERTICALS.map((v, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  className={`sp-acc-item ${isOpen ? 'is-open' : ''}`}
                  key={v.n}
                >
                  <button
                    type="button"
                    className="sp-acc-head"
                    onClick={() => toggleVertical(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="sp-acc-num">{v.n}</span>

                    <span className="sp-acc-titles">
                      <span className="sp-acc-desk">{v.desk}</span>
                      <span className="sp-acc-title">{v.title}</span>
                    </span>

                    <span className={`sp-acc-toggle ${isOpen ? 'is-open' : ''}`}>
                      <IconPlus size={20} stroke={2} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="sp-acc-body">
                      <div className="sp-acc-body-left">
                        <p className="sp-acc-desc">{v.body}</p>

                        <div className="sp-acc-deliver">
                          <span className="sp-acc-deliver-label">
                            Core deliverables
                          </span>
                          <ul className="sp-acc-list">
                            {v.deliverables.map((d) => (
                              <li key={d}>
                                <IconCheck size={16} stroke={2.4} />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <aside className="sp-acc-stat">
                        <span className="sp-acc-stat-label">
                          {v.statLabel}
                        </span>
                        <span className="sp-acc-stat-value">{v.stat}</span>
                        <p className="sp-acc-stat-note">{v.note}</p>
                        <Link to="/contact" className="sp-acc-stat-cta">
                          <span>{v.cta}</span>
                          <IconArrowRight size={14} />
                        </Link>
                      </aside>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* INCLUDED WITH EVERY PURCHASE                                      */}
      {/* ================================================================ */}
      <section className="sp-included">
        <div className="sp-included-inner">
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-line" aria-hidden="true" />
            <span>Included with every purchase</span>
          </div>

          <h2 className="sp-included-title">
            Beyond just helping you <em>buy.</em>
          </h2>

          <div className="sp-included-grid">
            {EXCLUSIVES.map((x) => (
              <article className="sp-included-card" key={x.n}>
                <span className="sp-included-num">{x.n}</span>
                <h3 className="sp-included-card-title">{x.title}</h3>
                <p className="sp-included-card-desc">{x.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CLOSING CTA                                                       */}
      {/* ================================================================ */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <h2 className="sp-cta-title">
            Tell us your budget, sector
            <br />
            and horizon. <em>We&rsquo;ll do the rest.</em>
          </h2>

          <div className="sp-cta-buttons">
            <Link to="/schedule" className="sp-cta-btn sp-cta-btn--red">
              Book a consultation
            </Link>
            <Link to="/properties" className="sp-cta-btn sp-cta-btn--outline">
              Browse properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;