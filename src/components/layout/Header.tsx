import React, { useState } from 'react';
import { Menu, ShoppingBag, Sparkles, Ruler, Truck } from 'lucide-react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';
import { useCart } from '../../context/CartContext';
import { SizeGuideModal } from '../common/SizeGuideModal';
import { DeliveryCalculatorModal } from '../delivery/DeliveryCalculatorModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isDeliveryCalcOpen, setIsDeliveryCalcOpen] = useState(false);
  const { totalItems, setIsCartDrawerOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-background-muted transition-all">
        {/* Top Announcement Bar */}
        <div className="bg-primary text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>
            Winter '26 Drop: <strong>Buy Any 2 Items & Get Free Shipping</strong> across Bangladesh!
          </span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Button & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-primary hover:text-accent focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Logo withTagline />
          </div>

          {/* Center: Desktop Navigation */}
          <Navigation />

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Steadfast Delivery Calculator Trigger */}
            <button
              onClick={() => setIsDeliveryCalcOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition-colors py-1.5 px-2.5 rounded-sm bg-emerald-50 border border-emerald-200"
              aria-label="Steadfast Delivery Rates"
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Delivery Rates</span>
            </button>

            {/* Quick Size Guide Button */}
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary/80 hover:text-accent transition-colors py-1.5 px-2.5 rounded-sm bg-white/60 border border-background-muted hover:border-accent"
              aria-label="Size Advisor"
            >
              <Ruler className="w-3.5 h-3.5 text-accent" />
              <span>Size Guide</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 text-primary hover:text-accent transition-colors flex items-center gap-2"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-1 sm:right-auto sm:relative bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Global Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Steadfast Delivery Calculator Modal */}
      <DeliveryCalculatorModal
        isOpen={isDeliveryCalcOpen}
        onClose={() => setIsDeliveryCalcOpen(false)}
      />
    </>
  );
};
