// client/src/components/RegisterForm/RegisterForm.jsx
import { useState } from 'react';
import { register } from '../../services/api';        // axios
import './RegisterForm.css';                         

export default function RegisterForm({ onRegisterSuccess }) {
  // 1) État local pour tous les champs et pour les messages d'erreur/succès
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2) Gestion centralisée des changements sur les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // 3) Validation front-end avant l'appel API
  const validate = () => {
    if (form.password.length < 8) {
      return "Le mot de passe doit faire au moins 8 caractères.";
    }
    if (form.password !== form.passwordConfirm) {
      return "Les mots de passe ne correspondent pas.";
    }
    // simple regex email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Le format de l’email est invalide.";
    }
    if (!form.pseudo.trim()) {
      return "Le pseudo ne peut pas être vide.";
    }
    return null;
  };

  // 4) Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 4.a) Front validation
    const clientError = validate();
    if (clientError) {
      setError(clientError);
      return;
    }

    // 4.b) Appel API
    setLoading(true);
    try {
      await register({
        prenom:            form.prenom,
        nom:               form.nom,
        pseudo:            form.pseudo,
        email:             form.email,
        password:          form.password
      });
      setSuccess("Votre compte a bien été créé !");
      onRegisterSuccess();  // notifie le parent (ex. redirection)
    } catch (err) {
      // 4.c) Gestion des erreurs renvoyées par le serveur
      if (err.response) {
        if (err.response.status === 409) {
          // conflit d’unicité côté back
          setError(err.response.data.message || "Email ou pseudo déjà utilisé.");
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Une erreur est survenue, veuillez réessayer.");
        }
      } else {
        setError("Impossible de contacter le serveur.");
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
        <div>
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom" name="prenom" type="text"
            value={form.prenom} onChange={handleChange}
            placeholder="Entrez votre prénom" required
          />
        </div>
        <div>
          <label htmlFor="nom">Nom</label>
          <input
            id="nom" name="nom" type="text"
            value={form.nom} onChange={handleChange}
            placeholder="Entrez votre nom" required
          />
        </div>
        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo" name="pseudo" type="text"
            value={form.pseudo} onChange={handleChange}
            placeholder="Entrez votre pseudo" required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email"
            value={form.email} onChange={handleChange}
            placeholder="Entrez votre email" required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password" name="password" type="password"
            value={form.password} onChange={handleChange}
            placeholder="Au moins 8 caractères" required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirmation</label>
          <input
            id="passwordConfirm" name="passwordConfirm" type="password"
            value={form.passwordConfirm} onChange={handleChange}
            placeholder="Retapez votre mot de passe" required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
