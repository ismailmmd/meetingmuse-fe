import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatApp } from './components/ChatApp';
import { LoginPage } from './components/LoginPage';
import './index.css';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

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

  return isAuthenticated ? <ChatApp /> : <LoginPage />;
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
