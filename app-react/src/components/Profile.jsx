import React, { useEffect, useState } from 'react';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Appeler l'API REST getUser et getInfoMessageUser pour récupérer les infos et les messages
    // Exemple :
    // api.getUser(currentUserId).then(data => setUserInfo(data));
    // api.getListMessageFromUser(currentUserId).then(msgs => setMessages(msgs));
  }, []);

  return (
    <div className="profile">
      <h1>Profil de l'utilisateur</h1>
      {userInfo ? (
        <div className="user-info">
          <p><strong>Nom :</strong> {userInfo.nom}</p>
          <p><strong>Email :</strong> {userInfo.email}</p>
          <p><strong>Date d'inscription :</strong> {userInfo.dateInscription}</p>
        </div>
      ) : (
        <p>Chargement des informations...</p>
      )}
      <h2>Liste des messages</h2>
      <ul className="message-list">
        {messages.map(msg => (
          <li key={msg.id} className="message">
            <p><strong>Message :</strong> {msg.contenu}</p>
            <p><strong>Date :</strong> {msg.timestamp}</p>
            <button onClick={() => {
              // Appeler l'API deleteMessage pour supprimer le message
            }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
