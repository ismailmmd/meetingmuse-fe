import React from 'react';
import { LoginButton } from './AuthButtons';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MeetingMuse</h1>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome to MeetingMuse
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in to start your conversation
              </p>
            </div>
            
            <LoginButton />
          </div>
        </div>
        
        <p className="text-center text-sm text-gray-500">
          Secure authentication powered by Google OAuth 2.0
        </p>
      </div>
    </div>
  );
};
