import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Save, Check, Clock } from 'lucide-react';

export const OperatingHoursTab: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useSiteConfig();
  const [saved, setSaved] = useState(false);

  const [days, setDays] = useState(siteConfig.hours.days);
  const [openTime, setOpenTime] = useState(siteConfig.hours.openTime);
  const [closeTime, setCloseTime] = useState(siteConfig.hours.closeTime);
  const [displayFull, setDisplayFull] = useState(siteConfig.hours.displayFull);
  const [peakHoursNote, setPeakHoursNote] = useState(siteConfig.hours.peakHoursNote);

  const applyPreset = (pDays: string, pOpen: string, pClose: string, pDisplay: string) => {
    setDays(pDays);
    setOpenTime(pOpen);
    setCloseTime(pClose);
    setDisplayFull(pDisplay);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      hours: {
        days,
        openTime,
        closeTime,
        displayFull,
        peakHoursNote,
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#FFFBF5]">Oras ng Kusina (Operating Hours)</h3>
          <p className="text-xs text-gray-400 font-mono">
            Ito ang nag-iisang batayan (Single Source of Truth) para sa Header, Announcement Bar, Delivery Checker, at Footer.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-xs uppercase tracking-wider transition-all btn-press shadow-md cursor-pointer min-h-[44px]"
        >
          {saved ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Nai-save Na!' : 'I-save ang Oras'}</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="bg-[#111827] p-4 rounded-2xl border border-gray-800 space-y-2">
        <span className="text-[11px] font-mono font-bold text-[#CC8800] uppercase tracking-wide block">
          ⚡ Quick Presets (Pumili ng isa para mabilis mag-set):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('Monday – Sunday', '10:30 AM', '8:30 PM', 'Open: 10:30 AM – 8:30 PM Daily')}
            className="px-3 py-1.5 rounded-lg bg-[#1F2937] hover:bg-gray-700 text-xs font-mono text-gray-200 border border-gray-700 btn-press cursor-pointer"
          >
            Standard: 10:30 AM – 8:30 PM Daily
          </button>
          <button
            type="button"
            onClick={() => applyPreset('Daily', '9:00 AM', '8:00 PM', 'Open: 9:00 AM – 8:00 PM Daily')}
            className="px-3 py-1.5 rounded-lg bg-[#1F2937] hover:bg-gray-700 text-xs font-mono text-gray-200 border border-gray-700 btn-press cursor-pointer"
          >
            Early Shift: 9:00 AM – 8:00 PM Daily
          </button>
          <button
            type="button"
            onClick={() => applyPreset('Monday – Sunday', '10:00 AM', '9:00 PM', 'Open: 10:00 AM – 9:00 PM Daily')}
            className="px-3 py-1.5 rounded-lg bg-[#1F2937] hover:bg-gray-700 text-xs font-mono text-gray-200 border border-gray-700 btn-press cursor-pointer"
          >
            Weekend / Holiday: 10:00 AM – 9:00 PM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Araw ng Operasyon (Operating Days)</label>
          <input
            type="text"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Monday – Sunday"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Full Display Banner Text</label>
          <input
            type="text"
            value={displayFull}
            onChange={(e) => setDisplayFull(e.target.value)}
            placeholder="Open: 10:30 AM – 8:30 PM Daily"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
          <span className="text-[10px] text-gray-500 font-mono mt-1 block">Ipapakita sa AnnouncementBar at DeliveryChecker.</span>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Oras ng Pagbubukas (Opening Time)</label>
          <input
            type="text"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
            placeholder="10:30 AM"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Oras ng Pagsasara (Closing Time)</label>
          <input
            type="text"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
            placeholder="8:30 PM"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Peak Lunch & Advance Notice (Footer Note)</label>
          <textarea
            rows={2}
            value={peakHoursNote}
            onChange={(e) => setPeakHoursNote(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden resize-none"
          />
        </div>
      </div>

      {/* Live Preview Callout */}
      <div className="p-4 rounded-2xl bg-[#CC8800]/10 border border-[#CC8800]/30 flex items-start gap-3">
        <Clock className="w-5 h-5 text-[#CC8800] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs font-mono">
          <span className="text-[#FDE68A] font-bold block">Live Preview ng Oras sa Buong Site:</span>
          <p className="text-gray-300">
            Kasalukuyang naka-set: <strong className="text-white">{displayFull}</strong> ({days}: {openTime} – {closeTime}).
          </p>
          <p className="text-gray-400 text-[11px]">
            Ang dating magkakaibang oras (tulad ng 9:00 AM – 8:00 PM) sa Delivery Checker ay awtomatikong mag-s-sync dito!
          </p>
        </div>
      </div>
    </form>
  );
};
