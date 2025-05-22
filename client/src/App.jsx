// client/src/App.jsx
import React, { useState } from 'react';
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
  // État de connexion
  const [isConnected, setIsConnected] = useState(false);

  // Après un login réussi
  const handleLoginSuccess = () => {
    setIsConnected(true);
  };

  // Après une inscription réussie : on redirige vers /login
  // ici on utilise window.location pour faire simple,
  // mais tu peux aussi gérer via useNavigate depuis RegisterForm.
  const handleRegisterSuccess = () => {
    window.location.href = '/login';
  };

  // Logout
  const handleLogout = () => {
    setIsConnected(false);
  };

  return (
    <Router>
      {/* La barre de nav passe handleLogout */}
      <NavigationPanel isConnected={isConnected} logout={handleLogout} />

      <Routes>
        {/* landing page "/" redirige vers login ou main */}
        <Route
          path="/"
          element={
            isConnected
              ? <Navigate to="/main" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Page de connexion */}
        <Route
          path="/login"
          element={
            isConnected
              ? <Navigate to="/main" replace />
              : <LoginForm onLoginSuccess={handleLoginSuccess} />
          }
        />

        {/* Page d'inscription */}
        <Route
          path="/register"
          element={
            isConnected
              ? <Navigate to="/main" replace />
              : <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
          }
        />

        {/* Forum (protégé) */}
        <Route
          path="/main"
          element={
            isConnected
              ? <MainPage />
              : <Navigate to="/login" replace />
          }
        />

        {/* Profil (protégé) */}
        <Route
          path="/profile"
          element={
            isConnected
              ? <Profile />
              : <Navigate to="/login" replace />
          }
        />

        {/* Admin (protégé) */}
        <Route
          path="/admin"
          element={
            isConnected
              ? <AdminDashboard />
              : <Navigate to="/login" replace />
          }
        />

        {/* Toute autre route → "/" */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
