// src/components/LoginForm/LoginForm.jsx
import { useState } from 'react';
import { login } from '../../services/api';
import './LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login(email, password);
      if (response.status === 200) {
        onLoginSuccess(); // notifie App.js ou parent que l'utilisateur est connecté
      }
    } catch (err) {
      setError('Identifiants invalides ou erreur serveur.');
      console.error(err);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;
