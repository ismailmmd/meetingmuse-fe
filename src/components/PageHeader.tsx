import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE, ROUTES } from '../constants/app';
import { Icons } from '../constants/icons';

interface PageHeaderProps {
  backTo?: string;
  backText?: string;
}

/**
 * Shared page header component for all static pages
 * Displays app branding and navigation
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  backTo = ROUTES.HOME,
  backText = 'Back to Home',
}) => {
  return (
    <header className="blue-gradient shadow-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Icons.Chat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {APP_NAME}
              </h1>
              <p className="text-blue-100 text-sm font-medium">{APP_TAGLINE}</p>
            </div>
          </div>
          <Link
            to={backTo}
            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-semibold transition-all duration-200 border border-white/30"
          >
            <Icons.ArrowLeft className="w-4 h-4 mr-2" />
            {backText}
          </Link>
        </div>
      </div>
    </header>
  );
};
