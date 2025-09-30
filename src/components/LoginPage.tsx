import React from 'react';
import { LoginButton } from './AuthButtons';
import { PageLayout, ContentCard } from './layouts';
import { APP_NAME } from '../constants/app';
import { Icons } from '../constants/icons';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const { authError, clearAuthError } = useAuth();

  return (
    <PageLayout showFooter={false}>
      <ContentCard className="max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="h-[120px] flex items-start">
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left w-full">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-600 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-semibold text-red-800">
                      Authentication Failed
                    </h3>
                    <p className="mt-1 text-sm text-red-700">
                      {authError === 'access_denied'
                        ? 'You cancelled the sign-in process. Please try again.'
                        : `Error: ${authError}. Please try signing in again or contact support if the issue persists.`}
                    </p>
                  </div>
                  <button
                    onClick={clearAuthError}
                    className="flex-shrink-0 ml-3 text-red-600 hover:text-red-800 transition-colors"
                    aria-label="Dismiss error"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Icons.Chat className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to {APP_NAME}
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
      </ContentCard>
    </PageLayout>
  );
};
