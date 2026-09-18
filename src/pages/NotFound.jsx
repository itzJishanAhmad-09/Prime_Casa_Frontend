// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const NotFound = () => {
  return (
    <>
      <Seo
        title="404 – Page Not Found"
        description="The page you are looking for does not exist."
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: 'var(--red)',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '1rem',
            color: 'var(--txt)',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            color: 'var(--txt2)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '2rem',
          }}
        >
          The page you are looking for may have been moved, deleted, or never existed.
          Let's get you back to safety.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/"
            className="btn-red"
            style={{
              textDecoration: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
            }}
          >
            ← Back to Home
          </Link>
          <Link
            to="/properties"
            style={{
              textDecoration: 'none',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
              border: '1px solid var(--border-s)',
              color: 'var(--txt)',
            }}
          >
            View Properties
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
