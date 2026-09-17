import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, CheckCircle, Tag, MapPin, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useSiteConfig } from '../context/SiteConfigContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { siteConfig } = useSiteConfig();
  const deliveryAreas = siteConfig.deliveryAreas;
  const [selectedArea, setSelectedArea] = useState(() => deliveryAreas[0]);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [voucherMessage, setVoucherMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Customer details & validation errors
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'COD' | 'Maya'>('GCash');
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [isOrdered, setIsOrdered] = useState(false);
  const [isCopiedOrder, setIsCopiedOrder] = useState(false);

  // Close drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Computations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? selectedArea.fee : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - appliedDiscount);

  const isValidPhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, '');
    return /^(09|\+639)\d{9}$/.test(cleaned) || /^\d{10,12}$/.test(cleaned);
  };

  const validateOrderForm = (): boolean => {
    const errors: { name?: string; phone?: string; address?: string } = {};
    if (!customerName.trim()) {
      errors.name = 'Paki-lagay po ang inyong pangalan.';
    }
    if (!customerPhone.trim()) {
      errors.phone = 'Paki-lagay po ang inyong mobile number.';
    } else if (!isValidPhone(customerPhone)) {
      errors.phone = 'Format: 09171234567 o +639171234567';
    }
    if (!customerAddress.trim()) {
      errors.address = 'Paki-lagay po ang inyong street, barangay, o landmark.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyVoucher = () => {
    if (!siteConfig.voucher.isActive) {
      setAppliedDiscount(0);
      setVoucherMessage({ type: 'error', text: 'No active vouchers at the moment.' });
      return;
    }
    if (voucherCode.trim().toUpperCase() === siteConfig.voucher.code.toUpperCase()) {
      setAppliedDiscount(siteConfig.voucher.discountAmount);
      setVoucherMessage({ type: 'success', text: `₱${siteConfig.voucher.discountAmount} discount applied successfully!` });
    } else {
      setAppliedDiscount(0);
      setVoucherMessage({ type: 'error', text: `Invalid voucher code. Try "${siteConfig.voucher.code}"` });
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    } catch {
      // Graceful fallback
    }
  };

  // Clean, 100% bulletproof order text that never corrupts into '' across Facebook Messenger redirect
  const generateOrderText = () => {
    const formattedAddress = customerAddress.trim()
      ? `${customerAddress.trim()} (Brgy. ${selectedArea.barangay}, ${selectedArea.town})`
      : `${selectedArea.barangay}, ${selectedArea.town}`;

    let text = `*NEW ORDER - ${siteConfig.store.storeName.toUpperCase()} (${siteConfig.store.branchName.toUpperCase()})*\n\n`;
    text += `*Customer:* ${customerName.trim() || 'Customer'}\n`;
    text += `*Contact:* ${customerPhone.trim() || 'N/A'}\n`;
    text += `*Delivery Address:* ${formattedAddress}\n`;
    text += `*Payment Method:* ${paymentMethod}\n\n`;
    text += `*ORDER DETAILS:*\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x${item.quantity} - Php ${item.price * item.quantity}\n`;
      if (item.customDetails && item.customDetails.length > 0) {
        text += `   ↳ ${item.customDetails.join(', ')}\n`;
      }
    });

    text += `\n*Subtotal:* Php ${subtotal.toLocaleString()}\n`;
    text += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE (Poblacion)' : `Php ${deliveryFee}`} (${selectedArea.barangay})\n`;
    if (appliedDiscount > 0) {
      text += `*Voucher Discount:* -Php ${appliedDiscount}\n`;
    }
    text += `*TOTAL AMOUNT:* Php ${grandTotal.toLocaleString()} PHP\n\n`;
    text += `Paki-confirm po kung available para sa delivery! Maraming salamat po!`;

    return text;
  };

  const copyOrderToClipboard = () => {
    const text = generateOrderText();
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setIsCopiedOrder(true);
    setTimeout(() => setIsCopiedOrder(false), 2500);
  };

  // Generate Facebook Messenger order link with clean URL-encoded text
  const generateMessengerUrl = () => {
    const orderText = generateOrderText();
    return `https://m.me/${siteConfig.social.facebookPageId}?text=${encodeURIComponent(orderText)}`;
  };

  const handleMessengerClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateOrderForm()) {
      e.preventDefault();
      return;
    }
    // Also copy to clipboard so the customer can paste instantly if Messenger app doesn't auto-prefill
    copyOrderToClipboard();
  };

  const handleSimulateCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (!validateOrderForm()) return;

    try {
      // Dynamic import to split canvas-confetti from initial bundle
      const confettiModule = await import('canvas-confetti');
      const triggerConfetti = confettiModule.default || confettiModule;
      triggerConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Graceful fallback
    }

    setIsOrdered(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden animate-fadeIn"
    >
      {/* Dark Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FFFBF5] shadow-2xl flex flex-col justify-between border-l-2 border-[#111827] transform transition-transform duration-300 ease-out pb-[max(0.75rem,calc(env(safe-area-inset-bottom,0px)+0.5rem))]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8DDCE] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C55221]" />
              <h2 id="cart-drawer-title" className="font-display font-extrabold text-lg sm:text-xl text-[#111827] uppercase tracking-tight">
                Your Food Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close food bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {isOrdered ? (
              /* Success confirmation state */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mx-auto border-2 border-[#16A34A]/20">
                  <CheckCircle className="w-10 h-10 text-[#16A34A]" />
                </div>
                <h3 className="font-display font-extrabold text-2xl text-[#111827] uppercase tracking-tight">
                  SALAMAT SA ORDER!
                </h3>
                <p className="text-sm text-gray-700 max-w-xs mx-auto leading-relaxed">
                  Nakatanggap ang kusina sa Indang ng iyong order request. I-send ito sa Facebook Messenger para sa agarang rider dispatch:
                </p>

                {/* Receipt Card Preview */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-600 px-1">
                    <span className="font-bold uppercase text-[#C55221]">Order Summary Receipt:</span>
                    <span>Ready to send</span>
                  </div>
                  <div className="bg-[#111827] text-[#FFFBF5] p-3.5 rounded-xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto border border-[#CC8800]/40 shadow-inner select-all whitespace-pre-wrap">
                    {generateOrderText()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <a
                    href={generateMessengerUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1877F2] text-white font-display font-bold text-sm shadow-md btn-press hover:bg-[#166fe5] min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Order to Facebook Messenger</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyOrderToClipboard}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-mono font-bold text-xs shadow-xs btn-press cursor-pointer min-h-[44px]"
                  >
                    {isCopiedOrder ? (
                      <>
                        <Check className="w-4 h-4 text-[#16A34A]" />
                        <span className="text-[#16A34A]">✓ Copied to Clipboard! (Ready to Paste)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-600" />
                        <span>Copy Order Details to Clipboard</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setIsOrdered(false);
                    onClose();
                  }}
                  className="text-xs font-mono text-gray-600 hover:text-[#C55221] underline cursor-pointer pt-2 min-h-[44px] inline-flex items-center"
                >
                  Order again or close bag
                </button>
              </div>
            ) : items.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#C55221]/10 text-[#C55221] rounded-full flex items-center justify-center mx-auto border border-[#C55221]/20">
                  <ShoppingBag className="w-8 h-8 text-[#C55221]" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#111827]">
                  Walang Laman ang Bag Mo
                </h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                  Pumili ng masasarap at siksik sa rekadong bilao, lomi, at party ulam trays mula sa aming menu!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#C55221] text-white font-display font-bold text-xs uppercase tracking-wider btn-press cursor-pointer min-h-[44px] shadow-sm"
                >
                  Tingnan ang Menu
                </button>
              </div>
            ) : (
              /* Items list and forms */
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {items.map(item => (
                    <div
                      key={item.cartId}
                      className="bg-white p-4 rounded-xl border border-[#E8DDCE] shadow-xs flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display font-bold text-sm text-[#111827]">
                            {item.name}
                          </h4>
                          <span className="font-mono font-extrabold text-sm text-[#111827]">
                            ₱{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        {item.selectedSize && (
                          <div className="text-[11px] font-mono text-[#C55221] font-bold mt-0.5">
                            Size: {item.selectedSize}
                          </div>
                        )}

                        {item.customDetails && item.customDetails.length > 0 && (
                          <div className="text-[11px] text-gray-600 font-mono mt-1 space-y-0.5">
                            {item.customDetails.map((detail, idx) => (
                              <div key={idx}>• {detail}</div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                          {/* Accessible Quantity stepper (44px targets) */}
                          <div className="flex items-center border-2 border-[#111827] rounded-xl overflow-hidden shadow-xs bg-white">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartId, -1)}
                              className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-2 font-mono font-bold text-xs text-[#111827] min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartId, 1)}
                              className="w-11 h-11 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Remove button (44px target) */}
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer rounded-lg hover:bg-red-50"
                            aria-label={`Remove ${item.name} from food bag`}
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Barangay Selector */}
                <div className="bg-white p-4 rounded-xl border border-[#E8DDCE] space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="delivery-destination" className="font-mono text-xs font-bold text-[#111827] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C55221]" />
                      Delivery Destination
                    </label>
                    <span className="text-xs font-mono font-bold text-[#C55221]">
                      {selectedArea.fee === 0 ? 'FREE' : `+₱${selectedArea.fee}`}
                    </span>
                  </div>
                  <select
                    id="delivery-destination"
                    value={selectedArea.barangay}
                    onChange={(e) => {
                      const found = deliveryAreas.find(a => a.barangay === e.target.value);
                      if (found) setSelectedArea(found);
                    }}
                    className="w-full p-2.5 rounded-lg border border-[#E8DDCE] text-xs font-mono bg-[#FFFBF5] text-[#111827] focus:border-[#C55221] focus:ring-1 focus:ring-[#C55221] focus:outline-hidden min-h-[44px]"
                  >
                    {deliveryAreas.map(area => (
                      <option key={`${area.town}-${area.barangay}`} value={area.barangay}>
                        {area.barangay} ({area.town}) - {area.fee === 0 ? 'FREE' : `₱${area.fee}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Voucher Code Box */}
                <div className="bg-white p-4 rounded-xl border border-[#E8DDCE] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#111827]">
                    <Tag className="w-3.5 h-3.5 text-[#CC8800]" />
                    <label htmlFor="voucher-code">May Voucher Code Ka Ba?</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      id="voucher-code"
                      type="text"
                      placeholder={`Try ${siteConfig.voucher.code}`}
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 p-2.5 rounded-lg border border-[#E8DDCE] text-xs font-mono uppercase text-[#111827] focus:border-[#CC8800] focus:ring-1 focus:ring-[#CC8800] focus:outline-hidden min-h-[44px]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyVoucher}
                      className="px-4 py-2.5 rounded-lg bg-[#111827] text-white font-mono font-bold text-xs btn-press cursor-pointer hover:bg-black min-h-[44px]"
                    >
                      Apply
                    </button>
                  </div>
                  {voucherMessage && (
                    <p className={`text-[11px] font-mono ${voucherMessage.type === 'success' ? 'text-[#16A34A] font-bold' : 'text-red-500'}`}>
                      {voucherMessage.text}
                    </p>
                  )}
                </div>

                {/* Customer Checkout Form */}
                <form onSubmit={handleSimulateCheckout} className="bg-white p-4 rounded-xl border border-[#E8DDCE] space-y-3">
                  <div className="font-display font-bold text-sm text-[#111827] border-b border-gray-100 pb-2 uppercase tracking-wide">
                    Delivery & Contact Details
                  </div>

                  <div>
                    <label htmlFor="customer-name" className="block text-[11px] font-mono font-bold text-gray-700 mb-1">
                      Pangalan (Your Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      required
                      maxLength={80}
                      placeholder="Hal. Juan dela Cruz"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (formErrors.name) setFormErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'customer-name-error' : undefined}
                      className={`w-full p-2.5 text-xs rounded-lg border text-[#111827] focus:outline-hidden font-sans min-h-[44px] ${
                        formErrors.name
                          ? 'border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                          : 'border-[#E8DDCE] focus:border-[#C55221] focus:ring-1 focus:ring-[#C55221]'
                      }`}
                    />
                    {formErrors.name && (
                      <p id="customer-name-error" className="text-[11px] font-mono text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="customer-phone" className="block text-[11px] font-mono font-bold text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="Hal. 0917 123 4567"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: undefined }));
                      }}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? 'customer-phone-error' : undefined}
                      className={`w-full p-2.5 text-xs rounded-lg border text-[#111827] focus:outline-hidden font-mono min-h-[44px] ${
                        formErrors.phone
                          ? 'border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                          : 'border-[#E8DDCE] focus:border-[#C55221] focus:ring-1 focus:ring-[#C55221]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p id="customer-phone-error" className="text-[11px] font-mono text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{formErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="customer-address" className="block text-[11px] font-mono font-bold text-gray-700">
                        Exact Street / Landmark / House # <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-gray-400">
                        {customerAddress.length}/300
                      </span>
                    </div>
                    <textarea
                      id="customer-address"
                      required
                      rows={3}
                      maxLength={300}
                      placeholder="Hal. House #12, tapat ng CVSU Gate 2, may pulang gate"
                      value={customerAddress}
                      onChange={(e) => {
                        setCustomerAddress(e.target.value);
                        if (formErrors.address) setFormErrors(prev => ({ ...prev, address: undefined }));
                      }}
                      aria-invalid={!!formErrors.address}
                      aria-describedby={formErrors.address ? 'customer-address-error' : undefined}
                      className={`w-full p-2.5 text-xs rounded-lg border text-[#111827] focus:outline-hidden font-sans resize-none ${
                        formErrors.address
                          ? 'border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                          : 'border-[#E8DDCE] focus:border-[#C55221] focus:ring-1 focus:ring-[#C55221]'
                      }`}
                    />
                    {formErrors.address && (
                      <p id="customer-address-error" className="text-[11px] font-mono text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                        <span>{formErrors.address}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-gray-700 mb-1.5">
                      Paraan ng Pagbabayad (MOP)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['GCash', 'COD', 'Maya'] as const).map(pm => (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => setPaymentMethod(pm)}
                          className={`py-2.5 px-1 text-center rounded-xl text-xs font-mono font-bold border-2 transition-all cursor-pointer min-h-[44px] ${
                            paymentMethod === pm
                              ? 'border-[#C55221] bg-[#C55221] text-white shadow-xs'
                              : 'border-[#E8DDCE] bg-white text-gray-800 hover:border-gray-400'
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer: Pricing & Action */}
          {items.length > 0 && !isOrdered && (
            <div className="p-4 sm:p-5 border-t border-[#E8DDCE] bg-white space-y-3">
              {/* Calculations */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-bold">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery ({selectedArea.barangay}):</span>
                  <span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₱${deliveryFee}`}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#16A34A] font-bold">
                    <span>Voucher Discount ({siteConfig.voucher.code}):</span>
                    <span>-₱{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#111827] pt-2 border-t border-gray-200">
                  <span>TOTAL TO PAY:</span>
                  <span className="text-[#C55221] text-xl">₱{grandTotal.toLocaleString()} PHP</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Send via Facebook Messenger Direct Link */}
                <a
                  href={generateMessengerUrl()}
                  onClick={handleMessengerClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-display font-bold text-sm transition-all btn-press shadow-md text-center min-h-[48px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Order to Facebook Messenger</span>
                </a>

                {/* 2. Direct Mock Order Simulation */}
                <button
                  type="button"
                  onClick={handleSimulateCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#111827] hover:bg-black text-[#FFFBF5] font-display font-semibold text-xs tracking-wider uppercase border border-[#CC8800]/40 transition-all btn-press cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#CC8800]" />
                  <span>Simulate Instant Order Verification</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
