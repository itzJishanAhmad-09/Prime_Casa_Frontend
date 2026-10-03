// src/pages/PropertiesList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PropertyCard from '../components/PropertyCard';
import { CATEGORY_MAP } from '../utils/helpers';
import { IconChevronDown } from '@tabler/icons-react';

const CATEGORY_CHIPS = [
  { key: 'all',         label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'luxury',      label: 'Luxury' },
  { key: 'commercial',  label: 'Commercial' },
  { key: 'plots',       label: 'Plots & land' },
  { key: 'new',         label: 'New launch' },
];

const SECTORS = [
  { value: 'all', label: 'All sectors' },
  { value: 'Sector 72',  label: 'Sector 72' },
  { value: 'Sector 98',  label: 'Sector 98' },
  { value: 'Sector 105', label: 'Sector 105' },
  { value: 'Sector 107', label: 'Sector 107' },
  { value: 'Sector 128', label: 'Sector 128' },
  { value: 'Sector 142', label: 'Sector 142' },
  { value: 'Sector 22D', label: 'Sector 22D · Yamuna Expwy' },
  { value: 'Ramnagar',   label: 'Ramnagar · Uttarakhand' },
];

const BUDGETS = [
  { value: 'all', label: 'Any budget' },
  { value: 'u50', label: 'Under ₹50 L' },
  { value: '50-100', label: '₹50 L – ₹1 Cr' },
  { value: '100-200', label: '₹1 Cr – ₹2 Cr' },
  { value: '200-500', label: '₹2 Cr – ₹5 Cr' },
  { value: '500', label: 'Above ₹5 Cr' },
];

const STATUSES = [
  { value: 'all', label: 'Any status' },
  { value: 'New Launch', label: 'New launch' },
  { value: 'Under Construction', label: 'Under construction' },
  { value: 'Ready to Move', label: 'Ready to move' },
];

const PropertiesList = ({ projects }) => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [sector, setSector] = useState('all');
  const [budget, setBudget] = useState('all');
  const [status, setStatus] = useState('all');

  // Read URL query params on mount
  useEffect(() => {
    const urlCat = searchParams.get('cat');
    const urlSector = searchParams.get('sector');
    const urlStatus = searchParams.get('status');
    if (urlCat) {
      const catLower = urlCat.toLowerCase();
      if (catLower === 'popular') setFilter('all');
      else if (catLower === 'new launch') setFilter('new');
      else setFilter(catLower);
    }
    if (urlSector) setSector(urlSector);
    if (urlStatus) setStatus(urlStatus);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    return projects.filter((p) => {
      // Filter chip
      let chipMatch = true;
      if (filter !== 'all') {
        if (filter === 'new') chipMatch = p.tag === 'new';
        else if (filter === 'plots') chipMatch = p.type === 'plots';
        else chipMatch = p.type === filter;
      }

      // Sector
      const sectorMatch = sector === 'all'
        ? true
        : p.loc.toLowerCase().includes(sector.toLowerCase());

      // Status
      const statusMatch = status === 'all'
        ? true
        : p.status.toLowerCase().includes(status.toLowerCase());

      // Budget
      let budgetMatch = true;
      if (budget !== 'all' && p.price) {
        const ranges = {
          u50: [0, 5e6],
          '50-100': [5e6, 1e7],
          '100-200': [1e7, 2e7],
          '200-500': [2e7, 5e7],
          '500': [5e7, Infinity],
        };
        const [min, max] = ranges[budget] || [0, Infinity];
        budgetMatch = p.price >= min && p.price < max;
      }

      // Search query
      const query = q.trim().toLowerCase();
      const queryMatch = !query
        ? true
        : `${p.name || p.title} ${p.builder} ${p.loc} ${p.beds}`
            .toLowerCase()
            .includes(query);

      return chipMatch && sectorMatch && statusMatch && budgetMatch && queryMatch;
    });
  }, [projects, filter, sector, status, budget, q]);

  const resetFilters = () => {
    setFilter('all');
    setSector('all');
    setBudget('all');
    setStatus('all');
    setQ('');
  };

  return (
    <>
      <Seo
        title="All Properties"
        description="Browse all RERA-verified residential and commercial properties in Noida, Greater Noida, and Yamuna Expressway."
      />

      {/* ================================================== */}
      {/* HERO                                                */}
      {/* ================================================== */}
      <section className="pp-hero">
        <div className="pp-hero-bg" aria-hidden="true" />
        <div className="pp-hero-scrim" aria-hidden="true" />

        <div className="pp-hero-inner">
          <nav className="pp-crumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="pp-crumb-current">Properties</span>
          </nav>

          <h1 className="pp-hero-title">
            All properties,<br />
            <em>verified.</em>
          </h1>

          <p className="pp-hero-sub">
            Handpicked RERA-verified projects with the highest buyer
            interest and market confidence.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* FILTER BAR                                          */}
      {/* ================================================== */}
      <section className="pp-filters">
        <div className="pp-filters-inner">

          {/* Category chips */}
          <div className="pp-chips" role="group" aria-label="Property type">
            {CATEGORY_CHIPS.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`pp-chip ${filter === c.key ? 'is-active' : ''}`}
                aria-pressed={filter === c.key}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Dropdown row */}
          <div className="pp-bar">
            <div className="pp-field">
              <label htmlFor="pp-q">Search</label>
              <input
                id="pp-q"
                type="search"
                placeholder="Project or developer"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="pp-field">
              <label htmlFor="pp-cat">Category</label>
              <select
                id="pp-cat"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {CATEGORY_CHIPS.map((c) => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <div className="pp-field">
              <label htmlFor="pp-sector">Sector</label>
              <select
                id="pp-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                {SECTORS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <div className="pp-field">
              <label htmlFor="pp-budget">Budget</label>
              <select
                id="pp-budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <div className="pp-field">
              <label htmlFor="pp-status">Status</label>
              <select
                id="pp-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <IconChevronDown size={14} className="pp-field-chev" aria-hidden="true" />
            </div>

            <button
              type="button"
              className="pp-reset"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* RESULTS                                             */}
      {/* ================================================== */}
      <section className="pp-results">
        <div className="pp-results-inner">
          <p className="pp-count" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'PROPERTY' : 'PROPERTIES'}
            {' · '}
            ALL RERA-VERIFIED
          </p>

          {filtered.length === 0 ? (
            <div className="pp-empty">
              <h3>Nothing matches — yet.</h3>
              <p>
                We add verified projects every month. Loosen a filter, or
                tell us what you&rsquo;re after and we&rsquo;ll scout it for you.
              </p>
              <div className="pp-empty-buttons">
                <button
                  type="button"
                  className="pp-empty-btn pp-empty-btn--red"
                  onClick={resetFilters}
                >
                  Clear filters
                </button>
                <Link
                  to="/contact"
                  className="pp-empty-btn pp-empty-btn--outline"
                >
                  Ask an advisor
                </Link>
              </div>
            </div>
          ) : (
            <div className="pp-grid">
              {filtered.map((project) => (
                <PropertyCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesList;