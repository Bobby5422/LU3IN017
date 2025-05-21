import React, { useState } from 'react';

function RegisterForm({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Appel API pour créer le compte
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (response.ok) {
      onRegisterSuccess(); // redirige vers la page principale
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Créer un compte</h3>
      <input type="text" placeholder="Nom d'utilisateur" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mot de passe" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default RegisterForm;
