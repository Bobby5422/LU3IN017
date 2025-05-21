import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton/LogoutButton';
import './NavigationPanel.css';

function NavigationPanel({ isConnected, logout }) {
  return (
    <nav className="navigation-panel">
      <h1>Organiz'Asso</h1>

      {isConnected ? (
        <>
          <ul className="nav-links">
            <li><Link to="/main">Forum Ouvert</Link></li>
            <li><Link to="/profile">Profil</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
          <LogoutButton logout={logout} />
        </>
      ) : (
        <div className="login-info">
          <p>Veuillez vous connecter pour accéder au forum.</p>
          <Link to="/login">Se connecter</Link>
        </div>
      )}
    </nav>
  );
}

export default NavigationPanel;
