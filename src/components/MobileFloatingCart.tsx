import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface MobileFloatingCartProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const MobileFloatingCart: React.FC<MobileFloatingCartProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-[max(1rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))] inset-x-4 z-40 sm:hidden animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <button
        onClick={onOpenCart}
        className="w-full bg-[#111827] text-white p-3.5 rounded-2xl border-2 border-[#CC8800] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] flex items-center justify-between active:scale-[0.97] transition-all btn-press cursor-pointer"
        aria-label={`Open Food Bag, ${cartCount} items, Total ₱${cartTotal.toLocaleString()}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-[#C55221] text-white">
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#CC8800] text-[#111827] text-[10px] font-mono font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-[#111827]">
              {cartCount}
            </span>
          </div>
          <div className="text-left">
            <div className="text-[10px] font-mono text-gray-300 uppercase tracking-wider font-semibold">Your Food Bag</div>
            <div className="font-mono font-bold text-sm text-[#CC8800]">₱{cartTotal.toLocaleString()} PHP</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-display font-bold text-white bg-[#C55221] px-3.5 py-2 rounded-xl border border-[#CC8800]/40 shadow-xs">
          <span>VIEW BAG</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
      </button>
    </div>
  );
};
