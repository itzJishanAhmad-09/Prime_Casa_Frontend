// src/pages/BlogDetail.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { news } from '../data/news';
import Seo from '../components/Seo';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const WA_SHARE = 'https://wa.me/?text=';

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = news.find((item) => item.slug === slug);

  const relatedPosts = news
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Subtle parallax on hero image
  const heroImageRef = useRef(null);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        if (heroImageRef.current) {
          const scrollPos = window.pageYOffset;
          if (Math.abs(scrollPos - lastScrollY.current) > 1) {
            heroImageRef.current.style.transform = `translateY(${scrollPos * 0.15}px)`;
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
      <>
        <Seo
          title="Article not found"
          description="The article you're looking for doesn't exist."
        />
        <div className="bpd-notfound">
          <h2>Article not found</h2>
          <Link to="/blog">← Back to blog</Link>
        </div>
      </>
    );
  }

  const fullContent = blog.fullContent || blog.excerpt || '';
  const contentParagraphs = fullContent.split('\n\n').filter(Boolean);
  const heroImage = isImagePath(blog.emoji)
    ? blog.emoji
    : '/assets/images/placeholder.webp';

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bpd-page">
      <Seo
        title={blog.title}
        description={blog.excerpt}
        image={isImagePath(blog.emoji) ? blog.emoji : undefined}
      />

      {/* ================================================== */}
      {/* HEADER                                              */}
      {/* ================================================== */}
      <header className="bpd-header">
        <div className="bpd-header-inner" data-reveal>

          <nav className="bpd-crumb" aria-label="Breadcrumb" data-reveal data-reveal-delay="1">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/blog">Blog</Link>
          </nav>

          <div className="bpd-meta" data-reveal data-reveal-delay="2">
            {blog.tag && <span className="bpd-meta-tag">{blog.tag}</span>}
            {blog.date && (
              <>
                <span className="bpd-meta-dot" aria-hidden="true">·</span>
                <span>{blog.date}</span>
              </>
            )}
            <span className="bpd-meta-dot" aria-hidden="true">·</span>
            <span>{blog.author || 'Prime Casa Team'}</span>
          </div>

          <h1 className="bpd-title" data-reveal data-reveal-delay="3">{blog.title}</h1>

          {blog.excerpt && (
            <p className="bpd-lead" data-reveal data-reveal-delay="4">{blog.excerpt}</p>
          )}

        </div>
      </header>

      {/* ================================================== */}
      {/* HERO IMAGE                                          */}
      {/* ================================================== */}
      <div className="bpd-hero-image-wrap" data-reveal>
        <div className="bpd-hero-image">
          <img
            ref={heroImageRef}
            src={heroImage}
            alt={blog.title}
            loading="eager"
            decoding="async"
            onError={(e) => {
              e.target.src = '/assets/images/placeholder.webp';
            }}
          />
        </div>
      </div>

      {/* ================================================== */}
      {/* ARTICLE BODY                                        */}
      {/* ================================================== */}
      <article className="bpd-article">
        <div className="bpd-article-inner">
          {contentParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="bpd-paragraph"
              data-reveal
              data-reveal-delay={String((idx % 6) + 1)}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Share bar */}
        <div className="bpd-actions" data-reveal>
          <Link to="/contact" className="bpd-btn bpd-btn--red" data-reveal data-reveal-delay="1">
            Contact an advisor
          </Link>

          <a
            href={`${WA_SHARE}${encodeURIComponent(blog.title + ' — ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bpd-btn bpd-btn--outline"
            data-reveal
            data-reveal-delay="2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.8"
                 strokeLinecap="round" strokeLinejoin="round"
                 aria-hidden="true">
              <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" />
            </svg>
            Share on WhatsApp
          </a>
        </div>
      </article>

      {/* ================================================== */}
      {/* RELATED POSTS                                       */}
      {/* ================================================== */}
      {relatedPosts.length > 0 && (
        <section className="bpd-related">
          <div className="bpd-related-inner" data-reveal>
            <h2 className="bpd-related-title" data-reveal data-reveal-delay="1">
              Keep <em>reading.</em>
            </h2>

            <div className="bpd-related-grid">
              {relatedPosts.map((item, idx) => (
                <Link
                  key={item.id || item.slug}
                  to={`/blog/${item.slug}`}
                  className="bpd-related-card"
                  data-reveal
                  data-reveal-delay={String((idx % 6) + 1)}
                >
                  <div className="bpd-related-media">
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
                      <span className="bpd-related-emoji" aria-hidden="true">
                        {item.emoji || '📰'}
                      </span>
                    )}
                  </div>

                  <div className="bpd-related-body">
                    <div className="bpd-related-meta">
                      {item.tag && (
                        <span className="bpd-related-tag">
                          {item.tag}
                        </span>
                      )}
                      {item.date && (
                        <>
                          <span className="bpd-related-dot" aria-hidden="true">·</span>
                          <span>{item.date}</span>
                        </>
                      )}
                    </div>

                    <h3 className="bpd-related-card-title">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;