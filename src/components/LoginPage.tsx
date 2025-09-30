import React from 'react';
import { LoginButton } from './AuthButtons';
import { PageHeader } from './PageHeader';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <PageHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-effect rounded-xl p-8 mb-8 max-w-md mx-auto">
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                MeetingMuse
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Sign in to get started
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to MeetingMuse
              </h2>
              <p className="text-gray-600 mb-6">
                Please sign in to start your conversation with our AI meeting
                assistant
              </p>
            </div>

            <LoginButton />

            <p className="text-sm text-gray-500">
              Secure authentication powered by Google OAuth 2.0
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
