import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Search, RotateCcw, Check } from 'lucide-react';
import { MenuCategory } from '../../../types';

export const MenuPricingTab: React.FC = () => {
  const { menuItems, updateMenuItemPrice, resetMenuPrices } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({});

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'Lahat' },
    { id: 'pancit', label: 'Pancit' },
    { id: 'special-lomi', label: 'Overload Lomi' },
    { id: 'bundles', label: 'Bundles' },
    { id: 'pasta', label: 'Pasta' },
    { id: 'ulam-trays', label: 'Ulam Trays' },
    { id: 'others', label: 'Snacks' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePriceChange = (itemId: string, newPriceStr: string, sizeKey?: string) => {
    const parsed = parseInt(newPriceStr, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      updateMenuItemPrice(itemId, parsed, sizeKey);
      const key = sizeKey ? `${itemId}:${sizeKey}` : itemId;
      setSavedKeys(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setSavedKeys(prev => ({ ...prev, [key]: false }));
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#FFFBF5]">Pamamahala sa Presyo ng Menu</h3>
          <p className="text-xs text-gray-400 font-mono">
            Direktang baguhin ang presyo ng bawat bilao, lomi, at party tray. Awtomatikong mag-uupdate sa website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Sigurado ka bang nais mong i-reset ang lahat ng presyo ng menu sa default?')) {
              resetMenuPrices();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-mono font-bold border border-gray-700 btn-press cursor-pointer min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>I-reset ang Menu sa Default</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer btn-press min-h-[36px] ${
                selectedCategory === cat.id
                  ? 'bg-[#CC8800] text-[#111827]'
                  : 'bg-[#111827] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Maghanap ng pagkain..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#111827] border border-gray-700 text-white font-mono placeholder-gray-500 focus:border-[#CC8800] focus:outline-hidden min-h-[38px]"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-[#111827] p-4 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left: Dish Info */}
            <div className="flex items-center gap-3.5 flex-1">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover border border-gray-700 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-800 text-[#CC8800] border border-gray-700">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
              </div>
            </div>

            {/* Right: Pricing Inputs */}
            <div className="flex flex-wrap items-center gap-3">
              {item.sizes && item.sizes.length > 0 ? (
                /* Multi-size items */
                <div className="flex flex-wrap items-center gap-2">
                  {item.sizes.map(s => {
                    const key = `${item.id}:${s.size}`;
                    const isSaved = savedKeys[key];
                    return (
                      <div key={s.size} className="flex items-center bg-[#1F2937] px-2.5 py-1.5 rounded-xl border border-gray-700 gap-1.5">
                        <span className="text-[11px] font-mono text-gray-400 font-bold">{s.size}:</span>
                        <span className="text-xs font-mono text-[#CC8800]">₱</span>
                        <input
                          type="number"
                          defaultValue={s.price}
                          onBlur={(e) => handlePriceChange(item.id, e.target.value, s.size)}
                          className="w-16 bg-[#111827] px-1.5 py-0.5 rounded text-xs font-mono text-white text-right focus:outline-hidden border border-gray-700 focus:border-[#CC8800]"
                        />
                        {isSaved && <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Single price items */
                <div className="flex items-center bg-[#1F2937] px-3 py-1.5 rounded-xl border border-gray-700 gap-2">
                  <span className="text-xs font-mono text-gray-400 font-bold">Presyo:</span>
                  <span className="text-xs font-mono text-[#CC8800]">₱</span>
                  <input
                    type="number"
                    defaultValue={item.price}
                    onBlur={(e) => handlePriceChange(item.id, e.target.value)}
                    className="w-20 bg-[#111827] px-2 py-1 rounded text-xs font-mono text-white text-right focus:outline-hidden border border-gray-700 focus:border-[#CC8800]"
                  />
                  {savedKeys[item.id] && <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
