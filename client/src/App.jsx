import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import EditProfile from './components/EditProfile';
import UserList from './components/UserList';
import ManageMessageList from './components/ManageMessageList';
import Notification from './components/Notification';
import LogOutButton from './components/LogOutButton';

function App() {
  // Initialisation de l'état pour l'utilisateur
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulation d'une authentification : ici, on définit un utilisateur admin.
    // Dans une application réelle, vous récupérerez ces informations via une API ou un contexte.
    setUser({ role: 'admin', name: 'Admin User', pseudo: 'adminuser' });
  }, []);

  return (
    <Router>
      <Header user={user} />
      {/* Notification globale */}
      <Notification message="Bienvenue sur Organiz'Asso" type="info" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={(data) => setUser(data)} />} />
        <Route path="/register" element={<Register onRegister={(data) => setUser(data)} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/profile/edit" element={<EditProfile userInfo={user} onUpdate={(data) => setUser({ ...user, ...data })} />} />
        {/* Pages d'administration */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/manage-messages" element={<ManageMessageList />} />
      </Routes>
      {/* Bouton de déconnexion global, visible si l'utilisateur est connecté */}
      {user && <LogOutButton onLogout={() => setUser(null)} />}
    </Router>
  );
}

export default App;
