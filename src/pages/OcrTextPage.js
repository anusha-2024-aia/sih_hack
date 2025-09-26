import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import styles from './OcrTextPage.module.css';

function OcrTextPage() {
  const { extractedText, setExtractedText, showNotification } = useContext(AppContext);
  const [localExtractedText, setLocalExtractedText] = useState(extractedText || `ABC Electronics Pvt. Ltd.
GST No: 29GGGGG1314R9Z6
Product: Smartphone XYZ-2024
Price: ₹25,999 (inclusive of all taxes)

Terms & Conditions:
- 30-day return policy
- 1-year manufacturer warranty
- Free shipping on orders above ₹500

Contact: support@abcelectronics.com`);

  const [productName, setProductName] = useState('Smartphone XYZ-2024');
  const [gstNumber, setGstNumber] = useState('29GGGGG1314R9Z6');
  const [price, setPrice] = useState('₹25,999');
  const [refundPolicy, setRefundPolicy] = useState('yes');

  useEffect(() => {
    // When the component mounts or localExtractedText changes, try to update fields
    updateExtractedFields(localExtractedText);
  }, [localExtractedText]);


  const updateExtractedFields = (text) => {
    // Simple extraction logic (in real app, this would be more sophisticated)
    let newGst = 'N/A';
    if (text.includes('GST No:')) {
      const gstMatch = text.match(/GST No:\s*([A-Z0-9]+)/);
      if (gstMatch) {
        newGst = gstMatch[1];
      }
    }
    setGstNumber(newGst);

    let newPrice = 'N/A';
    if (text.includes('Price:')) {
      const priceMatch = text.match(/Price:\s*([^\\n]+)/);
      if (priceMatch) {
        newPrice = priceMatch[1].trim();
      }
    }
    setPrice(newPrice);

    let newRefund = 'no';
    if (text.includes('return policy') || text.includes('refund')) {
      newRefund = 'yes';
    }
    setRefundPolicy(newRefund);

    let newProductName = 'N/A';
    if(text.includes('Product:')) {
        const productMatch = text.match(/Product:\s*([^\\n]+)/);
        if (productMatch) {
            newProductName = productMatch[1].trim();
        }
    }
    setProductName(newProductName);
  };


  const copyText = () => {
    navigator.clipboard.writeText(localExtractedText);
    showNotification('Text copied to clipboard!', 'success');
  };

  const saveCorrection = () => {
    setExtractedText(localExtractedText); // Save to global context
    updateExtractedFields(localExtractedText); // Re-extract based on potentially corrected text
    showNotification('Corrections saved!', 'success');
  };

  const highlightOnImage = () => {
    showNotification('Highlighting feature would show text regions on the original image', 'info');
  };

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">OCR — Extracted Text</h2>
        </div>

        <textarea
          className="form-textarea"
          id="extractedText"
          placeholder="Extracted text will appear here — edit and save corrections"
          value={localExtractedText}
          onChange={(e) => setLocalExtractedText(e.target.value)}
        ></textarea>

        <div className="mt-2">
          <button className="btn btn-secondary" onClick={copyText}>Copy Text</button>
          <button className="btn btn-primary" onClick={saveCorrection}>Save Correction</button>
          <button className="btn btn-secondary" onClick={highlightOnImage}>Highlight on Image</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Extracted Information</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-input"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">GST Number:</label>
          <input
            type="text"
            className="form-input"
            id="gstNumber"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price:</label>
          <input
            type="text"
            className="form-input"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Terms/Refund:</label>
          <select
            className="form-select"
            id="refundPolicy"
            value={refundPolicy}
            onChange={(e) => setRefundPolicy(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default OcrTextPage;