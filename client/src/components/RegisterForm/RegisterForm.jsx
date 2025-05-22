// client/src/components/RegisterForm/RegisterForm.jsx
import React, { useState } from 'react';
import { register } from '../../services/api';
import './RegisterForm.css';

export default function RegisterForm({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'user'
  });
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Met à jour un champ du formulaire
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Validation front-end
  const validate = () => {
    if (!form.pseudo.trim()) return 'Le pseudo est requis.';
    if (!form.email) return 'L’email est requis.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return 'Le format de l’email est invalide.';
    if (form.password.length < 8) {
      return 'Le mot de passe doit faire au moins 8 caractères.';
    }
    if (form.password !== form.passwordConfirm) {
      return 'Les mots de passe ne correspondent pas.';
    }
    return null;
  };

  // Envoi du formulaire
  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 1) Front validation
    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    setLoading(true);
    try {
      // 2) Appel à l'API register
      await register({
        username:   form.pseudo,
        email:    form.email,
        password: form.password,
        role:     form.role,
      });

      // Succès → message + callback parent
      setSuccess('Votre compte a bien été créé !');
      onRegisterSuccess();
    } catch (err) {
      // 3) Gestion des erreurs serveur
      if (err.response) {
        if (err.response.status === 409) {
          // conflit email ou pseudo déjà existant
          setError(err.response.data.message || 'Email ou pseudo déjà utilisé.');
        } else {
          setError(err.response.data.message || 'Une erreur est survenue, veuillez réessayer.');
        }
      } else {
        setError('Impossible de contacter le serveur.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Création de compte</h2>

      {error   && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo" name="pseudo" type="text"
            value={form.pseudo} onChange={handleChange}
            disabled={loading} required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email"
            value={form.email} onChange={handleChange}
            disabled={loading} required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password" name="password" type="password"
            value={form.password} onChange={handleChange}
            disabled={loading} required
          />
        </div>

        <div className="field">
          <label htmlFor="passwordConfirm">Confirmation</label>
          <input
            id="passwordConfirm" name="passwordConfirm" type="password"
            value={form.passwordConfirm} onChange={handleChange}
            disabled={loading} required
          />
        </div>
        <div className="field">
          <label htmlFor="role">Rôle</label>
          <select
            id="role"
            name="role"
            value={form.role || 'user'}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="user">Membre</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Création…' : 'Créer mon compte'}
        </button>
      </form>
    </div>
  );
}
