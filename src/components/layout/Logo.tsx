import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  withTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  withTagline = false,
}) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Stylized Hexagonal Hood-Nest Icon */}
      <div className={`w-9 h-9 rounded-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
        isLight ? 'bg-white text-primary' : 'bg-primary text-white shadow-sm'
      }`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          <path
            d="M16 4L27 10V22L16 28L5 22V10L16 4Z"
            stroke={isLight ? '#14283F' : '#A67C52'}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M16 9L23 13V19L16 23L9 19V13L16 9Z"
            fill={isLight ? '#14283F' : '#A67C52'}
            fillOpacity="0.25"
            stroke={isLight ? '#14283F' : '#A67C52'}
            strokeWidth="1.5"
          />
          <circle cx="16" cy="16" r="2.5" fill={isLight ? '#A67C52' : '#F5F2EB'} />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-bold tracking-widest text-base sm:text-lg uppercase transition-colors ${
          isLight ? 'text-white' : 'text-primary'
        }`}>
          THE HOOD NEST
        </span>
        {withTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium ${
            isLight ? 'text-white/70' : 'text-accent'
          }`}>
            YOUR COMFORT. YOUR STYLE.
          </span>
        )}
      </div>
    </Link>
  );
};

