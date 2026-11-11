import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Check, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotalBDT,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const FREE_SHIPPING_ITEMS_THRESHOLD = 2;
  const itemsNeededForFreeShipping = Math.max(0, FREE_SHIPPING_ITEMS_THRESHOLD - totalItems);
  const isFreeShippingUnlocked = totalItems >= FREE_SHIPPING_ITEMS_THRESHOLD;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideIn">
        {/* Drawer Header */}
        <div className="p-5 border-b border-background-muted flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-base text-primary uppercase tracking-wide">
              Your Bag ({totalItems})
            </h3>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-brandText-muted hover:text-primary transition-colors rounded-sm focus:outline-none"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Banner */}
        <div className="p-3.5 bg-accent/10 border-b border-accent/20 px-5">
          {isFreeShippingUnlocked ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>
                <strong>Congratulations!</strong> You unlocked FREE nationwide delivery!
              </span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-primary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  Add <strong>{itemsNeededForFreeShipping} more item</strong> for FREE delivery
                </span>
                <span className="text-[11px] text-accent font-bold">
                  {totalItems}/{FREE_SHIPPING_ITEMS_THRESHOLD}
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(totalItems / FREE_SHIPPING_ITEMS_THRESHOLD) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-background-muted space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="pt-4 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-background-muted rounded-sm overflow-hidden shrink-0 border border-background-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-primary line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-brandText-muted hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-background border border-background-muted text-accent">
                        Size: {item.selectedSize}
                      </span>
                      {item.fabricGSM && (
                        <span className="text-[10px] text-brandText-muted">
                          {item.fabricGSM}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-background-muted rounded-sm bg-background">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="px-2 py-0.5 text-xs font-bold text-primary hover:bg-background-muted"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="px-2 py-0.5 text-xs font-bold text-primary hover:bg-background-muted"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-bold text-primary">
                      ৳{(item.priceBDT * item.quantity).toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-accent mb-3">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-bold text-primary text-base">Your Bag is Empty</h4>
              <p className="text-xs text-brandText-muted max-w-xs mt-1 mb-6">
                Explore our signature 320 GSM drop-shoulder hoodies and jackets to upgrade your winter wardrobe.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
              >
                Explore Winter Collection
              </Button>
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-background-muted bg-background/50 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-brandText-muted">
                <span>Subtotal ({totalItems} items):</span>
                <span className="font-semibold text-primary">
                  ৳{subtotalBDT.toLocaleString('en-US')}
                </span>
              </div>

              <div className="flex items-center justify-between text-brandText-muted">
                <span>Shipping:</span>
                <span className="font-semibold text-primary">
                  {isFreeShippingUnlocked ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    'Calculated at Checkout (৳80/৳130)'
                  )}
                </span>
              </div>

              <div className="border-t border-background-muted pt-2 flex items-center justify-between text-sm font-extrabold text-primary">
                <span>Estimated Total:</span>
                <span className="text-base text-accent">
                  ৳{subtotalBDT.toLocaleString('en-US')}
                </span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              fullWidth
              onClick={handleCheckout}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Cash on Delivery
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-brandText-muted text-center">
              <Truck className="w-3.5 h-3.5 text-accent" />
              <span>Check parcel upon delivery before payment</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

