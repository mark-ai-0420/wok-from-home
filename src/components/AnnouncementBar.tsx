import React, { useState } from 'react';
import { Flame, Clock, Sparkles, Check } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface AnnouncementBarProps {
  onCopyCode: (code: string) => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onCopyCode }) => {
  const { siteConfig } = useSiteConfig();
  const [isCopied, setIsCopied] = useState(false);

  const voucherCode = siteConfig.voucher.code;
  const voucherDesc = siteConfig.voucher.description;
  const isVoucherActive = siteConfig.voucher.isActive;

  const handleCopy = (code: string) => {
    // 1. Trigger parent notification handler
    onCopyCode(code);

    // 2. Resilient clipboard write with fallback
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).catch(() => {
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }

    // 3. Temporary visual feedback
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
      // Graceful silence on restricted webview environments
    }
  };

  return (
    <div className="bg-[#111827] text-white border-b border-[#C55221]/30 py-2 px-4 text-xs md:text-sm font-mono tracking-tight">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC8800] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC8800]"></span>
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-[#FFFBF5]">
            <Flame className="w-3.5 h-3.5 text-[#CC8800] inline-block animate-pulse" />
            <span className="hidden sm:inline">{siteConfig.store.storeName} • {siteConfig.store.branchName}, Cavite:</span>
            <span className="text-[#CC8800]">{siteConfig.copy.tagline}!</span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <div className="hidden lg:flex items-center gap-1.5 text-gray-300">
            <Clock className="w-3.5 h-3.5 text-[#C55221]" />
            <span>{siteConfig.hours.displayFull}</span>
          </div>

          {isVoucherActive && (
            <button
              onClick={() => handleCopy(voucherCode)}
              aria-live="polite"
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all btn-press border shadow-xs cursor-pointer min-h-[32px] ${
                isCopied
                  ? 'bg-[#16A34A] text-white border-green-400'
                  : 'bg-[#C55221] hover:bg-[#A33F13] text-white border-[#CC8800]/40'
              }`}
              title="Click to copy voucher code"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>✓ KOPYADO! ({voucherDesc})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#CC8800]" />
                  <span>Code: <span className="underline decoration-[#CC8800]">{voucherCode}</span> ({voucherDesc})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
