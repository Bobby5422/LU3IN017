// client/src/App.jsx
import React, { useState } from 'react';
import { useEffect } from 'react';
import { fetchCurrentUser } from './services/api';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import LoginForm       from './components/LoginForm/LoginForm';
import RegisterForm    from './components/RegisterForm/RegisterForm';
import MainPage        from './pages/MainPage';
import Profile         from './pages/Profile';
import AdminDashboard  from './pages/AdminDashboard';
import { logout } from './services/api'; // si ce n'est pas encore importé

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [role, setRole] = useState(null); // "admin", "user", ou null
  
  const handleLoginSuccess    = () => setIsConnected(true);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err.response || err.message || err);
    } finally {
      setIsConnected(false);
      setRole(null);
      window.location.href = '/login';
    }
  };

  const handleRegisterSuccess = () => window.location.href = '/login';

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetchCurrentUser();
        console.log("Utilisateur connecté:", response.data); // 👈 Ajoute ça
        setIsConnected(true);
        setRole(response.data.role); // Ajoute cette ligne
      } catch (err) {
        setIsConnected(false);
        setRole(null); // Reset du rôle
      }
    }

    checkSession();
  }, []);

  return (
    <Router>
      <NavigationPanel isConnected={isConnected} role={role} logout={handleLogout} />

      <Routes>
        <Route path="/" element={
          isConnected
            ? <Navigate to="/main" replace />
            : <Navigate to="/login" replace />
        }/>

        <Route path="/login" element={
          isConnected
            ? <Navigate to="/main" replace />
            : <LoginForm onLoginSuccess={handleLoginSuccess} />
        }/>

        <Route path="/register" element={
          isConnected
            ? <Navigate to="/main" replace />
            : <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        }/>

        <Route path="/main" element={
          isConnected
            ? <MainPage />
            : <Navigate to="/login" replace />
        }/>

        {/* Nouvelle route pour le profil */}
        <Route path="/profile" element={
          isConnected
            ? <Profile />
            : <Navigate to="/login" replace />
        }/>

        <Route path="/admin" element={
          isConnected
            ? <AdminDashboard />
            : <Navigate to="/login" replace />
        }/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
