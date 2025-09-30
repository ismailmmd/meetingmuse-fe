import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'outlined';
}

/**
 * Reusable card component with consistent styling
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'glass',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass-effect';
      case 'solid':
        return 'bg-white shadow-lg';
      case 'outlined':
        return 'bg-white border-2 border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl ${getVariantClasses()} ${className}`}>
      {children}
    </div>
  );
};
