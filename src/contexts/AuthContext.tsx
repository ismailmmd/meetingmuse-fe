/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthService } from '../services/AuthService';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthSession {
  clientId: string;
  sessionId?: string;
  authenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  session: AuthSession | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Generate or get client ID for this browser session
const getClientId = (): string => {
  let clientId = localStorage.getItem('meetingmuse_client_id');
  if (!clientId) {
    clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('meetingmuse_client_id', clientId);
  }
  return clientId;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async (clientId: string): Promise<void> => {
    try {
      const data = await AuthService.getAuthStatus(clientId);

      if (data.authenticated && data.session_id) {
        setSession({
          clientId,
          sessionId: data.session_id,
          authenticated: true,
        });

        // Create user data for authenticated session
        const tempUser: User = {
          id: data.session_id,
          email: 'user@authenticated.com',
          name: `Authenticated User (${clientId})`,
          picture: 'https://ui-avatars.com/api/?name=AU'
        };
        setUser(tempUser);
      } else {
        setSession({
          clientId,
          authenticated: false,
        });
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setSession({
        clientId,
        authenticated: false,
      });
      setUser(null);
    }
  };

  const handleAuthCallback = useCallback(async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth_success');
    const authError = urlParams.get('auth_error');

    if (authSuccess === 'true') {
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Check auth status to get session info
      const clientId = getClientId();
      await checkAuthStatus(clientId);
    } else if (authError) {
      console.error('OAuth authentication error:', authError);
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const clientId = getClientId();
      
      // Handle OAuth callback if present
      await handleAuthCallback();
      
      // Check current auth status
      await checkAuthStatus(clientId);
      
      setIsLoading(false);
    };

    initAuth();
  }, [handleAuthCallback]);

  const login = async (): Promise<void> => {
    try {
      const clientId = getClientId();
      const data = await AuthService.startOAuthFlow(clientId);
      
      // Redirect to Google OAuth
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const clientId = getClientId();
      await AuthService.logout(clientId);
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Always clear local state
      setUser(null);
      setSession({
        clientId: getClientId(),
        authenticated: false,
      });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!session?.authenticated && !!user,
    session,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
