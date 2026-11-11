import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found in this category',
  description = 'Our winter collection is constantly updated. Check back soon for new drops or explore other categories.',
  icon,
  actionText = 'Browse All Items',
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center bg-white rounded-sm border border-background-muted ${className}`}>
      <div className="w-16 h-16 rounded-full bg-background-muted flex items-center justify-center text-accent mb-4">
        {icon || <PackageOpen className="w-8 h-8 stroke-[1.5]" />}
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-brandText-muted max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

