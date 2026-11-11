import React, { useState } from 'react';
import { X, Ruler, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightKg, setWeightKg] = useState<number>(70);

  if (!isOpen) return null;

  // Fit Calculation for Bangladeshi Men's Physique
  const calculateSize = (): { size: 'M' | 'L' | 'XL' | 'XXL'; advice: string } => {
    const totalInches = heightFeet * 12 + heightInches;

    if (totalInches <= 67 && weightKg <= 65) {
      return { size: 'M', advice: 'Recommended for slim-to-regular build under 5\'7" and 65 kg.' };
    }
    if (totalInches <= 70 && weightKg <= 76) {
      return { size: 'L', advice: 'Most popular fit. Gives a balanced, stylish streetwear drape.' };
    }
    if (totalInches <= 73 && weightKg <= 86) {
      return { size: 'XL', advice: 'Ideal for taller builds (5\'9"+) or chest sizes 44"-46".' };
    }
    return { size: 'XXL', advice: 'Extra room across the chest and shoulders for 86+ kg or 5\'11"+ height.' };
  };

  const calculated = calculateSize();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-background-muted p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-background-muted pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-accent/15 text-accent flex items-center justify-center">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Bangladesh Men's Size Advisor</h3>
              <p className="text-xs text-brandText-muted">Find your exact fit in seconds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-brandText-muted hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Fit Calculator */}
        <div className="bg-background/60 p-5 rounded-sm border border-background-muted space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Fit Calculator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Height input */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Your Height: {heightFeet} ft {heightInches} in
              </label>
              <div className="flex gap-2">
                <select
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="bg-white border border-background-muted text-xs p-2 rounded-sm w-1/2"
                >
                  <option value={5}>5 Feet</option>
                  <option value={6}>6 Feet</option>
                </select>
                <select
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="bg-white border border-background-muted text-xs p-2 rounded-sm w-1/2"
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={i}>{i} Inches</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weight input */}
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Your Weight: {weightKg} kg
              </label>
              <input
                type="range"
                min={50}
                max={105}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brandText-muted mt-1">
                <span>50 kg</span>
                <span>75 kg</span>
                <span>105 kg</span>
              </div>
            </div>
          </div>

          {/* Calculator Output Card */}
          <div className="bg-white p-4 rounded-sm border border-accent/30 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block">
                Recommended Size:
              </span>
              <span className="text-2xl font-extrabold text-primary">
                Size {calculated.size}
              </span>
              <p className="text-xs text-brandText-muted mt-0.5">
                {calculated.advice}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg shrink-0">
              {calculated.size}
            </div>
          </div>
        </div>

        {/* Measurement Specs Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
            Garment Measurements (Inches)
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-background-muted">
              <thead className="bg-background text-primary font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 border-b border-background-muted">Size</th>
                  <th className="p-2.5 border-b border-background-muted">Chest</th>
                  <th className="p-2.5 border-b border-background-muted">Length</th>
                  <th className="p-2.5 border-b border-background-muted">Shoulder</th>
                  <th className="p-2.5 border-b border-background-muted">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background-muted text-brandText">
                <tr className={calculated.size === 'M' ? 'bg-accent/10 font-bold' : ''}>
                  <td className="p-2.5 font-bold">M (Medium)</td>
                  <td className="p-2.5">38" - 40"</td>
                  <td className="p-2.5">27"</td>
                  <td className="p-2.5">20" (Drop)</td>
                  <td className="p-2.5">25"</td>
                </tr>
                <tr className={calculated.size === 'L' ? 'bg-accent/10 font-bold' : ''}>
                  <td className="p-2.5 font-bold">L (Large)</td>
                  <td className="p-2.5">41" - 43"</td>
                  <td className="p-2.5">28"</td>
                  <td className="p-2.5">21" (Drop)</td>
                  <td className="p-2.5">26"</td>
                </tr>
                <tr className={calculated.size === 'XL' ? 'bg-accent/10 font-bold' : ''}>
                  <td className="p-2.5 font-bold">XL (Extra Large)</td>
                  <td className="p-2.5">44" - 46"</td>
                  <td className="p-2.5">29"</td>
                  <td className="p-2.5">22" (Drop)</td>
                  <td className="p-2.5">27"</td>
                </tr>
                <tr className={calculated.size === 'XXL' ? 'bg-accent/10 font-bold' : ''}>
                  <td className="p-2.5 font-bold">XXL (Double XL)</td>
                  <td className="p-2.5">47" - 49"</td>
                  <td className="p-2.5">30"</td>
                  <td className="p-2.5">23" (Drop)</td>
                  <td className="p-2.5">27.5"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2">
          <Button variant="primary" fullWidth onClick={onClose}>
            Got It • Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};
