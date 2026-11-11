import React, { useState } from 'react';
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { LoadingState } from '../components/common/LoadingState';
import { EmptyState } from '../components/common/EmptyState';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';

interface HomePageProps {
  onAddToCart: (product: Product, size?: string, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart, onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDesignSystemDemo, setShowDesignSystemDemo] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const featuredList = ALL_PRODUCTS.slice(0, 6);

  const filteredProducts = selectedCategory === 'all'
    ? featuredList
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleTestLoading = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 1500);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-white py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A67C52_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-accent text-xs font-semibold tracking-widest uppercase border border-accent/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Winter 2026 Collection</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                YOUR COMFORT. <br />
                <span className="text-accent">YOUR STYLE.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
                Classic, minimal, affordable-premium men's winter wear tailored for Bangladesh. 
                Engineered with breathable heavyweight fleece and effortless streetwear cuts.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/shop">
                  <Button
                    variant="accent"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Explore Collection
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="!text-white !border-white/30 hover:!bg-white/10"
                  onClick={() => setShowDesignSystemDemo(!showDesignSystemDemo)}
                >
                  {showDesignSystemDemo ? 'Hide Tokens' : 'View Design System'}
                </Button>
              </div>

              {/* Stats / Trust snippet */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md">
                <div>
                  <p className="text-2xl font-bold text-white">320+</p>
                  <p className="text-xs text-white/60">Heavyweight GSM</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">64</p>
                  <p className="text-xs text-white/60">Districts Delivery</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-xs text-white/60">Check Before Pay</p>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-white/5 p-2">
                <img
                  src="/images/the_hood_nest_brand_mockup_1794394738409.jpg"
                  alt="The Hood Nest Brand Identity"
                  className="w-full h-auto object-cover rounded-sm"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-md p-3 rounded-sm border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white">THE HOOD NEST</p>
                    <p className="text-[10px] text-accent">Men's Winter Collection • BDT (৳)</p>
                  </div>
                  <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded font-semibold uppercase">
                    Official Drop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Browse Collections"
          title="Engineered For The Season"
          subtitle="Explore our winter categories built for university campuses, night hangouts, and morning commutes."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: 'Hoodies', slug: 'hoodies', count: '2 Styles', tag: '320 GSM' },
            { name: 'Sweatshirts', slug: 'sweatshirts', count: '2 Styles', tag: 'Crewneck' },
            { name: 'Jackets', slug: 'jackets', count: '3 Styles', tag: 'Bomber & Denim' },
            { name: 'Sweaters', slug: 'sweaters', count: '2 Styles', tag: 'Turtlenecks' },
            { name: 'Bottoms', slug: 'winter-bottoms', count: '2 Styles', tag: 'Fleece Joggers' },
            { name: 'Accessories', slug: 'accessories', count: '1 Style', tag: 'Thermal Caps' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group p-4 bg-white rounded-sm border border-background-muted hover:border-accent/50 hover:shadow-md transition-all text-center flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-sm">
                  {cat.tag}
                </span>
                <h3 className="font-bold text-sm text-primary group-hover:text-accent transition-colors mt-2">
                  {cat.name}
                </h3>
              </div>
              <p className="text-[11px] text-brandText-muted mt-2">
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection Section */}
      <section id="featured-drop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <SectionHeading
            badge="Winter '26 Lineup"
            title="Featured Essentials"
            subtitle="Click any product for full specifications, GSM thickness, and size recommendations."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Featured' },
              { id: 'hoodies', label: 'Hoodies' },
              { id: 'jackets', label: 'Jackets' },
              { id: 'sweaters', label: 'Sweaters' },
              { id: 'winter-bottoms', label: 'Joggers' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-brandText border border-background-muted hover:border-primary/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
            title="No items in this category yet"
            description="Our collection for this winter category is dropping shortly. Check out our signature hoodies in the meantime!"
            actionText="Show All Items"
            onAction={() => setSelectedCategory('all')}
          />
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link to="/shop">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Winter Drops ({ALL_PRODUCTS.length} Items)
            </Button>
          </Link>
        </div>
      </section>

      {/* Interactive Design System Showcase */}
      {showDesignSystemDemo && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-sm border border-background-muted p-6 sm:p-10 shadow-sm space-y-12">
            <div className="border-b border-background-muted pb-6">
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest mb-1">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Phase 2 Verification</span>
              </div>
              <h2 className="text-2xl font-bold text-primary">
                Technical Foundation & Design System Tokens
              </h2>
            </div>

            {/* 1. Color Palette Tokens */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                Brand Color Palette
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-sm bg-primary text-white space-y-1 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wide block">Primary</span>
                  <span className="text-sm font-mono block">#14283F</span>
                  <span className="text-[11px] text-white/70 block">Midnight Navy</span>
                </div>
                <div className="p-4 rounded-sm bg-background border border-background-muted text-brandText space-y-1 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wide block">Background</span>
                  <span className="text-sm font-mono block">#F5F2EB</span>
                  <span className="text-[11px] text-brandText-muted block">Linen Cream</span>
                </div>
                <div className="p-4 rounded-sm bg-brandText text-white space-y-1 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wide block">Text</span>
                  <span className="text-sm font-mono block">#292929</span>
                  <span className="text-[11px] text-white/70 block">Charcoal Black</span>
                </div>
                <div className="p-4 rounded-sm bg-accent text-white space-y-1 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wide block">Accent</span>
                  <span className="text-sm font-mono block">#A67C52</span>
                  <span className="text-[11px] text-white/80 block">Warm Toffee</span>
                </div>
              </div>
            </div>

            {/* 2. Button Variations */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">
                Reusable Button Components
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="accent">Accent Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button
                  variant="primary"
                  isLoading={buttonLoading}
                  onClick={handleTestLoading}
                >
                  Click For Loading
                </Button>
              </div>
            </div>

            {/* 3. States Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              <div className="border border-background-muted p-4 rounded-sm bg-background/50">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                  Loading State Component
                </span>
                <LoadingState message="Fetching Winter '26 Drop..." />
              </div>

              <div className="border border-background-muted p-4 rounded-sm bg-background/50">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                  Empty State Component
                </span>
                <EmptyState
                  title="No Search Results"
                  description="Try adjusting your filters or search terms."
                  actionText="Reset Filters"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
