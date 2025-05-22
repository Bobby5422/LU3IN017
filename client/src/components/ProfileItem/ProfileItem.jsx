// client/src/components/ProfileItem/ProfileItem.jsx
import React, { useState } from 'react';
import './ProfileItem.css';

/**
 * Affiche les informations d’un utilisateur et permet leur modification si c’est son propre profil.
 *
 * Props :
 *  - user            : l’objet utilisateur { _id, prenom, nom, pseudo, email, role }
 *  - isOwnProfile    : booléen, true si c’est le profil du currentUser
 *  - onUpdateProfile : fn(userId, updatedData) => Promise, appelée quand on sauve les modifs
 */
export default function ProfileItem({ user, isOwnProfile, onUpdateProfile }) {
  // Mode édition actif ?
  const [editMode, setEditMode] = useState(false);
  // Formulaire contrôlé pour les champs éditables
  const [form, setForm] = useState({
    prenom: user.prenom || '',
    nom:    user.nom    || '',
    pseudo: user.pseudo || '',
    email:  user.email  || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  // Met à jour un champ de saisie
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Soumets les modifications
  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    // ici tu peux ajouter de la validation front (email, longueur, etc.)
    if (!form.prenom.trim() || !form.nom.trim()) {
      setError('Le prénom et le nom sont requis.');
      return;
    }

    setLoading(true);
    try {
      await onUpdateProfile(user._id, form);
      setSuccess('Profil mis à jour !');
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-item">
      <h2>Profil de {user.pseudo}</h2>

      {/* Affichage des messages d’état */}
      {error   && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="fields">
        {/** Prénom */}
        <label>Prénom :</label>
        {editMode
          ? <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              disabled={loading}
            />
          : <span>{user.prenom}</span>
        }

        {/** Nom */}
        <label>Nom :</label>
        {editMode
          ? <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              disabled={loading}
            />
          : <span>{user.nom}</span>
        }

        {/** Pseudo */}
        <label>Pseudo :</label>
        {editMode
          ? <input
              name="pseudo"
              value={form.pseudo}
              onChange={handleChange}
              disabled={loading}
            />
          : <span>{user.pseudo}</span>
        }

        {/** Email */}
        <label>Email :</label>
        {editMode
          ? <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          : <span>{user.email}</span>
        }
      </div>

      {isOwnProfile && (
        <div className="actions">
          {editMode
            ? <>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="save-btn"
                >
                  {loading ? 'Enregistrement…' : 'Sauver'}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  disabled={loading}
                  className="cancel-btn"
                >
                  Annuler
                </button>
              </>
            : <button
                onClick={() => setEditMode(true)}
                className="edit-btn"
              >
                Modifier mon profil
              </button>
          }
        </div>
      )}
    </div>
  );
}
