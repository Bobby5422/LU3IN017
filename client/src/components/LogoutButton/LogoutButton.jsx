// client/src/components/LogoutButton/LogoutButton.jsx
import React from 'react';
import './LogoutButton.css';

/**
 * Affiche un bouton "Déconnexion" et appelle onLogout au clic.
 * onLogout doit :
 *  - appeler l'API logout()
 *  - remettre user à null dans App.jsx
 *  - rediriger vers la page de login
 */
export default function LogoutButton({ onLogout }) {
  const handleClick = () => {
    onLogout();
  };

  return (
    <button className="logout-button" onClick={handleClick}>
      Déconnexion
    </button>
  );
}
