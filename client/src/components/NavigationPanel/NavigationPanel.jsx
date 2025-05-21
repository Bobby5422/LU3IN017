import React from 'react';
import LogoutButton from '../LogoutButton/LogoutButton';
import './NavigationPanel.css';

function NavigationPanel({ isConnected, logout, login }) {
  return (
    <nav className="header">
      <div className="header-left">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
      </div>

      <div className="header-center">
        <h1>Organiz'Asso</h1>
      </div>

      <div className="header-right">
        {isConnected ? (
          <>
            <ul className="nav-links">
              <li><button onClick={() => window.location.reload()}>Forum Ouvert</button></li>
              <li><button onClick={() => alert('Page Profil à implémenter')}>Profil</button></li>
              <li><button onClick={() => alert('Page AdminPanel (si admin) à implémenter')}>Admin Panel</button></li>
            </ul>
            <LogoutButton logout={logout} />
          </>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    </nav>
  );
}


export default NavigationPanel;
