// src/components/Blog.jsx
import React from 'react';
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
  if (!news || news.length === 0) {
    return (
      <section className="section" id="blog">
        <div className="section-header">
          <div className="section-label">Latest Blog Posts</div>
          <div className="section-title">Noida Real Estate Blog</div>
          <div className="section-sub">Stay updated with the latest market trends and insights</div>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--txt3)' }}>No blog posts available.</p>
      </section>
    );
  }

  return (
    <section className="section" id="blog">
      <div className="section-header">
        <div className="section-label">Latest Blog Posts</div>
        <div className="section-title">Noida Real Estate Blog</div>
        <div className="section-sub">
          Stay ahead with the latest market developments, launches, and policy updates
        </div>
      </div>

      <div className="blog-slider-wrapper">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          speed={600}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="blog-swiper"
        >
          {news.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="blog-slide-card">
                <div className="blog-slide-img">
                  {isImagePath(item.image || item.emoji) ? (
                    <img
                      src={item.image || item.emoji}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/images/placeholder.jpg'; }}
                    />
                  ) : (
                    <span className="blog-slide-emoji">{item.emoji || '📰'}</span>
                  )}
                </div>
                <div className="blog-slide-body">
                  <div className="blog-slide-tag">{item.tag} · {item.date}</div>
                  <div className="blog-slide-title">{item.title}</div>
                  <div className="blog-slide-excerpt">{item.excerpt}</div>
                  <Link to={`/blog/${item.slug}`} className="blog-slide-link">
                    Read More →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blog;