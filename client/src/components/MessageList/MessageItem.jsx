import React from 'react';

function MessageItem({ message }) {
  return (
    <div className={`message ${message.isReply ? 'reply' : ''}`}>
      <p><strong>Message :</strong> {message.contenu}</p>
      <p><strong>Date :</strong> {new Date(message.timestamp).toLocaleString()}</p>
      <p><strong>Propriétaire :</strong> {message.owner}</p>
      <button onClick={() => {
        // Logique pour répondre
      }}>Répondre</button>
    </div>
  );
}
export default MessageItem;