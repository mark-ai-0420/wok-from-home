import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Save, Check } from 'lucide-react';

export const StoreInfoTab: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useSiteConfig();
  const [saved, setSaved] = useState(false);

  const [storeName, setStoreName] = useState(siteConfig.store.storeName);
  const [branchName, setBranchName] = useState(siteConfig.store.branchName);
  const [kitchenAddress, setKitchenAddress] = useState(siteConfig.store.kitchenAddress);
  const [kitchenShort, setKitchenShort] = useState(siteConfig.store.kitchenShort);
  const [landmarkNote, setLandmarkNote] = useState(siteConfig.store.landmarkNote);
  const [contactPhone, setContactPhone] = useState(siteConfig.store.contactPhone);
  const [facebookPageUrl, setFacebookPageUrl] = useState(siteConfig.social.facebookPageUrl);
  const [facebookPageId, setFacebookPageId] = useState(siteConfig.social.facebookPageId);
  const [tagline, setTagline] = useState(siteConfig.copy.tagline);
  const [announcementText, setAnnouncementText] = useState(siteConfig.copy.announcementText);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      store: {
        ...siteConfig.store,
        storeName,
        branchName,
        kitchenAddress,
        kitchenShort,
        landmarkNote,
        contactPhone,
        contactPhoneFormatted: contactPhone.startsWith('+') ? contactPhone : `+63 ${contactPhone.replace(/^0/, '')}`,
      },
      social: {
        ...siteConfig.social,
        facebookPageUrl,
        facebookPageId,
        messengerUrl: `https://m.me/${facebookPageId}`,
      },
      copy: {
        ...siteConfig.copy,
        tagline,
        announcementText,
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#FFFBF5]">Store & Contact Details</h3>
          <p className="text-xs text-gray-400 font-mono">I-update ang opisyal na lokasyon, hotline, at social links ng Wok From Home.</p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-xs uppercase tracking-wider transition-all btn-press shadow-md cursor-pointer min-h-[44px]"
        >
          {saved ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Nai-save Na!' : 'I-save ang Pagbabago'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Store Name */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Branch */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Branch Name</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Contact Phone / Hotline</label>
          <input
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="0917 123 4567"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
          <span className="text-[10px] text-gray-500 font-mono mt-1 block">Ipapakita sa Footer at contact links.</span>
        </div>

        {/* Messenger Page ID */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Facebook Messenger Page ID</label>
          <input
            type="text"
            value={facebookPageId}
            onChange={(e) => setFacebookPageId(e.target.value)}
            placeholder="61560294841858"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
          <span className="text-[10px] text-gray-500 font-mono mt-1 block">Ginagamit para sa direct booking: https://m.me/{facebookPageId}</span>
        </div>

        {/* Facebook Page URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Official Facebook Page URL</label>
          <input
            type="text"
            value={facebookPageUrl}
            onChange={(e) => setFacebookPageUrl(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Kitchen Address */}
        <div className="md:col-span-2">
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Buong Kitchen Address (Physical Location)</label>
          <input
            type="text"
            value={kitchenAddress}
            onChange={(e) => setKitchenAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Kitchen Short & Landmark */}
        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Maikling Lokasyon (Short Address)</label>
          <input
            type="text"
            value={kitchenShort}
            onChange={(e) => setKitchenShort(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Landmark Note</label>
          <input
            type="text"
            value={landmarkNote}
            onChange={(e) => setLandmarkNote(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Tagline */}
        <div className="md:col-span-2">
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Brand Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>

        {/* Announcement Text */}
        <div className="md:col-span-2">
          <label className="block text-xs font-mono font-bold text-gray-300 mb-1">Top Announcement Bar Text</label>
          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#111827] border border-gray-700 text-white font-mono text-xs focus:border-[#CC8800] focus:outline-hidden min-h-[44px]"
          />
        </div>
      </div>
    </form>
  );
};
