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
  const swPolicy = window.trustedTypes?.createPolicy('sw-policy', {
    createScriptURL: (url) => {
      if (url.endsWith('sw.js')) return url;
      throw new Error('Unauthorized Service Worker URL');
    }
  });

  const swUrl = swPolicy ? swPolicy.createScriptURL('/sw.js') : '/sw.js';

  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      navigator.serviceWorker.register(swUrl);
    });
  } else {
    setTimeout(() => {
      navigator.serviceWorker.register(swUrl);
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