import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatApp } from './components/ChatApp';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import './index.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <ChatApp />;
  }

  return showLogin ? (
    <LoginPage onBack={() => setShowLogin(false)} />
  ) : (
    <HomePage onGetStarted={() => setShowLogin(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Analytics />
      <SpeedInsights />
    </AuthProvider>
  );
}

export default App;
