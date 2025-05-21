import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Appeler l'API REST getListMessage pour récupérer la liste de tous les messages
    // Exemple : api.getListMessage().then(data => setMessages(data));
  }, []);

  return (
    <div className="message-list">
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
