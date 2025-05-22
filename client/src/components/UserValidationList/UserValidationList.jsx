import React, { useEffect, useState } from 'react';
import { fetchAllUsers, validateUser } from '../../services/api';

function UserValidationList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer tous les utilisateurs non validés
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const res = await fetchAllUsers();
        // Filtrer uniquement les users non validés
        setUsers(res.data.filter(u => u.validated === false));
      } catch (e) {
        setError('Impossible de charger les utilisateurs.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleValidate = async (id) => {
    try {
      await validateUser(id);
      setUsers(users.filter(u => u._id !== id));
    } catch {
      alert('Erreur lors de la validation');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Utilisateurs en attente de validation</h3>
      {users.length === 0 ? (
        <p>Aucun utilisateur à valider.</p>
      ) : (
        users.map(user => (
          <div key={user._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Nom:</strong> {user.username}</p>
            <button onClick={() => handleValidate(user._id)}>Valider</button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserValidationList;