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

import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  
  const handleLoginSuccess    = () => setIsConnected(true);
  const handleLogout          = () => setIsConnected(false);
  const handleRegisterSuccess = () => window.location.href = '/login';

  useEffect(() => {
    async function checkSession() {
      try {
        await fetchCurrentUser();
        setIsConnected(true); // l'utilisateur est bien connecté côté serveur
      } catch (err) {
        setIsConnected(false); // pas connecté (erreur 401, etc.)
      }
    }

    checkSession();
  }, []);

  return (
    <Router>
      <NavigationPanel isConnected={isConnected} logout={handleLogout} />

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
