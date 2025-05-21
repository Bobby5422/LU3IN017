import React, { useState } from 'react';

function EditProfile({ userInfo, onUpdate }) {
  const [formData, setFormData] = useState({
    prenom: userInfo.prenom || '',
    nom: userInfo.nom || '',
    email: userInfo.email || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form className="edit-profile" onSubmit={handleSubmit}>
      <h2>Editer le profil</h2>
      <label>
        Prénom:
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
      </label>
      <label>
        Nom:
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <button type="submit">Sauvegarder</button>
    </form>
  );
}

export default EditProfile;
