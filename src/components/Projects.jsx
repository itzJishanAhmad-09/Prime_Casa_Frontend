import React, { useState, useEffect } from 'react';

// Use the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [filter, setFilter] = useState('all');

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/properties`);
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        // The API returns an object with `properties` and `pagination`
        setProjects(data.properties || []);
        setFilteredProjects(data.properties || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        // Fallback to static data if API fails
        // (you can import your static data as backup)
      }
    };

    fetchProjects();
  }, []);

  // Apply filter whenever filter state changes
  useEffect(() => {
    if (projects.length === 0) return;

    let result = projects;
    if (filter === 'all') {
      // show all
    } else if (filter === 'new') {
      result = projects.filter(p => p.status === 'New Launch' || p.isPopular === false);
    } else {
      result = projects.filter(p => p.type === filter);
    }
    setFilteredProjects(result);
  }, [filter, projects]);

  // Handle filter button click
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
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading projects...
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
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--red)' }}>
          Error loading projects: {error}
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
      <div className="proj-grid">
        {filteredProjects.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--txt3)' }}>
            No projects found.
          </p>
        ) : (
          filteredProjects.map((project) => (
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
                <div className="proj-builder">{project.builder}</div>
                <div className="proj-title">{project.title}</div>
                <div className="proj-loc">
                  <i className="ti ti-map-pin" style={{ fontSize: '12px' }}></i> {project.location || project.loc}
                </div>
                <div className="proj-price">
                  {project.price?.display || project.price} <span>· {project.pricePerSqFt ? `₹${project.pricePerSqFt.toLocaleString()}/sq ft` : ''}</span>
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
                  {project.amenities?.join(' · ') || ''}
                </div>
                <div className="proj-actions">
                  <button className="btn-sm btn-sm-red">Know More</button>
                  <button className="btn-sm btn-sm-out" style={{ border: '1px solid var(--border-s)' }}>
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button className="btn-red" style={{ padding: '13px 36px', borderRadius: '9px', fontSize: '14px' }}>
          View All Listings ↗
        </button>
      </div>
    </section>
  );
};

export default Projects;