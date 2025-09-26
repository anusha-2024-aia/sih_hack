import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // For generating tables in PDF

function HistoryPage() {
  const { showNotification } = useContext(AppContext);
  const [scanHistory, setScanHistory] = useState([
    { id: 1, date: '2025-01-15 14:30', file: 'invoice_001.jpg', result: 'COMPLIANT', confidence: '94%' },
    { id: 2, date: '2025-01-15 13:45', file: 'product_label_xyz.png', result: 'NON-COMPLIANT', confidence: '89%' },
    { id: 3, date: '2025-01-15 12:20', file: 'receipt_sample.pdf', result: 'NEEDS ATTENTION', confidence: '76%' },
  ]);

  const getStatusClass = (result) => {
    switch (result) {
      case 'COMPLIANT': return 'status-compliant';
      case 'NON-COMPLIANT': return 'status-non-compliant';
      case 'NEEDS ATTENTION': return 'status-needs-attention';
      default: return '';
    }
  };

  const exportCSV = () => {
    const header = ['Date', 'File', 'Result', 'Confidence'];
    const rows = scanHistory.map(item => [item.date, item.file, item.result, item.confidence]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + header.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scan_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('History exported as CSV!', 'success');
  };

  const downloadPDF = () => {
    showNotification('Generating PDF history report...', 'info');

    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Scan History Report", 10, 20);

      doc.setFontSize(12);
      doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 10, 30);

      const tableColumn = ["Date", "File", "Result", "Confidence"];
      const tableRows = scanHistory.map(item => [item.date, item.file, item.result, item.confidence]);

      doc.autoTable({
        startY: 40,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10, cellPadding: 2, overflow: 'linebreak' },
        headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] }, // Primary color
        alternateRowStyles: { fillColor: [248, 250, 252] }, // Background color
        margin: { top: 10 }
      });

      doc.save(`scan_history_${new Date().toISOString().split('T')[0]}.pdf`);
      showNotification('PDF history report downloaded!', 'success');
    } catch (error) {
      console.error("Error generating PDF history:", error);
      showNotification('Failed to generate PDF history report.', 'error');
    }
  };

  const viewScanDetails = (scanId) => {
    const scan = scanHistory.find(s => s.id === scanId);
    if (scan) {
      alert(`Scan Details:\n\nDate: ${scan.date}\nFile: ${scan.file}\nResult: ${scan.result}\nConfidence: ${scan.confidence}\n\n(Full details would be available here)`);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Scan History</h2>
      </div>

      <table className="table" id="historyTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>File</th>
            <th>Result</th>
            <th>Confidence</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {scanHistory.map(scan => (
            <tr key={scan.id}>
              <td>{scan.date}</td>
              <td>{scan.file}</td>
              <td><span className={`status-badge ${getStatusClass(scan.result)}`} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>{scan.result}</span></td>
              <td>{scan.confidence}</td>
              <td>
                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => viewScanDetails(scan.id)}>View</button>
                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={downloadPDF}>Download</button> {/* For individual scan report */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        <button className="btn btn-secondary" onClick={exportCSV}>Export CSV</button>
        <button className="btn btn-secondary" onClick={downloadPDF}>Download Full History PDF</button>
      </div>
    </div>
  );
}

export default HistoryPage;