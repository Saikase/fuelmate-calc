import React, { useState } from 'react';
import { COUNTRIES } from '../data/countries';
import type { CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryFuelData;
  onSelectCountry: (c: CountryFuelData) => void;
  isDark: boolean;
}

export const CountrySelectModal: React.FC<CountrySelectModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
  isDark,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const t = (k: string) => getTranslation(selectedCountry.language, k);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-md rounded-3xl p-5 shadow-2xl border transition-colors max-h-[85vh] flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="font-bold text-base">{t('countryModalTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('countryModalDesc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-base font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="my-3 shrink-0">
          <input
            type="text"
            placeholder={t('searchCountryPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-xl px-3.5 py-2.5 text-xs outline-none border transition ${
              isDark
                ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-600'
            }`}
          />
        </div>

        {/* Country list */}
        <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
          {filtered.map((c) => {
            const isSelected = c.code === selectedCountry.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  onSelectCountry(c);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 font-bold'
                    : isDark
                    ? 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{c.name}</span>
                      {c.nativeName !== c.name && (
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({c.nativeName})
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>{c.currency} ({c.currencySymbol})</span>
                      <span>•</span>
                      <span>{c.unitSystem === 'imperial' ? 'Miles & Gallon' : 'Km & L'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-black text-amber-500">
                    {c.fuels.ron95.pricePerUnit.toLocaleString()} {c.fuels.ron95.unitLabel}
                  </div>
                  <div className="text-[9px] text-slate-400">RON 95</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
