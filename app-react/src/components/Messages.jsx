import MessageItem from "./MessageItem";
import NewMessageForm from "./NewMessageForm";

function Messages() {
  const messages = [
    {
      id: 1,
      text: "Bonjour, ceci est un message fictif.",
      date: "2025-01-27",
      owner: "utilisateur1",
    },
    {
      id: 2,
      text: "Merci pour votre message.",
      date: "2025-01-27",
      owner: "utilisateur2",
      isReply: true,
    },
    {
      id: 3,
      text: "Voici un autre message fictif.",
      date: "2025-01-26",
      owner: "utilisateur3",
    },
  ];

  return (
    <section className="messages">
      <NewMessageForm />
      <div className="message-list">
        {messages.map((msg) => (
          <MessageItem key={msg.id} {...msg} />
        ))}
      </div>
    </section>
  );
}

export default Messages;