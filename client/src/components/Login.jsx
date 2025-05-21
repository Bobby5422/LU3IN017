import React, { useState } from 'react';

function Login() {
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel à l'API REST login
    // Exemple : api.login(credentials).then(...);
  };

  return (
    <div className="login">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Login</label>
        <input type="text" id="login" name="login" onChange={handleChange} required />

        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" onChange={handleChange} required />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
