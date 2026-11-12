import React, { useState, useRef } from 'react';
import { ShoppingBag, Star, RefreshCw } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size?: string) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const [isTouchFlipped, setIsTouchFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const discountPercent = product.originalPriceBDT
    ? Math.round(((product.originalPriceBDT - product.priceBDT) / product.originalPriceBDT) * 100)
    : null;

  // Fear of God 3D Micro-movement on mouse move ("Nara chara kore")
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Touch toggle for mobile phones
  const handleTouchToggle = (e: React.MouseEvent | React.TouchEvent) => {
    // If clicking add to bag button, let button handle it
    if ((e.target as HTMLElement).closest('button')) return;
    setIsTouchFlipped(!isTouchFlipped);
  };

  const hasHoverImage = Boolean(product.hoverImage && product.hoverImage !== product.image);
  const showBackImage = (isHovered || isTouchFlipped) && hasHoverImage;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouchToggle}
      style={{
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out, box-shadow 0.3s ease',
      }}
      className={`group bg-white rounded-sm border border-background-muted overflow-hidden flex flex-col cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:border-accent/50 ${className}`}
    >
      {/* Product Image Container with Fear of God Front/Back Cross-fade */}
      <div className="relative aspect-[4/5] bg-[#F4F3F0] overflow-hidden select-none">
        {/* Front Image */}
        <img
          src={product.image}
          alt={`${product.name} Front View`}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            showBackImage ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Alternate Angle / Back View (Fear of God Effect) */}
        {hasHoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} Back/Styling Angle`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              showBackImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* View Angle Indicator Pill (Front / Back) */}
        {hasHoverImage && (
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full transition-opacity duration-300">
            <RefreshCw className={`w-2.5 h-2.5 transition-transform duration-500 ${showBackImage ? 'rotate-180 text-accent' : ''}`} />
            <span>{showBackImage ? 'Back View' : 'Front View'}</span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-primary text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm bg-accent text-white shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Fabric GSM tag */}
        {product.fabricGSM && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-sm">
            {product.fabricGSM}
          </div>
        )}

        {/* Quick Size Bar floating on Hover / Touch */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-1.5 z-20">
          <span className="text-[10px] uppercase font-bold text-white mr-1">Quick Add:</span>
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(product, size);
              }}
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs bg-white text-primary hover:bg-accent hover:text-white transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-brandText-muted mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-accent">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[11px] font-medium text-brandText">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px] text-brandText-muted">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-semibold text-primary line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          {/* Sizes available */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[10px] uppercase text-brandText-muted font-medium">Sizes:</span>
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="text-[10px] font-semibold px-1.5 py-0.2 border border-background-muted rounded-xs text-brandText-muted"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price and Action Button */}
        <div className="pt-4 mt-3 border-t border-background-muted flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-primary">
                ৳{product.priceBDT.toLocaleString('en-US')}
              </span>
              {product.originalPriceBDT && (
                <span className="text-xs text-brandText-muted line-through">
                  ৳{product.originalPriceBDT.toLocaleString('en-US')}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-emerald-600 font-semibold block">
              In Stock
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, 'L');
            }}
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
