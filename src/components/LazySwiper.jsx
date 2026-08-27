// src/components/LazySwiper.jsx
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';

// Lazy load the actual Swiper component
const Swiper = lazy(() => import('swiper/react').then(module => ({ default: module.Swiper })));

const LazySwiper = ({ children, ...props }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '300px' }}>
      {shouldLoad ? (
        <Suspense fallback={
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading...
          </div>
        }>
          <Swiper {...props}>{children}</Swiper>
        </Suspense>
      ) : (
        <div style={{
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg1)',
          borderRadius: '12px',
        }}>
          <span style={{ color: 'var(--txt3)' }}>Loading content...</span>
        </div>
      )}
    </div>
  );
};

export default LazySwiper;