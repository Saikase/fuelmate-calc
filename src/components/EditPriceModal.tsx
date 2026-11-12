import React, { useState, useEffect } from 'react';
import type { CountryFuelData, FuelKey } from '../types';
import { getTranslation } from '../i18n/translations';

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryFuelData;
  fuelType: FuelKey;
  customPrice: number | null;
  onSavePrice: (newPrice: number | null) => void;
  isDark: boolean;
}

export const EditPriceModal: React.FC<EditPriceModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  fuelType,
  customPrice,
  onSavePrice,
  isDark,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const currentFuel = selectedCountry.fuels[fuelType] || selectedCountry.fuels.ron95;
  const officialPrice = currentFuel.pricePerUnit;
  const [inputVal, setInputVal] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setInputVal(customPrice !== null ? String(customPrice) : String(officialPrice));
    }
  }, [isOpen, customPrice, officialPrice]);

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputVal);
    if (!isNaN(val) && val > 0) {
      onSavePrice(val === officialPrice ? null : val);
    }
    onClose();
  };

  const handleReset = () => {
    onSavePrice(null);
    onClose();
  };

  const isElectric = fuelType === 'electricFast' || fuelType === 'electricHome';

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-sm">
            {isElectric ? t('editEvTariffModalTitle') : t('editPriceModalTitle')}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleApply} className="mt-4 space-y-4">
          <div
            className={`p-3 rounded-2xl text-xs leading-relaxed ${
              isDark
                ? 'bg-slate-800/80 text-slate-300 border border-slate-700'
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}
          >
            {t('editPriceNotice')}
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              {t('fuelNameLabel')} <strong className="text-slate-800 dark:text-slate-200">{currentFuel.name}</strong>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              {t('officialRateLabel')} <strong>{officialPrice.toLocaleString()} {currentFuel.unitLabel}</strong>
            </div>

            <div className="relative mt-2">
              <input
                type="number"
                step="any"
                min="0.01"
                required
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={String(officialPrice)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-base font-bold outline-none border transition-colors ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                {currentFuel.unitLabel}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            {customPrice !== null && (
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                {t('resetToOfficialBtn')}
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition shadow cursor-pointer"
            >
              {t('saveChangesBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
