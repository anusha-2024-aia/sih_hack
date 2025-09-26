import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import styles from './WelcomePage.module.css'; // You can remove this if no specific styles

function WelcomePage() {
  const navigate = useNavigate();
  const { setUploadedImage, showNotification, sampleImageData } = useContext(AppContext);

  const useDemoSample = () => {
    setUploadedImage(sampleImageData);
    showNotification('Demo sample loaded!', 'info');
    navigate('/upload');
  };

  return (
    <div className="card text-center">
      <div className="card-header">
        <h1 className="heading-large">E-Commerce Legal Checker — POC</h1>
        <p className="heading-medium">Scan product pages, invoices or labels → Detect missing legal information (GST, refund policy, mandatory disclaimers)</p>
      </div>

      <div>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}>Start Scan</button>
        <button className="btn btn-secondary" onClick={useDemoSample}>View Demo Sample</button>
      </div>

      <div className="footer">
        Last model trained: 2025-09-26 · Accuracy: 92%
      </div>
    </div>
  );
}

export default WelcomePage;