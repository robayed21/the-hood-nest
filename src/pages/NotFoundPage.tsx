import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <EmptyState
        title="404 — Page Not Found"
        description="The winter collection page you are looking for has been moved or does not exist."
        actionText="Back to The Nest"
        onAction={() => navigate('/')}
      />
    </div>
  );
};

