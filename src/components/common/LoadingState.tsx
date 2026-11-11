import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  variant?: 'spinner' | 'skeleton';
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading winter collection...',
  variant = 'spinner',
  count = 3,
}) => {
  if (variant === 'skeleton') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="bg-white rounded-sm border border-background-muted p-4 space-y-4">
            <div className="w-full aspect-[4/5] bg-background-muted rounded-sm" />
            <div className="h-4 bg-background-muted rounded w-3/4" />
            <div className="h-3 bg-background-muted rounded w-1/2" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-background-muted rounded w-1/3" />
              <div className="h-8 bg-background-muted rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-4">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
      <p className="text-sm font-medium text-brandText-muted tracking-wide">{message}</p>
    </div>
  );
};

