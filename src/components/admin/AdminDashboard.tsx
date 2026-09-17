import React, { useState } from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { StoreInfoTab } from './tabs/StoreInfoTab';
import { OperatingHoursTab } from './tabs/OperatingHoursTab';
import { MenuPricingTab } from './tabs/MenuPricingTab';
import { DeliveryRatesTab } from './tabs/DeliveryRatesTab';
import { VoucherPromoTab } from './tabs/VoucherPromoTab';
import { Flame, Store, Clock, Utensils, Truck, Tag, RotateCcw, LogOut, ExternalLink } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewStorefront: () => void;
}

type TabKey = 'store' | 'hours' | 'menu' | 'delivery' | 'voucher';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewStorefront }) => {
  const { resetSiteConfig, resetMenuPrices } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<TabKey>('store');

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'store', label: 'Store & Contact', icon: <Store className="w-4 h-4" /> },
    { key: 'hours', label: 'Operating Hours', icon: <Clock className="w-4 h-4" /> },
    { key: 'menu', label: 'Menu & Pricing', icon: <Utensils className="w-4 h-4" /> },
    { key: 'delivery', label: 'Delivery Rates', icon: <Truck className="w-4 h-4" /> },
    { key: 'voucher', label: 'Voucher & Promos', icon: <Tag className="w-4 h-4" /> },
  ];

  const handleResetAll = () => {
    if (window.confirm('WARNING: Nais mo bang ibalik ang LAHAT ng settings, oras, delivery rates, at presyo sa Original Factory Defaults?')) {
      resetSiteConfig();
      resetMenuPrices();
      alert('Matagumpay na naibalik ang lahat sa default settings!');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#111827] text-[#FFFBF5] font-sans selection:bg-[#CC8800] selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1F2937]/95 backdrop-blur-md border-b-2 border-black px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#CC8800] flex items-center justify-center text-[#111827] shadow-xs">
              <Flame className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-base text-[#FFFBF5] uppercase tracking-wide">
                  Wok From Home Admin
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#16A34A]/20 text-[#4ADE80] font-mono text-[10px] font-bold border border-[#16A34A]/30">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono text-gray-400">Daine 2, Indang, Cavite Management Console</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onViewStorefront}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C55221] hover:bg-[#A33F13] text-white font-display font-bold text-xs uppercase tracking-wider btn-press cursor-pointer min-h-[40px] shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Tingnan ang Live Site</span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-mono text-xs border border-gray-700 btn-press cursor-pointer min-h-[40px]"
              title="Reset all settings and prices to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] hover:bg-black text-gray-300 hover:text-red-400 font-mono text-xs border border-gray-700 btn-press cursor-pointer min-h-[40px]"
              title="Logout from admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-gray-800 scrollbar-none">
          {tabs.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer btn-press min-h-[44px] ${
                  isActive
                    ? 'bg-[#CC8800] text-[#111827] shadow-md'
                    : 'bg-[#1F2937] text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="bg-[#1F2937] rounded-3xl border-2 border-gray-800 p-5 sm:p-7 shadow-xl min-h-[400px]">
          {activeTab === 'store' && <StoreInfoTab />}
          {activeTab === 'hours' && <OperatingHoursTab />}
          {activeTab === 'menu' && <MenuPricingTab />}
          {activeTab === 'delivery' && <DeliveryRatesTab />}
          {activeTab === 'voucher' && <VoucherPromoTab />}
        </div>
      </main>
    </div>
  );
};
