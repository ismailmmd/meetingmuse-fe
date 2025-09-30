import React from 'react';
import { PageHeader } from '../PageHeader';
import { Footer } from '../ui/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  backTo?: string;
  backText?: string;
}

/**
 * Standard page layout wrapper for all static pages
 * Provides consistent structure with header and optional footer
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showFooter = true,
  backTo,
  backText,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <PageHeader backTo={backTo} backText={backText} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};
