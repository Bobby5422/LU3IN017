import React, { useState } from 'react';
import { postMessage } from '../../services/api'; // <-- À ajouter

function NewMessageForm({ onMessageAdded }) {
  const [messageContent, setMessageContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postMessage(messageContent); // <-- Envoie le message à l’API
      setMessageContent('');
      onMessageAdded(); // <-- Demande au parent de recharger les messages
    } catch (error) {
      console.error('Erreur lors de l\'ajout du message :', error);
    }
  };

  return (
    <div className="new-message">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Écrivez votre message..." 
          value={messageContent} 
          onChange={(e) => setMessageContent(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default NewMessageForm;
