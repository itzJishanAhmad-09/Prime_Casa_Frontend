// src/pages/BlogDetail.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { news } from '../data/news';
import Seo from '../components/Seo';
import {
  IconUser,
  IconCalendar,
  IconClock,
  IconShare,
  IconLink,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconArrowRight,
} from '@tabler/icons-react';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = news.find(item => item.slug === slug);

  const relatedPosts = news.filter(item => item.slug !== slug).slice(0, 2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroImageRef = useRef(null);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (heroImageRef.current) {
          const scrollPos = window.pageYOffset;
          if (Math.abs(scrollPos - lastScrollY.current) > 1) {
            heroImageRef.current.style.transform = `translateY(${scrollPos * 0.4}px)`;
            lastScrollY.current = scrollPos;
          }
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!blog) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const fullContent = blog.fullContent || blog.excerpt;
  const contentParagraphs = fullContent.split('\n\n');

  const renderContent = () => {
    return contentParagraphs.map((para, idx) => {
      const headingMatch = para.match(/^(\d+)\.\s+(.+)/);
      if (headingMatch) {
        return (
          <h2 key={idx} className="blog-article-heading">
            {headingMatch[1]}. {headingMatch[2]}
          </h2>
        );
      }
      if (para.startsWith('"') && para.endsWith('"')) {
        return (
          <blockquote key={idx} className="blog-pull-quote">
            <p>{para}</p>
            <cite>— Jitendra Kumar, Senior Advisor at Prime Casa</cite>
          </blockquote>
        );
      }
      return <p key={idx} className="blog-article-paragraph">{para}</p>;
    });
  };

  const heroImage = isImagePath(blog.emoji) ? blog.emoji : '/assets/images/default-blog.jpg';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="blog-detail-page">
      <Seo
        title={blog.title}
        description={blog.excerpt}
        image={isImagePath(blog.emoji) ? blog.emoji : undefined}
      />

      <section className="blog-detail-hero">
        <div className="blog-detail-hero-bg">
          <img
            ref={heroImageRef}
            src={heroImage}
            alt={blog.title}
            className="blog-detail-hero-img"
            width="1200"
            height="600"
            style={{ willChange: 'transform', width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
          />
          <div className="blog-detail-hero-overlay"></div>
        </div>
        <div className="blog-detail-hero-content">
          <div className="blog-detail-hero-tag">{blog.tag || 'Insight'}</div>
          <h1 className="blog-detail-hero-title">{blog.title}</h1>
          <p className="blog-detail-hero-sub">{blog.excerpt}</p>
          <div className="blog-detail-hero-meta">
            <div className="blog-detail-hero-author">
              <span className="blog-detail-hero-avatar">
                <IconUser size={16} />
              </span>
              <span>{blog.author || 'Prime Casa Team'}</span>
            </div>
            <div className="blog-detail-hero-date">
              <IconCalendar size={16} />
              <span>{blog.date}</span>
            </div>
            <div className="blog-detail-hero-readtime">
              <IconClock size={16} />
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      <article className="blog-article">
        <div className="blog-article-inner">
          {renderContent()}
        </div>

        <div className="blog-article-share">
          <div className="blog-article-share-left">
            <span className="blog-article-share-label">Share Insight</span>
            <div className="blog-article-share-buttons">
              <button onClick={handleShare} aria-label="Share">
                <IconShare size={18} />
              </button>
              <button onClick={handleCopyLink} aria-label="Copy link">
                <IconLink size={18} />
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                aria-label="Tweet"
              >
                <IconBrandTwitter size={18} />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={18} />
              </button>
            </div>
          </div>
          <Link to="/contact" className="blog-article-share-cta">
            Contact an Advisor
          </Link>
        </div>
      </article>

      <section className="blog-related">
        <div className="blog-related-header">
          <div>
            <h2>Market Intelligence</h2>
            <p>Explore more curated insights for the discerning investor.</p>
          </div>
          <Link to="/blog" className="blog-related-viewall">
            View All Reports <IconArrowRight size={18} />
          </Link>
        </div>
        <div className="blog-related-grid">
          {relatedPosts.map((item) => (
            <Link key={item.id} to={`/blog/${item.slug}`} className="blog-related-card">
              <div className="blog-related-card-image">
                <img
                  src={isImagePath(item.emoji) ? item.emoji : '/assets/images/default-blog.jpg'}
                  alt={item.title}
                  width="400"
                  height="200"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                />
                <span className="blog-related-card-badge">{item.tag || 'Insight'}</span>
              </div>
              <div className="blog-related-card-body">
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div className="blog-related-card-footer">
                  <span className="blog-related-card-date">{item.date}</span>
                  <IconArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="blog-newsletter">
        <div className="blog-newsletter-bg"></div>
        <div className="blog-newsletter-content">
          <h2>Market Trends, Delivered.</h2>
          <p>Join our exclusive mailing list to receive bi-weekly intelligence reports on luxury real estate movements and off-market opportunities.</p>
          <form
            className="blog-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed to Prime Casa Insights');
            }}
            data-wmcp='{"name":"newsletter","description":"Subscribe to the Prime Casa newsletter for market intelligence","endpoint":"(client-side)","type":"newsletter"}'
          >
            <input
              type="email"
              placeholder="Your professional email"
              required
              data-wmcp='{"label":"Email Address","type":"email","required":true,"description":"Your professional email for real estate intelligence reports"}'
            />
            <button type="submit">Subscribe</button>
          </form>
          <p className="blog-newsletter-note">Strictly confidential. No spam, ever.</p>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;