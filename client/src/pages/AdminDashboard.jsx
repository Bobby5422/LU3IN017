import React from 'react';
import UserValidationList from '../components/UserValidationList/UserValidationList';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Tableau de Bord Administrateur</h2>
      <UserValidationList />
      {/* autres options */}
    </div>
  );
}

export default AdminDashboard;
