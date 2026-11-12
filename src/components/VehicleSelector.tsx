import React, { useState, useMemo, useEffect } from 'react';
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
  const [smartNotice, setSmartNotice] = useState<string | null>(null);

  // Sync activeTab when selectedVehicle changes
  useEffect(() => {
    if (selectedVehicle && selectedVehicle.type !== activeTab) {
      setActiveTab(selectedVehicle.type);
    }
  }, [selectedVehicle.id]);

  // Filter vehicles by country relevance
  const countryVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (v.regions && !v.regions.includes('GLOBAL') && !v.regions.includes(selectedCountry.code)) {
        return false;
      }
      return true;
    });
  }, [vehicles, selectedCountry]);

  const isImperial = selectedCountry.unitSystem === 'imperial';

  const formatConsumption = (l100km: number) => {
    if (isImperial) {
      const mpg = Math.round(235.215 / l100km);
      return `${mpg} MPG (~${l100km} L/100km)`;
    }
    return `${l100km} L/100km`;
  };

  // Compute search matches across tabs
  const q = searchQuery.trim().toLowerCase();
  const otherTab: VehicleType = activeTab === 'motorcycle' ? 'car' : 'motorcycle';

  const matchesCurrentTab = useMemo(() => {
    return countryVehicles.filter((v) => {
      if (v.type !== activeTab) return false;
      if (selectedBrand !== 'ALL' && v.brand !== selectedBrand) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q))
      );
    });
  }, [countryVehicles, activeTab, selectedBrand, q]);

  const matchesOtherTab = useMemo(() => {
    if (!q) return [];
    return countryVehicles.filter((v) => {
      if (v.type !== otherTab) return false;
      return (
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q))
      );
    });
  }, [countryVehicles, otherTab, q]);

  // SMART AUTO-SWITCH LOGIC:
  // If user searches something that has 0 matches in current tab, but DOES match the other tab:
  // e.g. searching "ducati", "yamaha", "wave", "sh" while in Car tab
  // or searching "vios", "camry", "accent", "mazda" while in Motorcycle tab
  useEffect(() => {
    if (!q || q.length < 2) {
      setSmartNotice(null);
      return;
    }

    const curMatches = countryVehicles.filter(
      (v) =>
        v.type === activeTab &&
        (v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q)))
    );

    const otherMatches = countryVehicles.filter(
      (v) =>
        v.type === otherTab &&
        (v.name.toLowerCase().includes(q) ||
          v.brand.toLowerCase().includes(q) ||
          (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q)))
    );

    // If 0 in current tab, but found in other tab -> auto-switch immediately!
    if (curMatches.length === 0 && otherMatches.length > 0) {
      setActiveTab(otherTab);
      setSelectedBrand('ALL');
      onSelectVehicle(otherMatches[0]);

      const targetLabel =
        otherTab === 'motorcycle'
          ? selectedCountry.language === 'vi'
            ? 'Xe máy'
            : 'Motorcycles'
          : selectedCountry.language === 'vi'
          ? 'Ô tô'
          : 'Cars';

      setSmartNotice(
        selectedCountry.language === 'vi'
          ? `⚡ Nhận diện "${searchQuery.trim()}" là ${targetLabel} → Đã tự động chuyển tab!`
          : `⚡ Recognized "${searchQuery.trim()}" as ${targetLabel} → Auto-switched tab!`
      );
    }
  }, [q, countryVehicles]);

  // When search matches in current tab, auto-select first match if current vehicle isn't in results
  useEffect(() => {
    if (q && matchesCurrentTab.length > 0) {
      const isCurrentInMatches = matchesCurrentTab.some((v) => v.id === selectedVehicle.id);
      if (!isCurrentInMatches) {
        onSelectVehicle(matchesCurrentTab[0]);
      }
    }
  }, [matchesCurrentTab, q]);

  const brands = useMemo(() => {
    const list = countryVehicles.filter((v) => v.type === activeTab).map((v) => v.brand);
    return ['ALL', ...Array.from(new Set(list))];
  }, [countryVehicles, activeTab]);

  const isCurrentVehicleValid =
    matchesCurrentTab.some((v) => v.id === selectedVehicle.id) ||
    (!q && selectedVehicle.type === activeTab);

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
            setSmartNotice(null);
            const defaultMoto = countryVehicles.find((v) => v.type === 'motorcycle') || vehicles[0];
            onSelectVehicle(defaultMoto);
          }}
          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'motorcycle'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🏍️</span>
          <span>{t('motorcycleTab')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('car');
            setSelectedBrand('ALL');
            setSmartNotice(null);
            const defaultCar =
              countryVehicles.find((v) => v.type === 'car') ||
              vehicles.find((v) => v.type === 'car')!;
            onSelectVehicle(defaultCar);
          }}
          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'car'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🚗</span>
          <span>{t('carTab')}</span>
        </button>
      </div>

      {/* Search Input with Clear Button */}
      <div className="relative mb-3">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
          🔍
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchVehiclePlaceholder')}
          className={`w-full rounded-xl pl-8 pr-8 py-2 text-xs outline-none border transition ${
            isDark
              ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-600'
          }`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSmartNotice(null);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs p-1 cursor-pointer"
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>

      {/* Smart Auto-Switch Notice Pill */}
      {smartNotice && (
        <div
          className={`rounded-xl px-3 py-2 mb-3 border text-xs font-medium flex items-center justify-between transition animate-fadeIn ${
            isDark
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <span>{smartNotice}</span>
          <button
            type="button"
            onClick={() => setSmartNotice(null)}
            className="text-[10px] ml-2 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Multi-category Search Result Switcher (When query matches BOTH tabs e.g. Honda, BMW, Suzuki) */}
      {q && matchesCurrentTab.length > 0 && matchesOtherTab.length > 0 && (
        <div
          className={`rounded-xl p-2.5 mb-3 border flex items-center justify-between text-xs transition ${
            isDark
              ? 'bg-slate-950/80 border-slate-800 text-slate-300'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <span className="text-[11px]">
            {selectedCountry.language === 'vi'
              ? `Tìm thấy cả ở 2 nhóm xe:`
              : `Matches found in both:`}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab(activeTab);
                setSelectedBrand('ALL');
              }}
              className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px]"
            >
              {activeTab === 'motorcycle' ? `🏍️ Xe máy (${matchesCurrentTab.length})` : `🚗 Ô tô (${matchesCurrentTab.length})`}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab(otherTab);
                setSelectedBrand('ALL');
                if (matchesOtherTab.length > 0) onSelectVehicle(matchesOtherTab[0]);
              }}
              className={`px-2 py-0.5 rounded-lg border font-semibold text-[11px] cursor-pointer transition ${
                isDark
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-300 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {otherTab === 'motorcycle'
                ? `🏍️ Xe máy (${matchesOtherTab.length})`
                : `🚗 Ô tô (${matchesOtherTab.length})`}
            </button>
          </div>
        </div>
      )}

      {/* Brand Filter (shown when not actively searching) */}
      {!q && (
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
      )}

      {/* No Results Empty State */}
      {q && matchesCurrentTab.length === 0 && matchesOtherTab.length === 0 && (
        <div
          className={`rounded-xl p-4 mb-3 border border-dashed text-center transition ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-300 bg-slate-50'
          }`}
        >
          <div className="text-xs font-bold text-slate-400">
            {selectedCountry.language === 'vi'
              ? `Không tìm thấy mẫu xe nào khớp với "${searchQuery}"`
              : `No vehicle found matching "${searchQuery}"`}
          </div>
          <button
            type="button"
            onClick={onOpenCustomVehicleModal}
            className="mt-2.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold cursor-pointer transition active:scale-95 inline-flex items-center gap-1.5 shadow-xs"
          >
            {selectedCountry.language === 'vi'
              ? `+ Thêm xe "${searchQuery}" & tra cứu định mức AI`
              : `+ Add "${searchQuery}" & lookup MPG`}
          </button>
        </div>
      )}

      {/* Interactive Search Results Card List (When searching) */}
      {q && matchesCurrentTab.length > 0 && (
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 mb-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            {selectedCountry.language === 'vi'
              ? `Kết quả tìm kiếm (${matchesCurrentTab.length}):`
              : `Search results (${matchesCurrentTab.length}):`}
          </div>
          {matchesCurrentTab.map((v) => {
            const isSelected = v.id === selectedVehicle.id;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVehicle(v)}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  isSelected
                    ? isDark
                      ? 'bg-amber-500/15 border-amber-500/60 text-white'
                      : 'bg-amber-50 border-amber-400 text-slate-900'
                    : isDark
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{v.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
                  <div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{v.name}</span>
                      {isSelected && <span className="text-amber-500 text-xs font-black">✓</span>}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {v.engineDisplacement} • {v.recommendedFuel.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-amber-500">
                    {formatConsumption(v.fuelConsumption)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vehicle Dropdown (When NOT searching) */}
      {!q && matchesCurrentTab.length > 0 && (
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
            {matchesCurrentTab.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {formatConsumption(v.fuelConsumption)}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
            ▼
          </div>
        </div>
      )}

      {/* Current Vehicle Badge (Shown when vehicle matches current category / search) */}
      {isCurrentVehicleValid && (
        <div
          className={`rounded-2xl p-3.5 border flex items-center justify-between mb-3 ${
            isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span>{selectedVehicle.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
              <span className="font-extrabold text-xs">{selectedVehicle.name}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedVehicle.engineDisplacement} • {t('fuelTypeLabel')}{' '}
              <span className="font-bold text-amber-500">
                {selectedCountry.fuels[selectedVehicle.recommendedFuel]?.name || selectedVehicle.recommendedFuel.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400">{t('standardConsumption')}</div>
            <div className="text-sm font-black text-amber-500">
              {formatConsumption(selectedVehicle.fuelConsumption)}
            </div>
          </div>
        </div>
      )}

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
        disabled={!isCurrentVehicleValid}
        className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition shadow active:scale-98 ${
          isCurrentVehicleValid
            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
        }`}
      >
        {t('nextToDistance')}
      </button>
    </div>
  );
};
