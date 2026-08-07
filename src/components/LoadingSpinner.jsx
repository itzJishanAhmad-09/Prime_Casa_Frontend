import React from 'react';

const LoadingSpinner = ({ size = 40, color = 'var(--red)' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '200px',
    }}>
      <i
        className="ti ti-rotate-clockwise"  // ← changed icon
        style={{
          fontSize: size,
          color,
          animation: 'spinPulse 1.2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes spinPulse {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.7; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;