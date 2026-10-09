// src/pages/BlogList.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { news } from '../data/news';
import Seo from '../components/Seo';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const BlogList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build unique categories from data
  const categories = useMemo(() => {
    const set = new Set();
    news.forEach((item) => {
      if (item.tag) set.add(item.tag);
    });
    return ['ALL', ...Array.from(set)];
  }, []);

  const [activeCat, setActiveCat] = useState('ALL');

  const filtered = useMemo(() => {
    if (activeCat === 'ALL') return news;
    return news.filter((item) => item.tag === activeCat);
  }, [activeCat]);

  return (
    <>
      <Seo
        title="Noida Real Estate Blog"
        description="Stay updated with the latest news, trends, and launches in Noida and Greater Noida real estate. Expert insights and policy updates."
      />

      {/* ================================================== */}
      {/* HERO — banner-enter + Ken Burns + light sweep      */}
      {/* ================================================== */}
      <section className="bp-hero banner-enter">
        <div className="bp-hero-bg banner-bg" aria-hidden="true" />
        <div className="bp-hero-scrim" aria-hidden="true" />
        <span className="banner-sweep" aria-hidden="true" />

        <div className="bp-hero-inner">
          <nav className="bp-crumb d1" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="bp-crumb-current">Blog</span>
          </nav>

          <h1 className="bp-hero-title d2">
            Market<br />
            <em>intelligence.</em>
          </h1>

          <p className="bp-hero-sub d3">
            Launches, infrastructure and policy updates that move Noida
            property values — curated for the discerning investor.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* FILTER CHIPS                                        */}
      {/* ================================================== */}
      <section className="bp-filters">
        <div className="bp-filters-inner">
          <div className="bp-chips" role="group" aria-label="Filter by topic">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                type="button"
                className={`bp-chip ${activeCat === cat ? 'is-active' : ''}`}
                aria-pressed={activeCat === cat}
                onClick={() => setActiveCat(cat)}
                data-reveal
                data-reveal-delay={String((idx % 6) + 1)}
              >
                {cat === 'ALL' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* POSTS GRID                                          */}
      {/* ================================================== */}
      <section className="bp-posts">
        <div className="bp-posts-inner">
          {filtered.length === 0 ? (
            <p className="bp-empty">No articles in this category yet.</p>
          ) : (
            <div className="bp-grid">
              {filtered.map((item, idx) => (
                <article
                  className="bp-card"
                  key={item.id || item.slug}
                  data-reveal
                  data-reveal-delay={String((idx % 6) + 1)}
                >
                  <Link
                    to={`/blog/${item.slug}`}
                    className="bp-card-media"
                    aria-label={`Read ${item.title}`}
                  >
                    {isImagePath(item.emoji) ? (
                      <img
                        src={item.emoji}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = '/assets/images/placeholder.webp';
                        }}
                      />
                    ) : (
                      <span className="bp-card-emoji" aria-hidden="true">
                        {item.emoji || '📰'}
                      </span>
                    )}

                    {item.tag && (
                      <span className="bp-card-tag">
                        {item.tag.toUpperCase()}
                      </span>
                    )}
                  </Link>

                  <div className="bp-card-body">
                    {item.date && (
                      <span className="bp-card-date">
                        {item.date.toUpperCase()}
                      </span>
                    )}

                    <h3 className="bp-card-title">{item.title}</h3>

                    <p className="bp-card-excerpt">{item.excerpt}</p>

                    <Link
                      to={`/blog/${item.slug}`}
                      className="bp-card-link"
                      aria-label={`Read ${item.title}`}
                    >
                      Read more
                      <svg width="14" height="14" viewBox="0 0 24 24"
                           fill="none" stroke="currentColor" strokeWidth="2.2"
                           strokeLinecap="round" strokeLinejoin="round"
                           aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogList;