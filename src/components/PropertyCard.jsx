// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMapPin, IconHome, IconClock } from '@tabler/icons-react';
import { isImagePath } from '../utils/helpers';

const PropertyCard = ({ project, variant = 'grid' }) => {
  const isSlider = variant === 'slider';
  const p        = isSlider ? 'property-slide' : 'proj'; // CSS class prefix

  return (
    <div className={`${p}-card`}>
      <div className={`${p}-img`}>
        {isImagePath(project.emoji) ? (
          <img
            src={project.emoji}
            alt={project.title}
            loading="lazy"
            decoding="async"
            height={isSlider ? 180 : 160}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
          />
        ) : isSlider ? (
          <span className="property-slide-emoji">{project.emoji || '🏠'}</span>
        ) : (
          <div className="proj-img-bg">{project.emoji || '🏠'}</div>
        )}

        <div className={`${p}-badges`}>
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

      <div className={`${p}-body`}>
        <div className={`${p}-builder`}>{project.builder}</div>
        <div className={`${p}-title`}>{project.title}</div>
        <div className={`${p}-loc`}>
          <IconMapPin size={12} /> {project.loc}
        </div>
        <div className={`${p}-meta`}>
          <span>
            <IconHome size={14} style={{ marginRight: '4px' }} /> {project.beds}
          </span>
          <span>
            <IconClock size={14} style={{ marginRight: '4px' }} /> {project.status}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--txt3)', marginTop: '8px' }}>
          {project.amenities}
        </div>
        <div className={`${p}-actions`}>
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
            style={{ textDecoration: 'none', textAlign: 'center', border: '1px solid var(--border-s)' }}
          >
            Schedule Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PropertyCard);