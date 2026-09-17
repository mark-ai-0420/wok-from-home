import React from 'react';
import { Flame, MapPin, Clock, Phone, MessageCircle, Heart } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteConfig } = useSiteConfig();

  return (
    <footer className="bg-[#111827] text-white border-t-2 border-[#CC8800]">
      {/* Top Banner Accent */}
      <div className="bg-[#C55221] py-3 px-4 text-center text-xs font-mono font-bold tracking-wider uppercase text-white">
        🔥 Cooking daily in Indang, Cavite • Freshly Wokked • Zero Compromise on Rekado
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Manifesto (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#111827] rounded-lg flex items-center justify-center border-2 border-[#CC8800]">
                <Flame className="w-6 h-6 text-[#CC8800]" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white uppercase">
                {siteConfig.store.storeName}
              </span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              {siteConfig.copy.tagline} We believe great Filipino comfort food should never be sacrificed for convenience. Masarap, siksik sa rekado, at abot-kaya sa bulsa!
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.social.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold font-mono transition-all btn-press shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Follow on Facebook ({siteConfig.social.followerCountNote || '60+ Suki'})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#CC8800] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-gray-300">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#CC8800] transition-colors cursor-pointer"
                >
                  → Full Menu & Specials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('delivery')}
                  className="hover:text-[#CC8800] transition-colors cursor-pointer"
                >
                  → Cavite Delivery Coverage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-[#CC8800] transition-colors cursor-pointer"
                >
                  → Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kitchen & Delivery Hours */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#CC8800] uppercase tracking-wider">
              Kitchen Hours
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-mono">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C55221] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold block">{siteConfig.hours.days}</span>
                  <span>{siteConfig.hours.openTime} – {siteConfig.hours.closeTime}</span>
                </div>
              </li>
              <li className="text-[11px] text-gray-400">
                *{siteConfig.hours.peakHoursNote}
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-base text-[#CC8800] uppercase tracking-wider">
              Location & Pick-up
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C55221] shrink-0 mt-0.5" />
                <span>{siteConfig.store.kitchenAddress} ({siteConfig.store.landmarkNote})</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CC8800] shrink-0" />
                <a
                  href={`tel:${siteConfig.store.contactPhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#CC8800] transition-colors"
                >
                  {siteConfig.store.contactPhone}
                </a>
              </li>
              <li className="bg-white/5 p-2 rounded-lg border border-white/10 text-[11px] text-gray-400">
                Payment: GCash, Maya, Cash on Delivery (COD)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} {siteConfig.store.storeName} ({siteConfig.store.branchName}). All rights reserved.</span>
            <span>•</span>
            <a
              href="#/admin"
              className="text-gray-400 hover:text-[#CC8800] underline decoration-gray-700 hover:decoration-[#CC8800] transition-colors"
            >
              Admin Portal
            </a>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C55221] fill-[#C55221]" />
            <span>for hungry remote workers and foodies in Cavite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
