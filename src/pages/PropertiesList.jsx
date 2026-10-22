// src/pages/PropertiesList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PropertyCard from '../components/PropertyCard';
import {
  CATEGORY_MAP,
  BUDGET_MAP,
  BUDGET_RANGES,
} from '../utils/helpers';
import { IconChevronDown } from '@tabler/icons-react';

const CATEGORY_CHIPS = [
  { key: 'all',         label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'luxury',      label: 'Luxury' },
  { key: 'commercial',  label: 'Commercial' },
  { key: 'plots',       label: 'Plots & land' },
  { key: 'new',         label: 'New launch' },
];

const CITIES = [
  { value: 'all', label: 'All cities' },
  { value: 'Noida', label: 'Noida' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Gurugram', label: 'Gurugram' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Faridabad', label: 'Faridabad' },
  { value: 'Ghaziabad', label: 'Ghaziabad' },
  { value: 'Lucknow', label: 'Lucknow' },
];

const SECTORS = [
  { value: 'all', label: 'All sectors' },
  { value: 'Sector 22D', label: 'Sector 22D · Yamuna Expwy' },
  { value: 'Sector 62',  label: 'Sector 62' },
  { value: 'Sector 72',  label: 'Sector 72' },
  { value: 'Sector 94',  label: 'Sector 94' },
  { value: 'Sector 98',  label: 'Sector 98' },
  { value: 'Sector 105', label: 'Sector 105' },
  { value: 'Sector 107', label: 'Sector 107' },
  { value: 'Sector 128', label: 'Sector 128' },
  { value: 'Sector 142', label: 'Sector 142' },
  { value: 'Sector 150', label: 'Sector 150' },
  { value: 'Noida Extension',     label: 'Noida Extension' },
  { value: 'Greater Noida West',  label: 'Greater Noida West' },
  { value: 'Yamuna Expressway',   label: 'Yamuna Expressway' },
  { value: 'Ramnagar',            label: 'Ramnagar · Uttarakhand' },
];

const BUDGETS = [
  { value: 'all',    label: 'Any budget' },
  { value: 'u50',    label: 'Under ₹50 L' },
  { value: '50-100', label: '₹50 L – ₹1 Cr' },
  { value: '100-200', label: '₹1 Cr – ₹2 Cr' },
  { value: '200-500', label: '₹2 Cr – ₹5 Cr' },
  { value: '500',    label: 'Above ₹5 Cr' },
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
  const [city, setCity] = useState('all');
  const [q, setQ] = useState('');
  const [sector, setSector] = useState('all');
  const [budget, setBudget] = useState('all');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    const urlCat     = searchParams.get('cat');
    const urlCity    = searchParams.get('city');
    const urlSector  = searchParams.get('sector');
    const urlStatus  = searchParams.get('status');
    const urlBudget  = searchParams.get('budget');

    if (urlCat) {
      const key = urlCat.toLowerCase();
      if (CATEGORY_MAP[key]) setFilter(CATEGORY_MAP[key]);
      else if (key === 'popular') setFilter('all');
      else if (key === 'new launch') setFilter('new');
      else if (CATEGORY_CHIPS.some((c) => c.key === key)) setFilter(key);
    }

    setCity(urlCity || 'all');
    if (urlSector) setSector(urlSector);
    if (urlStatus) setStatus(urlStatus);
    if (urlBudget) setBudget(BUDGET_MAP[urlBudget] || 'all');
  }, [searchParams]);

  const sectorOptions = useMemo(() => {
    if (sector !== 'all' && !SECTORS.some((s) => s.value === sector)) {
      return [{ value: sector, label: sector }, ...SECTORS];
    }
    return SECTORS;
  }, [sector]);

  const filtered = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    return projects.filter((p) => {
      let chipMatch = true;
      if (filter !== 'all') {
        if (filter === 'new') chipMatch = p.tag === 'new';
        else if (filter === 'plots') chipMatch = p.type === 'plots';
        else chipMatch = p.type === filter;
      }

      const cityMatch =
        city === 'all'
          ? true
          : p.loc.toLowerCase().includes(city.toLowerCase());

      const sectorMatch =
        sector === 'all'
          ? true
          : p.loc.toLowerCase().includes(sector.toLowerCase());

      const statusMatch =
        status === 'all'
          ? true
          : p.status.toLowerCase().includes(status.toLowerCase());

      let budgetMatch = true;
      if (budget !== 'all' && typeof p.price === 'number') {
        const [min, max] = BUDGET_RANGES[budget] || [0, Infinity];
        budgetMatch = p.price >= min && p.price < max;
      } else if (budget !== 'all' && p.price == null) {
        budgetMatch = false;
      }

      const query = q.trim().toLowerCase();
      const queryMatch = !query
        ? true
        : `${p.title} ${p.builder} ${p.loc} ${p.beds}`
            .toLowerCase()
            .includes(query);

      return chipMatch && cityMatch && sectorMatch && statusMatch && budgetMatch && queryMatch;
    });
  }, [projects, filter, city, sector, status, budget, q]);

  const resetFilters = () => {
    setFilter('all');
    setCity('all');
    setSector('all');
    setBudget('all');
    setStatus('all');
    setQ('');
  };

  const heroBgImage = city !== 'all' 
    ? "url('https://artvalley.org/wp-content/uploads/2021/11/img_118707_real_esatate.jpg')" 
    : undefined;

  return (
    <>
      <Seo
        title={city !== 'all' ? `Properties in ${city}` : "All Properties"}
        description={`Browse RERA-verified properties in ${city !== 'all' ? city : 'Noida and NCR'}.`}
      />

      {/* HERO */}
      <section className="pp-hero banner-enter">
        <div 
          className="pp-hero-bg banner-bg" 
          style={{ backgroundImage: heroBgImage }} 
          aria-hidden="true" 
        />
        <div className="pp-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="pp-hero-inner">
          <nav className="pp-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            {city !== 'all' ? (
              <>
                <Link to="/properties">Properties</Link>
                <span>/</span>
                <span className="pp-crumb-current">{city}</span>
              </>
            ) : (
              <span className="pp-crumb-current">Properties</span>
            )}
          </nav>

          <h1 className="pp-hero-title d2">
            {city !== 'all' ? `Properties in` : 'All properties,'}<br />
            <em>{city !== 'all' ? city : 'verified.'}</em>
          </h1>

          <p className="pp-hero-sub d3">
            {city !== 'all' 
              ? `Explore RERA-verified residential and commercial projects located in ${city}.`
              : 'Handpicked RERA-verified projects with the highest buyer interest and market confidence.'}
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="pp-filters">
        <div className="pp-filters-inner">

          <div className="pp-chips" role="group" aria-label="Property type">
            {CATEGORY_CHIPS.map((c, idx) => (
              <button
                key={c.key}
                type="button"
                className={`pp-chip ${filter === c.key ? 'is-active' : ''}`}
                aria-pressed={filter === c.key}
                onClick={() => setFilter(c.key)}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="pp-bar" data-reveal data-reveal-delay="1">
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
              <label htmlFor="pp-city">City</label>
              <select
                id="pp-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {CITIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
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
                {sectorOptions.map((s) => (
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

            <button type="button" className="pp-reset" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="pp-results">
        <div className="pp-results-inner">
          <p className="pp-count" aria-live="polite" data-reveal>
            {filtered.length} {filtered.length === 1 ? 'PROPERTY' : 'PROPERTIES'}
            {' · '}
            {city !== 'all' ? city.toUpperCase() : 'ALL RERA-VERIFIED'}
          </p>

          {filtered.length === 0 ? (
            <div className="pp-empty" data-reveal>
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
    </>
  );
};

export default PropertiesList;