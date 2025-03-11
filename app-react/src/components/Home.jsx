import React from 'react';
import SearchForm from './SearchForm';
import NewMessageForm from './NewMessageForm';
import MessageList from './MessageList';

function Home() {
  return (
    <div className="home">
      <SearchForm />
      <NewMessageForm />
      <MessageList />
    </div>
  );
}

export default Home;
