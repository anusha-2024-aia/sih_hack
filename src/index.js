import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // You can keep a minimal index.css for body/root styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);