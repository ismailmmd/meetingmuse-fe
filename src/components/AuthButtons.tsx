import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const LoginButton: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoggingIn}
      className={`
        px-6 py-3 rounded-lg font-medium text-white transition-colors
        ${
          isLoggingIn
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
        }
      `}
    >
      {isLoggingIn ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Signing in...
        </div>
      ) : (
        'Sign in with OAuth'
      )}
    </button>
  );
};

export const LogoutButton: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex items-center space-x-3">
      {user?.picture && (
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
      )}
      <span className="text-white text-sm">{user?.name}</span>
      <button
        onClick={logout}
        className="
          px-4 py-2 rounded-lg font-medium text-white
          bg-red-600 hover:bg-red-700 active:bg-red-800
          transition-colors
        "
      >
        Logout
      </button>
    </div>
  );
};
