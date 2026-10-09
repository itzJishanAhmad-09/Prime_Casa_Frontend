// src/components/PropertiesSlider.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PropertyCard from './PropertyCard';

const PropertiesSlider = ({
  projects,
  eyebrow  = 'Featured Properties',
  title    = 'Trending in Noida, hand-picked.',
  subtitle = 'RERA-verified projects with the highest buyer interest and market confidence right now.',
}) => {
  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '40px' }}>
        No properties available.
      </p>
    );
  }

  // Dedupe by id
  const uniqueProjects = projects.filter(
    (p, index, self) => index === self.findIndex((t) => t.id === p.id)
  );

  return (
    <section className="section" id="properties-slider">
      <div className="props-head">
        <div className="props-head-left">
          <div className="props-eyebrow">
            <span className="props-eyebrow-line" aria-hidden="true" />
            {eyebrow}
          </div>

          <h2 className="props-title">
            Trending in Noida, <em>hand-picked.</em>
          </h2>

          <p className="props-sub">{subtitle}</p>
        </div>

        <Link to="/properties" className="props-viewall">
          <span>View all {uniqueProjects.length} properties</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="properties-slider-wrapper">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
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
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="properties-swiper"
        >
          {uniqueProjects.map((project, projectIndex) => (
            <SwiperSlide key={project.id}>
              <PropertyCard
                project={project}
                index={projectIndex}
                variant="slider"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PropertiesSlider;