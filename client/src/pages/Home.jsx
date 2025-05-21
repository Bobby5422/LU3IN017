import React from 'react';
import MessageSearch from '../components/MessageSearch/MessageSearch';
import NewMessageForm from '../components/NewMessageForm/NewMessageForm';
import MessageList from '../components/MessageList/MessageList';

function Home() {
  return (
    <div className="home">
      <MessageSearch />
      <NewMessageForm />
      <MessageList />
    </div>
  );
}

export default Home;
