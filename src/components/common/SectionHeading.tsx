import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl mb-8 md:mb-12 ${alignmentClass} ${className}`}>
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest text-accent font-semibold px-2.5 py-1 rounded bg-accent/10 mb-2.5">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-sm md:text-base text-brandText-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

