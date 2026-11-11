import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm tracking-wide">Nationwide Delivery</h4>
              <p className="text-xs text-white/60 mt-0.5">Delivered to all 64 districts in 2-3 days</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm tracking-wide">Check Before Pay</h4>
              <p className="text-xs text-white/60 mt-0.5">Inspect fabric and finish at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-accent shrink-0">
              <RotateCcw className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm tracking-wide">Hassle-Free Size Exchange</h4>
              <p className="text-xs text-white/60 mt-0.5">Easy replacement within 48 hours</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" withTagline />
            <p className="text-xs text-white/70 max-w-sm leading-relaxed mt-2">
              The Hood Nest brings classic, minimal, affordable-premium winter wear to Bangladesh. 
              Engineered with heavyweight fleece and tailored drop-shoulder cuts for ultimate warmth and confidence.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>Hotline: +880 1700-000000 (10 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>care@thehoodnest.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/category/hoodies" className="hover:text-accent transition-colors">Hoodies</Link></li>
              <li><Link to="/category/sweatshirts" className="hover:text-accent transition-colors">Sweatshirts</Link></li>
              <li><Link to="/category/jackets" className="hover:text-accent transition-colors">Jackets</Link></li>
              <li><Link to="/category/sweaters" className="hover:text-accent transition-colors">Sweaters & Knitwear</Link></li>
              <li><Link to="/category/winter-bottoms" className="hover:text-accent transition-colors">Fleece Joggers</Link></li>
              <li><Link to="/category/accessories" className="hover:text-accent transition-colors">Winter Accessories</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
              Help & Support
            </h5>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/size-guide" className="hover:text-accent transition-colors">Size Guide</Link></li>
              <li><Link to="/delivery-info" className="hover:text-accent transition-colors">Delivery & Shipping</Link></li>
              <li><Link to="/exchange-policy" className="hover:text-accent transition-colors">Return & Exchange</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-accent mb-4">
              Payment & Courier
            </h5>
            <p className="text-xs text-white/60 mb-3 leading-relaxed">
              We accept Cash on Delivery across all 64 districts via Pathao & Steadfast Courier.
            </p>
            <div className="inline-block bg-white/10 px-3 py-1.5 rounded text-[11px] font-semibold text-accent border border-accent/20">
              💵 Cash on Delivery (COD)
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© {new Date().getFullYear()} THE HOOD NEST. All rights reserved. Made for Bangladesh.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

