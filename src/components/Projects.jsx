import React, { useState, useEffect } from 'react';

// Get API base URL from environment (default to localhost for dev)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });

  // Fetch projects from backend with filters
  const fetchProjects = async (filterType = filter, page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(filterType !== 'all' && { type: filterType }),
      });

      const response = await fetch(`${API_URL}/properties?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();
      // Data structure from backend: { properties: [...], pagination: {...} }
      setProjects(data.properties || []);
      setFilteredProjects(data.properties || []);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Could not load properties.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filter changes
  useEffect(() => {
    fetchProjects(filter);
  }, [filter]); // Re-fetch when filter changes

  // Handler for filter button clicks
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading) {
    return (
      <section className="section" id="projects">
        <div className="section-header">
          <div className="section-label">✦ Trending Now</div>
          <div className="section-title">Trending Projects in Noida</div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#475569' }}>
          <i className="ti ti-loader" style={{ fontSize: '24px', marginRight: '8px' }}></i> Loading projects...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section" id="projects">
        <div className="section-header">
          <div className="section-label">✦ Trending Now</div>
          <div className="section-title">Trending Projects in Noida</div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#C0392B' }}>
          <i className="ti ti-alert-circle" style={{ fontSize: '24px', marginRight: '8px' }}></i> 
          {error}
          <br />
          <button 
            onClick={() => fetchProjects(filter)} 
            style={{ marginTop: '16px', padding: '8px 20px', background: '#C0392B', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <div className="section-label">✦ Trending Now</div>
        <div className="section-title">Trending Projects in Noida</div>
        <div className="section-sub">
          Handpicked RERA-verified projects with the highest buyer interest &amp; market confidence — June 2026
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filters" id="proj-filters">
        {['all', 'residential', 'commercial', 'luxury', 'new'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => handleFilterChange(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          No projects found for this category.
        </div>
      ) : (
        <div className="proj-grid">
          {filteredProjects.map((project) => (
            <div className="proj-card" key={project._id || project.id}>
              <div className="proj-img">
                <div className="proj-img-bg">{project.emoji || '🏠'}</div>
                <div className="proj-badges">
                  {project.isPopular && (
                    <span className="proj-badge badge-popular">Popular</span>
                  )}
                  {project.status === 'New Launch' && (
                    <span className="proj-badge badge-new">New Launch</span>
                  )}
                  {project.type === 'luxury' && (
                    <span className="proj-badge badge-luxury">Luxury</span>
                  )}
                  {project.reraVerified && (
                    <span className="proj-badge badge-rera">RERA ✓</span>
                  )}
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-builder">{project.builder || 'Builder'}</div>
                <div className="proj-title">{project.title}</div>
                <div className="proj-loc">
                  <i className="ti ti-map-pin" style={{ fontSize: '12px' }}></i> 
                  {project.location || project.loc || 'Location'}
                </div>
                <div className="proj-price">
                  {project.price?.display || project.price || 'Contact for price'} 
                  <span> {project.pricePerSqFt ? `· ₹${project.pricePerSqFt.toLocaleString()}/sq ft` : ''}</span>
                </div>
                <div className="proj-meta">
                  <div className="proj-meta-item">
                    <i className="ti ti-home"></i> {project.beds || 'N/A'}
                  </div>
                  <div className="proj-meta-item">
                    <i className="ti ti-clock"></i> {project.status || 'Available'}
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '8px' }}>
                  {project.amenities?.length ? project.amenities.join(' · ') : ''}
                </div>
                <div className="proj-actions">
                  <button className="btn-sm btn-sm-red">Know More</button>
                  <button className="btn-sm btn-sm-out" style={{ border: '1px solid var(--border-s)' }}>
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Info */}
      {pagination.total > 0 && (
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
          Showing {filteredProjects.length} of {pagination.total} projects
          {pagination.pages > 1 && ` · Page ${pagination.page} of ${pagination.pages}`}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button className="btn-red" style={{ padding: '13px 36px', borderRadius: '9px', fontSize: '14px' }}>
          View All Listings ↗
        </button>
      </div>
    </section>
  );
};

export default Projects;