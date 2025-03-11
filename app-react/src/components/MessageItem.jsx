function MessageItem({ text, date, owner, isReply }) {
    return (
      <div className={`message ${isReply ? "reply" : ""}`}>
        <p><strong>{isReply ? "Réponse" : "Message"} :</strong> {text}</p>
        <p><strong>Date :</strong> {date}</p>
        <p><strong>Propriétaire :</strong> {owner}</p>
        <button>Répondre</button>
      </div>
    );
  }
  
export default MessageItem;