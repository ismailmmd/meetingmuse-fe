import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Reusable page title component for consistent heading styles across pages
 */
export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
    </div>
  );
};
