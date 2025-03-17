import React from 'react';

function Notification({ message, type = "info" }) {
  if (!message) return null;
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;
