// client/src/components/MessageItem/MessageItem.jsx
import React from 'react';
import './MessageItem.css';

/**
 * Affiche un message dans la liste.
 *
 * Props :
 *  - message : objet { 
 *      _id,               // identifiant unique
 *      text,              // contenu du message
 *      createdAt,         // date de création ISO
 *      author: {          // sous-objet auteur
 *        _id,
 *        pseudo
 *      }
 *    }
 */
export default function MessageItem({ message }) {
  // Formatage de la date de création en chaîne lisible
  const dateStr = new Date(message.createdAt).toLocaleString();

  return (
    <div className="message-item">
      {/* En-tête avec pseudo et date */}
      <div className="message-meta">
        <span className="message-author">{message.author.pseudo}</span>
        <span className="message-date">{dateStr}</span>
      </div>

      {/* Contenu du message */}
      <div className="message-text">
        {message.text}
      </div>
    </div>
  );
}
