// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const PropertyCard = ({ project, index, variant = 'grid' }) => {
  const isSlider = variant === 'slider';

  const cardClass = isSlider ? 'property-slide-card' : 'proj-card';
  const imgClass = isSlider ? 'property-slide-img' : 'proj-img';
  const badgeClass = isSlider ? 'property-slide-badges' : 'proj-badges';
  const bodyClass = isSlider ? 'property-slide-body' : 'proj-body';
  const builderClass = isSlider ? 'property-slide-builder' : 'proj-builder';
  const titleClass = isSlider ? 'property-slide-title' : 'proj-title';
  const locClass = isSlider ? 'property-slide-loc' : 'proj-loc';
  const metaClass = isSlider ? 'property-slide-meta' : 'proj-meta';
  const actionsClass = isSlider ? 'property-slide-actions' : 'proj-actions';

  return (
    <div className={cardClass}>
      <div className={imgClass}>
        {isImagePath(project.emoji) ? (
          <img
            src={project.emoji}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
          />
        ) : isSlider ? (
          <span className="property-slide-emoji">{project.emoji || '🏠'}</span>
        ) : (
          <div className="proj-img-bg">{project.emoji || '🏠'}</div>
        )}

        <div className={badgeClass}>
          {project.tag === 'popular' && (
            <span className="proj-badge badge-popular">POPULAR</span>
          )}
          {project.tag === 'new' && (
            <span className="proj-badge badge-new">NEW LAUNCH</span>
          )}
          {project.type === 'luxury' && (
            <span className="proj-badge badge-luxury">LUXURY</span>
          )}
          <span className="proj-badge badge-rera">RERA ✓</span>
        </div>
      </div>

      <div className={bodyClass}>
        <div className={builderClass}>{project.builder}</div>
        <div className={titleClass}>{project.title}</div>
        <div className={locClass}>
          <i className="ti ti-map-pin" style={{ fontSize: '12px' }}></i> {project.loc}
        </div>
        <div className={metaClass}>
          <span>
            <i className="ti ti-home"></i> {project.beds}
          </span>
          <span>
            <i className="ti ti-clock"></i> {project.status}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '8px' }}>
          {project.amenities}
        </div>
        <div className={actionsClass}>
          <Link
            to={`/project/${project.id}`}
            className="btn-sm btn-sm-red"
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            Know More
          </Link>
          <Link
            to={`/schedule/${project.id}`}
            className="btn-sm btn-sm-out"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              border: '1px solid var(--border-s)',
            }}
          >
            Schedule Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;