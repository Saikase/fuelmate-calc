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
  const [evSubFilter, setEvSubFilter] = useState<'all' | 'electric_car' | 'electric_motorcycle'>('all');
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

  const formatConsumption = (v: Vehicle) => {
    if (v.type === 'electric') {
      if (isImperial) {
        const kwhPer100mi = Math.round(v.fuelConsumption * 1.60934);
        return `${kwhPer100mi} kWh/100mi`;
      }
      return `${v.fuelConsumption} kWh/100km`;
    }
    if (isImperial) {
      const mpg = Math.round(235.215 / v.fuelConsumption);
      return `${mpg} MPG (~${v.fuelConsumption} L/100km)`;
    }
    return `${v.fuelConsumption} L/100km`;
  };

  // Compute search matches across tabs
  const q = searchQuery.trim().toLowerCase();
  const allTabs: VehicleType[] = ['motorcycle', 'car', 'electric'];

  const matchesCurrentTab = useMemo(() => {
    return countryVehicles.filter((v) => {
      if (v.type !== activeTab) return false;
      if (activeTab === 'electric' && evSubFilter !== 'all' && v.evSubtype !== evSubFilter) {
        return false;
      }
      if (selectedBrand !== 'ALL' && v.brand !== selectedBrand) return false;
      if (!q) return true;
      return (
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q))
      );
    });
  }, [countryVehicles, activeTab, evSubFilter, selectedBrand, q]);

  // SMART AUTO-SWITCH LOGIC:
  // If user searches something that has 0 matches in current tab, but DOES match another tab:
  // e.g. searching "vinfast", "vf3", "vf 8", "evo", "dat bike", "tesla" -> switches to Electric!
  // or searching "ducati", "wave", "sh" while in Car or EV tab -> switches to Motorcycle!
  // or searching "vios", "camry", "ranger" while in EV or Moto tab -> switches to Car!
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

    // If 0 in current tab, find which other tab has matches
    if (curMatches.length === 0) {
      for (const tab of allTabs) {
        if (tab === activeTab) continue;
        const otherMatches = countryVehicles.filter(
          (v) =>
            v.type === tab &&
            (v.name.toLowerCase().includes(q) ||
              v.brand.toLowerCase().includes(q) ||
              (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q)))
        );

        if (otherMatches.length > 0) {
          setActiveTab(tab);
          setSelectedBrand('ALL');
          onSelectVehicle(otherMatches[0]);

          const targetLabel =
            tab === 'motorcycle'
              ? selectedCountry.language === 'vi'
                ? 'Xe máy'
                : 'Motorcycles'
              : tab === 'car'
              ? selectedCountry.language === 'vi'
                ? 'Ô tô (Xăng/Dầu)'
                : 'Cars'
              : selectedCountry.language === 'vi'
              ? 'Xe Điện (EV)'
              : 'Electric (EV)';

          setSmartNotice(
            selectedCountry.language === 'vi'
              ? `⚡ Nhận diện "${searchQuery.trim()}" thuộc nhóm ${targetLabel} → Đã tự động chuyển tab!`
              : `⚡ Recognized "${searchQuery.trim()}" in ${targetLabel} → Auto-switched tab!`
          );
          break;
        }
      }
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

  // Brands list for current tab
  const brands = useMemo(() => {
    const list = countryVehicles
      .filter((v) => {
        if (v.type !== activeTab) return false;
        if (activeTab === 'electric' && evSubFilter !== 'all' && v.evSubtype !== evSubFilter) {
          return false;
        }
        return true;
      })
      .map((v) => v.brand);
    return ['ALL', ...Array.from(new Set(list))];
  }, [countryVehicles, activeTab, evSubFilter]);

  const isCurrentVehicleValid =
    matchesCurrentTab.some((v) => v.id === selectedVehicle.id) ||
    (!q && selectedVehicle.type === activeTab);

  // Other tabs with matches for query
  const otherTabsWithMatches = useMemo(() => {
    if (!q) return [];
    return allTabs
      .filter((t) => t !== activeTab)
      .map((tab) => {
        const count = countryVehicles.filter(
          (v) =>
            v.type === tab &&
            (v.name.toLowerCase().includes(q) ||
              v.brand.toLowerCase().includes(q) ||
              (v.engineDisplacement && v.engineDisplacement.toLowerCase().includes(q)))
        ).length;
        return { tab, count };
      })
      .filter((item) => item.count > 0);
  }, [countryVehicles, activeTab, q]);

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

      {/* 3 Main Tabs: Xe Máy vs Xe Hơi vs Xe Điện */}
      <div
        className={`grid grid-cols-3 gap-1 p-1 rounded-2xl mb-2.5 border ${
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
          className={`py-2 px-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'motorcycle'
              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🏍️</span>
          <span className="truncate">{t('motorcycleTab')}</span>
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
          className={`py-2 px-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'car'
              ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🚗</span>
          <span className="truncate">{t('carTab')}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('electric');
            setSelectedBrand('ALL');
            setSmartNotice(null);
            const defaultEv =
              countryVehicles.find((v) => v.type === 'electric') ||
              vehicles.find((v) => v.type === 'electric')!;
            if (defaultEv) onSelectVehicle(defaultEv);
          }}
          className={`py-2 px-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
            activeTab === 'electric'
              ? 'bg-emerald-500 text-slate-950 shadow-xs font-black'
              : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span className="truncate">{t('electricTab')}</span>
        </button>
      </div>

      {/* Sub-tabs for Electric (EV): Tất cả | Ô tô điện | Xe máy điện */}
      {activeTab === 'electric' && (
        <div className="grid grid-cols-3 gap-1 mb-3 animate-fadeIn">
          <button
            type="button"
            onClick={() => setEvSubFilter('all')}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
              evSubFilter === 'all'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-black'
                : isDark
                ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            ⚡ {t('allEvTab')}
          </button>
          <button
            type="button"
            onClick={() => setEvSubFilter('electric_car')}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
              evSubFilter === 'electric_car'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-black'
                : isDark
                ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {t('evCarsTab')}
          </button>
          <button
            type="button"
            onClick={() => setEvSubFilter('electric_motorcycle')}
            className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
              evSubFilter === 'electric_motorcycle'
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 font-black'
                : isDark
                ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {t('evBikesTab')}
          </button>
        </div>
      )}

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
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
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

      {/* Switcher if query matches other tabs */}
      {q && otherTabsWithMatches.length > 0 && (
        <div
          className={`rounded-xl p-2.5 mb-3 border flex items-center justify-between text-xs transition ${
            isDark
              ? 'bg-slate-950/80 border-slate-800 text-slate-300'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <span className="text-[11px] opacity-75">
            {selectedCountry.language === 'vi' ? 'Kết quả ở nhóm khác:' : 'Also found in:'}
          </span>
          <div className="flex items-center gap-1.5">
            {otherTabsWithMatches.map((item) => (
              <button
                key={item.tab}
                type="button"
                onClick={() => {
                  setActiveTab(item.tab);
                  setSelectedBrand('ALL');
                }}
                className="px-2 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/30"
              >
                {item.tab === 'motorcycle'
                  ? `🏍️ Xe máy (${item.count})`
                  : item.tab === 'car'
                  ? `🚗 Ô tô (${item.count})`
                  : `⚡ Xe điện (${item.count})`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand Horizontal Pill Bar */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
              selectedBrand === b
                ? activeTab === 'electric'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-xs'
                  : 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-xs'
                : isDark
                ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            {b === 'ALL' ? t('allBrands') : b}
          </button>
        ))}
      </div>

      {/* Search results list */}
      {q && (
        <div className="mb-3 space-y-1.5 max-h-52 overflow-y-auto pr-1">
          <div className="text-[10px] text-slate-400 font-semibold mb-1">
            {selectedCountry.language === 'vi'
              ? `Kết quả tìm kiếm (${matchesCurrentTab.length}):`
              : `Search results (${matchesCurrentTab.length}):`}
          </div>
          {matchesCurrentTab.map((v) => {
            const isSelected = v.id === selectedVehicle.id;
            const isEv = v.type === 'electric';
            return (
              <div
                key={v.id}
                onClick={() => onSelectVehicle(v)}
                className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isSelected
                    ? isEv
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-amber-500/15 border-amber-500 text-white font-bold'
                    : isDark
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{isEv ? '⚡' : v.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
                  <div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{v.name}</span>
                      {isSelected && (
                        <span className={`text-xs font-black ${isEv ? 'text-emerald-400' : 'text-amber-500'}`}>
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {v.engineDisplacement} •{' '}
                      {isEv ? (
                        <span className="text-emerald-400 font-semibold">EV</span>
                      ) : (
                        v.recommendedFuel.toUpperCase()
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-black ${isEv ? 'text-emerald-400' : 'text-amber-500'}`}>
                    {formatConsumption(v)}
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
                {v.name} — {formatConsumption(v)}
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
          className={`rounded-2xl p-3.5 border flex items-center justify-between mb-3 transition ${
            selectedVehicle.type === 'electric'
              ? isDark
                ? 'bg-emerald-950/20 border-emerald-500/50'
                : 'bg-emerald-50/70 border-emerald-400'
              : isDark
              ? 'bg-slate-950/80 border-slate-800'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <span>{selectedVehicle.type === 'electric' ? '⚡' : selectedVehicle.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
              <span className="font-extrabold text-xs">{selectedVehicle.name}</span>
              {selectedVehicle.type === 'electric' && (
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
                  EV
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedVehicle.engineDisplacement} •{' '}
              {selectedVehicle.type === 'electric' ? (
                <span className="font-bold text-emerald-500 dark:text-emerald-400">
                  {selectedCountry.fuels[selectedVehicle.recommendedFuel]?.name || '⚡ V-GREEN / EV'}
                </span>
              ) : (
                <>
                  {t('fuelTypeLabel')}{' '}
                  <span className="font-bold text-amber-500">
                    {selectedCountry.fuels[selectedVehicle.recommendedFuel]?.name ||
                      selectedVehicle.recommendedFuel.toUpperCase()}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] text-slate-400">
              {selectedVehicle.type === 'electric' ? (
                <span className="text-emerald-500 font-bold">⚡ Điện năng</span>
              ) : (
                t('standardConsumption')
              )}
            </div>
            <div
              className={`text-sm font-black ${
                selectedVehicle.type === 'electric'
                  ? 'text-emerald-500 dark:text-emerald-400'
                  : 'text-amber-500'
              }`}
            >
              {formatConsumption(selectedVehicle)}
            </div>
          </div>
        </div>
      )}

      {/* Driving Conditions */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mb-4">
        <div className="flex items-center justify-between mb-1.5 text-[11px]">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {t('drivingCondition')}:
          </span>
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
            ? activeTab === 'electric'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 cursor-pointer font-black'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 cursor-pointer font-black'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
        }`}
      >
        {t('nextToDistance')}
      </button>
    </div>
  );
};
