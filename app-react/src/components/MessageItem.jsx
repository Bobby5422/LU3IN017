import React from 'react';

function MessageItem({ message }) {
  return (
    <div className={`message ${message.isReply ? 'reply' : ''}`}>
      <p><strong>Message :</strong> {message.contenu}</p>
      <p><strong>Date :</strong> {message.timestamp}</p>
      <p><strong>Propriétaire :</strong> {message.owner}</p>
      <button onClick={() => {
        // Logique pour ajouter une réponse
      }}>Répondre</button>
    </div>
  );
}

export default MessageItem;
