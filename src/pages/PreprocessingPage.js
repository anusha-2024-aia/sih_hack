import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import styles from './PreprocessingPage.module.css'; // Specific styles for PreprocessingPage

function PreprocessingPage() {
  const navigate = useNavigate();
  const { uploadedImage, setGrayscaleImage, setProcessedImage, showNotification } = useContext(AppContext);

  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [threshold, setThreshold] = useState(127);

  // Default images if nothing uploaded
  const placeholderGrayscale = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOWNhM2FmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyYXlzY2FsZTwvdGV4dD48L3N2Zz4=";
  const placeholderProcessed = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMwMDAwMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UaHJlc2hvbGQ8L3RleHQ+PC9zdmc+";

  // Simulate image processing (this would be a more complex operation in a real app)
  useEffect(() => {
    // When uploadedImage changes, reset processed images
    if (uploadedImage) {
      // Simulate grayscale and processed image generation
      // In a real app, you'd use a library like OpenCV.js or send to backend
      setGrayscaleImage(uploadedImage); // For demo, just use original
      setProcessedImage(uploadedImage); // For demo, just use original
    } else {
      setGrayscaleImage(placeholderGrayscale);
      setProcessedImage(placeholderProcessed);
    }
  }, [uploadedImage, setGrayscaleImage, setProcessedImage]);


  const adjustImage = () => {
    // In a real application, you would apply actual image filters
    // to uploadedImage using a library (e.g., HTML Canvas API, OpenCV.js)
    // and update grayscaleImage and processedImage states.
    console.log(`Adjusting image: brightness=${brightness}, contrast=${contrast}, threshold=${threshold}`);
    showNotification('Image adjustments applied (simulated).', 'info');

    // For demonstration, simply update the processedImage with some filter
    // This is still a simulation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(100%)`;
      ctx.drawImage(img, 0, 0);

      // Simulate thresholding by drawing a black and white version
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const color = avg > threshold ? 255 : 0;
        data[i] = color;     // red
        data[i + 1] = color; // green
        data[i + 2] = color; // blue
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL());
    };
    img.src = uploadedImage;

    setGrayscaleImage(uploadedImage); // Placeholder for actual grayscale
  };

  const applyPreprocessing = () => {
    // Here you would finalize the preprocessing and pass the result to OCR.
    showNotification('Preprocessing applied successfully!', 'success');
    navigate('/ocr');
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Image Preprocessing — Preview</h2>
      </div>

      <div className="image-preview">
        <div className="image-container">
          <img id="originalImage" src={uploadedImage || placeholderGrayscale} alt="Original" />
          <div className="image-label">Original</div>
        </div>
        <div className="image-container">
          <img id="grayscaleImage" src={uploadedImage ? uploadedImage : placeholderGrayscale} alt="Grayscale" /> {/* For demo, using original for grayscale */}
          <div className="image-label">Grayscale</div>
        </div>
        <div className="image-container">
          <img id="processedImage" src={uploadedImage ? uploadedImage : placeholderProcessed} alt="Processed" /> {/* For demo, using original for processed */}
          <div className="image-label">Deskewed / Threshold</div>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label className="form-label">Brightness</label>
          <input
            type="range"
            className="slider"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => {setBrightness(e.target.value); adjustImage();}}
          />
          <span id="brightnessValue">{brightness}</span>
        </div>
        <div className="control-group">
          <label className="form-label">Contrast</label>
          <input
            type="range"
            className="slider"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => {setContrast(e.target.value); adjustImage();}}
          />
          <span id="contrastValue">{contrast}</span>
        </div>
        <div className="control-group">
          <label className="form-label">Threshold</label>
          <input
            type="range"
            className="slider"
            min="0"
            max="255"
            value={threshold}
            onChange={(e) => {setThreshold(e.target.value); adjustImage();}}
          />
          <span id="thresholdValue">{threshold}</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={applyPreprocessing}>Apply & Continue</button>

      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <strong>Note:</strong> Adjust threshold to improve OCR accuracy.
      </div>
    </div>
  );
}

export default PreprocessingPage;