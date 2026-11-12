import React from 'react';
import type { CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryFuelData;
  onOpenCountryModal: () => void;
  onOpenCustomVehicleModal: () => void;
  onOpenSavedTrips: () => void;
  savedTripsCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenTermsPrivacy: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onOpenCountryModal,
  onOpenCustomVehicleModal,
  onOpenSavedTrips,
  savedTripsCount,
  isDark,
  onToggleTheme,
  onOpenTermsPrivacy,
}) => {
  if (!isOpen) return null;

  const t = (k: string) => getTranslation(selectedCountry.language, k);

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex">
      <div
        style={{
          paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        }}
        className={`w-72 max-w-[80vw] h-full shadow-2xl px-5 flex flex-col justify-between transition-colors border-r ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-black text-lg tracking-tight">FuelMate</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {t('appSubtitle')}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Current Country Card with clean Change Button */}
          <div className="mt-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{selectedCountry.flag}</span>
              <div>
                <div className="font-extrabold text-xs">{selectedCountry.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">
                  {selectedCountry.currency} ({selectedCountry.currencySymbol}) • {selectedCountry.unitSystem === 'imperial' ? 'Miles/Gallon' : 'Km/Lít'}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCountryModal();
              }}
              className="w-full mt-2.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition cursor-pointer"
            >
              {t('changeCountryBtn')}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-4 space-y-1.5">
            <button
              onClick={() => {
                onClose();
                onOpenCustomVehicleModal();
              }}
              className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center justify-between cursor-pointer"
            >
              <span>{t('customVehicleModalTitle')}</span>
              <span className="text-xs text-slate-400">→</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSavedTrips();
              }}
              className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center justify-between cursor-pointer"
            >
              <span>{t('savedTripsTitle')}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono">
                {savedTripsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          {/* Light / Dark Mode Toggle */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">{t('themeLabel')}</span>
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                isDark
                  ? 'bg-slate-700 text-amber-300'
                  : 'bg-white text-slate-800 shadow-xs'
              }`}
            >
              {isDark ? t('darkTheme') : t('lightTheme')}
            </button>
          </div>

          {/* Terms & Privacy Policy Link */}
          <button
            onClick={() => {
              onClose();
              onOpenTermsPrivacy();
            }}
            className="w-full py-2 px-3 text-left rounded-xl text-xs font-semibold text-slate-500 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-between"
          >
            <span>{t('termsPrivacyBtn')}</span>
            <span className="text-[10px] opacity-60">&gt;</span>
          </button>

          {/* App Version Info */}
          <div className="pt-2 text-center text-[10px] text-slate-400 font-mono">
            FuelMate v1.0
          </div>
        </div>
      </div>

      {/* Outside click area */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};
