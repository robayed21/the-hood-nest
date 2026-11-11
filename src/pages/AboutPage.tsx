import React from 'react';
import { ShieldCheck, Truck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded">
          Our Story & Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">
          Redefining Men's Winter Wear in Bangladesh.
        </h1>
        <p className="text-sm sm:text-base text-brandText-muted leading-relaxed">
          Crafted for the chilly mornings of Dhaka, foggy rides, and casual campus evenings. 
          We believe comfort shouldn't come with compromises.
        </p>
      </div>

      {/* Story & Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <SectionHeading
            badge="The Genesis"
            title="Why We Created The Hood Nest"
            className="mb-4"
          />
          <p className="text-sm text-brandText leading-relaxed">
            Every winter in Bangladesh, young men face the same dilemma: cheap winter wear that scratches the skin and loses shape after two washes, or overpriced imported streetwear with excessive, flashy graphics.
          </p>
          <p className="text-sm text-brandText-muted leading-relaxed">
            <strong>The Hood Nest</strong> was founded on a simple conviction: you deserve clean, minimalist aesthetics combined with the ultra-soft embrace of true 320+ GSM heavyweight cotton fleece. No loud logos, no itchy seams—just pure confidence and warmth.
          </p>

          <div className="space-y-3 pt-2">
            {[
              '100% Breathable Heavyweight Cotton Fleece',
              'Engineered Drop-Shoulder & Modern Tailored Cuts',
              'Preshrunk & Color-Fast Dyed Fabrics',
              'Direct-to-Consumer: Affordable-Premium Value',
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-primary">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-sm overflow-hidden border border-background-muted shadow-xl bg-white p-2">
            <img
              src="/images/the_hood_nest_brand_mockup_1794394738409.jpg"
              alt="The Hood Nest Brand Identity"
              className="w-full h-auto object-cover rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* 4 Pillars of The Hood Nest */}
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-background-muted shadow-sm">
        <SectionHeading
          badge="Core Pillars"
          title="What You Can Always Expect From Us"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-primary text-accent flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-primary">Minimal Aesthetics</h4>
            <p className="text-xs text-brandText-muted leading-relaxed">
              Timeless muted palettes—Obsidian Black, Earthy Olive, Warm Camel, and Heather Melange that pair with anything.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-primary text-accent flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-primary">Check on Arrival</h4>
            <p className="text-xs text-brandText-muted leading-relaxed">
              We trust our quality. Check fabric softness and stitching in front of the delivery agent before paying.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-primary text-accent flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-primary">64 Districts Fast COD</h4>
            <p className="text-xs text-brandText-muted leading-relaxed">
              Partnered with top couriers for guaranteed 24-48h dispatch across Dhaka and all divisional hubs.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded bg-primary text-accent flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-primary">Hassle-Free Exchange</h4>
            <p className="text-xs text-brandText-muted leading-relaxed">
              Size not fitting right? We provide effortless size replacement within 48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-primary text-white p-8 sm:p-12 rounded-sm text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to Upgrade Your Winter Wardrobe?
        </h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
          Explore our signature drop-shoulder hoodies, utility bombers, and heavyweight joggers today.
        </p>
        <div className="pt-2">
          <Link to="/shop">
            <Button variant="accent" size="lg">
              Explore Winter Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

