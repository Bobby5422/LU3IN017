// client/src/components/NavigationPanel/NavigationPanel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';
import './NavigationPanel.css';

/**
 * Navigation principale de l’appli.
 *
 * Props :
 *  - isConnected : booléen, utilisateur authentifié ou non  
 *  - logout()      : fonction à appeler pour déconnecter l’utilisateur
 */
function NavigationPanel({ isConnected, logout }) {
  return (
    <nav className="navigation-panel">
      <h1>Organiz'Asso</h1>

      {isConnected ? (
        <>
          <ul className="nav-links">
            <li><Link to="/main">Forum</Link></li>
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/admin">Administration</Link></li>
          </ul>
          {/* onSupply logout() à LogoutButton via son prop onLogout */}
          <LogoutButton onLogout={logout} />
        </>
      ) : (
        <div className="login-info">
          <p>Veuillez vous connecter pour accéder au forum.</p>
          <Link to="/login" className="login-link">Se connecter</Link>
        </div>
      )}
    </nav>
  );
}

export default NavigationPanel;
