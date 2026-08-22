// src/pages/BlogList.jsx
import React, { useEffect } from 'react';
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

  return (
    <>
      <Seo
        title="Real Estate Blog"
        description="Stay updated with the latest news, trends, and launches in Noida and Greater Noida real estate. Expert insights and policy updates."
      />

      {/* ===== HERO BANNER ===== */}
      <section className="blog-hero-banner">
        <div className="blog-hero-bg"></div>
        <div className="blog-hero-overlay"></div>
        <div className="blog-hero-container">
          <div className="blog-hero-content">
            <ul className="blog-breadcrumb">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Blog</li>
            </ul>
            <h1 className="blog-hero-title">Noida Real Estate Blog</h1>
            <p className="blog-hero-sub">
              Stay ahead with the latest market developments, launches, and policy updates
            </p>
          </div>
        </div>
      </section>

      {/* ===== BLOG CARDS ===== */}
      <section className="blog-preview-section">
        <div className="blog-preview-header">
          <span className="blog-preview-label">Latest Blog Posts</span>
          <h2>Noida Real Estate Blog</h2>
          <p>Stay ahead with the latest market developments, launches, and policy updates</p>
        </div>

        {news.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--txt3)' }}>No blog posts available.</p>
        ) : (
          <div className="blog-card-grid">
            {news.map((item) => (
              <div className="blog-card" key={item.id}>
                <div className="blog-card-img">
                  {isImagePath(item.emoji) ? (
                    <img
                      src={item.emoji}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                    />
                  ) : (
                    <span className="blog-card-emoji">{item.emoji || '📰'}</span>
                  )}
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-tag">{item.tag} · {item.date}</div>
                  <div className="blog-card-title">{item.title}</div>
                  <div className="blog-card-excerpt">{item.excerpt}</div>
                  <Link to={`/blog/${item.slug}`} className="blog-card-link">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BlogList;