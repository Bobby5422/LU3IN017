// client/src/components/LoginForm/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import './LoginForm.css';

export default function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const navigate = useNavigate();

  // État contrôlé du formulaire
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1) Gestion centralisée des changements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // 2) Validation client côté front
  const validate = () => {
    const { email, password } = form;

    if (!email) return 'L’email est requis.';
    // simple regex pour valider le format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Le format de l’email est invalide.';

    if (!password) return 'Le mot de passe est requis.';
    if (password.length < 8) return 'Le mot de passe doit faire au moins 8 caractères.';

    return null;
  };

  // 3) Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 3.a) Erreur front si validation KO
    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    // 3.b) Appel API
    setLoading(true);
    try {
      const { data, status } = await login(form.email, form.password);

      if (status === 200) {
        // remonte l'objet user (data) vers App.jsx
        onLoginSuccess(data);
        // redirection vers la page principale
        navigate('/main');
      } else {
        setError('Échec de la connexion.');
      }
    } catch (err) {
      // 3.c) Gestion des erreurs serveur / API
      if (err.response) {
        // 401 Unauthorized
        if (err.response.status === 401) {
          setError('Identifiants incorrects.');
        } else {
          // message d’erreur renvoyé par le back (err.response.data.error)
          setError(err.response.data.error || 'Erreur inattendue du serveur.');
        }
      } else {
        // pas de réponse (serveur injoignable, problème réseau…)
        setError('Impossible de joindre le serveur.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} noValidate>
        <h2>Connexion</h2>

        {/* Affichage des messages d'erreur */}
        {error && <div className="error">{error}</div>}

        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemple@domaine.com"
            disabled={loading}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="login-password">Mot de passe</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      {/* Lien / bouton pour basculer vers l'inscription */}
      <div className="footer">
        <span>Pas de compte ? </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          disabled={loading}
        >
          Inscription
        </button>
      </div>
    </div>
  );
}
