import React, { useState, useContext } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF library
import { AppContext } from '../AppContext';
import styles from './PipelinePage.module.css'; // Specific styles for PipelinePage

function PipelinePage() {
  const { showNotification, uploadedImage, extractedText } = useContext(AppContext);
  const [pipelineSteps, setPipelineSteps] = useState([
    { id: 'upload', icon: '📤', label: 'Upload / Camera', status: 'completed' },
    { id: 'preprocessing', icon: '🔧', label: 'Preprocessing', status: 'completed' },
    { id: 'ocr', icon: '👁', label: 'OCR Extraction', status: 'completed' },
    { id: 'compliance', icon: '📋', label: 'Compliance Rules', status: 'failed' }, // Simulate a failure for demo
    { id: 'ml', icon: '🤖', label: 'ML Verification', status: 'completed' },
  ]);
  const [finalDecision, setFinalDecision] = useState('Needs Attention (Confidence: 86%)');
  const [decisionStatusClass, setDecisionStatusClass] = useState('status-needs-attention');

  const runFullCheck = () => {
    showNotification('Running full compliance check...', 'info');

    // Simulate pipeline execution
    // Reset status for a fresh run
    const initialSteps = pipelineSteps.map(step => ({ ...step, status: '' })); // Clear status
    setPipelineSteps(initialSteps);
    setFinalDecision('Running...');
    setDecisionStatusClass('status-info'); // A temporary class for 'running' state

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < initialSteps.length) {
        setPipelineSteps(prevSteps =>
          prevSteps.map((step, idx) =>
            idx === stepIndex
              ? { ...step, status: (step.id === 'compliance' ? 'failed' : 'completed') } // Simulate compliance failure
              : step
          )
        );
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // Final decision based on simulated compliance failure
          setFinalDecision('FINAL DECISION: NON-COMPLIANT (Confidence: 80%)');
          setDecisionStatusClass('status-non-compliant');
          showNotification('Full check completed! Results updated.', 'success');
        }, 500);
      }
    }, 800);
  };


  const generateReport = () => {
    showNotification('Generating PDF report...', 'info');

    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("E-Commerce Legal Checker Report", 10, 20);

      doc.setFontSize(12);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
      doc.text(`Final Decision: ${finalDecision}`, 10, 40);

      let y = 50;

      if (uploadedImage) {
        doc.text("Original Image:", 10, y);
        y += 10;
        doc.addImage(uploadedImage, 'JPEG', 10, y, 80, 60); // Adjust size as needed
        y += 70;
      }

      doc.text("OCR Extracted Text:", 10, y);
      y += 10;
      const textLines = doc.splitTextToSize(extractedText || 'No text extracted.', 180); // Max width 180
      doc.text(textLines, 10, y);
      y += (textLines.length * 7) + 10; // Adjust line height + margin

      doc.text("Pipeline Steps:", 10, y);
      y += 10;
      pipelineSteps.forEach(step => {
        doc.text(`- ${step.icon} ${step.label}: ${step.status.toUpperCase()}`, 15, y);
        y += 7;
      });

      doc.save(`compliance_report_${new Date().toISOString().split('T')[0]}.pdf`);
      showNotification('PDF report downloaded!', 'success');
    } catch (error) {
      console.error("Error generating PDF:", error);
      showNotification('Failed to generate PDF report.', 'error');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Run Full Pipeline</h2>
      </div>

      <div className="pipeline-steps">
        {pipelineSteps.map(step => (
          <div key={step.id} className={`pipeline-step ${step.status}`}>
            <div className="pipeline-icon">{step.icon}</div>
            <div>{step.label} {step.status === 'completed' ? '✔' : step.status === 'failed' ? '✖' : ''}</div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <div className={`status-badge ${decisionStatusClass}`} id="finalDecisionStatus">
          {finalDecision}
        </div>
      </div>

      <div className="text-center mt-2">
        <button className="btn btn-primary" onClick={runFullCheck}>Run Check</button>
        <button className="btn btn-secondary" onClick={generateReport}>Generate Report (PDF)</button>
      </div>
    </div>
  );
}

export default PipelinePage;