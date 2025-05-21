import { useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import MainPage from './pages/MainPage';
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
    <div className="App">
      <NavigationPanel
        isConnected={isConnected}
        logout={handleLogout}
        login={handleLoginSuccess}
      />

      {isConnected && page === 'main' ? (
        <MainPage />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;