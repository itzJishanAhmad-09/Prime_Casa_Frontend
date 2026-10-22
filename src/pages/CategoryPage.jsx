// src/pages/CategoryPage.jsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PropertyCard from '../components/PropertyCard';
import { projects } from '../data/projects';
import { BUDGET_RANGES } from '../utils/helpers';
import { IconChevronDown } from '@tabler/icons-react';

/* ------------------------------------------------------------------ */
/*  Category configs                                                   */
/* ------------------------------------------------------------------ */
const CATEGORIES = {
  residential: {
    slug: 'residential',
    label: 'Residential',
    navLabel: 'Residential Properties',
    title: 'Homes built for',
    titleEm: 'living well.',
    sub: 'RERA-verified apartments, villas and plotted developments across Noida, Greater Noida and the Yamuna Expressway.',
    seoTitle: 'Residential Properties in Noida',
    seoDesc:
      'Browse RERA-verified residential apartments, villas and plots in Noida, Greater Noida and Yamuna Expressway. Zero brokerage advisory.',
    matches: (p) => p.type === 'residential' || p.type === 'plots',
  },
  commercial: {
    slug: 'commercial',
    label: 'Commercial',
    navLabel: 'Commercial Properties',
    title: 'Workspaces that',
    titleEm: 'perform.',
    sub: 'Grade-A office suites, retail high-streets and IT parks with institutional-grade returns across Noida.',
    seoTitle: 'Commercial Properties in Noida',
    seoDesc:
      'Grade-A office suites, retail high-streets and IT parks in Noida. RERA-verified commercial real estate with expert advisory.',
    matches: (p) => p.type === 'commercial',
  },
  'new-launch': {
    slug: 'new-launch',
    label: 'New Launch',
    navLabel: 'New Launch Properties',
    title: 'First access.',
    titleEm: 'Best pricing.',
    sub: 'Freshly launched projects with introductory pricing and early-bird advantages — before the market reacts.',
    seoTitle: 'New Launch Properties in Noida',
    seoDesc:
      'Be the first to access new launch projects in Noida, Greater Noida and Yamuna Expressway. Early-bird pricing, RERA-verified.',
    matches: (p) => p.tag === 'new',
  },
  premium: {
    slug: 'premium',
    label: 'Premium',
    navLabel: 'Premium Properties',
    title: 'The top of',
    titleEm: 'the market.',
    sub: 'Signature residences, ultra-luxury towers and marquee addresses for the discerning few.',
    seoTitle: 'Premium & Luxury Properties in Noida',
    seoDesc:
      'Ultra-luxury residences and signature addresses in Noida — Max Estates, L&T, Godrej and more. RERA-verified, zero brokerage.',
    matches: (p) =>
      p.type === 'luxury' ||
      (p.tag === 'popular' && p.type === 'residential'),
  },
};

/* ------------------------------------------------------------------ */
/*  Filter options                                                     */
/* ------------------------------------------------------------------ */
const SECTOR_OPTIONS = [
  { value: 'all', label: 'All sectors' },
  { value: 'Sector 22D', label: 'Sector 22D · Yamuna Expwy' },
  { value: 'Sector 72', label: 'Sector 72' },
  { value: 'Sector 98', label: 'Sector 98' },
  { value: 'Sector 105', label: 'Sector 105' },
  { value: 'Sector 107', label: 'Sector 107' },
  { value: 'Sector 128', label: 'Sector 128' },
  { value: 'Sector 142', label: 'Sector 142' },
  { value: 'Noida Extension', label: 'Noida Extension' },
  { value: 'Yamuna Expressway', label: 'Yamuna Expressway' },
  { value: 'Ramnagar', label: 'Ramnagar · Uttarakhand' },
];

const BUDGET_OPTIONS = [
  { value: 'all', label: 'Any budget' },
  { value: 'u50', label: 'Under ₹50 L' },
  { value: '50-100', label: '₹50 L – ₹1 Cr' },
  { value: '100-200', label: '₹1 Cr – ₹2 Cr' },
  { value: '200-500', label: '₹2 Cr – ₹5 Cr' },
  { value: '500', label: 'Above ₹5 Cr' },
];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest first' },
  { value: 'az', label: 'A → Z' },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
const CategoryPage = ({ category }) => {
  const config = CATEGORIES[category];

  const [sector, setSector] = useState('all');
  const [budget, setBudget] = useState('all');
  const [sort, setSort] = useState('featured');

  const baseProjects = useMemo(
    () => (config ? projects.filter(config.matches) : []),
    [config]
  );

  const filtered = useMemo(() => {
    let list = baseProjects.filter((p) => {
      const sectorMatch =
        sector === 'all' ||
        p.loc.toLowerCase().includes(sector.toLowerCase());

      let budgetMatch = true;
      if (budget !== 'all') {
        if (typeof p.price !== 'number') {
          budgetMatch = false;
        } else {
          const [min, max] = BUDGET_RANGES[budget] || [0, Infinity];
          budgetMatch = p.price >= min && p.price < max;
        }
      }

      return sectorMatch && budgetMatch;
    });

    if (sort === 'az') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'newest') {
      list = [...list].sort(
        (a, b) => Number(b.tag === 'new') - Number(a.tag === 'new')
      );
    }

    return list;
  }, [baseProjects, sector, budget, sort]);

  const reset = () => {
    setSector('all');
    setBudget('all');
    setSort('featured');
  };

  if (!config) {
    return (
      <section className="pp-results">
        <div className="pp-results-inner">
          <div className="pp-empty">
            <h3>Unknown category</h3>
            <p>That property category doesn&rsquo;t exist.</p>
            <div className="pp-empty-buttons">
              <Link to="/properties" className="pp-empty-btn pp-empty-btn--red">
                Browse all properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo title={config.seoTitle} description={config.seoDesc} />

      {/* HERO — inherits the .pp-hero-bg image from App.css */}
      <section className="pp-hero banner-enter">
        <div className="pp-hero-bg banner-bg" aria-hidden="true" />
        <div className="pp-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="pp-hero-inner">
          <nav className="pp-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/properties">Properties</Link>
            <span>/</span>
            <span className="pp-crumb-current">{config.label}</span>
          </nav>

          <h1 className="pp-hero-title d2">
            {config.title}
            <br />
            <em>{config.titleEm}</em>
          </h1>

          <p className="pp-hero-sub d3">{config.sub}</p>
        </div>
      </section>

      {/* CATEGORY TABS + FILTERS */}
      <section className="pp-filters">
        <div className="pp-filters-inner">
          <div className="pp-chips" role="group" aria-label="Property category">
            {Object.values(CATEGORIES).map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className={`pp-chip ${c.slug === category ? 'is-active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-current={c.slug === category ? 'page' : undefined}
              >
                {c.label}
              </Link>
            ))}
          </div>

          <div className="pp-bar" data-reveal data-reveal-delay="1">
            <div className="pp-field">
              <label htmlFor="cp-sector">Sector</label>
              <select
                id="cp-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                {SECTOR_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <div className="pp-field">
              <label htmlFor="cp-budget">Budget</label>
              <select
                id="cp-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <div className="pp-field">
              <label htmlFor="cp-sort">Sort by</label>
              <select
                id="cp-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <button type="button" className="pp-reset" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="pp-results">
        <div className="pp-results-inner">
          <p className="pp-count" aria-live="polite" data-reveal>
            {filtered.length}{' '}
            {filtered.length === 1 ? 'PROPERTY' : 'PROPERTIES'}
            {' · '}
            {config.label.toUpperCase()}
          </p>

          {filtered.length === 0 ? (
            <div className="pp-empty" data-reveal>
              <h3>Nothing matches — yet.</h3>
              <p>
                Try loosening a filter, or tell us exactly what you&rsquo;re
                after and we&rsquo;ll scout it for you.
              </p>
              <div className="pp-empty-buttons">
                <button
                  type="button"
                  className="pp-empty-btn pp-empty-btn--red"
                  onClick={reset}
                >
                  Clear filters
                </button>
                <Link to="/contact" className="pp-empty-btn pp-empty-btn--outline">
                  Ask an advisor
                </Link>
              </div>
            </div>
          ) : (
            <div className="pp-grid">
              {filtered.map((project, idx) => (
                <div
                  key={project.id}
                  data-reveal
                  data-reveal-delay={String((idx % 6) + 1)}
                >
                  <PropertyCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="sp-cta">
        <div className="sp-cta-inner">
          <h2 className="sp-cta-title" data-reveal data-reveal-delay="1">
            Not finding the <em>right fit?</em>
          </h2>
          <div className="sp-cta-buttons">
            <Link
              to="/contact"
              className="sp-cta-btn sp-cta-btn--red"
              data-reveal
              data-reveal-delay="2"
            >
              Talk to an advisor
            </Link>
            <Link
              to="/properties"
              className="sp-cta-btn sp-cta-btn--outline"
              data-reveal
              data-reveal-delay="3"
            >
              Browse all properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;