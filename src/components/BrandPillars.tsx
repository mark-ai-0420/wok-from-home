import React from 'react';
import { ChefHat, Sparkles, Wallet, Flame, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const BrandPillars: React.FC = () => {
  const { siteConfig } = useSiteConfig();

  return (
    <section className="py-16 sm:py-20 bg-[#C55221] border-b-4 border-[#111827] text-white relative overflow-hidden">
      {/* Subtle halftone/grid texture effect in background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFFBF5_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBF5]/15 border border-white/25 text-[#FFFBF5] font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Flame className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Ang Pangako ng {siteConfig.store.storeName}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFFBF5] tracking-tight uppercase leading-tight">
            3 Dahilan Kung Bakit <span className="text-[#FDE68A] underline decoration-[#111827] decoration-wavy decoration-2 underline-offset-8">Binabalik-Balikan</span>
          </h2>
          <p className="text-[#FFFBF5] text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Hindi tinipid. Niluto nang may pagmamahal at propesyonal na kasanayan para sa bawat pamilya sa {siteConfig.store.branchName} at Cavite.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Pillar 1: MASARAP */}
          <div className="relative group bg-[#FFFBF5] text-[#111827] p-7 sm:p-8 rounded-2xl border-2 border-[#111827] shadow-[6px_6px_0px_0px_#111827] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#111827] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#C55221] text-white flex items-center justify-center mb-5 shadow-sm border border-[#111827]">
                <ChefHat className="w-7 h-7 text-[#FFFBF5]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#C55221] uppercase tracking-wider">Pillar 01</span>
                <span className="h-px flex-1 bg-[#E8DDCE]"></span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#111827] uppercase tracking-tight mb-3">
                MASARAP (WOK-HEI)
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Niluluto sa <strong className="text-[#111827] font-bold">900°F cast iron wok</strong> para makuha ang tunay na <em>wok-hei</em>—ang signature smoky aroma at crisp tenderness na hinahanap mo sa chef-level Pinoy favorites.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-gray-800 font-semibold pt-4 border-t border-[#E8DDCE]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Smoky wok-hei char sa bawat subo</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Masaganang rekado: chicken, pork & kikiam</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: SIKSIK SA REKADO */}
          <div className="relative group bg-[#111827] text-white p-7 sm:p-8 rounded-2xl border-2 border-[#FDE68A] shadow-[6px_6px_0px_0px_#111827] transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between">
            <div className="absolute -top-3 right-6 bg-[#CC8800] text-[#111827] font-mono text-[11px] font-bold px-3 py-0.5 rounded-full border border-black uppercase tracking-wider shadow-sm">
              Best Customer Choice
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#CC8800] text-[#111827] flex items-center justify-center mb-5 shadow-sm border border-[#111827]">
                <Sparkles className="w-7 h-7 text-[#111827]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#FDE68A] uppercase tracking-wider">Pillar 02</span>
                <span className="h-px flex-1 bg-white/20"></span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#FFFBF5] uppercase tracking-tight mb-3">
                SIKSIK SA REKADO
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Bawal ang tipid! Puno ng <strong className="text-[#FDE68A] font-bold">toasted garlic</strong>, fresh mixed vegetables, crispy chicharon, at special chef sauces na paborito sa bawat salu-salo.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-gray-200 font-semibold pt-4 border-t border-white/20">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                <span>Saganang toppings & sariwang rekado</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                <span>Authentic chef-curated secret sauces</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: ABOT-KAYA SA BULSA */}
          <div className="relative group bg-[#FFFBF5] text-[#111827] p-7 sm:p-8 rounded-2xl border-2 border-[#111827] shadow-[6px_6px_0px_0px_#111827] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#111827] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#16A34A] text-white flex items-center justify-center mb-5 shadow-sm border border-[#111827]">
                <Wallet className="w-7 h-7 text-[#FFFBF5]" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#16A34A] uppercase tracking-wider">Pillar 03</span>
                <span className="h-px flex-1 bg-[#E8DDCE]"></span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-[#111827] uppercase tracking-tight mb-3">
                ABOT-KAYA SA BULSA
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Chef-quality sarap sa presyong abot-kaya para sa buong pamilya! Mula sa aming <strong className="text-[#16A34A] font-bold">Special Overload Lomi (₱160)</strong> hanggang sa siksik na Pancit Bilaos (₱650 para sa 5-7 katao).
              </p>
            </div>
            <ul className="space-y-2 text-xs text-gray-800 font-semibold pt-4 border-t border-[#E8DDCE]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Sulit para sa pamilya at barkada</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Pick up sa {siteConfig.store.kitchenShort} & Cavite delivery options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
