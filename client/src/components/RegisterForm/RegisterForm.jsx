import React, { useState } from 'react';
import { register } from '../../services/api';

function RegisterForm({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await register(form.email, form.password); // NB : username ignoré par backend actuellement
    onRegisterSuccess();
  } catch (err) {
    console.error(err);
    // Affiche une erreur à l’utilisateur si nécessaire
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
