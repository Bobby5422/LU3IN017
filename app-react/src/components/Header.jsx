import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo_sorbonne.png" alt="Logo Organiz'Asso" />
      </div>
      <div className="title">
        <h1>Organiz'Asso</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/register">Enregistrement</Link>
        <Link to="/profile">Profil</Link>
      </div>
    </header>
  );
}

export default Header;
