// src/pages/ProjectDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Seo from '../components/Seo';
import { isImagePath, formatPrice } from '../utils/helpers';
import { IconPhone, IconBrandWhatsapp } from '@tabler/icons-react';

const SIMILAR_COUNT = 3;

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === parseInt(projectId, 10));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <>
        <Seo title="Project not found" />
        <div className="pd-notfound">
          <h2>Project not found</h2>
          <Link to="/properties">← Back to properties</Link>
        </div>
      </>
    );
  }

  const heroImage = isImagePath(project.emoji)
    ? project.emoji
    : '/assets/images/placeholder.webp';

  const isNew = project.tag === 'new';
  const isPopular = project.tag === 'popular';
  const isLuxury = project.type === 'luxury';

  const typeLabel =
    project.type === 'plots'
      ? 'Plots & land'
      : project.type
      ? project.type.charAt(0).toUpperCase() + project.type.slice(1)
      : 'Residential';

  const connectivity = project.connectivity || [
    { icon: '🚗', label: 'Direct access to Noida Expressway', detail: '5 min drive' },
    { icon: '🚇', label: 'Metro station within 5 min', detail: '10 min walk' },
    { icon: '📍', label: 'Delhi border', detail: '25 km · 30 min' },
    { icon: '✈️', label: 'Jewar Airport', detail: '20 km · 25 min' },
  ];

  const amenities = project.amenities
    ? Array.isArray(project.amenities)
      ? project.amenities
      : project.amenities.split('·').map((s) => s.trim()).filter(Boolean)
    : ['Swimming Pool', 'Gymnasium', '24/7 Security', 'Clubhouse'];

  const waMessage = encodeURIComponent(
    `Hi Prime Casa, I'm interested in ${project.title} (${project.loc}). Please share details.`
  );
  const waLink = `https://wa.me/918130504183?text=${waMessage}`;

  const similar = projects
    .filter((p) => p.id !== project.id && p.type === project.type)
    .concat(projects.filter((p) => p.id !== project.id && p.type !== project.type))
    .slice(0, SIMILAR_COUNT);

  const handleSchedule = () => {
    window.dispatchEvent(
      new CustomEvent('openVisit', { detail: { projectId: project.id } })
    );
  };

  return (
    <div className="pd-page">
      <Seo
        title={`${project.title} – ${project.builder}`}
        description={`${project.title} in ${project.loc}. ${project.beds}. RERA ID: ${project.reraId || 'Contact for details'}.`}
        image={isImagePath(project.emoji) ? project.emoji : undefined}
      />

      {/* HEADER */}
      <section className="pd-header">
        <div className="pd-header-inner" data-reveal>
          <nav className="pd-crumb" aria-label="Breadcrumb" data-reveal data-reveal-delay="1">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/properties">Properties</Link>
            <span>/</span>
            <span className="pd-crumb-current">{project.title}</span>
          </nav>

          <div className="pd-badges" data-reveal data-reveal-delay="2">
            {isNew && <span className="pd-badge pd-badge--red">NEW LAUNCH</span>}
            {isPopular && <span className="pd-badge pd-badge--dark">POPULAR</span>}
            {isLuxury && <span className="pd-badge pd-badge--dark">LUXURY</span>}
          </div>

          <h1 className="pd-title" data-reveal data-reveal-delay="3">{project.title}</h1>

          <div className="pd-title-meta" data-reveal data-reveal-delay="4">
            <span className="pd-loc">◎ {project.loc}</span>
            <span className="pd-dev">BY {project.builder.toUpperCase()}</span>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="pd-hero-section">
        <div className="pd-hero-wrap" data-reveal>
          <img
            src={heroImage}
            alt={project.title}
            loading="eager"
            decoding="async"
            onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
          />
        </div>
      </section>

      {/* BODY */}
      <section className="pd-body">
        <div className="pd-body-inner">
          <div className="pd-main">
            <div className="pd-block" data-reveal>
              <div className="pd-eyebrow">
                <span className="pd-eyebrow-line" aria-hidden="true" />
                <span>Overview</span>
              </div>
              <p className="pd-overview">
                {project.fullDescription || project.description}
              </p>
            </div>

            <div className="pd-block" data-reveal data-reveal-delay="1">
              <div className="pd-eyebrow">
                <span className="pd-eyebrow-line" aria-hidden="true" />
                <span>Property details</span>
              </div>

              <dl className="pd-details">
                <div className="pd-detail">
                  <dt>Type</dt>
                  <dd>{typeLabel}</dd>
                </div>
                <div className="pd-detail">
                  <dt>Configuration</dt>
                  <dd>{project.beds || 'Contact'}</dd>
                </div>
                <div className="pd-detail">
                  <dt>Starting price</dt>
                  <dd>{formatPrice(project.price)}</dd>
                </div>
                <div className="pd-detail">
                  <dt>Sector</dt>
                  <dd>{project.loc.split(',')[0]}</dd>
                </div>
                <div className="pd-detail">
                  <dt>RERA ID</dt>
                  <dd>{project.reraId || 'Applied'}</dd>
                </div>
                <div className="pd-detail">
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
              </dl>
            </div>

            <div className="pd-block" data-reveal data-reveal-delay="2">
              <div className="pd-eyebrow">
                <span className="pd-eyebrow-line" aria-hidden="true" />
                <span>Connected with the world</span>
              </div>

              <h2 className="pd-connect-title">
                Minutes from the expressway,<br />
                <em>metro and airport.</em>
              </h2>

              <div className="pd-conn-list">
                {connectivity.map((c, i) => (
                  <div className="pd-conn-row" key={i}>
                    <span className="pd-conn-label">{c.label}</span>
                    <span className="pd-conn-value">{c.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-block" data-reveal data-reveal-delay="3">
              <div className="pd-eyebrow">
                <span className="pd-eyebrow-line" aria-hidden="true" />
                <span>Amenities</span>
              </div>

              <h2 className="pd-amen-title">
                Every comfort, <em>a minute away.</em>
              </h2>

              <div className="pd-amen-list">
                {amenities.map((a) => (
                  <span className="pd-amen-chip" key={a}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.4"
                         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="pd-sidebar" data-reveal data-reveal-delay="1">
            <div className="pd-enquiry-card">
              <span className="pd-enquiry-label">Interested?</span>
              <h2 className="pd-enquiry-title">
                Walk through {project.title} with an advisor.
              </h2>
              <p className="pd-enquiry-desc">
                Pricing, floor plans and current offers are shared on the
                visit. Zero brokerage, always.
              </p>

              <button
                type="button"
                className="pd-enquiry-btn pd-enquiry-btn--red"
                onClick={handleSchedule}
              >
                Schedule site visit
              </button>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-enquiry-btn pd-enquiry-btn--ivory"
              >
                <IconBrandWhatsapp size={18} />
                Enquire on WhatsApp
              </a>

              <a
                href="tel:+918130504183"
                className="pd-enquiry-btn pd-enquiry-btn--ghost"
              >
                <IconPhone size={18} />
                +91 81305 04183
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* SIMILAR PROJECTS */}
      {similar.length > 0 && (
        <section className="pd-similar">
          <div className="pd-similar-inner">
            <div className="pd-similar-head">
              <h2 className="pd-similar-title">
                Similar <em>projects.</em>
              </h2>
              <Link to="/properties" className="pd-similar-link">
                All properties →
              </Link>
            </div>

            <div className="pd-similar-grid">
              {similar.map((p) => {
                const img = isImagePath(p.emoji) ? p.emoji : '/assets/images/placeholder.webp';
                const pIsNew = p.tag === 'new';
                return (
                  <Link key={p.id} to={`/project/${p.id}`} className="pd-sim-card">
                    <div className="pd-sim-media">
                      <img
                        src={img}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.target.src = '/assets/images/placeholder.webp'; }}
                      />
                      {pIsNew && <span className="pd-sim-badge">NEW LAUNCH</span>}
                    </div>
                    <div className="pd-sim-body">
                      <span className="pd-sim-dev">{p.builder.toUpperCase()}</span>
                      <h3 className="pd-sim-title">{p.title}</h3>
                      <p className="pd-sim-loc">
                        {p.loc} · {p.beds}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetail;