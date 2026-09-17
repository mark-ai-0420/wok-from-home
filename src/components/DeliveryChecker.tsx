import React, { useState, useDeferredValue, useMemo } from 'react';
import { MapPin, CheckCircle2, Search, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const DeliveryChecker: React.FC = () => {
  const { siteConfig } = useSiteConfig();
  const deliveryAreas = siteConfig.deliveryAreas;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTown, setSelectedTown] = useState<string>('ALL');
  const [selectedArea, setSelectedArea] = useState(() => deliveryAreas[0]);

  const deferredSearch = useDeferredValue(searchTerm);

  const towns = useMemo(() => [
    'ALL', 'Indang', 'Mendez', 'Alfonso', 'Trece Martires', 'Amadeo', 'Tagaytay'
  ], []);

  const filteredAreas = useMemo(() => {
    const normalized = deferredSearch.toLowerCase().trim();
    return deliveryAreas.filter(area => {
      const matchesSearch = !normalized || 
        area.barangay.toLowerCase().includes(normalized) ||
        area.town.toLowerCase().includes(normalized);
      const matchesTown = selectedTown === 'ALL' || area.town.toLowerCase() === selectedTown.toLowerCase();
      return matchesSearch && matchesTown;
    });
  }, [deferredSearch, selectedTown, deliveryAreas]);

  return (
    <section id="delivery" className="py-16 lg:py-20 bg-[#111827] border-b-4 border-black text-[#FFFBF5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC8800]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C55221]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Information & Coverage (5 cols on md+) */}
          <div className="md:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FDE68A] font-mono text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#CC8800]" />
              Official Service Coverage
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFFBF5] tracking-tight uppercase leading-tight">
              Pick Up & Delivery <span className="text-[#CC8800]">{siteConfig.store.kitchenShort}</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Ang aming kusina ay matatagpuan sa <strong className="text-[#FFFBF5] font-bold">{siteConfig.store.kitchenAddress}</strong>. Nagde-deliver kami sa buong <strong className="text-[#FDE68A] font-bold">Indang, Alfonso, Mendez, Trece, Amadeo, at Tagaytay</strong> sa abot-kayang delivery rate!
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 bg-[#1F2937] p-4 rounded-2xl border border-gray-700 shadow-md">
                <div className="p-2.5 rounded-xl bg-[#CC8800]/20 text-[#FDE68A] shrink-0 border border-[#CC8800]/30">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#FFFBF5]">Cavite Direct Rider Delivery</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">Sariwang luto, maingat na naka-thermal pack para mainit pagdating sa inyong hapag-kainan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-[#1F2937] p-4 rounded-2xl border border-gray-700 shadow-md">
                <div className="p-2.5 rounded-xl bg-[#16A34A]/20 text-[#4ADE80] shrink-0 border border-[#16A34A]/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#FFFBF5]">MOP: GCash, Cash, o Bank Transfer</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">Walang hassle magbayad. Available sa Cash on Delivery o Pick up sa {siteConfig.store.kitchenShort}.</p>
                </div>
              </div>
            </div>

            {/* Hub info banner */}
            <div className="p-4 rounded-2xl bg-[#C55221]/20 border border-[#C55221] text-xs font-mono space-y-1">
              <span className="text-[#FDE68A] font-bold uppercase tracking-wider block">📍 Main Kitchen Address:</span>
              <p className="text-gray-200">{siteConfig.store.kitchenAddress} ({siteConfig.store.landmarkNote})</p>
              <p className="text-gray-400 text-[11px]">Operating Hours: {siteConfig.hours.displayFull}</p>
            </div>
          </div>

          {/* Right Column: Interactive Barangay Fee Checker (7 cols on md+) */}
          <div className="md:col-span-7">
            <div className="bg-[#1F2937] rounded-3xl border-2 border-gray-700 p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000000]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#FFFBF5] uppercase tracking-wide">
                    Delivery Locator & Rates
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">Piliin ang bayan at hanapin ang inyong barangay.</p>
                </div>

                {/* Search Box with Clear Button */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search barangay..."
                    aria-label="Search barangay or town"
                    className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl bg-[#111827] border border-gray-600 text-white placeholder-gray-400 focus:border-[#CC8800] focus:ring-1 focus:ring-[#CC8800] focus:outline-hidden font-mono min-h-[44px]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-2 text-xs min-w-[32px] min-h-[32px] flex items-center justify-center cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Town Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none overscroll-x-contain touch-pan-x">
                {towns.map((town) => (
                  <button
                    key={town}
                    onClick={() => setSelectedTown(town)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer btn-press min-h-[44px] flex items-center justify-center ${
                      selectedTown === town
                        ? 'bg-[#CC8800] text-[#111827] shadow-sm'
                        : 'bg-[#111827] text-gray-300 hover:bg-gray-800 border border-gray-700'
                    }`}
                  >
                    {town}
                  </button>
                ))}
              </div>

              {/* Barangay Options List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1 mb-6">
                {filteredAreas.length === 0 ? (
                  <div className="col-span-2 text-center py-6 px-4 rounded-xl bg-[#111827] border border-gray-800 text-xs text-gray-300 font-mono space-y-3">
                    <p>
                      Walang barangay na tumugma sa <strong className="text-[#CC8800] font-bold">"{searchTerm}"</strong>.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedTown('ALL');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#C55221] hover:bg-[#A33F13] text-white text-xs font-bold btn-press cursor-pointer min-h-[36px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>I-reset ang Search</span>
                      </button>
                      <a
                        href={siteConfig.social.facebookPageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1F2937] hover:bg-gray-800 text-[#FDE68A] border border-gray-700 text-xs font-bold btn-press min-h-[36px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#CC8800]" />
                        <span>Inquire Delivery Rate sa FB</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  filteredAreas.map(area => {
                    const isSelected = selectedArea.barangay === area.barangay;
                    return (
                      <button
                        key={`${area.town}-${area.barangay}`}
                        onClick={() => setSelectedArea(area)}
                        className={`p-3 rounded-xl text-left border-2 transition-all cursor-pointer btn-press flex items-center justify-between min-h-[48px] ${
                          isSelected
                            ? 'border-[#CC8800] bg-[#CC8800]/15 text-white shadow-sm'
                            : 'border-gray-700 hover:border-gray-500 bg-[#111827] text-gray-300'
                        }`}
                      >
                        <div>
                          <div className="font-display font-bold text-xs text-white">{area.barangay}</div>
                          <div className="text-[10px] text-gray-400 font-mono">{area.town}</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-mono font-bold ${area.fee === 0 ? 'text-[#4ADE80]' : 'text-[#FDE68A]'}`}>
                            {area.fee === 0 ? 'FREE' : `₱${area.fee}`}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected Result Box */}
              <div className="bg-[#111827] text-white p-5 rounded-2xl border-2 border-[#CC8800] space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#CC8800] uppercase font-bold tracking-wider">Napiling Destinasyon:</span>
                    <h4 className="font-display font-extrabold text-xl text-[#FFFBF5]">
                      {selectedArea.barangay}, {selectedArea.town}
                    </h4>
                  </div>
                  <span className="self-start sm:self-auto bg-[#16A34A] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full border border-green-400">
                    Active Delivery Area ✓
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-[#1F2937] p-3 rounded-xl border border-gray-700">
                    <span className="text-gray-400 block text-[10px] uppercase">Standard Delivery Rate:</span>
                    <span className="text-lg font-extrabold text-[#FDE68A]">
                      {selectedArea.fee === 0 ? 'FREE (Poblacion)' : `₱${selectedArea.fee} PHP`}
                    </span>
                  </div>
                  <div className="bg-[#1F2937] p-3 rounded-xl border border-gray-700">
                    <span className="text-gray-400 block text-[10px] uppercase">Estimated Travel:</span>
                    <span className="text-lg font-extrabold text-white">
                      {selectedArea.estimatedMinutes}
                    </span>
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
