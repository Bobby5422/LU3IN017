import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    pseudo: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appel à l'API REST createUser
    // Exemple : api.createUser(formData).then(...);
  };

  return (
    <div className="register">
      <h1>Création de compte</h1>
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <div className="grid-container">
          <label htmlFor="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" placeholder="Entrez votre prénom" required onChange={handleChange} />

          <label htmlFor="nom">Nom</label>
          <input type="text" id="nom" name="nom" placeholder="Entrez votre nom" required onChange={handleChange} />

          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" id="pseudo" name="pseudo" placeholder="Entrez votre pseudo" required onChange={handleChange} />

          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required onChange={handleChange} />

          <label htmlFor="passwordConfirm">Retapez votre mot de passe</label>
          <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Retapez votre mot de passe" required onChange={handleChange} />

          <button type="submit">Créer un compte</button>
          <button type="button" onClick={() => window.location.href = '/'}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
