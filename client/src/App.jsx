import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [page, setPage] = useState('main'); // 'home', 'main', etc.

  const handleLoginSuccess = () => {
    setIsConnected(true);
    setPage('main');
  };

  const handleLogout = () => {
    setIsConnected(false);
    setPage('home');
  };

  return (
    <Router>
      <div className="App">
        <NavigationPanel isConnected={isConnected} logout={handleLogout} />
        
        <Routes>
          <Route path="/" element={isConnected ? <Navigate to="/main" /> : <Home onLoginSuccess={handleLoginSuccess} /> } />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/main" element={isConnected ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isConnected ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isConnected ? <AdminDashboard /> : <Navigate to="/login" />} />
          {/* Autres routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;