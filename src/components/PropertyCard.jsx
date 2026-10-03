// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMapPin } from '@tabler/icons-react';
import { isImagePath } from '../utils/helpers';

const PRICE_MAP = {
  1: '₹1.85 Cr',
  2: '₹5.80 Cr',
  3: '₹2.40 Cr',
  4: '₹1.45 Cr',
  5: '₹1.20 Cr',
  6: '₹1.10 Cr',
  7: '₹5.20 Cr',
  8: '₹2.80 Cr',
  9: '₹4.25 Cr',
  10: 'On Request',
  11: '₹1.10 Cr',
};

const PropertyCard = ({ project }) => {
  const amenities = Array.isArray(project.amenities)
    ? project.amenities.slice(0, 3)
    : String(project.amenities || '')
        .split('·')
        .map((a) => a.trim())
        .filter(Boolean)
        .slice(0, 3);

  const isNew     = project.tag === 'new';
  const isPopular = project.tag === 'popular';
  const isLuxury  = project.type === 'luxury';

  const handleSchedule = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('openVisit', { detail: { projectId: project.id } })
    );
  };

  return (
    <article className="pc-card">
      <Link
        to={`/project/${project.id}`}
        className="pc-media"
        aria-label={`View ${project.title}`}
      >
        {isImagePath(project.emoji) ? (
          <img
            src={project.emoji}
            alt={project.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = '/assets/images/placeholder.webp';
            }}
          />
        ) : (
          <span className="pc-emoji">{project.emoji || '🏠'}</span>
        )}

        <div className="pc-badges">
          {isNew     && <span className="pc-badge pc-badge--red">NEW LAUNCH</span>}
          {isPopular && <span className="pc-badge pc-badge--dark">POPULAR</span>}
          {isLuxury  && <span className="pc-badge pc-badge--terra">LUXURY</span>}
        </div>
      </Link>

      <div className="pc-body">
        <div className="pc-meta">
          <span className="pc-dev">{project.builder?.toUpperCase() || 'BUILDER'}</span>
          <span className="pc-rera">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.2"
                 strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            RERA ✓
          </span>
        </div>

        <h3 className="pc-title">{project.title}</h3>

        <p className="pc-loc">
          <IconMapPin size={13} aria-hidden="true" />
          {project.loc}
        </p>

        <div className="pc-config">
          <span>{project.beds}</span>
          <span className="pc-status">{project.status}</span>
        </div>

        {amenities.length > 0 && (
          <div className="pc-tags">
            {amenities.map((a) => (
              <span className="pc-tag" key={a}>{a}</span>
            ))}
          </div>
        )}
      </div>

      <div className="pc-footer">
        <div className="pc-price">
          <span className="pc-price-label">Starting from</span>
          <span className="pc-price-value">
            {PRICE_MAP[project.id] || 'On Request'}
          </span>
        </div>

        <div className="pc-actions">
          <Link
            to={`/project/${project.id}`}
            className="pc-btn pc-btn--ghost"
          >
            Know more
          </Link>
          <button
            type="button"
            className="pc-btn pc-btn--red"
            onClick={handleSchedule}
          >
            Schedule visit
          </button>
        </div>
      </div>
    </article>
  );
};

export default React.memo(PropertyCard);
