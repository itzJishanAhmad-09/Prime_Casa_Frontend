// src/pages/PropertiesList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PropertyCard from '../components/PropertyCard';
import { CATEGORY_MAP } from '../utils/helpers';

const FILTER_TABS = ['all', 'residential', 'commercial', 'luxury', 'new'];

const PropertiesList = ({ projects }) => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');

  const category = searchParams.get('cat')    || '';
  const sector   = searchParams.get('sector') || '';
  const status   = searchParams.get('status') || '';

  const filtered = useMemo(() => {
    let result = projects.filter((p) => {
      // Category filter — driven by shared CATEGORY_MAP (no brittle string literals)
      let catMatch = true;
      if (category) {
        const catLower = category.toLowerCase();
        const mappedType = CATEGORY_MAP[catLower];
        if (mappedType) {
          catMatch = p.type === mappedType;
        } else if (catLower === 'popular') {
          catMatch = p.tag === 'popular';
        } else if (catLower === 'new launch') {
          catMatch = p.tag === 'new';
        }
      }

      // Sector filter
      const sectorMatch = sector
        ? p.loc.toLowerCase().includes(sector.toLowerCase())
        : true;

      // Status filter
      const statusMatch = status
        ? p.status.toLowerCase().includes(status.toLowerCase())
        : true;

      return catMatch && sectorMatch && statusMatch;
    });

    if (filter !== 'all') {
      result = result.filter(
        (p) => p.type === filter || (filter === 'new' && p.tag === 'new')
      );
    }

    return result;
  }, [projects, filter, category, sector, status]);

  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>No properties available.</p>;
  }

  return (
    <>
      <Seo
        title="All Properties"
        description="Browse all RERA-verified residential and commercial properties in Noida, Greater Noida, and Yamuna Expressway."
      />

      <section className="property-hero-banner">
        <div className="property-hero-bg" />
        <div className="property-hero-overlay" />
        <div className="property-hero-container">
          <div className="property-hero-content">
            <ul className="property-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Properties</li>
            </ul>
            <h1 className="property-hero-title">All Properties</h1>
            <p className="property-hero-sub">
              Handpicked RERA-verified properties with the highest buyer interest &amp; market confidence
            </p>
          </div>
        </div>
      </section>

      <section className="property-preview-section">
        <div className="property-preview-header">
          <span className="property-preview-label">Browse All</span>
          <h2>Trending Properties in Noida</h2>
          <p>Handpicked RERA-verified properties with the highest buyer interest &amp; market confidence</p>
        </div>

        <div className="property-filters">
          {FILTER_TABS.map((f) => (
            <button
              key={f}
              className={`property-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              type="button"
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="property-card-grid">
          {filtered.map((project) => (
            <PropertyCard key={project.id} project={project} variant="grid" />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--txt3)', marginTop: '2rem' }}>
            No properties match your search criteria.
          </p>
        )}
      </section>
    </>
  );
};

export default PropertiesList;