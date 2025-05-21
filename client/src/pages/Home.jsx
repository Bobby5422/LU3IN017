import React, { useState } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

function Home({ onLoginSuccess }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="home">
      <h2>Bienvenue sur le forum</h2>

      <div>
        <button onClick={() => setShowLogin(true)}>Se connecter</button>
        <button onClick={() => setShowLogin(false)}>Créer un compte</button>
      </div>

      {showLogin 
        ? <LoginForm onLoginSuccess={onLoginSuccess} />
        : <RegisterForm onRegisterSuccess={onLoginSuccess} />
      }
    </div>
  );
}

export default Home;
