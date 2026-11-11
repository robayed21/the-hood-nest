import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, CheckCircle2, ShoppingBag, ArrowLeft, Phone, AlertCircle, Building2, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { STEADFAST_DISTRICTS } from '../data/steadfastLocations';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotalBDT, totalItems, clearCart } = useCart();

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Steadfast Location State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dhaka-city');
  const [deliveryType, setDeliveryType] = useState<'home' | 'point'>('home');

  // Order submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedDistrict = STEADFAST_DISTRICTS.find(d => d.id === selectedDistrictId) || STEADFAST_DISTRICTS[0];

  // Delivery Pricing Logic (Steadfast Official Partner Rates)
  const isFreeDelivery = totalItems >= 2;
  let calculatedShippingFee = selectedDistrict.baseRateBDT;
  if (deliveryType === 'point') {
    calculatedShippingFee = Math.max(0, calculatedShippingFee - 15);
  }
  const effectiveShippingFee = isFreeDelivery ? 0 : calculatedShippingFee;
  const grandTotal = subtotalBDT + effectiveShippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMsg('Please enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX).');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Please provide your complete delivery address (Area, Road, House).');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant order confirmation
    setTimeout(() => {
      const generatedId = `HN-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setOrderComplete(true);
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="py-16 sm:py-24 max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded">
            Steadfast Express Delivery • Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-primary">
            Thank You, {fullName}!
          </h1>
          <p className="text-sm text-brandText-muted">
            Your winter package is booked for dispatch with Steadfast Courier.
          </p>
        </div>

        <div className="bg-white p-6 rounded-sm border border-background-muted text-left space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-background-muted pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">
                Order Tracking ID
              </span>
              <p className="text-lg font-bold text-primary">{orderId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brandText-muted">
                Estimated Transit
              </span>
              <p className="text-sm font-semibold text-emerald-700">
                {selectedDistrict.estimatedTime} ({selectedDistrict.zoneLabel})
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-brandText">
            <p><strong>Deliver To:</strong> {address}, {selectedDistrict.name}</p>
            <p><strong>Delivery Mode:</strong> {deliveryType === 'home' ? 'Home Doorstep Delivery' : 'Steadfast Point Pickup (Saved ৳15)'}</p>
            <p><strong>Contact Phone:</strong> {phone}</p>
            <p><strong>Payment Due:</strong> Cash on Delivery (৳{grandTotal.toLocaleString('en-US')})</p>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-sm text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong>Customer Friendly Policy:</strong> Steadfast delivery rider will allow you to open and inspect the fabric quality and sizes right at your doorstep before paying!
            </span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="lg">
              Explore More Items
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-accent mx-auto">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold text-primary">Your Cart is Empty</h2>
        <p className="text-xs text-brandText-muted">
          Add at least one winter item to proceed to checkout.
        </p>
        <div className="pt-2">
          <Link to="/shop">
            <Button variant="primary" size="md">
              Browse Winter Drops
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Back Button */}
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Continue Shopping</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Customer & Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-background-muted shadow-sm space-y-6">
            <div className="border-b border-background-muted pb-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Steadfast Courier Integrated
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  Delivery Details & Route
                </h2>
                <p className="text-xs text-brandText-muted mt-1">
                  Choose your destination district and delivery mode.
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
                Live Courier Rates
              </span>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-background border border-background-muted text-brandText p-3 text-xs sm:text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Mobile Phone Number (11 Digits) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-background border border-background-muted text-brandText p-3 text-xs sm:text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Phone className="w-4 h-4 text-brandText-muted absolute right-3 top-3.5" />
                </div>
                <span className="text-[10px] text-brandText-muted mt-1 block">
                  Steadfast rider will call this number before delivery.
                </span>
              </div>

              {/* Steadfast Route Selector */}
              <div className="p-4 bg-background/60 rounded-sm border border-background-muted space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  1. Route Selection (ডেলিভারি ডিস্ট্রিক্ট)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Fixed Pickup */}
                  <div className="bg-white border border-background-muted rounded-sm p-2.5">
                    <span className="text-[9px] uppercase tracking-wider text-brandText-muted block font-bold">
                      Pickup From
                    </span>
                    <span className="text-xs font-bold text-primary truncate block mt-0.5">
                      Dhaka City (The Hood Nest Hub)
                    </span>
                  </div>

                  {/* Destination Dropdown */}
                  <div>
                    <label className="text-[9px] uppercase tracking-wider text-brandText-muted block font-bold mb-0.5">
                      Delivery District *
                    </label>
                    <select
                      value={selectedDistrictId}
                      onChange={(e) => setSelectedDistrictId(e.target.value)}
                      className="w-full bg-white border border-emerald-600 rounded-sm p-2 text-xs font-bold text-primary focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                    >
                      {STEADFAST_DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} — {d.zoneLabel}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
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

              {/* Steadfast Delivery Mode (Home vs Point Delivery) */}
              <div className="p-4 bg-background/60 rounded-sm border border-background-muted space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  2. Delivery Mode (হোম নাকি পয়েন্ট ডেলিভারি?)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Home Delivery */}
                  <button
                    type="button"
                    onClick={() => setDeliveryType('home')}
                    className={`p-3 rounded-sm border text-left transition-all flex items-start gap-3 bg-white ${
                      deliveryType === 'home'
                        ? 'border-emerald-600 ring-1 ring-emerald-600'
                        : 'border-background-muted hover:border-primary/40'
                    }`}
                  >
                    <div className={`p-1.5 rounded-sm ${deliveryType === 'home' ? 'bg-emerald-600 text-white' : 'bg-background text-brandText-muted'}`}>
                      <Home className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-primary">Home Delivery</span>
                        <span className="text-xs font-bold text-primary">
                          {isFreeDelivery ? 'FREE' : `৳${selectedDistrict.baseRateBDT}`}
                        </span>
                      </div>
                      <p className="text-[10px] text-brandText-muted mt-0.5">
                        Rider delivers directly to your door.
                      </p>
                    </div>
                  </button>

                  {/* Point Delivery */}
                  <button
                    type="button"
                    onClick={() => setDeliveryType('point')}
                    className={`p-3 rounded-sm border text-left transition-all flex items-start gap-3 bg-white ${
                      deliveryType === 'point'
                        ? 'border-emerald-600 ring-1 ring-emerald-600'
                        : 'border-background-muted hover:border-primary/40'
                    }`}
                  >
                    <div className={`p-1.5 rounded-sm ${deliveryType === 'point' ? 'bg-emerald-600 text-white' : 'bg-background text-brandText-muted'}`}>
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-primary">Point Delivery</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {isFreeDelivery ? 'FREE' : `৳${selectedDistrict.baseRateBDT - 15}`}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                        Pick from nearest hub (Saves ৳15!)
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Full Street Address (House, Road, Area, Thana) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. House 14, Road 5, Block C, Mirpur 2, Dhaka"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-background border border-background-muted text-brandText p-3 text-xs sm:text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before reaching or leave with security"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-background border border-background-muted text-brandText p-3 text-xs sm:text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Payment Method Badge */}
              <div className="pt-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Payment Method
                </label>
                <div className="p-4 bg-primary text-white rounded-sm border border-primary flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white">
                        Cash on Delivery (COD)
                      </p>
                      <p className="text-[11px] text-white/70">
                        Pay cash to the Steadfast delivery rider after inspecting your parcel.
                      </p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-background-muted shadow-sm space-y-6">
            <h3 className="text-base font-bold text-primary uppercase tracking-wider border-b border-background-muted pb-3">
              Order Summary ({totalItems} Items)
            </h3>

            {/* Item Mini List */}
            <div className="divide-y divide-background-muted max-h-72 overflow-y-auto space-y-3">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-14 object-cover rounded-sm border border-background-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-primary truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-brandText-muted">
                      Size: <strong>{item.selectedSize}</strong> • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    ৳{(item.priceBDT * item.quantity).toLocaleString('en-US')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="border-t border-background-muted pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-brandText-muted">
                <span>Subtotal:</span>
                <span className="font-semibold text-primary">৳{subtotalBDT.toLocaleString('en-US')}</span>
              </div>

              <div className="flex justify-between text-brandText-muted">
                <span>Steadfast Courier Delivery:</span>
                <span className="font-semibold text-primary">
                  {isFreeDelivery ? (
                    <span className="text-emerald-600 font-bold uppercase">
                      FREE (2+ items drop)
                    </span>
                  ) : (
                    `৳${effectiveShippingFee} (${deliveryType === 'home' ? 'Home' : 'Point'})`
                  )}
                </span>
              </div>

              <div className="border-t border-background-muted pt-3 flex justify-between text-base font-extrabold text-primary">
                <span>Total Due:</span>
                <span className="text-accent text-lg">
                  ৳{grandTotal.toLocaleString('en-US')}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <Button
              variant="accent"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              onClick={handlePlaceOrder}
            >
              Confirm Cash on Delivery Order
            </Button>

            {/* Trust Points */}
            <div className="space-y-2 pt-2 border-t border-background-muted text-[11px] text-brandText-muted">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Steadfast Official Partner Logistics (64 districts)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>100% check fabric & fit before paying cash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
