import React from 'react';
import type { CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeaderProps {
  onOpenSidebar: () => void;
  selectedCountry: CountryFuelData;
  onOpenCountryModal: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSidebar,
  selectedCountry,
  onOpenCountryModal,
  isDark,
  onToggleTheme,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const isImperial = selectedCountry.unitSystem === 'imperial';

  return (
    <header
      className={`sticky top-0 z-30 px-4 py-3 border-b transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Menu Hamburger & Brand */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSidebar}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={t('menuTitle')}
          >
            <div className="w-4 h-3 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-current rounded" />
              <span className="w-full h-0.5 bg-current rounded" />
              <span className="w-full h-0.5 bg-current rounded" />
            </div>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tight">FuelMate</span>
              <button
                onClick={onOpenCountryModal}
                className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold flex items-center gap-1 hover:bg-amber-500/20 transition cursor-pointer"
                title={t('changeCountryBtn')}
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.code}</span>
              </button>
            </div>
            <div className="text-[10px] text-slate-400">
              {selectedCountry.currency} ({selectedCountry.currencySymbol}) • {isImperial ? 'Miles / Gallon' : 'Km / L'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl border text-xs transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDark ? t('lightTheme') : t('darkTheme')}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Desktop/Mobile simulator switch */}
          <button
            onClick={onToggleMobileFrame}
            className={`hidden sm:block p-2 rounded-xl border text-xs transition cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isMobileFrame ? '🖥️' : '📱'}
          </button>
        </div>
      </div>
    </header>
  );
};
