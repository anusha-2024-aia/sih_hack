import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './TrainingPage.module.css';
// Import Chart.js if you want to use it for real graphs, for now it's simulated
// import { Chart } from 'chart.js';

function TrainingPage() {
  const { showNotification } = useContext(AppContext);
  const [trainingInProgress, setTrainingInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [accuracy, setAccuracy] = useState(92);
  const [precision, setPrecision] = useState(90);
  const [recall, setRecall] = useState(88);
  const [deployDisabled, setDeployDisabled] = useState(true);

  const startTraining = () => {
    if (trainingInProgress) return;

    setTrainingInProgress(true);
    setDeployDisabled(true);
    setProgress(0);
    document.getElementById('trainingProgress').style.display = 'block';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTrainingInProgress(false);
        setDeployDisabled(false);
        showNotification('Training completed successfully!', 'success');
        updateMetrics(); // Update metrics after training
      }
      setProgress(Math.round(currentProgress));
    }, 500);
  };

  const deployModel = () => {
    showNotification('Model deployed successfully! New model is now active.', 'success');
  };

  const updateMetrics = () => {
    const newAccuracy = (92 + Math.random() * 8).toFixed(1); // 92-100%
    const newPrecision = (90 + Math.random() * 8).toFixed(1); // 90-98%
    const newRecall = (88 + Math.random() * 8).toFixed(1); // 88-96%

    setAccuracy(newAccuracy);
    setPrecision(newPrecision);
    setRecall(newRecall);
  };

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">ML Model — Train & Deploy</h2>
        </div>

        <div className="form-group">
          <label className="form-label">Dataset:</label>
          <select className="form-select" id="datasetSelect">
            <option value="ecommerce_v1">E-commerce Legal Dataset v1.0</option>
            <option value="invoice_dataset">Invoice Dataset v2.1</option>
            <option value="product_labels">Product Labels Dataset v1.5</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Epochs:</label>
          <input type="number" className="form-input" id="epochs" defaultValue="5" min="1" max="100" />
        </div>

        <div className="mt-2">
          <button className="btn btn-primary" onClick={startTraining} disabled={trainingInProgress}>
            {trainingInProgress ? 'Training...' : 'Start Training'}
          </button>
          <button className="btn btn-success" onClick={deployModel} disabled={deployDisabled}>
            Deploy Model
          </button>
        </div>

        <div className="progress-container mt-2" id="trainingProgress" style={{ display: trainingInProgress ? 'block' : 'none' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">Training Progress: <span id="progressText">{progress}%</span></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Model Metrics</h3>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-value" id="accuracyMetric">{accuracy}%</div>
            <div className="metric-label">Accuracy</div>
          </div>
          <div className="metric-item">
            <div className="metric-value" id="precisionMetric">{precision}%</div>
            <div className="metric-label">Precision</div>
          </div>
          <div className="metric-item">
            <div className="metric-value" id="recallMetric">{recall}%</div>
            <div className="metric-label">Recall</div>
          </div>
        </div>
        {/* You could render a Chart.js graph here */}
        {/* <canvas id="metricsChart" width="400" height="200"></canvas> */}
      </div>
    </div>
  );
}

export default TrainingPage;