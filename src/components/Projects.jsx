// src/components/Projects.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY = 6; // change this to control how many appear initially

  // Helper to check if a string looks like an image path
  const isImagePath = (str) => {
    if (!str) return false;
    return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
  };

  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>No projects available.</p>;
  }

  // Apply filter
  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter || (filter === 'new' && p.tag === 'new'));

  // Decide which projects to display
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_DISPLAY);

  // Show toggle button only if there are more than INITIAL_DISPLAY items
  const showToggle = filtered.length > INITIAL_DISPLAY;

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <div className="section-label">✦ Trending Now</div>
        <div className="section-title">Trending Projects in Noida</div>
        <div className="section-sub">
          Handpicked RERA-verified projects with the highest buyer interest & market confidence — June 2026
        </div>
      </div>

      <div className="filters" id="proj-filters">
        {['all', 'residential', 'commercial', 'luxury', 'new'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => {
              setFilter(f);
              // Optionally reset showAll when filter changes
              // setShowAll(false);
            }}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {displayed.map((project, index) => {
          const projectIndex = projects.indexOf(project);
          return (
            <div className="proj-card" key={index}>
              <div className="proj-img">
                {isImagePath(project.emoji) ? (
                  <img 
                    src={project.emoji} 
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="proj-img-bg">{project.emoji || '🏠'}</div>
                )}
                <div className="proj-badges">
                  {project.tag === 'popular' && <span className="proj-badge badge-popular">Popular</span>}
                  {project.tag === 'new' && <span className="proj-badge badge-new">New Launch</span>}
                  {project.type === 'luxury' && <span className="proj-badge badge-luxury">Luxury</span>}
                  <span className="proj-badge badge-rera">RERA ✓</span>
                </div>
              </div>
              <div className="proj-body">
                <div className="proj-builder">{project.builder}</div>
                <div className="proj-title">{project.title}</div>
                <div className="proj-loc">
                  <i className="ti ti-map-pin" style={{ fontSize: '12px' }}></i> {project.loc}
                </div>
                <div className="proj-price">
                  {project.price} <span>· {project.psf}</span>
                </div>
                <div className="proj-meta">
                  <div className="proj-meta-item"><i className="ti ti-home"></i> {project.beds}</div>
                  <div className="proj-meta-item"><i className="ti ti-clock"></i> {project.status}</div>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '8px' }}>
                  {project.amenities}
                </div>
                <div className="proj-actions">
                  <Link to={`/project/${projectIndex}`} className="btn-sm btn-sm-red" style={{ textDecoration: 'none', textAlign: 'center' }}>
                    Know More
                  </Link>
                  <Link to={`/schedule/${projectIndex}`} className="btn-sm btn-sm-out" style={{ textDecoration: 'none', textAlign: 'center', border: '1px solid var(--border-s)' }}>
                    Schedule Visit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showToggle && (
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            className="btn-red"
            style={{ padding: '13px 36px', borderRadius: '9px', fontSize: '14px' }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All Listings ↗'}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;