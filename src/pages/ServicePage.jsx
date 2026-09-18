// src/pages/ServicePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  IconArrowRight,
  IconRosetteDiscountCheck,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconShieldCheck,
} from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Data — Real Noida market data & imagery (September 2026)           */
/* ------------------------------------------------------------------ */

const VERTICALS = [
  {
    id: 'residential',
    num: 'Vertical 01',
    category: 'Private Client Desk',
    title: 'Luxury Residential Acquisition & Discreet Brokerage',
    desc:
      'Noida has emerged as the NCR\'s strongest performing residential market — average capital values surged 125% between 2019 and Q2 2026, from ₹4,795 to ₹10,780 per sq ft, outpacing both Bengaluru and Gurugram. We help HNI buyers navigate premium corridors like Sector 150 (₹12,000–15,000 per sq ft) and Sector 128 (₹12,500–13,500 per sq ft), where luxury projects from Max Estates, L&T Realty, and Godrej command premium pricing.',
    deliverables: [
      'Off-market curation across Sector 128–150 luxury belt',
      'Sector-wise pricing analytics & appreciation forecasting',
      'Builder price negotiation (10–15% typical savings)',
      'Escrow settlement & RERA-compliant documentation',
    ],
    statLabel: 'Noida Price Appreciation (2019–2026)',
    statValue: '125% — Highest Among All Major Indian Cities',
    cta: 'Engage Desk',
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    imageAlt: 'Luxury high-rise residential towers in Noida with modern glass facades and landscaped greens',
    captionLabel: 'Representative Market Data',
    captionText: 'Sector 150 · ₹12,300/sq ft avg · 110–115% 5-yr appreciation · 2.07% rental yield',
  },
  {
    id: 'commercial',
    num: 'Vertical 02',
    category: 'Institutional & Yield Assets',
    title: 'Commercial Real Estate & High-Yield Capital Placements',
    desc:
      'Noida holds a significant 29.5% share of NCR\'s Grade-A office stock, with Sector 62 alone expecting 1.8 million sq ft of new Grade-A supply between 2026 and 2029. Adobe recently leased nearly 158,000 sq ft at Max Square on the Noida-Greater Noida Expressway, signalling strong institutional confidence. We structure commercial investments through rigorous cap-rate and IRR underwriting.',
    deliverables: [
      'Cap-rate & IRR stress-testing across Noida corridors',
      'Institutional lease underwriting (IT/ITES & GCC tenants)',
      'Blue-chip tenant covenant verification',
      'Commercial asset repositioning & exit strategy',
    ],
    statLabel: 'Average Commercial Yield (Noida Grade-A)',
    statValue: '7.8% – 9.4% Blended Return',
    cta: 'Commercial Mandates',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    imageAlt: 'Modern commercial office building in Noida Sector 62 with glass curtain wall and corporate campus',
    captionLabel: 'Live Transaction',
    captionText: 'Adobe leases 158,000 sq ft at Max Square · Noida-Greater Noida Expressway · IGBC Platinum certified',
    reverse: true,
  },
  {
    id: 'architectural',
    num: 'Vertical 03',
    category: 'Conception & Construction',
    title: 'Architectural Conception & Bespoke Turnkey Construction',
    desc:
      'From raw plots in the Yamuna Expressway corridor to premium villa builds in Sector 150, we consolidate celebrated architectural studios, interior curators, and veteran contractors under single-point accountability. With the Jewar Airport now operational and the Noida Airport Expressway (50 km elevated corridor) entering DPR stage, construction activity across the region is at an all-time high.',
    deliverables: [
      'Schematic blueprints & 3D architectural renders',
      'UP municipal regulatory sanctioning & RERA compliance',
      'Premium material sourcing & quality audits',
      'Milestone-based site stewardship & handover',
    ],
    statLabel: 'Active Advisory Projects (Noida & Greater Noida)',
    statValue: '12 Live Projects Under Supervision',
    cta: 'Discuss Project',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    imageAlt: 'Active construction site in Noida with tower cranes and structural steel framework',
    captionLabel: 'Infrastructure Catalyst',
    captionText: '₹2,254 Cr Aqua Line extension (Botanical Garden to Sector 142) approved · 8 elevated stations · completion in 4 years',
  },
  {
    id: 'capital',
    num: 'Vertical 04',
    category: 'Wealth & Portfolio Defense',
    title: 'Real Estate Investment Advisory & Asset Management',
    desc:
      'Noida rental yields have improved from 3.2% in 2019 to 3.9% in Q2 2026, a 70-basis-point increase — reflecting the dual-return nature of the market: capital appreciation plus growing rental income. Sectors 135 and 137 along the IT corridor deliver approximately 4% yields, while Sector 150 offers ~2.5–3% with stronger long-term capital upside.',
    deliverables: [
      'Sector-wise ROI & rental yield analysis',
      'Portfolio rebalancing across Noida corridors',
      'NRI investment structuring & FEMA compliance',
      'Discreet secondary-market exit execution',
    ],
    statLabel: 'Noida Rental Yield (Q2 2026)',
    statValue: '3.9% — Up 70 bps Since 2019',
    cta: 'Explore Management',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    imageAlt: 'Real estate investment analytics dashboard displaying Noida market trends, charts, and yield data',
    captionLabel: 'Portfolio Snapshot',
    captionText: 'Noida average residential price ₹10,780/sq ft (Q2 2026) · 125% appreciation since 2019 · ₹1.53 lakh Cr NCR housing sales',
    reverse: true,
  },
  {
    id: 'conveyancing',
    num: 'Vertical 05',
    category: 'Forensic Legal Counsel',
    title: 'Legal Verification, Forensic Due Diligence & Conveyancing',
    desc:
      'UP RERA has brought unprecedented transparency to the Noida market — buyers can now verify project registrations, check construction timelines, and hold builders accountable. Circle rates in Noida increased by approximately 20% for 2025–2026, with premium sector plot rates reaching ₹1,38,000 per sq m. Our legal team conducts 30-year retrospective title searches, RERA compliance audits, and municipal zone validations.',
    deliverables: [
      '30-year continuous title trace & encumbrance check',
      'UP RERA project registration verification',
      'Circle rate benchmarking & stamp duty optimisation',
      'Sub-registrar deed representation & handover',
    ],
    statLabel: 'UP RERA Registered Projects (Noida)',
    statValue: '100% Compliance Record',
    cta: 'Verify an Asset',
    image:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    imageAlt: 'Legal documentation and property registration paperwork for Noida real estate transactions',
    captionLabel: 'Regulatory Update',
    captionText: 'Noida circle rates rise ~20% for 2025–26 · Premium sector plots up to ₹1,38,000/sq m · Stamp duty on higher of circle rate or transaction value',
  },
];

const PHASES = [
  {
    num: '01',
    label: 'Phase 01',
    title: 'Strategic Consultation & Profiling',
    desc: 'In-depth alignment of fiscal goals, spatial requirements, NRI/tax residency status, and lifestyle preferences. We review your target sector, budget band (₹50L–₹50Cr+), and investment horizon.',
    duration: 'Duration: 3 – 5 Business Days',
  },
  {
    num: '02',
    label: 'Phase 02',
    title: 'Market Scouting & Off-Market Origination',
    desc: 'Leveraging our proprietary database of RERA-registered projects across Noida, Greater Noida, and Yamuna Expressway. We source off-market inventory and arrange private viewings with full principal anonymity.',
    duration: 'Duration: 10 – 20 Business Days',
  },
  {
    num: '03',
    label: 'Phase 03',
    title: 'Forensic Due Diligence & Negotiation',
    desc: 'Detailed site inspections, 30-year revenue encumbrance verification, UP RERA compliance audits, structural integrity checks, and assertive commercial valuation mediation to secure the best price.',
    duration: 'Duration: 7 – 14 Business Days',
  },
  {
    num: '04',
    label: 'Phase 04',
    title: 'Settlement, Handover & Asset Care',
    desc: 'Escrow clearance, sub-registrar execution, concierge key handover, and activation of interior styling or leasing infrastructure. We remain available for post-possession support.',
    duration: 'Duration: Continuous Stewardship',
  },
];

const TIERS = [
  {
    tier: 'Tier 01',
    title: 'Transaction-Linked Mandate',
    desc: 'Suited for standard residential apartment purchases (₹50L–₹5Cr) and listed commercial spaces across Noida\'s established sectors.',
    feeLabel: 'Fee Structure',
    feeValue: '1.0% – 1.5%',
    feeNote: 'Payable upon final conveyance execution',
    features: [
      'Full RERA-verified property inventory access',
      'Scheduled private viewing arrangements',
      'Standard title document verification',
      'Closing & sub-registrar registration support',
    ],
    cta: 'Select Standard Mandate',
    highlight: false,
  },
  {
    tier: 'Tier 02',
    title: 'Retained Private Mandate',
    desc: 'Dedicated multi-month exclusive search for ultra-prime off-market properties — Sector 150 luxury apartments, Sector 128 penthouses, and Yamuna Expressway land parcels.',
    feeLabel: 'Engagement Commitment',
    feeValue: '₹5,00,000 + 1% Success',
    feeNote: 'Retainer fully credited against success fee',
    features: [
      'Prioritized off-market private originations',
      'Forensic 30-year title due diligence report',
      'Direct senior partner representation',
      'Post-handover concierge asset onboarding',
    ],
    cta: 'Engage Retained Desk',
    highlight: true,
  },
  {
    tier: 'Tier 03',
    title: 'Bespoke Development Stewardship',
    desc: 'Turnkey management for custom villa construction (Yamuna Expressway plots), architectural redesign, or commercial asset repositioning.',
    feeLabel: 'Fee Basis',
    feeValue: 'Cost Plus 8.5%',
    feeNote: 'Tied directly to construction milestones',
    features: [
      'Architectural firm tender & selection',
      'Contractor stewardship & quality audits',
      'UP municipal clearances & completion certificates',
      'Complete interior and landscaping fit-out',
    ],
    cta: 'Commission Development',
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    tag: 'Sector 150 Luxury Acquisition',
    value: '₹8.2 Cr',
    quote: '"Prime Casa identified a pre-launch opportunity in Sector 150 that wasn\'t publicly listed. Their sector-wise pricing analysis showed the area had already delivered 110% appreciation over five years. We closed within three weeks."',
    name: 'Arjun M.',
    role: 'NRI Investor, Dubai',
  },
  {
    tag: 'Sector 128 Commercial Placement',
    value: '₹22.5 Cr',
    quote: '"Their underwriting for our pre-leased Grade-A office acquisition on the Noida Expressway was more rigorous than our institutional banking partners. Cap-rate calculations were accurate to within five basis points."',
    name: 'Rohit K.',
    role: 'Managing Director, Family Office',
  },
  {
    tag: 'Yamuna Expressway Land Advisory',
    value: '₹15.0 Cr',
    quote: '"With Jewar Airport now operational and property values projected to rise another 20–30%, Prime Casa helped us acquire a strategic land parcel before the next price surge. Their infrastructure-tracking approach is unmatched."',
    name: 'Sneha & Vikram R.',
    role: 'Retained Clients, Delhi',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const ServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <Seo
        title="Services & Advisory"
        description="Bespoke property advisory in Noida — luxury residential, commercial placements, architectural development, investment management, and forensic legal counsel. Powered by real market data."
      />

      {/* ───────── HERO ───────── */}
      <section className="services-hero">
        <div className="services-hero-bg"></div>
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <ul className="services-breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li>/</li>
            <li>Services</li>
          </ul>
          <h1 className="services-hero-title">Turning Dreams Into Addresses</h1>
          <p className="services-hero-sub">
            Noida&apos;s residential prices have surged 125% since 2019 — the highest
            appreciation among all major Indian cities. We help you invest intelligently
            across this outperforming market.
          </p>
        </div>
      </section>

      {/* ───────── METRICS ───────── */}
      <section className="services-metrics-section">
        <div className="services-container">
          <div className="services-metrics">
            <div className="services-metric-card">
              <span className="sp-caps sp-muted">Noida Price Appreciation (2019–2026)</span>
              <p className="services-metric-value sp-primary">125%</p>
              <p className="services-metric-desc">
                Average residential prices surged from ₹4,795 to ₹10,780 per sq ft —
                the highest capital appreciation among all 11 major Indian cities tracked
                by ANAROCK.
              </p>
            </div>
            <div className="services-metric-card">
              <span className="sp-caps sp-muted">Average Rental Yield (Q2 2026)</span>
              <p className="services-metric-value">3.9%</p>
              <p className="services-metric-desc">
                Up 70 basis points since 2019. The IT corridor (Sectors 135/137) delivers
                ~4% yields, while premium Sector 150 offers ~2.5–3% with stronger
                long-term capital upside.
              </p>
            </div>
            <div className="services-metric-card">
              <span className="sp-caps sp-muted">NCR Housing Sales (2024)</span>
              <p className="services-metric-value">₹1.53 Lakh Cr</p>
              <p className="services-metric-desc">
                Noida captured a significant share of this volume, driven by infrastructure
                delivery, corporate expansion (Barclays, Infosys, HCL, Wipro), and
                sustained end-user demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VERTICALS ───────── */}
      <section className="services-verticals-section">
        <div className="services-container services-verticals">
          {VERTICALS.map((v) => (
            <article
              key={v.id}
              id={v.id}
              className={`services-vertical ${v.reverse ? 'services-vertical-reverse' : ''}`}
            >
              <div className="services-vertical-text">
                <div>
                  <div className="services-vertical-meta">
                    <span className="sp-caps sp-primary">{v.num}</span>
                    <span className="sp-bullet">•</span>
                    <span className="sp-caption sp-muted">{v.category}</span>
                  </div>
                  <h2 className="services-headline-md">{v.title}</h2>
                  <p className="services-vertical-desc">{v.desc}</p>

                  <div className="services-deliverables">
                    <span className="sp-caps sp-ink">Core Strategic Deliverables</span>
                    <ul className="services-deliverables-list">
                      {v.deliverables.map((d, i) => (
                        <li key={i}>
                          <IconRosetteDiscountCheck size={18} className="sp-icon-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="services-vertical-footer">
                  <div>
                    <span className="sp-caps sp-muted sp-block">{v.statLabel}</span>
                    <span className="sp-title sp-primary">{v.statValue}</span>
                  </div>
                  <a href="#consultation" className="sp-btn sp-btn-dark">
                    {v.cta} <IconArrowRight size={14} />
                  </a>
                </div>
              </div>

              <div className="services-vertical-image">
                <img
                  src={v.image}
                  alt={v.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <div className="services-image-caption">
                  <span className="sp-caps sp-gold">{v.captionLabel}</span>
                  <p>{v.captionText}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ───────── METHODOLOGY ───────── */}
      <section className="services-methodology-section">
        <div className="services-container">
          <div className="services-methodology-head">
            <div>
              <span className="sp-caps sp-primary">The Protocol</span>
              <h2 className="services-headline-lg">The Four-Phase Advisory Methodology</h2>
            </div>
            <p className="services-methodology-sub">
              An institutional four-tier framework designed to mitigate information
              asymmetry, guarantee exclusivity, and streamline closing friction across
              Noida&apos;s diverse micro-markets.
            </p>
          </div>

          <div className="services-phases">
            {PHASES.map((p) => (
              <div key={p.num} className="services-phase-card">
                <span className="services-phase-num">{p.num}</span>
                <span className="sp-caps sp-primary">{p.label}</span>
                <h3 className="services-headline-sm">{p.title}</h3>
                <p className="services-phase-desc">{p.desc}</p>
                <div className="services-phase-footer">
                  <IconClock size={16} className="sp-icon-primary" />
                  <span>{p.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── TIERS ───────── */}
      <section className="services-tiers-section">
        <div className="services-container">
          <div className="services-tiers-head">
            <span className="sp-caps sp-primary">Fee Transparency &amp; Governance</span>
            <h2 className="services-headline-lg">Bespoke Client Engagement Structures</h2>
            <p>
              We prioritize alignment over transactions. Our multi-tiered engagement
              contracts provide clarity, institutional discipline, and complete fiduciary
              fidelity — whether you are buying a ₹50L apartment or a ₹50Cr land parcel.
            </p>
          </div>

          <div className="services-tiers">
            {TIERS.map((t) => (
              <div
                key={t.tier}
                className={`services-tier-card ${t.highlight ? 'services-tier-highlight' : ''}`}
              >
                {t.highlight && (
                  <div className="services-tier-badge">Most Chosen by HNIs</div>
                )}
                <span className={`sp-caps ${t.highlight ? 'sp-primary' : 'sp-muted'}`}>
                  {t.tier}
                </span>
                <h3 className="services-headline-sm">{t.title}</h3>
                <p className="services-tier-desc">{t.desc}</p>

                <div
                  className={`services-tier-fee ${
                    t.highlight ? 'services-tier-fee-highlight' : ''
                  }`}
                >
                  <span className="sp-caption sp-muted sp-block">{t.feeLabel}</span>
                  <span className="sp-title">{t.feeValue}</span>
                  <span className="sp-caption sp-muted sp-block">{t.feeNote}</span>
                </div>

                <ul className="services-tier-features">
                  {t.features.map((f, i) => (
                    <li key={i}>
                      {t.highlight ? (
                        <IconCircleCheck size={18} className="sp-icon-primary" />
                      ) : (
                        <IconCheck size={18} className="sp-icon-primary" />
                      )}
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#consultation"
                  className={`sp-btn sp-btn-full ${
                    t.highlight ? 'sp-btn-dark' : 'sp-btn-light'
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="services-testimonials-section">
        <div className="services-container">
          <div className="services-testimonials-head">
            <div>
              <span className="sp-caps sp-primary">Reputation &amp; Confidentiality</span>
              <h2 className="services-headline-lg">
                Client Voices Across High-Value Noida Transactions
              </h2>
            </div>
            <div className="services-testimonials-note">
              <IconShieldCheck size={20} className="sp-icon-primary" />
              <span>Identities safeguarded under non-disclosure</span>
            </div>
          </div>

          <div className="services-testimonials">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="services-testimonial-card">
                <div className="services-testimonial-top">
                  <span className="services-testimonial-tag">{t.tag}</span>
                  <span className="services-testimonial-value">{t.value}</span>
                </div>
                <p className="services-testimonial-quote">{t.quote}</p>
                <div>
                  <span className="services-testimonial-name">{t.name}</span>
                  <span className="sp-caption sp-muted sp-block">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;