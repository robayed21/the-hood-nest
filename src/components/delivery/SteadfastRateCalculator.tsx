import React, { useState } from 'react';
import { MapPin, ArrowRightLeft, Home, Building2, Zap, Package, Check, Sparkles } from 'lucide-react';
import { STEADFAST_DISTRICTS, DeliveryDistrict } from '../../data/steadfastLocations';

interface SteadfastRateCalculatorProps {
  onSelectRate?: (rate: number, district: DeliveryDistrict, deliveryType: 'home' | 'point') => void;
  isSpecialFreeShipping?: boolean;
}

export const SteadfastRateCalculator: React.FC<SteadfastRateCalculatorProps> = ({
  onSelectRate,
  isSpecialFreeShipping = false,
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dhaka-city');
  const [deliveryType, setDeliveryType] = useState<'home' | 'point'>('home');
  const [serviceSpeed, setServiceSpeed] = useState<'regular' | 'express'>('regular');
  const [weightKg, setWeightKg] = useState<number>(1);

  const selectedDistrict = STEADFAST_DISTRICTS.find(d => d.id === selectedDistrictId) || STEADFAST_DISTRICTS[0];

  // Calculate Base Rate according to Steadfast Courier Pricing shown in video:
  // Inside Dhaka: ৳70 base
  // Dhaka Suburbs: ৳100 base
  // Outside Dhaka: ৳130 base
  let calculatedRate = selectedDistrict.baseRateBDT;

  // Point delivery saves ৳15
  if (deliveryType === 'point') {
    calculatedRate -= 15;
  }

  // Express same day within Dhaka adds ৳45
  if (serviceSpeed === 'express' && selectedDistrict.zone === 'inside_dhaka') {
    calculatedRate += 45;
  }

  // Weight additional charge above 1kg
  if (weightKg > 1) {
    calculatedRate += (weightKg - 1) * 20;
  }

  const finalRate = isSpecialFreeShipping ? 0 : calculatedRate;

  const handleDistrictChange = (distId: string) => {
    setSelectedDistrictId(distId);
    const dist = STEADFAST_DISTRICTS.find(d => d.id === distId);
    if (dist && dist.zone !== 'inside_dhaka') {
      setServiceSpeed('regular'); // Express is only within Dhaka
    }
    if (onSelectRate && dist) {
      onSelectRate(finalRate, dist, deliveryType);
    }
  };

  const handleDeliveryTypeChange = (type: 'home' | 'point') => {
    setDeliveryType(type);
    if (onSelectRate) {
      onSelectRate(finalRate, selectedDistrict, type);
    }
  };

  return (
    <div className="bg-white rounded-sm border border-background-muted p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-background-muted pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
              Steadfast Courier Official Rates
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary mt-1">
            Know the delivery cost before you order
          </h3>
          <p className="text-xs text-brandText-muted">
            Live route calculation for all 64 districts with doorstep inspection guarantee.
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Steadfast Partner
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* 1. Route Selector */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Select Route (পিকআপ ও ডেলিভারি ডিস্ট্রিক্ট)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center">
              {/* Pickup District (Fixed Dispatch Hub) */}
              <div className="sm:col-span-5 bg-background/70 border border-background-muted rounded-sm p-2.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-brandText-muted block font-bold">
                    Pickup District
                  </span>
                  <span className="text-xs font-bold text-primary truncate block">
                    Dhaka City (The Hood Nest Hub)
                  </span>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="sm:col-span-1 flex justify-center text-brandText-muted">
                <ArrowRightLeft className="w-4 h-4 text-accent" />
              </div>

              {/* Delivery District Dropdown */}
              <div className="sm:col-span-5">
                <label className="text-[9px] uppercase tracking-wider text-brandText-muted block font-bold mb-1">
                  Delivery District *
                </label>
                <div className="relative">
                  <select
                    value={selectedDistrictId}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full bg-background border border-emerald-600/60 focus:border-emerald-600 rounded-sm p-2.5 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                  >
                    {STEADFAST_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — {d.zoneLabel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Zone Tag Display */}
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                selectedDistrict.zone === 'inside_dhaka'
                  ? 'bg-emerald-100 text-emerald-800'
                  : selectedDistrict.zone === 'dhaka_suburbs'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedDistrict.zoneLabel}
              </span>
              <span className="text-[11px] text-brandText-muted">
                Estimated Transit: <strong>{selectedDistrict.estimatedTime}</strong>
              </span>
            </div>
          </div>

          {/* 2. Delivery Type: Home vs Point Delivery */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Delivery Mode (ডেলিভারি ধরন)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Home Delivery */}
              <button
                type="button"
                onClick={() => handleDeliveryTypeChange('home')}
                className={`p-3 rounded-sm border text-left transition-all flex items-start gap-3 ${
                  deliveryType === 'home'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-background-muted bg-background/30 hover:border-primary/40'
                }`}
              >
                <div className={`p-2 rounded-sm ${deliveryType === 'home' ? 'bg-emerald-600 text-white' : 'bg-background text-brandText-muted'}`}>
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary">Home Delivery</span>
                    <span className="text-xs font-bold text-primary">৳{selectedDistrict.baseRateBDT}</span>
                  </div>
                  <p className="text-[10px] text-brandText-muted mt-0.5">
                    Direct doorstep delivery by Steadfast rider.
                  </p>
                </div>
              </button>

              {/* Point Delivery */}
              <button
                type="button"
                onClick={() => handleDeliveryTypeChange('point')}
                className={`p-3 rounded-sm border text-left transition-all flex items-start gap-3 ${
                  deliveryType === 'point'
                    ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                    : 'border-background-muted bg-background/30 hover:border-primary/40'
                }`}
              >
                <div className={`p-2 rounded-sm ${deliveryType === 'point' ? 'bg-emerald-600 text-white' : 'bg-background text-brandText-muted'}`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-primary">Point Delivery</span>
                    <span className="text-xs font-bold text-emerald-700">৳{selectedDistrict.baseRateBDT - 15}</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 font-medium mt-0.5">
                    Collect from nearest Steadfast hub (Saves ৳15!)
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 3. Service Speed & Weight Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Speed */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block mb-1.5">
                Speed:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setServiceSpeed('regular')}
                  className={`flex-1 py-1.5 px-3 rounded-sm text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                    serviceSpeed === 'regular'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-background border-background-muted text-brandText'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Regular</span>
                </button>

                {selectedDistrict.zone === 'inside_dhaka' && (
                  <button
                    type="button"
                    onClick={() => setServiceSpeed('express')}
                    className={`flex-1 py-1.5 px-3 rounded-sm text-xs font-semibold border flex items-center justify-center gap-1.5 ${
                      serviceSpeed === 'express'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-background border-background-muted text-brandText'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Express (+৳45)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Weight Indicator */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block mb-1.5">
                Parcel Weight: {weightKg} kg
              </span>
              <div className="flex gap-1.5">
                {[0.5, 1, 2, 3].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeightKg(w)}
                    className={`flex-1 py-1 text-xs font-bold rounded-sm border ${
                      weightKg === w
                        ? 'bg-accent text-white border-accent'
                        : 'bg-background border-background-muted text-brandText'
                    }`}
                  >
                    {w}kg
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Card (4 Cols - Exactly like the Steadfast video!) */}
        <div className="lg:col-span-4 bg-background p-5 rounded-sm border border-background-muted space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted block">
              Delivery Charge
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                ৳{finalRate}
              </span>
              {isSpecialFreeShipping && (
                <span className="text-xs line-through text-brandText-muted">
                  ৳{calculatedRate}
                </span>
              )}
            </div>
            <span className="text-xs text-brandText-muted mt-0.5 block">
              {selectedDistrict.zoneLabel} • {deliveryType === 'home' ? 'Home Delivery' : 'Point Collection'}
            </span>
          </div>

          {/* Highlights */}
          <div className="space-y-2 pt-2 border-t border-background-muted">
            {isSpecialFreeShipping ? (
              <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 shrink-0" />
                <span>The Hood Nest Free Shipping Offer Applied!</span>
              </div>
            ) : deliveryType === 'point' ? (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Point delivery saves you ৳15!</span>
              </div>
            ) : (
              <p className="text-[11px] text-brandText-muted">
                Tip: Choose "Point delivery" or add 2+ winter items to save shipping costs!
              </p>
            )}

            <div className="text-[11px] text-brandText-muted space-y-1 pt-1">
              <p>✓ Trackable parcel via Steadfast Courier</p>
              <p>✓ Open parcel & check fitting before payment</p>
              <p>✓ 100% Cash on Delivery supported</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

