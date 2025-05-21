import React from 'react';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Tableau de Bord Administrateur</h2>
      <div className="admin-options">
        {/* Boutons et liens pour la gestion des inscriptions, la modération, etc. */}
        <button>Valider une inscription</button>
        <button>Retirer le statut admin</button>
        {/* Autres options */}
      </div>
    </div>
  );
}

export default AdminDashboard;
