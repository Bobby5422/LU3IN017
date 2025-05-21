import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList/MessageList';
import MessageSearch from '../components/MessageSearch/MessageSearch';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';

function MainPage() {
  const [messages, setMessages] = useState([]);
  const [searchParams, setSearchParams] = useState({ keywords: '', fromDate: null, toDate: null, author: '' });
  const [refresh, setRefresh] = useState(false);

  // Charger les messages au chargement et à chaque refresh ou changement des critères de recherche
  useEffect(() => {
    async function fetchMessages() {
      try {
        // Ici on appelle l’API ListMessage avec les filtres searchParams (à implémenter dans services/api.js)
        // Exemple simplifié, remplacer par vraie requête fetch/axios
        const query = new URLSearchParams();

        if (searchParams.keywords) query.append('keywords', searchParams.keywords);
        if (searchParams.fromDate) query.append('fromDate', searchParams.fromDate);
        if (searchParams.toDate) query.append('toDate', searchParams.toDate);
        if (searchParams.author) query.append('author', searchParams.author);

        const response = await fetch(`/api/messages?${query.toString()}`);
        if (!response.ok) throw new Error('Erreur lors du chargement des messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    }
    fetchMessages();
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
