import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatApp } from './components/ChatApp';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { ContactPage } from './components/ContactPage';
import './index.css';

type PageType = 'home' | 'login' | 'privacy' | 'terms' | 'contact';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('home');

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

  switch (currentPage) {
    case 'login':
      return <LoginPage onBack={() => setCurrentPage('home')} />;
    case 'privacy':
      return <PrivacyPage onBack={() => setCurrentPage('home')} />;
    case 'terms':
      return <TermsPage onBack={() => setCurrentPage('home')} />;
    case 'contact':
      return <ContactPage onBack={() => setCurrentPage('home')} />;
    case 'home':
    default:
      return (
        <HomePage
          onGetStarted={() => setCurrentPage('login')}
          onPrivacyClick={() => setCurrentPage('privacy')}
          onTermsClick={() => setCurrentPage('terms')}
          onContactClick={() => setCurrentPage('contact')}
        />
      );
  }
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
