import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandPillars } from './components/BrandPillars';
import { MenuSection } from './components/MenuSection';
import { DeliveryChecker } from './components/DeliveryChecker';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { MobileFloatingCart } from './components/MobileFloatingCart';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import { CartItem, MenuItem } from './types';
import { Check, Sparkles } from 'lucide-react';

const MainApp: React.FC = () => {
  const { menuItems } = useSiteConfig();

  // Routing State
  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    return hash.startsWith('#/admin') || hash === '#admin' || path === '/admin';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('wok_admin_session') === 'true';
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      const isAdmin = hash.startsWith('#/admin') || hash === '#admin' || path === '/admin';
      setIsAdminRoute(isAdmin);
      if (isAdmin) {
        setIsAdminAuthenticated(sessionStorage.getItem('wok_admin_session') === 'true');
      }
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('wok_from_home_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wok_from_home_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add standard menu item
  const handleAddToCart = (item: MenuItem | CartItem, selectedSize?: { size: string; label: string; price: number }, quantity: number = 1) => {
    setCartItems(prev => {
      // Check if it's already a CartItem
      if ('cartId' in item) {
        return [...prev, item];
      }

      // It's a MenuItem
      const effectivePrice = selectedSize ? selectedSize.price : item.price;
      const sizeLabel = selectedSize ? selectedSize.label : undefined;
      const sizeKey = selectedSize ? selectedSize.size : 'default';
      const existingKey = `${item.id}-${sizeKey}`;

      const existing = prev.find(ci => ci.itemId === existingKey);
      if (existing) {
        return prev.map(ci => 
          ci.itemId === existingKey 
            ? { ...ci, quantity: ci.quantity + quantity } 
            : ci
        );
      } else {
        const newCartItem: CartItem = {
          cartId: `${existingKey}-${Date.now()}`,
          itemId: existingKey,
          name: sizeLabel ? `${item.name} (${sizeLabel})` : item.name,
          price: effectivePrice,
          quantity: quantity,
          selectedSize: sizeLabel,
          image: item.image,
          spiceLevel: item.spiceLevel
        };
        return [...prev, newCartItem];
      }
    });

    const label = selectedSize ? `${item.name} (${selectedSize.label})` : item.name;
    showToast(`Added "${label}" to your bag!`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => 
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed from bag.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToStorefront = () => {
    if (window.location.hash.startsWith('#/admin') || window.location.hash === '#admin') {
      window.location.hash = '';
    } else if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
      setIsAdminRoute(false);
    }
  };

  // If viewing admin route
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToStore={navigateToStorefront}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => {
          sessionStorage.removeItem('wok_admin_session');
          setIsAdminAuthenticated(false);
        }}
        onViewStorefront={navigateToStorefront}
      />
    );
  }

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#FFFBF5] text-[#111827] font-sans selection:bg-[#CC8800] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#CC8800] flex items-center gap-2.5 text-xs sm:text-sm font-mono animate-in fade-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-[#CC8800] shrink-0" />
          <span>{toastMessage}</span>
          <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
        </div>
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar 
        onCopyCode={(code) => {
          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(code).catch(() => {});
          }
          showToast(`Voucher code "${code}" copied to clipboard!`);
        }} 
      />

      {/* 2. Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleScrollTo}
      />

      {/* 3. Hero Section */}
      <main className="flex-1 pb-28 sm:pb-0">
        <Hero
          onOrderNow={() => handleScrollTo('menu')}
          onQuickAdd={(item) => handleAddToCart(item)}
          featuredItem={menuItems[0]}
        />

        {/* 4. Brand Pillars (Masarap, Siksik sa Rekado, Abot-kaya) */}
        <BrandPillars />

        {/* 5. 100% Authentic Menu Section (Pancit, Pasta, Bundles, Ulam Trays, Overload Lomi, Snacks) */}
        <MenuSection onAddToCart={handleAddToCart} />

        {/* 6. Delivery Location Checker */}
        <DeliveryChecker />

        {/* 7. Reviews Section */}
        <ReviewsSection />
      </main>

      {/* 10. Footer */}
      <Footer onNavigate={handleScrollTo} />

      {/* Persistent Mobile Floating Cart Trigger */}
      <MobileFloatingCart
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SiteConfigProvider>
      <MainApp />
    </SiteConfigProvider>
  );
};

export default App;
