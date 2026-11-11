import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Ruler, Check } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../common/Button';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  const discountPercent = product.originalPriceBDT
    ? Math.round(((product.originalPriceBDT - product.priceBDT) / product.originalPriceBDT) * 100)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl rounded-sm shadow-2xl border border-background-muted overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-brandText-muted hover:text-primary bg-white/80 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Image */}
        <div className="md:w-1/2 relative bg-background-muted aspect-square md:aspect-auto">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-primary text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {product.fabricGSM && (
            <span className="absolute bottom-4 left-4 text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-sm bg-primary/80 backdrop-blur-md text-white">
              {product.fabricGSM}
            </span>
          )}
        </div>

        {/* Right: Content & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest font-bold text-accent">
                {product.category.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold text-brandText">{product.rating}</span>
                <span className="text-brandText-muted">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-primary leading-snug">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-primary">
                ৳{product.priceBDT.toLocaleString('en-US')}
              </span>
              {product.originalPriceBDT && (
                <span className="text-sm text-brandText-muted line-through">
                  ৳{product.originalPriceBDT.toLocaleString('en-US')}
                </span>
              )}
              {discountPercent && (
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-accent/20 text-accent">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Select Size:
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Recommendation</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-bold uppercase rounded-sm border transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-background/40 border-background-muted text-brandText hover:border-primary/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Collapsible Size Guide Advice */}
              {showSizeGuide && (
                <div className="mt-3 p-3 bg-background border border-background-muted rounded-sm text-xs space-y-1.5 text-brandText-muted animate-fadeIn">
                  <p className="font-semibold text-primary">Bangladesh Fit Guide:</p>
                  <p>• <strong>M:</strong> 5'4" – 5'7" (55 – 65 kg)</p>
                  <p>• <strong>L:</strong> 5'7" – 5'10" (66 – 75 kg) <em>[Most Popular]</em></p>
                  <p>• <strong>XL:</strong> 5'9" – 6'1" (76 – 85 kg)</p>
                  <p>• <strong>XXL:</strong> 5'10"+ (86 – 95+ kg)</p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-background-muted rounded-sm bg-background">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold hover:bg-background-muted text-primary"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-primary min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-sm font-bold hover:bg-background-muted text-primary"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Button & Value Props */}
          <div className="pt-6 space-y-4 border-t border-background-muted mt-6">
            <Button
              variant={addedSuccess ? 'accent' : 'primary'}
              size="lg"
              fullWidth
              onClick={handleAdd}
              leftIcon={addedSuccess ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
            >
              {addedSuccess ? `Added (${selectedSize} × ${quantity}) to Cart!` : `Add to Bag • ৳${(product.priceBDT * quantity).toLocaleString('en-US')}`}
            </Button>

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] text-brandText-muted">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Check on Arrival</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>48h Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

