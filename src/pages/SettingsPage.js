import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './SettingsPage.module.css'; // Specific styles for SettingsPage

function SettingsPage() {
  const { showNotification } = useContext(AppContext);
  const [tesseractLanguage, setTesseractLanguage] = useState('eng');
  const [ocrMode, setOcrMode] = useState('lstm');

  const openRulesEditor = () => {
    alert('Rules Editor would open in a new window to configure compliance rules (feature not implemented in POC).');
    showNotification('Opening simulated Rules Editor...', 'info');
  };

  const showHelp = (topic) => {
    const helpContent = {
      'getting-started': 'Getting Started: Upload an image, run preprocessing, extract text with OCR, and check compliance.',
      'api-docs': 'API Documentation: RESTful API endpoints available for integration.',
      'troubleshooting': 'Troubleshooting: Check image quality, ensure good lighting, verify file format.',
      'legal-requirements': 'Legal Requirements: GST number, refund policy, pricing, contact information required.'
    };
    alert(helpContent[topic] || 'Help content not available for this topic.');
    showNotification(`Showing help for: ${topic}`, 'info');
  };

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Settings & Help</h2>
        </div>

        <div className="form-group">
          <label className="form-label">Tesseract Language:</label>
          <select className="form-select" value={tesseractLanguage} onChange={(e) => setTesseractLanguage(e.target.value)}>
            <option value="eng">English</option>
            <option value="hin">Hindi</option>
            <option value="tam">Tamil</option>
            <option value="tel">Telugu</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">OCR Engine Mode:</label>
          <select className="form-select" value={ocrMode} onChange={(e) => setOcrMode(e.target.value)}>
            <option value="lstm">LSTM</option>
            <option value="legacy">Legacy</option>
            <option value="combined">Combined</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Rules Editor:</label>
          <button className="btn btn-secondary" onClick={openRulesEditor}>Open</button>
        </div>

        <div className="form-group">
          <label className="form-label">Contact:</label>
          <input type="email" className="form-input" defaultValue="anusha@example.com" readOnly />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>System Information</h3>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value">v1.0</div>
            <div className="metric-label">Version</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">2025-01-15</div>
            <div className="metric-label">Last Updated</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">128</div>
            <div className="metric-label">Total Scans</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">92%</div>
            <div className="metric-label">Success Rate</div>
          </div>
        </div>

        <div className="mt-2">
          <h4>Help & Documentation</h4>
          <ul style={{ listStyleType: 'disc', marginLeft: '2rem' }}>
            <li><a href="#" onClick={() => showHelp('getting-started')}>Getting Started Guide</a></li>
            <li><a href="#" onClick={() => showHelp('api-docs')}>API Documentation</a></li>
            <li><a href="#" onClick={() => showHelp('troubleshooting')}>Troubleshooting</a></li>
            <li><a href="#" onClick={() => showHelp('legal-requirements')}>Legal Requirements</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;