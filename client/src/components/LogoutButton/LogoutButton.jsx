import React from 'react';

function LogoutButton({ onLogout }) {
  return (
    <button className="logout-button" onClick={onLogout}>
      Se déconnecter
    </button>
  );
}

export default LogoutButton;
