import React from 'react';

function ProfileItem({ item, onDelete = () => {} }) {
  return (
    <div className="profile-item">
      <p><strong>Message :</strong> {item.content}</p>
      <p><strong>Date :</strong> {item.date}</p>
      <button onClick={() => onDelete(item.id)}>Supprimer</button>
    </div>
  );
}

export default ProfileItem;
