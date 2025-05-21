import React, { useState } from 'react';

function NewMessageForm() {
  const [messageContent, setMessageContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appeler l'API REST createMessage pour créer un nouveau message
    // Exemple : api.createMessage(currentUserId, { message: messageContent }).then(...);
    setMessageContent('');
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
