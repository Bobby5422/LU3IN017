import React from 'react';
import MessageItem from './MessageItem';

function ManageMessageList({ messages = [], onDeleteMessage = () => {}, onEditMessage = () => {} }) {
  return (
    <div className="manage-message-list">
      <h2>Gestion des messages</h2>
      {messages.length === 0 ? (
        <p>Aucun message à gérer.</p>
      ) : (
        messages.map(msg => (
          <div key={msg.id} className="admin-message-item">
            <MessageItem message={msg} 
              onDelete={() => onDeleteMessage(msg.id)}
              // Vous pouvez ajouter ici un bouton ou une logique de modification
              onReply={() => onEditMessage(msg.id)} />
          </div>
        ))
      )}
    </div>
  );
}

export default ManageMessageList;
