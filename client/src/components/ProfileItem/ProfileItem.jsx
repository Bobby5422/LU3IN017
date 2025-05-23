// client/src/components/ProfileItem/ProfileItem.jsx
import React, { useState } from 'react';
import './ProfileItem.css';

/**
 * Affiche et (si isOwnProfile) édite le profil d’un utilisateur.
 *
 * Props :
 *  - user            : { _id, prenom, nom, pseudo, email, role, ... }
 *  - isOwnProfile    : boolean, true si c’est le profil du user connecté
 *  - onUpdateProfile : function(userId, updatedData) => Promise
 */
export default function ProfileItem({ user, isOwnProfile, onUpdateProfile }) {
  // mode édition
  const [editMode, setEditMode] = useState(false);

  // formulaire contrôlé initialisé avec les données du user
  const [form, setForm] = useState({
    prenom: user.prenom || '',
    nom:    user.nom    || '',
    pseudo: user.pseudo || '',
    email:  user.email  || '',
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  // mise à jour d’un champ
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // sauvegarde des modifications via onUpdateProfile
  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    // validation front
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

      {/* Messages d’état */}
      {error   && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <div className="fields">
        <label>Prénom :</label>
        {editMode
          ? <input name="prenom" value={form.prenom} onChange={handleChange} disabled={loading} />
          : <span>{user.prenom}</span>
        }

        <label>Nom :</label>
        {editMode
          ? <input name="nom" value={form.nom} onChange={handleChange} disabled={loading} />
          : <span>{user.nom}</span>
        }

        <label>Pseudo :</label>
        {editMode
          ? <input name="pseudo" value={form.pseudo} onChange={handleChange} disabled={loading} />
          : <span>{user.pseudo}</span>
        }

        <label>Email :</label>
        {editMode
          ? <input name="email" type="email" value={form.email} onChange={handleChange} disabled={loading} />
          : <span>{user.email}</span>
        }
      </div>

      {isOwnProfile && (
        <div className="actions">
          {editMode
            ? <>
                <button className="save-btn" onClick={handleSave} disabled={loading}>
                  {loading ? 'Enregistrement…' : 'Sauver'}
                </button>
                <button className="cancel-btn" onClick={() => setEditMode(false)} disabled={loading}>
                  Annuler
                </button>
              </>
            : <button className="edit-btn" onClick={() => setEditMode(true)}>
                Modifier mon profil
              </button>
          }
        </div>
      )}
    </div>
  );
}
