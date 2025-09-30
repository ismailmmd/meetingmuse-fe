import React from 'react';
import { Link } from 'react-router-dom';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ButtonProps extends BaseButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  to: string;
}

const getVariantClasses = (variant: 'primary' | 'secondary' | 'ghost') => {
  switch (variant) {
    case 'primary':
      return 'blue-gradient text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1';
    case 'secondary':
      return 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white';
    case 'ghost':
      return 'text-blue-600 hover:text-blue-800 hover:bg-blue-50';
  }
};

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-sm';
    case 'md':
      return 'px-6 py-3 text-base';
    case 'lg':
      return 'px-8 py-4 text-lg';
  }
};

/**
 * Reusable button component with consistent styling
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-lg transition-all duration-200 ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

/**
 * Reusable link button component with consistent styling
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <Link
      to={to}
      className={`inline-block text-center font-semibold rounded-lg transition-all duration-200 ${variantClasses} ${sizeClasses} ${className}`}
    >
      {children}
    </Link>
  );
};
