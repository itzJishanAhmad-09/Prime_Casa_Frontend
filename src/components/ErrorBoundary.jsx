// src/components/ErrorBoundary.jsx
import React from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: forward to an error reporting service (e.g. Sentry) in production
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px',
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--bg1)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            margin: '1rem',
          }}
        >
          <div style={{ marginBottom: '16px', color: 'var(--red)' }}>
            <IconAlertTriangle size={48} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '8px' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--txt2)', maxWidth: '400px', margin: '0 auto 16px' }}>
            We're sorry, but an unexpected error occurred. Please try again or contact support if
            the problem persists.
          </p>
          <button
            onClick={this.handleRetry}
            className="btn-red"
            style={{ padding: '12px 32px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;