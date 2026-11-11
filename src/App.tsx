import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { Product } from './types';
import { Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleOpenDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleAddToCart = (product: Product, size: string = 'L', quantity: number = 1) => {
    addToCart(product, size, quantity);
    setAddedNotice(`Added "${product.name}" (${size}) × ${quantity} to bag!`);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2500);
  };

  return (
    <>
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-white text-xs px-4 py-3 rounded-sm shadow-xl flex items-center gap-2.5 border border-accent/40 animate-bounce">
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="font-semibold">{addedNotice}</span>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={(prod, size, qty) => handleAddToCart(prod, size, qty)}
      />

      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={(p) => handleAddToCart(p, 'L', 1)}
                onSelectProduct={handleOpenDetail}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <CategoryPage
                onAddToCart={(p) => handleAddToCart(p, 'L', 1)}
                onSelectProduct={handleOpenDetail}
              />
            }
          />
          <Route
            path="/category/:slug"
            element={
              <CategoryPage
                onAddToCart={(p) => handleAddToCart(p, 'L', 1)}
                onSelectProduct={handleOpenDetail}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
};

export default App;
