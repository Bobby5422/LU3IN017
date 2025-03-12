import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // Initialisation de l'état pour l'utilisateur
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simuler une authentification et définir l'utilisateur.
    // Dans une application réelle, vous appelleriez une API ou utiliseriez un contexte.
    setUser({ role: 'admin', name: 'Admin User' });
  }, []);

  return (
    <Router>
      <Header />
      {/* Afficher le tableau de bord admin uniquement si l'utilisateur est admin */}
      {user && user.role === 'admin' && <AdminDashboard />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
