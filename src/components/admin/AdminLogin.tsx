import React, { useState } from 'react';
import { Lock, ArrowRight, Flame, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

const ADMIN_PASSWORD = 'zoh-mik';

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToStore }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('wok_admin_session', 'true');
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
      setErrorMessage('Maling password. Subukan muli.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#111827] text-white flex items-center justify-center p-4 selection:bg-[#CC8800] selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#CC8800]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-[#1F2937] border-2 border-[#CC8800] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000000] z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#CC8800]/20 border border-[#CC8800]/40 flex items-center justify-center mx-auto text-[#CC8800] shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CC8800]/10 border border-[#CC8800]/30 text-[#FDE68A] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#CC8800]" />
            Wok From Home Admin Portal
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#FFFBF5] uppercase tracking-tight">
            Admin Access
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Pamahalaan ang mga presyo, lokasyon, contact details, at oras ng kusina sa Indang.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-xs font-mono font-bold text-gray-300 mb-1.5">
              Ipasok ang Admin Password:
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
              autoFocus
              className={`w-full px-4 py-3 rounded-xl bg-[#111827] border text-white text-sm font-mono focus:outline-hidden transition-colors min-h-[44px] ${
                error 
                  ? 'border-red-500 ring-1 ring-red-500' 
                  : 'border-gray-700 focus:border-[#CC8800] focus:ring-1 focus:ring-[#CC8800]'
              }`}
            />
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#CC8800] hover:bg-[#B27500] text-[#111827] font-display font-extrabold text-sm uppercase tracking-wider transition-all btn-press shadow-md cursor-pointer min-h-[48px]"
          >
            <span>I-login sa Dashboard</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-2 border-t border-gray-800 text-center">
          <button
            type="button"
            onClick={onBackToStore}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#CC8800] transition-colors cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bumalik sa Tindahan (Storefront)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
