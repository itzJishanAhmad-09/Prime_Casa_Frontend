// src/components/StickyCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconPhone } from '@tabler/icons-react';

const StickyCTA = () => {
  return (
    <div className="sticky-cta-wrapper">
      <a
        href="tel:+918130504183"
        className="sticky-call-btn"
        aria-label="Call Prime Casa"
      >
        <IconPhone size={20} />
      </a>
      <Link
        to="/schedule"
        className="sticky-book-btn"
      >
        Book site visit
      </Link>
    </div>
  );
};

export default StickyCTA;