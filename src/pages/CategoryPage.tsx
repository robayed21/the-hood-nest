import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, RotateCcw } from 'lucide-react';
import { ALL_PRODUCTS, CATEGORY_DETAILS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { Product } from '../types';

interface CategoryPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const { slug } = useParams<{ slug?: string }>();
  const currentCategory = slug || 'all';

  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const meta = CATEGORY_DETAILS[currentCategory] || CATEGORY_DETAILS.all;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category match
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize as any)) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceBDT - b.priceBDT;
      if (sortBy === 'price-high') return b.priceBDT - a.priceBDT;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [currentCategory, selectedSize, sortBy]);

  const CATEGORY_TABS = [
    { slug: 'all', label: 'All Items' },
    { slug: 'hoodies', label: 'Hoodies' },
    { slug: 'sweatshirts', label: 'Sweatshirts' },
    { slug: 'jackets', label: 'Jackets' },
    { slug: 'sweaters', label: 'Sweaters' },
    { slug: 'winter-bottoms', label: 'Joggers' },
    { slug: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brandText-muted tracking-wide">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/shop" className="hover:text-primary transition-colors">Collections</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-primary font-semibold uppercase">{meta.title}</span>
      </nav>

      {/* Category Header Banner */}
      <div className="bg-primary text-white p-6 sm:p-10 rounded-sm shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="inline-block text-accent text-xs font-bold uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded">
            {meta.bannerText}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-background-muted">
        {CATEGORY_TABS.map((tab) => (
          <Link
            key={tab.slug}
            to={tab.slug === 'all' ? '/shop' : `/category/${tab.slug}`}
            className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm whitespace-nowrap transition-colors ${
              currentCategory === tab.slug
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-brandText border border-background-muted hover:border-primary/40'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Filter and Sorting Controls Bar */}
      <div className="bg-white p-4 rounded-sm border border-background-muted flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Size Filter & Counter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>Filter Size:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {['all', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-sm uppercase transition-colors ${
                  selectedSize === size
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-background text-brandText hover:bg-background-muted'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {selectedSize !== 'all' && (
            <button
              onClick={() => setSelectedSize('all')}
              className="text-xs text-brandText-muted hover:text-accent flex items-center gap-1 underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort By */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto text-xs">
          <span className="text-brandText-muted font-medium">
            Showing <strong>{filteredProducts.length}</strong> items
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="font-semibold text-primary uppercase">
              Sort:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-background border border-background-muted text-brandText rounded-sm px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={(p) => onAddToCart(p)}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Products Match Your Filter"
          description={`No items in size "${selectedSize}" found for this collection. Try resetting your filter to explore all available stock.`}
          actionText="Clear Size Filter"
          onAction={() => setSelectedSize('all')}
        />
      )}
    </div>
  );
};

