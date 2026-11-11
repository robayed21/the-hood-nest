import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Phone, Truck, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS } from './Navigation';
import { Logo } from './Logo';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-sm bg-background h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-background-muted flex items-center justify-between bg-white">
          <Logo withTagline />
          <button
            onClick={onClose}
            className="p-2 text-brandText-muted hover:text-primary transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="py-4 px-5 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-accent mb-3">
            Collections & Pages
          </p>
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 px-3 rounded-sm text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-brandText hover:bg-white'
                  }`
                }
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-accent text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Trust Badges in Drawer */}
        <div className="p-5 bg-white border-t border-background-muted space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-brandText-muted">
            <Truck className="w-4 h-4 text-accent shrink-0" />
            <span>Cash on Delivery all over Bangladesh</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-brandText-muted">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
            <span>Check parcel before payment</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-brandText-muted">
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <span>Support: +880 1700-000000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

