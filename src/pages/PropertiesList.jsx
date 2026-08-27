// src/pages/PropertiesList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import PropertyCard from '../components/PropertyCard';

const PropertiesList = ({ projects }) => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');

  const category = searchParams.get('cat') || '';
  const sector = searchParams.get('sector') || '';
  const status = searchParams.get('status') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    let result = projects.filter((p) => {
      let catMatch = true;
      if (category) {
        const catLower = category.toLowerCase();
        if (catLower === 'apartments' || catLower === 'luxury villas' || catLower === 'penthouses') {
          catMatch = p.type === 'residential' || p.type === 'luxury';
        } else if (catLower === 'office suites' || catLower === 'retail space' || catLower === 'workspaces') {
          catMatch = p.type === 'commercial';
        } else {
          if (catLower === 'popular') catMatch = p.tag === 'popular';
          if (catLower === 'new launch') catMatch = p.tag === 'new';
        }
      }
      let sectorMatch = true;
      if (sector) {
        sectorMatch = p.loc.toLowerCase().includes(sector.toLowerCase());
      }
      let statusMatch = true;
      if (status) {
        statusMatch = p.status.toLowerCase().includes(status.toLowerCase());
      }
      return catMatch && sectorMatch && statusMatch;
    });

    if (filter !== 'all') {
      result = result.filter(p => p.type === filter || (filter === 'new' && p.tag === 'new'));
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
        <div className="property-hero-bg"></div>
        <div className="property-hero-overlay"></div>
        <div className="property-hero-container">
          <div className="property-hero-content">
            <ul className="property-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Properties</li>
            </ul>
            <h1 className="property-hero-title">All Properties</h1>
            <p className="property-hero-sub">
              Handpicked RERA-verified properties with the highest buyer interest & market confidence
            </p>
          </div>
        </div>
      </section>

      <section className="property-preview-section">
        <div className="property-preview-header">
          <span className="property-preview-label">Browse All</span>
          <h2>Trending Properties in Noida</h2>
          <p>Handpicked RERA-verified properties with the highest buyer interest & market confidence</p>
        </div>

        <div className="property-filters">
          {['all', 'residential', 'commercial', 'luxury', 'new'].map(f => (
            <button
              key={f}
              className={`property-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
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