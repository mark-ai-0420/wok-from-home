import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Save, Check, Tag, CreditCard } from 'lucide-react';

export const VoucherPromoTab: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useSiteConfig();
  const [saved, setSaved] = useState(false);

  const [code, setCode] = useState(siteConfig.voucher.code);
  const [discountAmount, setDiscountAmount] = useState(siteConfig.voucher.discountAmount);
  const [description, setDescription] = useState(siteConfig.voucher.description);
  const [isActive, setIsActive] = useState(siteConfig.voucher.isActive);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(siteConfig.paymentMethods);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      voucher: {
        code: code.trim().toUpperCase(),
        discountAmount: Number(discountAmount),
        description: description.trim(),
        isActive,
      },
      paymentMethods,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const togglePaymentMethod = (method: string) => {
    if (paymentMethods.includes(method)) {
      if (paymentMethods.length > 1) {
        setPaymentMethods(prev => prev.filter(m => m !== method));
      }
    } else {
      setPaymentMethods(prev => [...prev, method]);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#FFFBF5]">Voucher, Diskwento, at Mode of Payment</h3>
          <p className="text-xs text-gray-400 font-mono">
            Pamahalaan ang promo voucher code at mga tinatanggap na paraan ng pagbabayad.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-xs uppercase tracking-wider transition-all btn-press shadow-md cursor-pointer min-h-[44px]"
        >
          {saved ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Nai-save Na!' : 'I-save ang Promos'}</span>
        </button>
      </div>

      {/* Voucher Box */}
      <div className="bg-[#111827] p-5 rounded-2xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CC8800] uppercase tracking-wide">
            <Tag className="w-4 h-4" />
            <span>Active Voucher Settings</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-mono text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#CC8800] focus:ring-[#CC8800] bg-gray-800 border-gray-700"
            />
            <span>I-activate ang Voucher sa Site</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-400 mb-1">Voucher Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="WOKINDANG"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white font-mono uppercase text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-400 mb-1">Discount Amount (₱ PHP)</label>
            <input
              type="number"
              required
              min={0}
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
              placeholder="20"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold text-gray-400 mb-1">Badge Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="₱20 OFF"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1F2937] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-[#111827] p-5 rounded-2xl border border-gray-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CC8800] uppercase tracking-wide">
          <CreditCard className="w-4 h-4" />
          <span>Tinatanggap na Paraan ng Pagbabayad (MOP)</span>
        </div>
        <p className="text-xs text-gray-400 font-mono">
          Piliin ang mga opsyon na lalabas sa Cart Drawer at Checkout form:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {['GCash', 'Cash on Delivery (COD)', 'Maya', 'Bank Transfer'].map(m => {
            const isSelected = paymentMethods.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() => togglePaymentMethod(m)}
                className={`p-3 rounded-xl border text-left text-xs font-mono font-bold transition-all cursor-pointer btn-press flex items-center justify-between min-h-[44px] ${
                  isSelected
                    ? 'border-[#CC8800] bg-[#CC8800]/15 text-[#FFFBF5]'
                    : 'border-gray-800 bg-[#1F2937] text-gray-400 hover:text-white'
                }`}
              >
                <span>{m}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded ${isSelected ? 'bg-[#CC8800] text-[#111827]' : 'bg-gray-800 text-gray-500'}`}>
                  {isSelected ? 'ACTIVE' : 'OFF'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
};
