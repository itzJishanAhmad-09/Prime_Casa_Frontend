// src/pages/PropertiesList.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

// Helper to parse budget range and compare with project price
const matchesBudget = (projectPrice, budgetFilter) => {
  // Extract the starting price number from project.price string (e.g., "₹1.55 Cr – 3.10 Cr" -> 1.55 Cr)
  const priceStr = projectPrice.replace(/[₹,]/g, '').trim();
  let startPrice = 0;
  if (priceStr.includes('–')) {
    startPrice = parseFloat(priceStr.split('–')[0].trim());
  } else {
    startPrice = parseFloat(priceStr);
  }
  // Convert to Crores (if string contains 'Cr')
  if (projectPrice.includes('Cr')) {
    startPrice = startPrice; // already in Cr
  } else if (projectPrice.includes('L')) {
    startPrice = startPrice / 100; // convert Lakhs to Crores
  } else {
    // assume it's a number in lakhs? fallback
    startPrice = startPrice / 100;
  }

  // Parse budget filter
  if (!budgetFilter) return true;
  if (budgetFilter === 'Under ₹50L') return startPrice < 0.5;
  if (budgetFilter === '₹50L – ₹1Cr') return startPrice >= 0.5 && startPrice < 1;
  if (budgetFilter === '₹1Cr – ₹2Cr') return startPrice >= 1 && startPrice < 2;
  if (budgetFilter === '₹2Cr – ₹5Cr') return startPrice >= 2 && startPrice < 5;
  if (budgetFilter === 'Above ₹5Cr') return startPrice >= 5;
  return true;
};

const PropertiesList = ({ projects }) => {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');

  // Read query params
  const category = searchParams.get('cat') || '';
  const sector = searchParams.get('sector') || '';
  const status = searchParams.get('status') || '';
  const budget = searchParams.get('budget') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters
  const filtered = projects.filter((p) => {
    // Category filter (map to type or tag)
    let catMatch = true;
    if (category) {
      const catLower = category.toLowerCase();
      if (catLower === 'apartments' || catLower === 'luxury villas' || catLower === 'penthouses') {
        catMatch = p.type === 'residential' || p.type === 'luxury';
      } else if (catLower === 'office suites' || catLower === 'retail space' || catLower === 'workspaces') {
        catMatch = p.type === 'commercial';
      } else if (catLower === 'residential plots' || catLower === 'farm land') {
        catMatch = p.type === 'residential'; // fallback
      }
      // If category is "popular" or "new" we can check tag
      if (catLower === 'popular') catMatch = p.tag === 'popular';
      if (catLower === 'new launch') catMatch = p.tag === 'new';
    }

    // Sector filter (partial match in loc)
    let sectorMatch = true;
    if (sector) {
      sectorMatch = p.loc.toLowerCase().includes(sector.toLowerCase());
    }

    // Status filter
    let statusMatch = true;
    if (status) {
      statusMatch = p.status.toLowerCase().includes(status.toLowerCase());
    }

    // Budget filter
    let budgetMatch = true;
    if (budget) {
      budgetMatch = matchesBudget(p.price, budget);
    }

    return catMatch && sectorMatch && statusMatch && budgetMatch;
  });

  // Also maintain the existing type filter button (optional)
  const finalFiltered = filter === 'all'
    ? filtered
    : filtered.filter(p => p.type === filter || (filter === 'new' && p.tag === 'new'));

  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>No properties available.</p>;
  }

  return (
    <>
      <Seo
        title="All Properties"
        description="Browse all RERA-verified residential and commercial properties in Noida, Greater Noida, and Yamuna Expressway."
      />

      {/* ===== HERO BANNER ===== */}
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

      {/* ===== PROPERTIES CARDS ===== */}
      <section className="property-preview-section">
        <div className="property-preview-header">
          <span className="property-preview-label">Browse All</span>
          <h2>Trending Properties in Noida</h2>
          <p>Handpicked RERA-verified properties with the highest buyer interest & market confidence</p>
        </div>

        {/* Filters */}
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
          {finalFiltered.map((project) => (
            <div className="property-card" key={project.id}>
              {/* Image */}
              <div className="property-card-img">
                {isImagePath(project.emoji) ? (
                  <img src={project.emoji} alt={project.title} loading="lazy" />
                ) : (
                  <span className="property-card-emoji">{project.emoji || '🏠'}</span>
                )}
                {/* Badges */}
                <div className="property-card-badges">
                  {project.tag === 'popular' && (
                    <span className="badge-popular">Popular</span>
                  )}
                  {project.tag === 'new' && (
                    <span className="badge-new">New Launch</span>
                  )}
                  {project.type === 'luxury' && (
                    <span className="badge-luxury">Luxury</span>
                  )}
                  <span className="badge-rera">RERA ✓</span>
                </div>
              </div>

              {/* Body */}
              <div className="property-card-body">
                <div className="property-card-builder">{project.builder}</div>
                <div className="property-card-title">{project.title}</div>
                <div className="property-card-loc">
                  <i className="ti ti-map-pin"></i> {project.loc}
                </div>
                <div className="property-card-price">
                  {project.price} <span>· {project.psf}</span>
                </div>
                <div className="property-card-meta">
                  <span><i className="ti ti-home"></i> {project.beds}</span>
                  <span><i className="ti ti-clock"></i> {project.status}</span>
                  <span>{project.amenities?.split('·')[0]}</span>
                </div>
                <div className="property-card-actions">
                  <Link to={`/project/${project.id}`} className="btn-sm btn-sm-red">
                    Know More
                  </Link>
                  <Link to={`/schedule/${project.id}`} className="btn-sm btn-sm-out">
                    Schedule Visit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {finalFiltered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--txt3)', marginTop: '2rem' }}>
            No properties match your search criteria.
          </p>
        )}
      </section>
    </>
  );
};

export default PropertiesList;