import React, { useState } from 'react';

const Projects = ({ projects }) => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter || (filter === 'new' && p.tag === 'new'));

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <div className="section-label">✦ Trending Now</div>
        <div className="section-title">Trending Projects in Noida</div>
        <div className="section-sub">
          Handpicked RERA-verified projects with the highest buyer interest &amp; market confidence — June 2026
        </div>
      </div>
      <div className="filters" id="proj-filters">
        {['all', 'residential', 'commercial', 'luxury', 'new'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div className="proj-grid">
        {filtered.map((p, idx) => (
          <div className="proj-card" key={idx}>
            <div className="proj-img">
              <div className="proj-img-bg">{p.emoji}</div>
              <div className="proj-badges">
                {p.tag === 'popular' && <span className="proj-badge badge-popular">Popular</span>}
                {p.tag === 'new' && <span className="proj-badge badge-new">New Launch</span>}
                {p.type === 'luxury' && <span className="proj-badge badge-luxury">Luxury</span>}
                <span className="proj-badge badge-rera">RERA ✓</span>
              </div>
            </div>
            <div className="proj-body">
              <div className="proj-builder">{p.builder}</div>
              <div className="proj-title">{p.title}</div>
              <div className="proj-loc"><i className="ti ti-map-pin"></i> {p.loc}</div>
              <div className="proj-price">{p.price} <span>· {p.psf}</span></div>
              <div className="proj-meta">
                <div className="proj-meta-item"><i className="ti ti-home"></i> {p.beds}</div>
                <div className="proj-meta-item"><i className="ti ti-clock"></i> {p.status}</div>
              </div>
              <div style={{fontSize:'12px', color:'var(--txt3)', marginTop:'8px'}}>{p.amenities}</div>
              <div className="proj-actions">
                <button className="btn-sm btn-sm-red">Know More</button>
                <button className="btn-sm btn-sm-out">Schedule Visit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center', marginTop:'32px'}}>
        <button className="btn-red" style={{padding:'13px 36px', borderRadius:'9px', fontSize:'14px'}}>
          View All Listings ↗
        </button>
      </div>
    </section>
  );
};

export default Projects;