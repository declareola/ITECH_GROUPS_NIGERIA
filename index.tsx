import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

// Ensure direct path access (e.g. /blog/...) seamlessly resolves in HashRouter
if (typeof window !== 'undefined' && window.location.pathname && window.location.pathname !== '/' && !window.location.hash) {
  window.location.replace('/#' + window.location.pathname + window.location.search);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);