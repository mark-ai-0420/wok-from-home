import React from 'react';
import { Flame, ArrowRight, Clock, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeroProps {
  onOrderNow: () => void;
  onQuickAdd: (item: MenuItem) => void;
  featuredItem: MenuItem;
}

export const Hero: React.FC<HeroProps> = ({
  onOrderNow,
  onQuickAdd,
  featuredItem,
}) => {
  const { siteConfig } = useSiteConfig();
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FFFBF5] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DDCE]">
      {/* Decorative Wok Ring Glow Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#CC8800]/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#C55221]/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Poster Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C55221]/10 border border-[#C55221]/30 text-[#C55221] text-xs font-mono font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C55221] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C55221]"></span>
              </span>
              <span>{siteConfig.store.kitchenShort} • Serving Indang, Alfonso, Mendez</span>
              <span className="text-[#8F5500] font-bold">★ Tatak Chef</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <p className="font-display font-bold text-lg sm:text-xl text-[#C55221] tracking-wider uppercase">
                {siteConfig.copy.tagline}
              </p>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111827] leading-[1.08] uppercase">
                MAINIT. <span className="text-[#C55221]">SIKSIK</span> SA REKADO. <span className="text-[#8F5500]">ABOT-KAYA.</span>
              </h1>
            </div>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl font-normal leading-relaxed">
              Ang pagkaing tatak chef, narito na sa Indang! Tikman ang paboritong <strong className="text-[#111827] font-semibold">Pancit Canton-Sotanghon Bilaos</strong>, <strong className="text-[#111827] font-semibold">Special Overload Lomi</strong>, <strong className="text-[#111827] font-semibold">Creamy Carbonara & Baked Mac Pans</strong>, at <strong className="text-[#111827] font-semibold">Fried Chicken Family Bundles</strong>. Bagong luto at siksik sa rekado para sa bawat salu-salo!
            </p>

            {/* Services Accepted Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['Party Bilaos', 'Party Ulam Trays', 'Packed Meals', 'Catering Orders'].map((srv, idx) => (
                <span key={idx} className="bg-white px-3 py-1 rounded-md border border-[#E8DDCE] text-xs font-mono font-bold text-gray-800 flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{srv}</span>
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOrderNow}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#C55221] hover:bg-[#A33F13] text-white font-display font-bold text-base shadow-lg hover:shadow-xl transition-all btn-press border border-[#CC8800]/50 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-[#CC8800]" />
                <span>EXPLORE REAL MENU & PRICES</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href={siteConfig.social.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-[#FFFBF5] font-display font-bold text-base border border-[#CC8800]/40 transition-all btn-press cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#CC8800]" />
                <span>ORDER VIA FB MESSENGER</span>
              </a>
            </div>

            {/* Proof Badges Grid */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#E8DDCE]">
              <div className="bg-[#FFFBF5] p-2.5 rounded-lg border border-[#E8DDCE]">
                <div className="font-display font-extrabold text-xl text-[#C55221]">₱{siteConfig.copy.startingLomiPrice}</div>
                <div className="text-xs text-gray-600 font-medium">Overload Lomi</div>
              </div>
              <div className="bg-[#FFFBF5] p-2.5 rounded-lg border border-[#E8DDCE]">
                <div className="font-display font-extrabold text-xl text-[#8F5500]">₱{siteConfig.copy.startingBilaoPrice}</div>
                <div className="text-xs text-gray-600 font-medium">Starting Bilao (5-7pax)</div>
              </div>
              <div className="bg-[#FFFBF5] p-2.5 rounded-lg border border-[#E8DDCE]">
                <div className="font-display font-extrabold text-xl text-[#111827]">S – XL</div>
                <div className="text-xs text-gray-600 font-medium">Party Tray Sizes</div>
              </div>
              <div className="bg-[#FFFBF5] p-2.5 rounded-lg border border-[#E8DDCE]">
                <div className="font-display font-extrabold text-xl text-[#16A34A]">Cash / GCash</div>
                <div className="text-xs text-gray-600 font-medium">Pick up & Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Food Card Showcase with Real Bilao Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Amber border offset frame */}
              <div className="absolute inset-0 bg-[#CC8800] rounded-3xl transform translate-x-3 translate-y-3 -rotate-1 shadow-xl"></div>
              
              {/* Main Card */}
              <div className="relative bg-[#111827] text-white rounded-3xl p-5 sm:p-6 border-2 border-[#CC8800] shadow-2xl overflow-hidden">
                {/* Status sticker */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="bg-[#C55221] text-[#FFFBF5] text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                    <Flame className="w-3.5 h-3.5 text-[#CC8800]" />
                    #1 REAL BESTSELLER
                  </span>
                  <span className="font-mono text-xs text-[#CC8800] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Wok-Fresh Cooked
                  </span>
                </div>

                {/* Hero Dish Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 group border border-white/10 bg-gray-900">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.name}
                    width={600}
                    height={450}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(e) => {
                      // Fallback image if network fails
                      (e.currentTarget as HTMLImageElement).src = '/images/menu/pancit_sotanghon_bilao.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                  
                  {/* Floating Price Tag */}
                  <div className="absolute bottom-3 left-3 bg-[#111827]/90 backdrop-blur-md border border-[#CC8800]/50 rounded-xl px-3.5 py-1.5">
                    <div className="text-[10px] text-gray-400 font-mono">BILAO SIZE S (5-7 PAX)</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono font-extrabold text-2xl text-[#CC8800]">₱{featuredItem.price}</span>
                      <span className="font-mono text-xs text-gray-300">PHP</span>
                    </div>
                  </div>

                  {/* Hot Heat Indicator */}
                  <div className="absolute top-3 right-3 bg-[#C55221] text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <span>🔥 Siksik sa Rekado</span>
                  </div>
                </div>

                {/* Dish Details */}
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#FFFBF5] tracking-tight">
                        {featuredItem.name}
                      </h3>
                      <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                        {featuredItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Rekado Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredItem.rekadoHighlights.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 text-[#CC8800] text-[11px] font-mono px-2 py-0.5 rounded border border-[#CC8800]/20"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Add CTA */}
                  <div className="pt-3">
                    <button
                      onClick={() => onQuickAdd(featuredItem)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-sm transition-all btn-press shadow-md cursor-pointer uppercase tracking-wider"
                    >
                      <Plus className="w-4 h-4 text-[#111827] stroke-[3]" />
                      <span>ORDER THIS BILAO (₱{featuredItem.price})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
