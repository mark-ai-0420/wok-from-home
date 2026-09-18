import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Flame, MessageCircle, MapPin } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onNavigate,
}) => {
  const { siteConfig } = useSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFBF5]/95 backdrop-blur-md border-b border-[#E8DDCE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[4.25rem] py-2 sm:py-2.5 sm:h-20">
          {/* Brand Logo - Accessible Button */}
          <button 
            type="button"
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-left p-1 rounded-xl focus-visible:outline-2 focus-visible:outline-[#C55221] shrink-0"
            aria-label="Wok From Home Indang - Go to top"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#111827] rounded-lg flex items-center justify-center border-2 border-[#CC8800] shadow-md group-hover:scale-105 transition-transform shrink-0" aria-hidden="true">
              <Flame className="w-5 h-5 sm:w-7 sm:h-7 text-[#CC8800] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg sm:text-2xl tracking-tight text-[#111827] uppercase group-hover:text-[#C55221] transition-colors whitespace-nowrap">
                  {siteConfig.store.storeName}
                </span>
                <span className="bg-[#C55221] text-white text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wider uppercase shrink-0">
                  {siteConfig.store.branchName}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-700 font-medium flex items-center gap-1 leading-tight">
                <MapPin className="w-3 h-3 text-[#C55221] shrink-0" aria-hidden="true" />
                <span className="truncate max-w-[180px] sm:max-w-none">Chef Pinoy Food Favorites • Cavite</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-tight text-[#111827]">
            <button 
              onClick={() => handleNavClick('menu')}
              className="hover:text-[#C55221] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#C55221]"
            >
              Menu & Specialties
            </button>
            <button 
              onClick={() => handleNavClick('delivery')}
              className="hover:text-[#C55221] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#C55221]"
            >
              Delivery Areas
            </button>
            <button 
              onClick={() => handleNavClick('reviews')}
              className="hover:text-[#C55221] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#C55221]"
            >
              Customer Reviews
            </button>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Facebook Messenger Direct Link */}
            <a
              href={siteConfig.social.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#1877F2]/10 text-[#0C63D4] hover:bg-[#1877F2]/20 border border-[#1877F2]/30 transition-all btn-press"
              title="Chat with Wok From Home on Facebook"
            >
              <MessageCircle className="w-4 h-4" />
              <span>FB Page</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative min-h-[44px] flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#C55221] hover:bg-[#A33F13] text-white font-display font-semibold text-sm shadow-md transition-all btn-press border border-[#CC8800]/50 cursor-pointer"
              aria-label={`View Food Bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}, Total: ₱${cartTotal.toLocaleString()}`}
            >
              <ShoppingBag className="w-4 h-4 text-white" aria-hidden="true" />
              <span className="hidden min-[420px]:inline">Bag</span>
              <span className="font-mono bg-[#111827] text-[#CC8800] text-xs font-bold px-2 py-0.5 rounded-full border border-[#CC8800]/40">
                {cartCount}
              </span>
              {cartTotal > 0 && (
                <span className="hidden sm:inline font-mono text-xs text-white font-semibold border-l border-white/20 pl-2">
                  ₱{cartTotal.toLocaleString()}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#111827] hover:bg-[#F4EDE2] transition-colors cursor-pointer btn-press"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <MenuIcon className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="md:hidden bg-[#FFFBF5] border-b border-[#E8DDCE] px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <button
            onClick={() => handleNavClick('menu')}
            className="w-full text-left px-3 py-2.5 rounded-md font-display text-base font-semibold text-[#111827] hover:bg-[#F4EDE2]"
          >
            🍜 Menu & Chef Specials
          </button>
          <button
            onClick={() => handleNavClick('delivery')}
            className="w-full text-left px-3 py-2.5 rounded-md font-display text-base font-semibold text-[#111827] hover:bg-[#F4EDE2]"
          >
            🛵 Indang & Cavite Delivery
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-left px-3 py-2.5 rounded-md font-display text-base font-semibold text-[#111827] hover:bg-[#F4EDE2]"
          >
            ⭐ Customer Reviews
          </button>
          <div className="pt-2 border-t border-[#E8DDCE] flex gap-2">
            <a
              href={siteConfig.social.facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-md bg-[#1877F2] text-white text-center font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
