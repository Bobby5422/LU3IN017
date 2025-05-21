import React from 'react';
import MessageItem from './MessageItem';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map(message => (
        <MessageItem key={message._id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
