import React, { useState, useEffect } from 'react';
import MessageList from '../components/MessageList/MessageList';
import MessageSearch from '../components/MessageSearch/MessageSearch';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';
import { fetchMessages } from '../services/api';

function MainPage() {
  const [messages, setMessages] = useState([]);
  const [searchParams, setSearchParams] = useState({ keywords: '', fromDate: null, toDate: null, author: '' });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function loadMessages() {
      try {
        const response = await fetchMessages();
        console.log('Messages fetched:', response.data); // Pour vérifier la structure
        setMessages(response.data);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    }
    loadMessages();
  }, [searchParams, refresh]);

  const handleMessageAdded = () => {
    setReplyTo(null); 
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
