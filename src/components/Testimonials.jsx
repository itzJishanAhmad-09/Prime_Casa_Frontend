import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <div className="section" id="testimonials">
      <div className="section-header">
        <div className="section-label">Client Stories</div>
        <div className="section-title">What Our Clients Say</div>
        <div className="section-sub">
          Real experiences from people who found their dream homes with us.
        </div>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((t, idx) => (
          <div className="testimonial-card" key={idx}>
            <div className="stars">{'★'.repeat(t.stars)}</div>
            <blockquote>“{t.quote}”</blockquote>
            <div className="author">{t.name}</div>
            <div className="role">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;