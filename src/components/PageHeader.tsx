import React from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  backTo?: string;
  backText?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  backTo = '/',
  backText = 'Back to Home',
}) => {
  return (
    <header className="blue-gradient shadow-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                MeetingMuse
              </h1>
              <p className="text-blue-100 text-sm font-medium">
                AI-Powered Meeting Scheduling
              </p>
            </div>
          </div>
          <Link
            to={backTo}
            className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-semibold transition-all duration-200 border border-white/30"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {backText}
          </Link>
        </div>
      </div>
    </header>
  );
};
