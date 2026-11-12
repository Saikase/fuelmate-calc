import React from 'react';
import type { CalculationResult, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface ResultStepProps {
  result: CalculationResult;
  selectedCountry: CountryFuelData;
  onSaveTrip: () => void;
  onNewTrip: () => void;
  isDark: boolean;
}

export const ResultStep: React.FC<ResultStepProps> = ({
  result,
  selectedCountry,
  onSaveTrip,
  onNewTrip,
  isDark,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);

  const formatCurrency = (amount: number) => {
    if (['VND', 'KRW', 'LAK', 'KHR', 'IDR'].includes(result.currency)) {
      return Math.round(amount).toLocaleString();
    }
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const isElectric = result.isElectric || result.vehicle.type === 'electric';

  return (
    <div
      className={`rounded-3xl p-5 border-2 transition-colors relative overflow-hidden ${
        isElectric
          ? isDark
            ? 'bg-slate-900 border-emerald-500/50 text-slate-100 shadow-xl'
            : 'bg-white border-emerald-500/60 text-slate-900 shadow-lg'
          : isDark
          ? 'bg-slate-900 border-amber-500/40 text-slate-100 shadow-xl'
          : 'bg-white border-amber-500/50 text-slate-900 shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-[10px] uppercase font-extrabold tracking-wider ${
            isElectric ? 'text-emerald-500' : 'text-amber-500'
          }`}
        >
          {t('step3')} {isElectric && '• ⚡ EV'}
        </span>
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
            isDark
              ? 'bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {result.actualDistance} {result.distanceUnit}
        </span>
      </div>

      <h2 className="text-sm font-black mb-1">
        {isElectric ? t('totalChargingCost') : t('totalCost')}
      </h2>

      {/* Main Cost Display */}
      <div className="my-3 text-center py-2">
        <div
          className={`text-4xl sm:text-5xl font-black tracking-tight ${
            isElectric
              ? 'text-emerald-500 dark:text-emerald-400'
              : 'text-amber-500 dark:text-amber-400'
          }`}
        >
          {formatCurrency(result.totalCost)}{' '}
          <span className="text-2xl font-bold">{result.currencySymbol}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {result.vehicle.name} • {result.fuelName} ({result.fuelPrice.toLocaleString()}{' '}
          {result.currencySymbol}/{result.volumeUnit})
        </p>
      </div>

      {/* EV Eco Saving Banner */}
      {isElectric && (
        <div
          className={`p-2 rounded-xl text-center text-xs font-bold mb-3 border ${
            isDark
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}
        >
          {t('evEcoSavingBanner')}
        </div>
      )}

      {/* Breakdown: Volume & Cost per unit */}
      <div className="grid grid-cols-2 gap-2 my-3">
        <div
          className={`rounded-2xl p-3.5 border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
            {isElectric ? t('energyNeeded') : t('fuelNeeded')}
          </div>
          <div
            className={`text-lg font-black mt-0.5 ${
              isElectric ? 'text-emerald-500' : 'text-slate-900 dark:text-white'
            }`}
          >
            {result.fuelNeeded.toFixed(2)}{' '}
            <span className="text-xs font-normal text-slate-400">{result.volumeUnit}</span>
          </div>
        </div>

        <div
          className={`rounded-2xl p-3.5 border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
            {t('costPerUnit')} 1 {result.distanceUnit}
          </div>
          <div className="text-lg font-black mt-0.5">
            {formatCurrency(result.costPerDistanceUnit)}{' '}
            <span className="text-xs font-normal text-slate-400">{result.currencySymbol}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-4">
        <button
          onClick={onSaveTrip}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition cursor-pointer shadow active:scale-98 ${
            isElectric
              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
          }`}
        >
          {t('saveTrip')}
        </button>

        <button
          onClick={onNewTrip}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          {t('calcAgain')}
        </button>
      </div>
    </div>
  );
};
