import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, MenuItem } from '../types';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';
import { MENU_ITEMS } from '../data/menu';

interface SiteConfigContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  resetSiteConfig: () => void;
  menuItems: MenuItem[];
  updateMenuItemPrice: (itemId: string, newPrice: number, sizeKey?: string) => void;
  resetMenuPrices: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

const STORAGE_KEY_CONFIG = 'wok_from_home_site_config';
const STORAGE_KEY_PRICES = 'wok_from_home_menu_custom_prices';

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Site Config State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with DEFAULT_SITE_CONFIG to ensure new schema fields exist
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          store: { ...DEFAULT_SITE_CONFIG.store, ...(parsed.store || {}) },
          hours: { ...DEFAULT_SITE_CONFIG.hours, ...(parsed.hours || {}) },
          social: { ...DEFAULT_SITE_CONFIG.social, ...(parsed.social || {}) },
          voucher: { ...DEFAULT_SITE_CONFIG.voucher, ...(parsed.voucher || {}) },
          copy: { ...DEFAULT_SITE_CONFIG.copy, ...(parsed.copy || {}) },
          deliveryAreas: parsed.deliveryAreas || DEFAULT_SITE_CONFIG.deliveryAreas,
          paymentMethods: parsed.paymentMethods || DEFAULT_SITE_CONFIG.paymentMethods,
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SITE_CONFIG;
  });

  // 2. Custom Menu Prices State (itemId or itemId:size -> price)
  const [customPrices, setCustomPrices] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRICES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save config on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(siteConfig));
    } catch {
      // ignore quota errors
    }
  }, [siteConfig]);

  // Save custom prices on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRICES, JSON.stringify(customPrices));
    } catch {
      // ignore
    }
  }, [customPrices]);

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    setSiteConfig(prev => ({
      ...prev,
      ...newConfig,
      store: newConfig.store ? { ...prev.store, ...newConfig.store } : prev.store,
      hours: newConfig.hours ? { ...prev.hours, ...newConfig.hours } : prev.hours,
      social: newConfig.social ? { ...prev.social, ...newConfig.social } : prev.social,
      voucher: newConfig.voucher ? { ...prev.voucher, ...newConfig.voucher } : prev.voucher,
      copy: newConfig.copy ? { ...prev.copy, ...newConfig.copy } : prev.copy,
    }));
  };

  const resetSiteConfig = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY_CONFIG);
    } catch {
      // ignore
    }
  };

  // Merge default MENU_ITEMS with custom prices
  const menuItems: MenuItem[] = React.useMemo(() => {
    return MENU_ITEMS.map(item => {
      const customBasePrice = customPrices[item.id];
      const basePrice = typeof customBasePrice === 'number' ? customBasePrice : item.price;

      let updatedSizes = item.sizes;
      if (item.sizes && item.sizes.length > 0) {
        updatedSizes = item.sizes.map(s => {
          const key = `${item.id}:${s.size}`;
          const customSizePrice = customPrices[key];
          return typeof customSizePrice === 'number'
            ? { ...s, price: customSizePrice }
            : s;
        });
      }

      // Re-generate priceDisplay if item has sizes
      let priceDisplay = item.priceDisplay;
      if (updatedSizes && updatedSizes.length > 0) {
        const prices = updatedSizes.map(s => s.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        priceDisplay = min === max ? `₱${min.toLocaleString()}` : `₱${min.toLocaleString()} – ₱${max.toLocaleString()}`;
      }

      return {
        ...item,
        price: basePrice,
        priceDisplay,
        sizes: updatedSizes,
      };
    });
  }, [customPrices]);

  const updateMenuItemPrice = (itemId: string, newPrice: number, sizeKey?: string) => {
    const key = sizeKey ? `${itemId}:${sizeKey}` : itemId;
    setCustomPrices(prev => ({
      ...prev,
      [key]: newPrice,
    }));
  };

  const resetMenuPrices = () => {
    setCustomPrices({});
    try {
      localStorage.removeItem(STORAGE_KEY_PRICES);
    } catch {
      // ignore
    }
  };

  return (
    <SiteConfigContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        resetSiteConfig,
        menuItems,
        updateMenuItemPrice,
        resetMenuPrices,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
