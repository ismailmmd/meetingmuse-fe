import React from 'react';
import { Card } from '../ui/Card';

interface ContentCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Standard content card wrapper for page content
 * Provides consistent padding and styling
 */
export const ContentCard: React.FC<ContentCardProps> = ({
  children,
  className = '',
}) => {
  return <Card className={`p-8 mb-8 ${className}`}>{children}</Card>;
};
