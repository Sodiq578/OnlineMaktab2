// src/index.js yoki src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// YANGI KOD — Ctrl + Alt + T butun sayt bo‘ylab ishlaydi
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey && e.key === 't') {
    e.preventDefault();
    localStorage.setItem('adminAuthenticated', 'true');
    window.location.href = '/admin';
  }

  if (e.ctrlKey && e.altKey && e.key === 'l') {
    e.preventDefault();
    localStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin-login';
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);