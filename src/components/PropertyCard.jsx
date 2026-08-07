// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const PropertyCard = ({ project, index, variant = 'grid' }) => {
  const isSlider = variant === 'slider';

  // CSS class names based on variant
  const cardClass = isSlider ? 'property-slide-card' : 'proj-card';
  const imgClass = isSlider ? 'property-slide-img' : 'proj-img';
  const badgeClass = isSlider ? 'property-slide-badges' : 'proj-badges';
  const bodyClass = isSlider ? 'property-slide-body' : 'proj-body';
  const builderClass = isSlider ? 'property-slide-builder' : 'proj-builder';
  const titleClass = isSlider ? 'property-slide-title' : 'proj-title';
  const locClass = isSlider ? 'property-slide-loc' : 'proj-loc';
  const priceClass = isSlider ? 'property-slide-price' : 'proj-price';
  const metaClass = isSlider ? 'property-slide-meta' : 'proj-meta';
  const actionsClass = isSlider ? 'property-slide-actions' : 'proj-actions';

  return (
    <div className={cardClass}>
      {/* Image / Emoji */}
      <div className={imgClass}>
        {isImagePath(project.emoji) ? (
          <img
            src={project.emoji}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : isSlider ? (
          <span className="property-slide-emoji">{project.emoji || '🏠'}</span>
        ) : (
          <div className="proj-img-bg">{project.emoji || '🏠'}</div>
        )}

        {/* Badges */}
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

      {/* Body */}
      <div className={bodyClass}>
        <div className={builderClass}>{project.builder}</div>
        <div className={titleClass}>{project.title}</div>
        <div className={locClass}>
          <i className="ti ti-map-pin" style={{ fontSize: '12px' }}></i> {project.loc}
        </div>
        <div className={priceClass}>
          {project.price} <span>· {project.psf}</span>
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
          {/* ✅ FIXED: use project.id instead of index */}
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