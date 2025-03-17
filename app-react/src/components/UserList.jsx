import React from 'react';

function UserList({ users = [], onUpdateUser = () => {}, onDeleteUser = () => {} }) {
  return (
    <div className="user-list">
      <h2>Liste des utilisateurs</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        users.map(user => (
          <div key={user.id} className="user-item">
            <p><strong>Login :</strong> {user.login}</p>
            <p><strong>Nom :</strong> {user.nom}</p>
            <p><strong>Rôle :</strong> {user.role}</p>
            <button onClick={() => onUpdateUser(user.id)}>Modifier</button>
            <button onClick={() => onDeleteUser(user.id)}>Supprimer</button>
          </div>
        ))
      )}
    </div>
  );
}

export default UserList;
