import React, { useState, useMemo } from 'react';
import type { Vehicle, VehicleType, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle;
  onSelectVehicle: (v: Vehicle) => void;
  conditionFactor: number;
  onChangeConditionFactor: (factor: number) => void;
  selectedCountry: CountryFuelData;
  onOpenCustomVehicleModal: () => void;
  onNextStep: () => void;
  isDark: boolean;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onSelectVehicle,
  conditionFactor,
  onChangeConditionFactor,
  selectedCountry,
  onOpenCustomVehicleModal,
  onNextStep,
  isDark,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const [activeTab, setActiveTab] = useState<VehicleType>(selectedVehicle.type);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');

  // Filter vehicles by country relevance, type, brand, and search
  const countryVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (v.regions && !v.regions.includes('GLOBAL') && !v.regions.includes(selectedCountry.code)) {
        return false;
      }
      return true;
    });
  }, [vehicles, selectedCountry]);

  const filteredVehicles = useMemo(() => {
    return countryVehicles.filter((v) => {
      if (v.type !== activeTab) return false;
      if (selectedBrand !== 'ALL' && v.brand !== selectedBrand) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [countryVehicles, activeTab, selectedBrand, searchQuery]);

  const brands = useMemo(() => {
    const list = countryVehicles.filter((v) => v.type === activeTab).map((v) => v.brand);
    return ['ALL', ...Array.from(new Set(list))];
  }, [countryVehicles, activeTab]);

  const isImperial = selectedCountry.unitSystem === 'imperial';

  const formatConsumption = (l100km: number) => {
    if (isImperial) {
      const mpg = Math.round(235.215 / l100km);
      return `${mpg} MPG (~${l100km} L/100km)`;
    }
    return `${l100km} L/100km`;
  };

  return (
    <div
      className={`rounded-3xl p-5 border transition-colors ${
        isDark
          ? 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
            {t('step1')}
          </span>
          <h2 className="text-sm font-black mt-0.5">
            {selectedCountry.flag} {selectedCountry.name}
          </h2>
        </div>

        <button
          onClick={onOpenCustomVehicleModal}
          className="text-[11px] font-bold text-amber-500 hover:underline cursor-pointer"
        >
          {t('addVehicleShort')}
        </button>
      </div>

      {/* Tabs: Xe Máy vs Xe Hơi */}
      <div
        className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl mb-3 border ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            setActiveTab('motorcycle');
            setSelectedBrand('ALL');
            const defaultMoto = countryVehicles.find((v) => v.type === 'motorcycle') || vehicles[0];
            onSelectVehicle(defaultMoto);
          }}
          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'motorcycle'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t('motorcycleTab')}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('car');
            setSelectedBrand('ALL');
            const defaultCar = countryVehicles.find((v) => v.type === 'car') || vehicles.find((v) => v.type === 'car')!;
            onSelectVehicle(defaultCar);
          }}
          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'car'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t('carTab')}
        </button>
      </div>

      {/* Brand Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setSelectedBrand(b)}
            className={`text-xs px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition border cursor-pointer ${
              selectedBrand === b
                ? isDark
                  ? 'bg-white text-slate-950 border-white font-bold'
                  : 'bg-slate-900 text-white border-slate-900 font-bold'
                : isDark
                ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            {b === 'ALL' ? t('allBrands') : b}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchVehiclePlaceholder')}
          className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border transition ${
            isDark
              ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-600'
          }`}
        />
      </div>

      {/* Vehicle Dropdown */}
      <div className="relative mb-3">
        <select
          value={selectedVehicle.id}
          onChange={(e) => {
            const found = vehicles.find((v) => v.id === e.target.value);
            if (found) onSelectVehicle(found);
          }}
          className={`w-full rounded-xl px-3.5 py-2.5 text-xs font-bold outline-none border appearance-none cursor-pointer transition ${
            isDark
              ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
              : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
          }`}
        >
          {filteredVehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} — {formatConsumption(v.fuelConsumption)}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
          ▼
        </div>
      </div>

      {/* Current Vehicle Badge */}
      <div
        className={`rounded-2xl p-3.5 border flex items-center justify-between mb-3 ${
          isDark
            ? 'bg-slate-950/80 border-slate-800'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div>
          <div className="font-extrabold text-xs">{selectedVehicle.name}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {selectedVehicle.engineDisplacement} • {t('fuelTypeLabel')} {selectedVehicle.recommendedFuel.toUpperCase()}
          </div>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-slate-400">{t('standardConsumption')}</div>
          <div className="text-sm font-black text-amber-500">
            {formatConsumption(selectedVehicle.fuelConsumption)}
          </div>
        </div>
      </div>

      {/* Driving Conditions */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center justify-between mb-1.5 text-[11px]">
          <span className="text-slate-500 dark:text-slate-400 font-medium">{t('drivingCondition')}:</span>
          <span className="font-bold text-amber-500">
            {conditionFactor === 0.85 && t('condHighway')}
            {conditionFactor === 1.0 && t('condNormal')}
            {conditionFactor === 1.1 && t('condHeavy')}
            {conditionFactor === 1.2 && t('condJam')}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: t('condHighwayShort'), factor: 0.85, sub: '-15%' },
            { label: t('condNormalShort'), factor: 1.0, sub: '0%' },
            { label: t('condHeavyShort'), factor: 1.1, sub: '+10%' },
            { label: t('condJamShort'), factor: 1.2, sub: '+20%' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onChangeConditionFactor(item.factor)}
              className={`py-1.5 px-1 rounded-lg text-[11px] font-semibold transition text-center border cursor-pointer ${
                conditionFactor === item.factor
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                  : isDark
                  ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <div>{item.label}</div>
              <div className="text-[9px] opacity-75">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNextStep}
        className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer shadow active:scale-98"
      >
        {t('nextToDistance')}
      </button>
    </div>
  );
};
