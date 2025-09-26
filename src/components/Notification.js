import React from 'react';
// Reuses global App.css .notification styles

function Notification({ message, type }) {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;