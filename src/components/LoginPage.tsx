import React from 'react';
import { LoginButton } from './AuthButtons';
import { PageLayout, ContentCard } from './layouts';
import { APP_NAME } from '../constants/app';
import { Icons } from '../constants/icons';

export const LoginPage: React.FC = () => {
  return (
    <PageLayout showFooter={false}>
      <ContentCard className="max-w-md mx-auto">
        <div className="text-center space-y-6">
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
