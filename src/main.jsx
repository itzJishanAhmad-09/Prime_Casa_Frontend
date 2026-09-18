// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './App.css';
import { AuthProvider } from './context/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      navigator.serviceWorker.register('/sw.js');
    });
  } else {
    setTimeout(() => {
      navigator.serviceWorker.register('/sw.js');
    }, 3000);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);