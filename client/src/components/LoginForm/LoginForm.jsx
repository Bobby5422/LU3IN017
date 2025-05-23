// client/src/components/LoginForm/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import './LoginForm.css';

export default function LoginForm({ onLoginSuccess }) {
  const navigate = useNavigate();         // ← on récupère useNavigate
  const [form, setForm]         = useState({ email: '', password: '' });
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.email) return 'L’email est requis.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Le format de l’email est invalide.';
    if (!form.password) return 'Le mot de passe est requis.';
    if (form.password.length < 8)
      return 'Le mot de passe doit faire au moins 8 caractères.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    setLoading(true);
    try {
      const { data, status } = await login(form.email, form.password);
      if (status === 200) {
        setTimeout(() => {
          onLoginSuccess(data);   // déclenche setIsConnected(true) dans App
          navigate('/main');
        }, 100); // 100ms suffisent souvent, sinon essaie 200
      } else {
        setError('Échec de la connexion.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Identifiants incorrects.');
      } else {
        setError(err.response?.data?.error || 'Erreur inattendue du serveur.');
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
        {error && <div className="error">{error}</div>}

        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
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

      <div className="footer">
        <span>Pas de compte ? </span>
        {/* ← on navigue vers /register directement */}
        <button
          type="button"
          className="switch-button"
          onClick={() => navigate('/register')}
          disabled={loading}
        >
          Inscription
        </button>
      </div>
    </div>
  );
}
