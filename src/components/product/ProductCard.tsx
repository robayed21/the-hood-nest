import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = '',
}) => {
  const discountPercent = product.originalPriceBDT
    ? Math.round(((product.originalPriceBDT - product.priceBDT) / product.originalPriceBDT) * 100)
    : null;

  return (
    <div className={`group bg-white rounded-sm border border-background-muted overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:border-accent/40 ${className}`}>
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-background-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

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
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-sm">
            {product.fabricGSM}
          </div>
        )}
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
            onClick={() => onAddToCart && onAddToCart(product)}
            leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

