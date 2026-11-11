import React from 'react';
import { X } from 'lucide-react';
import { SteadfastRateCalculator } from './SteadfastRateCalculator';

interface DeliveryCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryCalculatorModal: React.FC<DeliveryCalculatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl border border-background-muted p-2 z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-brandText-muted hover:text-primary transition-colors bg-white/80 rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <SteadfastRateCalculator />
      </div>
    </div>
  );
};

