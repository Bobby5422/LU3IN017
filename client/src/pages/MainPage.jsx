import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList/MessageList';
import MessageSearch from '../components/MessageSearch/MessageSearch';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';
import { fetchMessages } from '../services/api';

function MainPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      contenu: 'Bienvenue sur le forum !',
      owner: 'Alice',
      timestamp: '2025-05-21T10:00:00Z',
    },
]);
  const [searchParams, setSearchParams] = useState({ keywords: '', fromDate: null, toDate: null, author: '' });
  const [refresh, setRefresh] = useState(false);

  // Charger les messages au chargement et à chaque refresh ou changement des critères de recherche
useEffect(() => {
  async function loadMessages() {
    try {
      const response = await fetchMessages(); // axios renvoie { data }
      setMessages(response.data);
    } catch (error) {
      console.error(error);
      setMessages([]);
    }
  }
  loadMessages();
}, [searchParams, refresh]);

  // Fonction pour déclencher le rechargement après ajout d’un message
  const handleMessageAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="main-page">
      <h2>Forum ouvert</h2>

      <MessageSearch onSearch={setSearchParams} />

      <NewMessageForm onMessageAdded={handleMessageAdded} />

      <MessageList messages={messages} />
    </div>
  );
}

export default MainPage;
