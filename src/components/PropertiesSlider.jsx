// src/components/PropertiesSlider.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import PropertyCard from './PropertyCard'; 

const PropertiesSlider = ({ projects, title = "Featured Properties", subtitle = "Handpicked RERA-verified projects for you" }) => {
  if (!projects || projects.length === 0) {
    return <p style={{ textAlign: 'center', padding: '40px' }}>No properties available.</p>;
  }

  const uniqueProjects = projects.filter((p, index, self) =>
    index === self.findIndex((t) => t.id === p.id)
  );

  return (
    <section className="section" id="properties-slider">
      <div className="section-header">
        <div className="section-label">✦ Featured Properties</div>
        <div className="section-title">{title}</div>
        <div className="section-sub">{subtitle}</div>
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
          {uniqueProjects.map((project) => {
            const projectIndex = uniqueProjects.indexOf(project);
            return (
              <SwiperSlide key={project.id}>
                <PropertyCard project={project} index={projectIndex} variant="slider" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default PropertiesSlider;