// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, fetchUserMessages, updateUser } from '../services/api';
import ProfileItem from '../components/ProfileItem/ProfileItem';
import MessageItem from '../components/MessageItem/MessageItem';
import './Profile.css';

export default function Profile() {
  const [user, setUser]         = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function load() {
      try {
        // 1) Profil courant
        const { data: userData } = await fetchCurrentUser();
        setUser(userData);

        // 2) Ses messages
        const { data: msgs } = await fetchUserMessages(userData._id);
        setMessages(msgs);
      } catch (err) {
        setError('Impossible de charger le profil.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Handler pour mettre à jour le profil
  const handleUpdateProfile = async (userId, updatedData) => {
    await updateUser(userId, updatedData);
    // Recharger les données user
    const { data } = await fetchCurrentUser();
    console.log('userData:', userData);
    setUser(data);
  };

  if (loading) return <p>Chargement du profil…</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!user)   return null;

  return (
    <div className="page-profile">
      <ProfileItem
        user={user}
        isOwnProfile={true}
        onUpdateProfile={handleUpdateProfile}
      />

      <section className="user-messages">
        <h3>Mes messages</h3>
        {messages.length === 0
          ? <p>Aucun message publié.</p>
          : messages.map(msg => (
              <MessageItem key={msg._id} message={msg} />
            ))
        }
      </section>
    </div>
  );
}
