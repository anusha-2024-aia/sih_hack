import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import styles from './CapturePage.module.css'; // Specific styles for CapturePage

function CapturePage() {
  const navigate = useNavigate();
  const { setUploadedImage, showNotification, sampleImageData } = useContext(AppContext);
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setUploadedImage(e.target.result); // Set for global context
        setCurrentPreviewImage(e.target.result); // Set for local preview
        showNotification('Image uploaded successfully!', 'success');
        navigate('/preprocessing'); // Automatically navigate to preprocessing
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImage = () => {
    // Simulate camera capture using a hidden input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = handleFileUpload;
    input.click();
  };

  const useSample = () => {
    setUploadedImage(sampleImageData); // Set for global context
    setCurrentPreviewImage(sampleImageData); // Set for local preview
    showNotification('Sample image loaded!', 'success');
    navigate('/preprocessing'); // Automatically navigate to preprocessing
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInputRef.current.files = files;
      handleFileUpload({ target: { files: files } });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Capture or Upload Image</h2>
        <p className="card-subtitle">Use your smartphone camera or upload a photo.<br />
          For best results: ensure text is clear and lighting is good.</p>
      </div>

      <div
        className={`${styles.uploadArea} ${isDragOver ? styles.dragover : ''}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</p>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Drop image here or click to upload</p>
          <p style={{ color: 'var(--text-secondary)' }}>Supports JPG, PNG, PDF</p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      <div style={{ marginTop: '2rem' }}>
        <button className="btn btn-primary" onClick={captureImage}>Capture (Use Camera)</button>
        <button className="btn btn-secondary" onClick={() => fileInputRef.current.click()}>Upload Image</button>
        <button className="btn btn-secondary" onClick={useSample}>Use Sample</button>
      </div>

      {currentPreviewImage && (
        <div className="mt-2">
          <h3>Uploaded Image:</h3>
          <img src={currentPreviewImage} alt="Uploaded Preview" style={{ maxWidth: '400px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow)' }} />
        </div>
      )}

      <div style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
        <strong>Tip:</strong> If using phone, open this page on your phone to upload images.
      </div>
    </div>
  );
}

export default CapturePage;