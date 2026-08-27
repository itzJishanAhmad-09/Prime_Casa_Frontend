// src/components/TestimonialsSlider.jsx
import React from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import LazySwiper from './LazySwiper';

const TestimonialsSlider = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="section" id="testimonials">
        <div className="section-header">
          <div className="section-label">Client Stories</div>
          <div className="section-title">What Our Clients Say</div>
          <div className="section-sub">Real experiences from people who found their dream homes with us.</div>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--txt3)' }}>No testimonials available.</p>
      </div>
    );
  }

  return (
    <div className="section" id="testimonials">
      <div className="section-header">
        <div className="section-label">Client Stories</div>
        <div className="section-title">What Our Clients Say</div>
        <div className="section-sub">Real experiences from people who found their dream homes with us.</div>
      </div>

      <div className="testimonials-slider-wrapper">
        <LazySwiper
          modules={[]}
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
          speed={400}
          observer={true}
          observeParents={true}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="testimonial-slide-card">
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <blockquote>“{t.quote}”</blockquote>
                <div className="author">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </LazySwiper>
      </div>
    </div>
  );
};

export default React.memo(TestimonialsSlider);