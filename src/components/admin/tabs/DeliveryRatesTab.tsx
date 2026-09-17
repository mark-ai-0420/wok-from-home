import React, { useState } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import { Plus, Trash2, Save, Check, MapPin, Truck } from 'lucide-react';
import { DeliveryLocation } from '../../../types';

export const DeliveryRatesTab: React.FC = () => {
  const { siteConfig, updateSiteConfig } = useSiteConfig();
  const [areas, setAreas] = useState<DeliveryLocation[]>(siteConfig.deliveryAreas);
  const [saved, setSaved] = useState(false);

  // New area form state
  const [newBarangay, setNewBarangay] = useState('');
  const [newTown, setNewTown] = useState('Indang');
  const [newFee, setNewFee] = useState(50);
  const [newMinutes, setNewMinutes] = useState('20-30 mins');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleUpdateArea = (index: number, field: keyof DeliveryLocation, value: any) => {
    setAreas(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveArea = (index: number) => {
    setAreas(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBarangay.trim()) return;

    const newArea: DeliveryLocation = {
      barangay: newBarangay.trim(),
      town: newTown.trim(),
      fee: Number(newFee),
      estimatedMinutes: newMinutes.trim(),
      available: true,
    };

    setAreas(prev => [...prev, newArea]);
    setNewBarangay('');
    setNewFee(50);
    setShowAddForm(false);
  };

  const handleSave = () => {
    updateSiteConfig({ deliveryAreas: areas });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#FFFBF5]">Cavite Delivery Rates & Coverage</h3>
          <p className="text-xs text-gray-400 font-mono">
            Pamahalaan ang delivery rate at travel time para sa Indang, Alfonso, Mendez, Trece, Amadeo, at Tagaytay.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1F2937] hover:bg-gray-800 text-white text-xs font-mono font-bold border border-gray-700 btn-press cursor-pointer min-h-[44px]"
          >
            <Plus className="w-4 h-4 text-[#CC8800]" />
            <span>{showAddForm ? 'Isara ang Form' : 'Magdagdag ng Barangay'}</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-xs uppercase tracking-wider btn-press cursor-pointer min-h-[44px]"
          >
            {saved ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Nai-save Na!' : 'I-save ang Rates'}</span>
          </button>
        </div>
      </div>

      {/* Add New Area Modal / Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleAddArea} className="bg-[#111827] p-5 rounded-2xl border-2 border-[#CC8800] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#CC8800] uppercase tracking-wider">
            <Truck className="w-4 h-4" />
            <span>Bagong Delivery Destination</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Barangay / Area</label>
              <input
                type="text"
                required
                placeholder="Hal. Brgy. Calumpang Cerca"
                value={newBarangay}
                onChange={(e) => setNewBarangay(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-xs font-mono text-white focus:outline-hidden focus:border-[#CC8800]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Bayan (Town / City)</label>
              <input
                type="text"
                required
                placeholder="Hal. Indang"
                value={newTown}
                onChange={(e) => setNewTown(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-xs font-mono text-white focus:outline-hidden focus:border-[#CC8800]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Delivery Fee (₱ PHP)</label>
              <input
                type="number"
                required
                min={0}
                value={newFee}
                onChange={(e) => setNewFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-xs font-mono text-white focus:outline-hidden focus:border-[#CC8800]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-gray-400 mb-1">Est. Travel Time</label>
              <input
                type="text"
                required
                placeholder="Hal. 15-25 mins"
                value={newMinutes}
                onChange={(e) => setNewMinutes(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1F2937] border border-gray-700 text-xs font-mono text-white focus:outline-hidden focus:border-[#CC8800]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-xs font-mono text-gray-300 hover:bg-gray-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#C55221] hover:bg-[#A33F13] text-white text-xs font-mono font-bold cursor-pointer"
            >
              Idagdag sa Listahan
            </button>
          </div>
        </form>
      )}

      {/* Areas Table / Cards */}
      <div className="space-y-2.5">
        {areas.map((area, idx) => (
          <div
            key={`${area.town}-${area.barangay}-${idx}`}
            className="bg-[#111827] p-3.5 rounded-xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-lg bg-[#1F2937] text-[#CC8800] shrink-0 border border-gray-700">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <input
                  type="text"
                  value={area.barangay}
                  onChange={(e) => handleUpdateArea(idx, 'barangay', e.target.value)}
                  className="bg-transparent font-display font-bold text-sm text-white focus:bg-[#1F2937] focus:outline-hidden px-1.5 py-0.5 rounded"
                />
                <div className="text-[11px] font-mono text-gray-400 px-1.5">{area.town}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Fee Input */}
              <div className="flex items-center bg-[#1F2937] px-2.5 py-1.5 rounded-xl border border-gray-700 gap-1">
                <span className="text-xs font-mono text-gray-400">Rate: ₱</span>
                <input
                  type="number"
                  min={0}
                  value={area.fee}
                  onChange={(e) => handleUpdateArea(idx, 'fee', Number(e.target.value))}
                  className="w-14 bg-[#111827] px-1 py-0.5 rounded text-xs font-mono text-white text-right focus:outline-hidden border border-gray-700 focus:border-[#CC8800]"
                />
              </div>

              {/* Estimated Time Input */}
              <div className="flex items-center bg-[#1F2937] px-2.5 py-1.5 rounded-xl border border-gray-700">
                <input
                  type="text"
                  value={area.estimatedMinutes}
                  onChange={(e) => handleUpdateArea(idx, 'estimatedMinutes', e.target.value)}
                  className="w-24 bg-[#111827] px-1 py-0.5 rounded text-xs font-mono text-white text-center focus:outline-hidden border border-gray-700 focus:border-[#CC8800]"
                />
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => handleRemoveArea(idx)}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10"
                title="Tanggalin ang barangay"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
