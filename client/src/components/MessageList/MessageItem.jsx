import React from 'react';

function MessageItem({ message }) {
  if (!message) return null;

  return (
    <div className={`message ${message.isReply ? 'reply' : ''}`}>
      <p><strong>Message :</strong> {message.text}</p>
      <p><strong>Date :</strong> {new Date(message.createdAt).toLocaleString()}</p>
      <p><strong>Propriétaire :</strong> {message.author?.username || 'Anonyme'}</p>
      <button onClick={() => {
        // Logique pour répondre
      }}>Répondre</button>
    </div>
  );
}

export default MessageItem;
