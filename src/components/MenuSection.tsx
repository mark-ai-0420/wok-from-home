import React, { useState } from 'react';
import { Flame, Plus, Check, Eye, X, Image as ImageIcon } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { MenuItem, MenuCategory, SizeOption } from '../types';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, selectedSize?: SizeOption) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart }) => {
  const { menuItems } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeOption>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [previewMenuCard, setPreviewMenuCard] = useState<string | null>(null);

  // Close preview modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewMenuCard) {
        setPreviewMenuCard(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewMenuCard]);

  const categories = React.useMemo<{ id: MenuCategory; label: string; icon: string }[]>(() => [
    { id: 'all', label: 'Lahat (All Menu)', icon: '🔥' },
    { id: 'pancit', label: 'Pancit Bilaos & Trays', icon: '🥢' },
    { id: 'special-lomi', label: 'Special Overload Lomi (New!)', icon: '🍜' },
    { id: 'bundles', label: 'Family Pan Bundles', icon: '🍗' },
    { id: 'pasta', label: 'Party Pasta Trays', icon: '🍝' },
    { id: 'ulam-trays', label: 'Ulam Trays (Pre-Order)', icon: '🍱' },
    { id: 'others', label: 'Snacks & Desserts', icon: '🧀' },
  ], []);

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: menuItems.length };
    menuItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [menuItems]);

  const filteredItems = React.useMemo(() => {
    return activeCategory === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const getEffectivePrice = (item: MenuItem): number => {
    if (item.sizes && item.sizes.length > 0) {
      const selected = selectedSizes[item.id] || item.sizes[0];
      return selected.price;
    }
    return item.price;
  };

  const handleSelectSize = (itemId: string, size: SizeOption) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleAdd = (item: MenuItem) => {
    if (addedItemIds[item.id]) return; // Debounce rapid double clicks

    const chosenSize = item.sizes && item.sizes.length > 0 
      ? (selectedSizes[item.id] || item.sizes[0]) 
      : undefined;

    onAddToCart(item, chosenSize);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 lg:py-20 bg-[#FFFBF5] border-b border-[#E8DDCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CC8800]/15 border border-[#CC8800]/30 text-[#8F5500] font-mono text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#CC8800]" />
            Official Wok From Home Indang Menu
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight uppercase">
            ANG PAGKAING <span className="text-[#C55221]">TATAK CHEF</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Saktong-sakto sa panlasang Pinoy at abot-kaya para sa lahat. Pancit bilaos, pasta pans, family chicken bundles, at party ulam trays!
          </p>

          {/* Button to view real menu scan cards */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMenuCard('/images/menu/menu1.jpg')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCE] text-xs font-mono font-bold text-gray-800 hover:border-[#C55221] hover:text-[#C55221] transition-all cursor-pointer shadow-xs btn-press min-h-[44px]"
            >
              <Eye className="w-3.5 h-3.5 text-[#C55221]" />
              <span>View Pancit & Pasta Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMenuCard('/images/menu/menu2.jpg')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCE] text-xs font-mono font-bold text-gray-800 hover:border-[#C55221] hover:text-[#C55221] transition-all cursor-pointer shadow-xs btn-press min-h-[44px]"
            >
              <Eye className="w-3.5 h-3.5 text-[#C55221]" />
              <span>View Ulam Trays Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMenuCard('/images/menu/menu3.jpg')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8DDCE] text-xs font-mono font-bold text-gray-800 hover:border-[#C55221] hover:text-[#C55221] transition-all cursor-pointer shadow-xs btn-press min-h-[44px]"
            >
              <Eye className="w-3.5 h-3.5 text-[#C55221]" />
              <span>View Family Bundles Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMenuCard('/images/menu/special_overload_lomi.jpg')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#CC8800]/10 border border-[#CC8800] text-xs font-mono font-bold text-[#8F5500] hover:bg-[#CC8800]/20 transition-all cursor-pointer shadow-xs btn-press min-h-[44px]"
            >
              <Eye className="w-3.5 h-3.5 text-[#CC8800]" />
              <span>View Special Overload Lomi</span>
            </button>
          </div>
        </div>

        {/* Sticky Sub-Navigation Category Filter Bar */}
        <div className="sticky top-[4.25rem] sm:top-20 z-30 bg-[#FFFBF5]/95 backdrop-blur-md py-2.5 sm:py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-y border-[#E8DDCE]/80 shadow-xs mb-8 transition-all overscroll-x-contain touch-pan-x">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto gap-2 sm:gap-2.5 scrollbar-none">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    // Smooth scroll to top of menu if user is deep in list
                    const menuEl = document.getElementById('menu');
                    if (menuEl && window.scrollY > menuEl.offsetTop + 150) {
                      menuEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-display font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all cursor-pointer btn-press border flex items-center gap-2 min-h-[40px] sm:min-h-[44px] ${
                    isActive
                      ? 'bg-[#111827] text-white border-[#CC8800] shadow-md'
                      : 'bg-white text-gray-800 border-[#E8DDCE] hover:border-gray-400 hover:bg-[#F4EDE2]'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#CC8800] text-[#111827] font-extrabold' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map(item => {
            const isAdded = addedItemIds[item.id];
            const currentSize = item.sizes ? (selectedSizes[item.id] || item.sizes[0]) : null;
            const currentPrice = getEffectivePrice(item);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border-2 border-[#111827] shadow-[4px_4px_0px_0px_#111827] hover:shadow-[6px_6px_0px_0px_#C55221] hover:border-[#C55221] transition-all flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/menu/pancit_sotanghon_bilao.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none"></div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {item.isBestSeller && (
                        <span className="bg-[#C55221] text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                          Bestseller
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="bg-[#CC8800] text-[#111827] text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                          Tatak Chef
                        </span>
                      )}
                      {item.isPreOrder && (
                        <span className="bg-[#111827] text-[#FDE68A] border border-[#CC8800]/60 text-[10px] font-mono font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                          Pre-Order
                        </span>
                      )}
                    </div>

                    {/* Servings Tag */}
                    {item.servings && (
                      <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white bg-black/75 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10 z-10">
                        👥 {item.servings}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#111827] leading-snug group-hover:text-[#C55221] transition-colors">
                        {item.name}
                      </h3>
                      {item.priceDisplay && (
                        <div className="text-xs font-mono font-bold text-[#C55221] mt-0.5">
                          {item.priceDisplay}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredients detail if present */}
                    {item.ingredients && (
                      <p className="text-[11px] text-gray-600 italic">
                        <strong className="text-gray-800 font-semibold">Rekado:</strong> {item.ingredients}
                      </p>
                    )}

                    {/* Size Selector if item has multiple sizes */}
                    {item.sizes && item.sizes.length > 0 && (
                      <div className="pt-2">
                        <label className="block text-[11px] font-mono font-bold text-gray-800 mb-1.5">
                          Pumili ng Tray / Bilao Size:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {item.sizes.map((s) => {
                            const isSizeSelected = currentSize?.size === s.size;
                            return (
                              <button
                                key={s.size}
                                type="button"
                                onClick={() => handleSelectSize(item.id, s)}
                                className={`px-3 py-2.5 rounded-xl text-left text-xs font-mono border-2 transition-all cursor-pointer flex items-center justify-between min-h-[44px] ${
                                  isSizeSelected
                                    ? 'border-[#C55221] bg-[#C55221]/15 text-[#111827] font-bold shadow-xs'
                                    : 'border-[#E8DDCE] bg-[#FFFBF5] text-gray-700 hover:border-gray-400'
                                }`}
                              >
                                <span className="font-bold">{s.size}</span>
                                <span className="font-bold text-[#C55221]">₱{s.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Price & Add Button */}
                <div className="p-5 pt-0 border-t border-[#E8DDCE] mt-3">
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-wider">
                        {currentSize ? `${currentSize.label}` : 'PRICE'}
                      </div>
                      <div className="font-mono font-extrabold text-2xl text-[#111827]">
                        ₱{currentPrice.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      disabled={isAdded}
                      aria-label={`Add ${item.name} to bag`}
                      className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all btn-press shadow-xs cursor-pointer min-h-[44px] ${
                        isAdded
                          ? 'bg-[#16A34A] text-white shadow-sm cursor-default'
                          : 'bg-[#C55221] hover:bg-[#A33F13] text-white border border-[#CC8800]/40 shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-white" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Facebook Menu Photo Lightbox Modal */}
      {previewMenuCard && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Official Wok From Home Menu Scan"
          onClick={() => setPreviewMenuCard(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs transition-opacity duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#111827] rounded-3xl overflow-hidden border-2 border-[#CC8800] shadow-[0px_20px_50px_rgba(0,0,0,0.8)] p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/15 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#CC8800]" />
                <span className="font-display font-bold text-base sm:text-lg text-[#FFFBF5]">Official Menu Scan (Original Offerings)</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMenuCard(null)}
                aria-label="Close preview modal"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[75vh] flex justify-center bg-black/60 rounded-2xl p-2 border border-white/5">
              <img
                src={previewMenuCard}
                alt="Wok From Home Official Menu Card"
                className="max-w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center pt-3">
              <p className="text-xs font-mono text-gray-400">
                Pindutin ang <kbd className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700 text-[10px]">ESC</kbd> o i-click kahit saan sa labas para isara.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
