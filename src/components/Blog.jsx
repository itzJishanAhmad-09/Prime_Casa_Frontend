// src/components/Blog.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const isImagePath = (str) => {
  if (!str) return false;
  return str.startsWith('/') || str.startsWith('./') || str.startsWith('http');
};

const Blog = ({ news }) => {
  const hasNews = useMemo(() => news && news.length > 0, [news]);

  if (!hasNews) {
    return null;
  }

  return (
    <section className="blog-section" id="blog">
      <div className="blog-inner">

        {/* ---------- Header ---------- */}
        <header className="blog-header">
          <div className="blog-header-left">
            <div className="blog-eyebrow">
              <span className="blog-eyebrow-dot" aria-hidden="true" />
              Noida Real Estate Blog
            </div>
            <h2 className="blog-title">
              Market <em>intelligence.</em>
            </h2>
          </div>

          <Link to="/blog" className="blog-viewall">
            <span>All insights</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </header>

        {/* ---------- Slider ---------- */}
        <div className="blog-slider-wrap">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop
            speed={600}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="blog-swiper"
            aria-label="Real estate insights"
          >
            {news.map((item) => (
              <SwiperSlide key={item.id || item.slug}>
                <article className="blog-card">
                  <Link
                    to={`/blog/${item.slug}`}
                    className="blog-card-media"
                    aria-label={`Read ${item.title}`}
                  >
                    {isImagePath(item.image || item.emoji) ? (
                      <img
                        src={item.image || item.emoji}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = '/assets/images/placeholder.webp';
                        }}
                      />
                    ) : (
                      <span className="blog-card-emoji" aria-hidden="true">
                        {item.emoji || '📰'}
                      </span>
                    )}

                    {item.tag && (
                      <span className="blog-card-tag">{item.tag.toUpperCase()}</span>
                    )}
                  </Link>

                  <div className="blog-card-body">
                    {item.date && (
                      <span className="blog-card-date">{item.date.toUpperCase()}</span>
                    )}

                    <h3 className="blog-card-title">{item.title}</h3>

                    <p className="blog-card-excerpt">{item.excerpt}</p>

                    <Link
                      to={`/blog/${item.slug}`}
                      className="blog-card-link"
                      aria-label={`Read ${item.title}`}
                    >
                      Read more
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                           strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default React.memo(Blog);