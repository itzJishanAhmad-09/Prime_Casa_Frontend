// src/pages/ProjectDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import PriceChart from '../components/PriceChart';
import ProjectMap from '../components/ProjectMap';
import Seo from '../components/Seo';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(projectId));

  const [activePlan, setActivePlan] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const getConfigLabels = () => {
    if (project.configurations) return project.configurations;
    return project.beds ? project.beds.split('·').map(s => s.trim()) : ['Residence'];
  };

  const configs = getConfigLabels();
  const statusColor = project.status?.toLowerCase().includes('ready') ? '#059669' : '#bb0014';

  const heroImage = isImagePath(project.emoji) ? project.emoji : '/assets/images/default-hero.jpg';
  const floorPlanImage = isImagePath(project.emoji) ? project.emoji : '/assets/images/default-floorplan.jpg';

  const priceData = project.priceHistory || [];

  const handleEnquire = () => {
    navigate(`/schedule/${project.id}`);
  };

  return (
    <div className="project-detail-page">
      <Seo
        title={`${project.title} – ${project.builder}`}
        description={`${project.title} in ${project.loc}. ${project.beds} apartments starting from ${project.price}. RERA ID: ${project.reraId || 'Contact for details'}.`}
        image={isImagePath(project.emoji) ? project.emoji : undefined}
      />

      <section className="pd-hero">
        <div
          className="pd-hero-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="pd-hero-overlay"></div>
      </section>

      {/* ===== PROJECT IDENTITY ===== */}
      <section className="pd-identity">
        <div className="pd-identity-inner">
          <div>
            <div className="pd-location-tag">
              <i className="ti ti-map-pin"></i>
              <span>{project.loc}</span>
            </div>
            <h1 className="pd-title">{project.title}</h1>
          </div>
          <div className="pd-price">
            <p className="pd-price-label">Starting from</p>
            <p className="pd-price-value">{project.price}</p>
          </div>
        </div>

        <div className="pd-stats">
          <div className="pd-stat">
            <div className="pd-stat-icon"><i className="ti ti-bed"></i></div>
            <div>
              <p className="pd-stat-label">Bedrooms</p>
              <p className="pd-stat-value">{project.beds}</p>
            </div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-icon"><i className="ti ti-bath"></i></div>
            <div>
              <p className="pd-stat-label">Bathrooms</p>
              <p className="pd-stat-value">{project.beds?.includes('4') ? '4.5' : '2-3'}</p>
            </div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-icon"><i className="ti ti-ruler-2"></i></div>
            <div>
              <p className="pd-stat-label">Square Ft</p>
              <p className="pd-stat-value">{project.psf?.replace('/sq ft', '') || '4,200'}</p>
            </div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-icon"><i className="ti ti-construction"></i></div>
            <div>
              <p className="pd-stat-label">Status</p>
              <p className="pd-stat-value" style={{ color: statusColor }}>{project.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OVERVIEW ===== */}
      <section className="pd-overview">
        <div className="pd-overview-grid">
          <div className="pd-overview-text">
            <h3 className="pd-section-title">Vision &amp; Narrative</h3>
            <p>{project.fullDescription || project.description}</p>
            {priceData.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Price Appreciation</h4>
                <PriceChart data={priceData} label={`Price in ${project.loc.split(',')[0]}`} />
              </div>
            )}
          </div>
          <div className="pd-overview-card">
            <div className="pd-card-icon"><i className="ti ti-diamond"></i></div>
            <h4>Unique Offering</h4>
            <ul>
              {project.features?.slice(0, 4).map((feature, idx) => (
                <li key={idx}><i className="ti ti-check"></i> {feature}</li>
              )) || (
                <>
                  <li><i className="ti ti-check"></i> LEED Gold Certification</li>
                  <li><i className="ti ti-check"></i> Smart Home Automation</li>
                  <li><i className="ti ti-check"></i> Private Elevators</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== AMENITIES ===== */}
      <section className="pd-amenities">
        <div className="pd-amenities-inner">
          <h3 className="pd-section-title text-center">World Class Amenities</h3>
          <div className="pd-amenities-grid">
            {project.amenities?.split('·').map((item, idx) => (
              <div className="pd-amenity-item" key={idx}>
                <i className="ti ti-check"></i>
                <span>{item.trim()}</span>
              </div>
            )) || (
              <>
                <div className="pd-amenity-item"><i className="ti ti-pool"></i> Infinity Pool</div>
                <div className="pd-amenity-item"><i className="ti ti-shield"></i> 24/7 Security</div>
                <div className="pd-amenity-item"><i className="ti ti-dumbbell"></i> Fitness Center</div>
                <div className="pd-amenity-item"><i className="ti ti-car"></i> Private Parking</div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== FLOOR PLANS ===== */}
      <section className="pd-floorplans">
        <h3 className="pd-section-title">Architectural Floor Plans</h3>
        <div className="pd-plan-tabs">
          {configs.map((config, idx) => (
            <button
              key={idx}
              className={`pd-plan-tab ${activePlan === idx ? 'active' : ''}`}
              onClick={() => setActivePlan(idx)}
            >
              {config}
            </button>
          ))}
        </div>
        <div className="pd-plan-content">
          <div className="pd-plan-image">
            <img src={floorPlanImage} alt={`Floor plan ${configs[activePlan] || 'Residence'}`} loading="lazy" />
          </div>
          <div className="pd-plan-details">
            <h4>{configs[activePlan] || 'Residence'}</h4>
            <p>
              Experience the luxury of our {configs[activePlan] || 'signature'} floor plan.
              {project.fullDescription ? ' ' + project.fullDescription.substring(0, 120) + '...' : ''}
            </p>
            <div className="pd-plan-stats">
              <div>
                <span>Indoor Area</span>
                <strong>{project.psf?.replace('/sq ft', '') || '4,200'} Sq Ft</strong>
              </div>   
              <div>
                <span>Outdoor Area</span>
                <strong>{Math.round(parseInt(project.psf?.replace('/sq ft', '') || '4200') * 0.35)} Sq Ft</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP ===== */}
      <section className="pd-map">
        <h3 className="pd-section-title">Prime Location</h3>
        <div className="pd-map-container">
          <ProjectMap coordinates={project.coordinates} title={project.title} location={project.loc} />
          <div className="pd-map-address">
            <p className="pd-map-label">Address</p>
            <p className="pd-map-location">{project.loc}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.loc)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-map-directions"
            >
              Get Directions <i className="ti ti-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* ===== STICKY BOTTOM BAR – CALL BUTTON REMOVED ===== */}
      <div className="pd-sticky-bar">
        <div className="pd-sticky-inner">
          <button className="pd-enquire-btn" onClick={handleEnquire}>
            <i className="ti ti-mail"></i> Enquire Now
          </button>
          {/* Call Agent button removed as requested */}
        </div>
      </div>

      {/* Similar Projects */}
      <section className="pd-similar" style={{ padding: '2rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 className="pd-section-title" style={{ fontSize: '1.6rem' }}>Similar Projects</h3>
        <div className="pd-similar-grid">
          {projects
            .filter(p => p.id !== project.id && (p.type === project.type || p.loc.includes(project.loc.split(',')[0])))
            .slice(0, 4)
            .map(similar => (
              <Link key={similar.id} to={`/project/${similar.id}`} className="pd-similar-card">
                <div
                  className="pd-similar-image"
                  style={{
                    backgroundImage: `url(${isImagePath(similar.emoji) ? similar.emoji : ''})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!isImagePath(similar.emoji) && <span>{similar.emoji || '🏠'}</span>}
                </div>
                <p className="pd-similar-builder">{similar.builder}</p>
                <h4>{similar.title}</h4>
                <p className="pd-similar-loc">{similar.loc}</p>
                <p className="pd-similar-price">{similar.price}</p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;