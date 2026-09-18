// src/pages/ProjectDetail.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import Seo from '../components/Seo';
import { isImagePath, getShortDesc, normalizeText } from '../utils/helpers';
import {
  IconRoute, IconCar, IconTrain, IconPlane, IconMapPin,
  IconSwimming, IconBarbell, IconBuildingCommunity, IconBalloon,
  IconFlower, IconGolf, IconBuildingSkyscraper, IconShieldCheck,
  IconTree, IconShoppingBag, IconChefHat, IconBuildingStore, IconBolt,
  IconTheater, IconCoffee, IconBuilding, IconCode, IconArmchair,
} from '@tabler/icons-react';

// Maps emoji icons to Tabler vector icons (Connectivity)
const iconMap = {
  '🚗': IconCar,
  '🚇': IconTrain,
  '✈️': IconPlane,
  '📍': IconMapPin,
  default: IconRoute,
};

// Maps amenity keywords to specific Tabler icons
const amenityIconMap = {
  pool:         IconSwimming,
  gym:          IconBarbell,
  club:         IconBuildingCommunity,
  kids:         IconBalloon,
  spa:          IconFlower,
  golf:         IconGolf,
  sky:          IconBuildingSkyscraper,
  security:     IconShieldCheck,
  garden:       IconTree,
  landscape:    IconTree,
  greens:       IconTree,
  boulevard:    IconShoppingBag,
  retail:       IconBuildingStore,
  dining:       IconChefHat,
  cafe:         IconCoffee,
  café:         IconCoffee,
  ev:           IconBolt,
  charging:     IconBolt,
  amphitheater: IconTheater,
  management:   IconBuilding,
  it:           IconCode,
  hub:          IconCode,
  lounge:       IconArmchair,
};

// Find the right icon based on amenity text
const getAmenityIcon = (amenity) => {
  const lower = normalizeText(amenity);
  for (const [key, icon] of Object.entries(amenityIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return IconBuilding;
};

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(projectId));

  // Scroll-to-top is now handled globally by <ScrollToTop /> in main.jsx

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

  const statusColor = project.status?.toLowerCase().includes('ready') ? '#059669' : '#bb0014';
  const heroImage = isImagePath(project.emoji) ? project.emoji : '/assets/images/default-hero.jpg';

  const connectivityData = project.connectivity || [
    { icon: '🚗', label: 'Direct access to Noida Expressway', detail: '5 min drive' },
    { icon: '🚇', label: 'Metro station within 5 min', detail: '10 min walk' },
    { icon: '📍', label: '15 min to Delhi border', detail: '25 km · 30 min' },
    { icon: '✈️', label: '30 min to Jewar Airport', detail: '20 km · 25 min' },
  ];

  const amenitiesArray = project.amenities
    ? (Array.isArray(project.amenities) ? project.amenities : project.amenities.split('·').map(s => s.trim()))
    : ['Swimming Pool', 'Gymnasium', '24/7 Security', 'Clubhouse', 'Kids Play Area', 'Landscaped Gardens'];

  return (
    <div className="project-detail-page" style={{ background: 'var(--bg)', color: 'var(--txt)' }}>
      <Seo
        title={`${project.title} – ${project.builder}`}
        description={`${project.title} in ${project.loc}. ${project.beds}. RERA ID: ${project.reraId || 'Contact for details'}.`}
        image={isImagePath(project.emoji) ? project.emoji : undefined}
      />

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          background: 'var(--dark)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={heroImage}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }}
            onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.5rem 3rem',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'var(--red)',
              color: '#fff',
              padding: '0.2rem 1rem',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1rem',
            }}
          >
            {project.tag === 'popular' ? '⭐ Popular' : project.tag === 'new' ? 'New Launch' : 'Just Listed'}
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              color: '#fff',
              maxWidth: '800px',
              margin: '0 0 0.75rem',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
            {getShortDesc(project.fullDescription || project.description, 15)}
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section
        style={{
          padding: '3rem 1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
          className="pd-overview-grid"
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                marginBottom: '1rem',
              }}
            >
              {project.builder} – {project.title}
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--txt2)' }}>
              {project.fullDescription || project.description}
            </p>
          </div>
          <div
            style={{
              background: 'var(--bg1)',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              height: 'fit-content',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.75rem',
              }}
            >
              Property Details
            </h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--txt3)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Type</span>
                <span style={{ fontWeight: 500 }}>{project.type || 'Residential'}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--txt3)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>BHK</span>
                <span style={{ fontWeight: 500 }}>{project.beds || 'Contact'}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--txt3)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>RERA ID</span>
                <span style={{ fontWeight: 500, color: 'var(--red)' }}>{project.reraId || 'Applied'}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--txt3)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Status</span>
                <span style={{ fontWeight: 500, color: statusColor }}>{project.status}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONNECTED WITH THE WORLD */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            marginBottom: '1rem',
          }}
        >
          Connected With the World
        </h2>
        <p style={{ color: 'var(--txt2)', marginBottom: '2rem', lineHeight: 1.7 }}>
          Strategically located in {project.loc}, enjoying excellent connectivity to key business hubs.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1rem' 
        }}>
          {connectivityData.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || iconMap['default'];
            return (
              <div
                key={idx}
                className="connectivity-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  background: 'var(--bg1)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--red)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--txt)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--txt3)' }}>
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AMENITIES */}
      <section style={{ background: 'var(--bg1)', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              marginBottom: '0.5rem',
            }}
          >
            Here, Profit And Planet Work As One.
          </h2>
          <p style={{ color: 'var(--txt2)', marginBottom: '2rem' }}>Every modern comfort, just 1 minute away.</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            {amenitiesArray.slice(0, 8).map((amenity, idx) => {
              const AmenityIcon = getAmenityIcon(amenity);
              return (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg)',
                    padding: '1.5rem 1rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'border-color 0.2s',
                  }}
                  className="amenity-card"
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--bg1)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}>
                    <AmenityIcon size={24} color="var(--red)" />
                  </div>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SIMILAR PROJECTS */}
      <section style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            marginBottom: '1.5rem',
          }}
        >
          Similar Projects
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects
            .filter(p => p.id !== project.id && (p.type === project.type || p.loc.includes(project.loc.split(',')[0])))
            .slice(0, 4)
            .map(similar => (
              <Link
                key={similar.id}
                to={`/project/${similar.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                className="similar-card"
              >
                <div
                  style={{
                    height: '160px',
                    background: `url(${isImagePath(similar.emoji) ? similar.emoji : '/assets/images/placeholder.jpg'}) center/cover`,
                  }}
                />
                <div style={{ padding: '1rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {similar.builder}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 600, margin: '0.2rem 0' }}>
                    {similar.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--txt3)' }}>{similar.loc}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;