import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import styles from './CompliancePage.module.css';

function CompliancePage() {
  const { extractedText, showNotification } = useContext(AppContext);
  const [complianceStatus, setComplianceStatus] = useState('status-needs-attention');
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    // Run compliance check when extractedText changes
    runComplianceCheck(extractedText);
  }, [extractedText]);

  const runComplianceCheck = (text) => {
    const checks = [
      { rule: 'GST Number present', condition: /GST No:\s*([A-Z0-9]+)/.test(text), passed: false },
      { rule: 'Refund Policy mentioned', condition: /(return policy|refund)/i.test(text), passed: false },
      { rule: 'Price included', condition: /Price:\s*[^\\n]+/.test(text), passed: false },
      { rule: 'Business address', condition: /([0-9]+[A-Za-z\s]+(street|st|road|rd|avenue|ave|lane|ln|drive|dr))|(P\.?O\.?\s*Box\s*[\d]+)/i.test(text), passed: false }, // Simple address regex
      { rule: 'Contact information', condition: /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(((\+|0{0,2})91[\-\s]?)?[6-9]\d{9})/g.test(text), passed: false }, // Email or Indian phone number
    ];

    let allPass = true;
    const updatedChecklist = checks.map(check => {
      if (check.condition) {
        return { ...check, passed: true };
      } else {
        allPass = false;
        return { ...check, passed: false };
      }
    });

    setChecklist(updatedChecklist);

    if (allPass) {
      setComplianceStatus('status-compliant');
    } else if (updatedChecklist.some(item => !item.passed)) {
      setComplianceStatus('status-non-compliant');
    } else {
      setComplianceStatus('status-needs-attention');
    }
  };


  const viewComplianceDetails = () => {
    let details = 'Detailed compliance analysis:\n\n';
    checklist.forEach(item => {
      details += `${item.passed ? '✔' : '✖'} ${item.rule} — ${item.passed ? 'PASS' : 'FAIL'}\n`;
      if (!item.passed) {
        // Add more specific feedback for failures
        if (item.rule === 'Refund Policy mentioned') details += '   - Missing clear return terms.\n';
        if (item.rule === 'Business address') details += '   - Business address not found in document.\n';
      }
    });
    alert(details);
  };

  const showFixSuggestions = () => {
    let suggestions = 'Suggestions to fix compliance issues:\n\n';
    checklist.forEach(item => {
      if (!item.passed) {
        if (item.rule === 'Refund Policy mentioned') suggestions += '1. Add a clear refund/return policy statement.\n';
        if (item.rule === 'Business address') suggestions += '2. Include the complete business address.\n';
        if (item.rule === 'GST Number present') suggestions += '3. Ensure the GST Number is clearly visible and correctly formatted.\n';
        if (item.rule === 'Price included') suggestions += '4. Make sure the price is clearly displayed with currency.\n';
        if (item.rule === 'Contact information') suggestions += '5. Include complete contact information (email, phone number).\n';
      }
    });
    if (suggestions === 'Suggestions to fix compliance issues:\n\n') {
        suggestions = "No major issues found. Maintain good practices!";
    }
    alert(suggestions);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'status-compliant': return 'FINAL STATUS: COMPLIANT';
      case 'status-non-compliant': return 'FINAL STATUS: NON-COMPLIANT';
      case 'status-needs-attention': return 'FINAL STATUS: NEEDS ATTENTION';
      default: return 'Checking...';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Compliance Check — Results</h2>
      </div>

      <div className="text-center">
        <div className={`status-badge ${complianceStatus}`} id="complianceStatus">
          {getStatusText(complianceStatus)}
        </div>
      </div>

      <ul className="checklist">
        {checklist.map((item, index) => (
          <li key={index} className={`checklist-item ${item.passed ? 'pass' : 'fail'}`}>
            <span className="checklist-icon">{item.passed ? '✔' : '✖'}</span>
            <span>{item.rule} — {item.passed ? 'PASS' : 'FAIL'}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2">
        <button className="btn btn-primary" onClick={viewComplianceDetails}>View Details</button>
        <button className="btn btn-secondary" onClick={showFixSuggestions}>How to Fix</button>
      </div>
    </div>
  );
}

export default CompliancePage;