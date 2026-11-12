import React from 'react';
import type { Vehicle, CountryFuelData, FuelKey } from '../types';
import { getTranslation } from '../i18n/translations';

interface RouteAndFuelStepProps {
  selectedVehicle: Vehicle;
  selectedCountry: CountryFuelData;
  selectedFuelType: FuelKey;
  onSelectFuelType: (t: FuelKey) => void;
  customFuelPrice: number | null;
  onOpenEditPriceModal: () => void;
  distance: number;
  onChangeDistance: (d: number) => void;
  isRoundTrip: boolean;
  onToggleRoundTrip: () => void;
  onPrevStep: () => void;
  onCalculate: () => void;
  isDark: boolean;
}

export const RouteAndFuelStep: React.FC<RouteAndFuelStepProps> = ({
  selectedVehicle,
  selectedCountry,
  selectedFuelType,
  onSelectFuelType,
  customFuelPrice,
  onOpenEditPriceModal,
  distance,
  onChangeDistance,
  isRoundTrip,
  onToggleRoundTrip,
  onPrevStep,
  onCalculate,
  isDark,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const isImperial = selectedCountry.unitSystem === 'imperial';
  const distanceUnit = isImperial ? t('unitMiles') : t('unitKm');

  const currentFuel = selectedCountry.fuels[selectedFuelType] || selectedCountry.fuels.ron95;
  const activePrice = customFuelPrice !== null ? customFuelPrice : currentFuel.pricePerUnit;

  return (
    <div
      className={`rounded-3xl p-5 border transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-lg'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
            {t('step2')}
          </span>
          <h2 className="text-sm font-black mt-0.5">{selectedCountry.flag} {selectedCountry.name}</h2>
        </div>

        <button
          onClick={onPrevStep}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer"
        >
          {t('back')}
        </button>
      </div>

      {/* Selected Vehicle Card */}
      <div
        className={`p-3 rounded-2xl border mb-3 flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div>
          <div className="text-[10px] text-slate-400">{t('selectedVehicleLabel')}</div>
          <div className="font-extrabold text-xs text-amber-500 mt-0.5">
            {selectedVehicle.name} ({selectedVehicle.fuelConsumption}{' '}
            {selectedVehicle.type === 'electric'
              ? 'kWh/100km'
              : selectedCountry.unitSystem === 'imperial'
              ? 'MPG'
              : 'L/100km'})
          </div>
        </div>

        <button
          onClick={onPrevStep}
          className="text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
        >
          {t('changeVehicleBtn')}
        </button>
      </div>

      {/* Fuel Type / EV Charging Source Selection */}
      <div className="mb-4">
        {selectedVehicle.type === 'electric' ? (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-500 block mb-1.5 flex items-center gap-1">
              <span>⚡</span>
              <span>{t('evChargingSourceLabel')}</span>
            </label>

            <div className="grid grid-cols-2 gap-2 mb-2">
              {/* EV Option 1: Public Fast Charger */}
              {selectedCountry.fuels.electricFast && (
                <button
                  type="button"
                  onClick={() => onSelectFuelType('electricFast')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition text-center border cursor-pointer flex flex-col justify-between min-h-[60px] ${
                    selectedFuelType === 'electricFast'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>⚡</span>
                    <span
                      className="font-bold text-[11px] leading-tight line-clamp-2"
                      title={selectedCountry.fuels.electricFast.name}
                    >
                      {selectedCountry.fuels.electricFast.name}
                    </span>
                  </div>
                  <div className="text-[10px] opacity-90 mt-1 font-mono font-black">
                    {selectedCountry.fuels.electricFast.pricePerUnit.toLocaleString()}{' '}
                    {selectedCountry.fuels.electricFast.unitLabel}
                  </div>
                </button>
              )}

              {/* EV Option 2: Home Charging */}
              {selectedCountry.fuels.electricHome && (
                <button
                  type="button"
                  onClick={() => onSelectFuelType('electricHome')}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition text-center border cursor-pointer flex flex-col justify-between min-h-[60px] ${
                    selectedFuelType === 'electricHome'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-500 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>🏠</span>
                    <span
                      className="font-bold text-[11px] leading-tight line-clamp-2"
                      title={selectedCountry.fuels.electricHome.name}
                    >
                      {selectedCountry.fuels.electricHome.name}
                    </span>
                  </div>
                  <div className="text-[10px] opacity-90 mt-1 font-mono font-black">
                    {selectedCountry.fuels.electricHome.pricePerUnit.toLocaleString()}{' '}
                    {selectedCountry.fuels.electricHome.unitLabel}
                  </div>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
              {t('fuelPriceLabel')}
            </label>

            <div className="grid grid-cols-3 gap-2 mb-2">
              {/* Fuel 1: High Octane / Premium / RON 95 */}
              <button
                type="button"
                onClick={() => onSelectFuelType('ron95')}
                className={`py-2 px-1.5 rounded-xl text-xs font-semibold transition text-center border cursor-pointer flex flex-col justify-between min-h-[58px] ${
                  selectedFuelType === 'ron95'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs'
                    : isDark
                    ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-950'
                }`}
              >
                <div
                  className="font-bold text-[11px] leading-tight line-clamp-2"
                  title={selectedCountry.fuels.ron95.name}
                >
                  {selectedCountry.fuels.ron95.name}
                </div>
                <div className="text-[10px] opacity-90 mt-1 font-mono font-black">
                  {selectedCountry.fuels.ron95.pricePerUnit.toLocaleString()}{' '}
                  {selectedCountry.fuels.ron95.unitLabel}
                </div>
              </button>

              {/* Fuel 2: Regular / E5 / RON 92 */}
              {selectedCountry.fuels.ron92 ? (
                <button
                  type="button"
                  onClick={() => onSelectFuelType('ron92')}
                  className={`py-2 px-1.5 rounded-xl text-xs font-semibold transition text-center border cursor-pointer flex flex-col justify-between min-h-[58px] ${
                    selectedFuelType === 'ron92'
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-xs'
                      : isDark
                      ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-950'
                  }`}
                >
                  <div
                    className="font-bold text-[11px] leading-tight line-clamp-2"
                    title={selectedCountry.fuels.ron92.name}
                  >
                    {selectedCountry.fuels.ron92.name}
                  </div>
                  <div className="text-[10px] opacity-90 mt-1 font-mono font-black">
                    {selectedCountry.fuels.ron92.pricePerUnit.toLocaleString()}{' '}
                    {selectedCountry.fuels.ron92.unitLabel}
                  </div>
                </button>
              ) : (
                <div className="py-2 px-1.5 rounded-xl text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center text-center">
                  —
                </div>
              )}

              {/* Fuel 3: Diesel */}
              <button
                type="button"
                onClick={() => onSelectFuelType('diesel')}
                className={`py-2 px-1.5 rounded-xl text-xs font-semibold transition text-center border cursor-pointer flex flex-col justify-between min-h-[58px] ${
                  selectedFuelType === 'diesel'
                    ? 'bg-blue-500 text-white border-blue-500 font-bold shadow-xs'
                    : isDark
                    ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:text-slate-950'
                }`}
              >
                <div
                  className="font-bold text-[11px] leading-tight line-clamp-2"
                  title={selectedCountry.fuels.diesel.name}
                >
                  {selectedCountry.fuels.diesel.name}
                </div>
                <div className="text-[10px] opacity-90 mt-1 font-mono font-black">
                  {selectedCountry.fuels.diesel.pricePerUnit.toLocaleString()}{' '}
                  {selectedCountry.fuels.diesel.unitLabel}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Applied price box & Edit button */}
        <div
          className={`p-2.5 rounded-xl border flex items-center justify-between ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            <div className="text-[10px] text-slate-400">{t('appliedRate')}</div>
            <div className="text-xs font-black">
              {activePrice.toLocaleString()} {currentFuel.unitLabel}
              {customFuelPrice !== null && (
                <span className="text-[10px] text-amber-500 font-normal ml-1">({t('editedTag')})</span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenEditPriceModal}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/30 cursor-pointer"
          >
            {t('editPriceBtn')}
          </button>
        </div>

        <div className="text-[9px] text-slate-400 mt-1 px-1">
          {t('sourceLabel')} {selectedCountry.sourceName}
        </div>
      </div>

      {/* Distance Input - CLEAN SLIDER ONLY (No presets) */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('distanceLabel')} ({distanceUnit})
          </label>

          <button
            type="button"
            onClick={onToggleRoundTrip}
            className={`text-xs px-2.5 py-1 rounded-lg font-bold transition border cursor-pointer ${
              isRoundTrip
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : isDark
                ? 'bg-slate-950 text-slate-400 border-slate-800'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            {isRoundTrip ? t('roundTrip') : t('oneWay')}
          </button>
        </div>

        {/* Distance Slider & Input Box */}
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400">{t('distanceInputPrompt')}</span>
            <div className="flex items-baseline gap-1.5">
              <input
                type="number"
                min="1"
                max="5000"
                value={distance || ''}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onChangeDistance(isNaN(val) ? 0 : val);
                }}
                className={`w-28 rounded-lg px-2.5 py-1 text-right text-xl font-black outline-none border ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-amber-400 focus:border-amber-500'
                    : 'bg-white border-slate-300 text-amber-600 focus:border-amber-600'
                }`}
              />
              <span className="text-xs font-bold text-slate-500">{distanceUnit}</span>
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="300"
            step="1"
            value={Math.min(distance, 300)}
            onChange={(e) => onChangeDistance(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none"
          />

          {isRoundTrip && (
            <div className="text-[11px] text-amber-500 font-semibold mt-2.5 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>{t('totalRoundTrip')}</span>
              <span className="font-bold">{(distance * 2).toLocaleString()} {distanceUnit}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onPrevStep}
          className="flex-1 py-3 px-3 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          {t('back')}
        </button>

        <button
          onClick={onCalculate}
          className="flex-2 py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer shadow active:scale-98"
        >
          {t('nextToResult')}
        </button>
      </div>
    </div>
  );
};
