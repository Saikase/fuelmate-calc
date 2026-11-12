import React, { useState } from 'react';
import type { Vehicle, VehicleType, CountryFuelData, FuelKey } from '../types';
import { getTranslation } from '../i18n/translations';
import { lookupVehicleSpec, type VehicleSpecEntry, type LookupResult } from '../data/vehicleSpecsDB';

interface CustomVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (v: Vehicle) => void;
  selectedCountry: CountryFuelData;
  isDark: boolean;
}

export const CustomVehicleModal: React.FC<CustomVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
  selectedCountry,
  isDark,
}) => {
  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const [vehicleName, setVehicleName] = useState('');
  const [brand, setBrand] = useState('');
  const [type, setType] = useState<VehicleType>('motorcycle');
  const [isSearching, setIsSearching] = useState(false);

  // Search state
  const [lookupState, setLookupState] = useState<
    | { status: 'idle' }
    | { status: 'exact_found'; entry: VehicleSpecEntry }
    | { status: 'variant_mismatch'; baseModel: string; suggestions: VehicleSpecEntry[] }
    | { status: 'not_found' }
  >({ status: 'idle' });

  // Specs when found or manually entered
  const [consumption, setConsumption] = useState<number>(0);
  const [engine, setEngine] = useState<string>('');
  const [fuelType, setFuelType] = useState<FuelKey>('ron95');
  const [source, setSource] = useState<string>('');
  const [showManualForm, setShowManualForm] = useState(false);

  if (!isOpen) return null;

  const isEnglish = selectedCountry.language !== 'vi';
  const unitLabel = type === 'electric' ? 'kWh/100km' : 'L/100km';

  const handleOnlineLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleName.trim()) return;

    setIsSearching(true);
    setLookupState({ status: 'idle' });
    setShowManualForm(false);

    setTimeout(() => {
      setIsSearching(false);
      const res: LookupResult = lookupVehicleSpec(vehicleName, brand, type);

      if (res.status === 'exact_found') {
        setLookupState({ status: 'exact_found', entry: res.entry });
        setConsumption(res.entry.consumption);
        setEngine(res.entry.engine);
        setFuelType(res.entry.fuelType);
        setSource(res.entry.source);
        setType(res.entry.type);
        if (!brand.trim()) {
          setBrand(res.entry.brand);
        }
      } else if (res.status === 'variant_mismatch') {
        setLookupState({
          status: 'variant_mismatch',
          baseModel: res.baseModel,
          suggestions: res.suggestions,
        });
        setConsumption(0);
      } else {
        setLookupState({ status: 'not_found' });
        setConsumption(0);
        setShowManualForm(true);
      }
    }, 350);
  };

  const handleApplySuggestion = (entry: VehicleSpecEntry) => {
    setVehicleName(entry.modelName);
    setBrand(entry.brand);
    setType(entry.type);
    setConsumption(entry.consumption);
    setEngine(entry.engine);
    setFuelType(entry.fuelType);
    setSource(entry.source);
    setLookupState({ status: 'exact_found', entry });
    setShowManualForm(false);
  };

  const handleSave = () => {
    if (!vehicleName.trim() || consumption <= 0) return;

    const isEv = type === 'electric';
    const lowerName = vehicleName.toLowerCase();
    const isEvMotorcycle =
      isEv &&
      (lowerName.includes('bike') ||
        lowerName.includes('scooter') ||
        lowerName.includes('evo') ||
        lowerName.includes('feliz') ||
        lowerName.includes('klara') ||
        lowerName.includes('theon') ||
        lowerName.includes('yadea') ||
        lowerName.includes('vinfast evo') ||
        lowerName.includes('zero'));

    const newVehicle: Vehicle = {
      id: `custom-${Date.now()}`,
      name: vehicleName.trim(),
      brand: brand.trim() || (isEnglish ? 'Custom' : 'Tùy chỉnh'),
      type,
      evSubtype: isEv ? (isEvMotorcycle ? 'electric_motorcycle' : 'electric_car') : undefined,
      fuelConsumption: consumption,
      fuelType: isEv ? 'electric' : fuelType === 'diesel' ? 'diesel' : 'gasoline',
      engineDisplacement:
        engine.trim() || (isEv ? (isEvMotorcycle ? 'Pin LFP 3.5 kWh' : 'Pin EV') : type === 'motorcycle' ? '125cc' : '1.5L'),
      recommendedFuel: isEv
        ? fuelType === 'electricHome'
          ? 'electricHome'
          : 'electricFast'
        : fuelType,
      popular: true,
      regions: ['GLOBAL'],
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-colors max-h-[92vh] flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div
          className={`flex items-center justify-between pb-3 border-b shrink-0 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h3 className="font-black text-base">{t('customVehicleModalTitle')}</h3>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t('customVehicleModalDesc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full text-sm font-bold cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleOnlineLookup} className="space-y-3 my-3 flex-1 overflow-y-auto pr-1">
          {/* 3 Type tabs: Motorcycles, Cars, EV */}
          <div
            className={`grid grid-cols-3 gap-1 p-1 rounded-xl text-xs font-bold border ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-slate-400'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setType('motorcycle');
                setFuelType('ron95');
                setLookupState({ status: 'idle' });
              }}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                type === 'motorcycle'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>🏍️</span>
              <span className="truncate">{t('motorcycleTab')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('car');
                setFuelType('ron95');
                setLookupState({ status: 'idle' });
              }}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                type === 'car'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <span>🚗</span>
              <span className="truncate">{t('carTab')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('electric');
                setFuelType('electricFast');
                setLookupState({ status: 'idle' });
              }}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                type === 'electric'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs font-black'
                  : isDark
                  ? 'text-emerald-400 hover:text-emerald-200'
                  : 'text-emerald-700 hover:text-emerald-950'
              }`}
            >
              <span>⚡</span>
              <span className="truncate">{t('electricTab')}</span>
            </button>
          </div>

          <div>
            <label
              className={`text-xs font-bold block mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {t('vehicleNameLabel')}
            </label>
            <input
              type="text"
              required
              value={vehicleName}
              onChange={(e) => {
                setVehicleName(e.target.value);
                if (lookupState.status !== 'idle') setLookupState({ status: 'idle' });
              }}
              placeholder={
                type === 'electric'
                  ? isEnglish
                    ? 'e.g. VF 3, VF 5, VF 6, Tesla Model 3, Dat Bike...'
                    : 'Ví dụ: VF 3, VF 5, VF 6, Tesla Model 3, Evo 200...'
                  : type === 'motorcycle'
                  ? isEnglish
                    ? 'e.g. Ninja 400, Ducati 821, Rebel 500...'
                    : 'Ví dụ: Ninja 400, Ducati 821, Vario 160...'
                  : isEnglish
                  ? 'e.g. F-150, Civic, RAV4, Camry, Veloz...'
                  : 'Ví dụ: Innova 2.0, Territory, G63, Veloz...'
              }
              className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border font-medium transition ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            />
          </div>

          <div>
            <label
              className={`text-xs font-bold block mb-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {t('brandLabel')}
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder={
                type === 'electric'
                  ? isEnglish
                    ? 'VinFast, Tesla, BYD, Dat Bike, Yadea...'
                    : 'VinFast, Dat Bike, Tesla, BYD, Yadea...'
                  : isEnglish
                  ? 'Honda, Yamaha, Ford, BMW, Ducati...'
                  : 'Honda, Yamaha, Toyota, Ford, Ducati...'
              }
              className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border font-medium transition ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !vehicleName.trim()}
            className={`w-full py-2.5 rounded-xl font-black text-xs transition cursor-pointer shadow disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-98 ${
              type === 'electric'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
            }`}
          >
            {isSearching ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                <span>{t('searchingBtn')}</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>{t('searchOnlineBtn')}</span>
              </>
            )}
          </button>

          {/* TRƯỜNG HỢP 1: TÌM THẤY CHÍNH XÁC (EXACT MATCH) - GIAO DIỆN SẮC NÉT TƯƠNG PHẢN CAO */}
          {lookupState.status === 'exact_found' && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-3 animate-fadeIn transition shadow-sm ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/80 text-white'
                  : 'bg-white border-emerald-500 text-slate-950'
              }`}
            >
              {/* Header kết quả */}
              <div
                className={`flex items-center justify-between pb-2 border-b ${
                  isDark ? 'border-slate-800' : 'border-emerald-100'
                }`}
              >
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                  <span>✓</span>
                  <span>{t('specsVerified')}</span>
                </span>
                <span
                  className={`text-xl font-black ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                >
                  {consumption} {unitLabel}
                </span>
              </div>

              {/* Bảng thông số chi tiết */}
              <div
                className={`p-3 rounded-xl border space-y-2 text-xs ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              >
                <div>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {t('officialModel')}
                  </div>
                  <div
                    className={`font-black text-sm mt-0.5 ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}
                  >
                    {lookupState.entry.modelName}
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between pt-1 border-t ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <span className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-semibold'}>
                    {type === 'electric' ? (isEnglish ? 'Battery / Motor' : 'Pin / Động cơ') : t('engineLabel')}
                  </span>
                  <span className={`font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {engine}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-semibold'}>
                    {type === 'electric' ? (isEnglish ? 'Charging tariff' : 'Nguồn điện / Giá') : t('fuelTypeLabel')}
                  </span>
                  <span className={`font-black px-2 py-0.5 rounded text-[11px] ${
                    type === 'electric' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                  }`}>
                    {selectedCountry.fuels[fuelType]?.name ||
                      (fuelType === 'electricFast'
                        ? 'Trạm sạc nhanh (Fast)'
                        : fuelType === 'electricHome'
                        ? 'Sạc tại nhà (Home)'
                        : fuelType.toUpperCase())}
                  </span>
                </div>

                <div
                  className={`pt-2 border-t text-[11px] font-bold flex items-center gap-1.5 ${
                    isDark
                      ? 'border-slate-800 text-emerald-400'
                      : 'border-slate-200 text-emerald-700'
                  }`}
                >
                  <span>🏛️</span>
                  <span>{t('sourceLabel')} {source}</span>
                </div>
              </div>

              {/* Chỉnh sửa nếu muốn */}
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  {t('adjustIfDesired')}
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="50"
                    value={consumption}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className={`w-20 rounded-lg px-2 py-1 text-center font-black text-sm border-2 ${
                      isDark
                        ? 'bg-slate-900 border-emerald-500 text-white'
                        : 'bg-white border-emerald-600 text-slate-950 shadow-xs'
                    }`}
                  />
                  <span className={`font-bold text-xs ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                    {unitLabel}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full py-3 rounded-xl text-sm font-black bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-md cursor-pointer active:scale-98"
              >
                {t('addAndSelectBtn')}
              </button>
            </div>
          )}

          {/* TRƯỜNG HỢP 2: LỆCH PHIÊN BẢN (VD: Innova 999.0, Wave 9999) - GỢI Ý CÁC BẢN XE CHÍNH XÁC */}
          {lookupState.status === 'variant_mismatch' && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-3 animate-fadeIn ${
                isDark
                  ? 'bg-slate-900 border-amber-500/70 text-white'
                  : 'bg-amber-50/80 border-amber-400 text-slate-950'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-lg">⚠️</span>
                <div>
                  <div
                    className={`text-xs font-black ${
                      isDark ? 'text-amber-400' : 'text-amber-900'
                    }`}
                  >
                    {t('variantMismatchTitle')} &quot;{vehicleName}&quot;
                  </div>
                  <div
                    className={`text-[11px] mt-1 font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {t('variantMismatchDesc')}{' '}
                    <strong className={isDark ? 'text-white' : 'text-slate-950'}>
                      {lookupState.baseModel}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Danh sách các phiên bản chuẩn xác để người dùng bấm chọn */}
              <div className="space-y-1.5 pt-1">
                {lookupState.suggestions.map((s) => (
                  <button
                    key={s.modelName}
                    type="button"
                    onClick={() => handleApplySuggestion(s)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition cursor-pointer shadow-xs ${
                      isDark
                        ? 'bg-slate-950 border-slate-700 hover:border-amber-500 text-slate-100'
                        : 'bg-white border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black flex items-center gap-1.5 text-slate-950 dark:text-white">
                        <span>{s.type === 'electric' ? '⚡' : s.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
                        <span>{s.modelName}</span>
                      </div>
                      <div
                        className={`text-[10px] mt-0.5 font-medium ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}
                      >
                        {s.engine} • {selectedCountry.fuels[s.fuelType]?.name || s.fuelType.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div
                        className={`text-xs font-black ${
                          isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}
                      >
                        {s.consumption} {s.type === 'electric' ? 'kWh/100km' : 'L/100km'}
                      </div>
                      <div className="text-[9px] text-emerald-600 font-bold">{t('selectThisVariant')}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Nút bật form nhập tay nếu người dùng muốn tự tạo xe riêng */}
              {!showManualForm && (
                <button
                  type="button"
                  onClick={() => setShowManualForm(true)}
                  className={`w-full text-center text-xs font-bold pt-1 cursor-pointer underline ${
                    isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-700'
                  }`}
                >
                  {t('customTunedOption')}
                </button>
              )}
            </div>
          )}

          {/* TRƯỜNG HỢP 3: HOÀN TOÀN KHÔNG TÌM THẤY (Chuỗi ngẫu nhiên như asdjkhaksd) */}
          {lookupState.status === 'not_found' && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-3 animate-fadeIn ${
                isDark
                  ? 'bg-slate-900 border-rose-500/60 text-white'
                  : 'bg-rose-50 border-rose-300 text-slate-900'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">❌</span>
                <div>
                  <div
                    className={`text-xs font-black ${
                      isDark ? 'text-rose-400' : 'text-rose-800'
                    }`}
                  >
                    {t('notFoundTitle')} &quot;{vehicleName}&quot;
                  </div>
                  <div
                    className={`text-[11px] mt-1 font-medium ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    {t('notFoundDesc')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FORM NHẬP TAY (Khi không tìm thấy hoặc người dùng chủ động bấm tự nhập) */}
          {(showManualForm || lookupState.status === 'not_found') && (
            <div
              className={`p-3.5 rounded-2xl border space-y-3 ${
                isDark
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-slate-50 border-slate-300'
              }`}
            >
              <div
                className={`text-xs font-black ${
                  isDark ? 'text-slate-200' : 'text-slate-900'
                }`}
              >
                {t('manualEntryTitle')}
              </div>

              <div>
                <label
                  className={`text-[11px] font-bold block mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  {type === 'electric'
                    ? isEnglish
                      ? 'Electricity Consumption (kWh/100km): *'
                      : 'Định mức tiêu thụ điện (kWh/100km): *'
                    : `${t('manualConsumptionLabel')} (L/100km): *`}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    required
                    placeholder={
                      type === 'electric'
                        ? '8.3'
                        : type === 'motorcycle'
                        ? isEnglish
                          ? 'e.g. 2.2'
                          : 'VD: 2.2'
                        : isEnglish
                        ? 'e.g. 7.5'
                        : 'VD: 7.5'
                    }
                    value={consumption || ''}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs outline-none border font-black ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-xs'
                    }`}
                  />
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {unitLabel}
                  </span>
                </div>
              </div>

              <div>
                <label
                  className={`text-[11px] font-bold block mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  {type === 'electric'
                    ? isEnglish
                      ? 'Charging Tariff Option:'
                      : 'Loại sạc điện:'
                    : t('fuelTypeLabel')}
                </label>
                {type === 'electric' ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFuelType('electricFast')}
                      className={`py-2 px-1 rounded-lg text-[10px] font-black border transition cursor-pointer truncate ${
                        fuelType === 'electricFast'
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-xs'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      ⚡ {selectedCountry.fuels.electricFast?.name || (isEnglish ? 'Fast Public Charger' : 'Trạm sạc nhanh')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFuelType('electricHome')}
                      className={`py-2 px-1 rounded-lg text-[10px] font-black border transition cursor-pointer truncate ${
                        fuelType === 'electricHome'
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-xs'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      🏠 {selectedCountry.fuels.electricHome?.name || (isEnglish ? 'Home Charging' : 'Sạc tại nhà')}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {(['ron95', 'ron92', 'diesel'] as const).map((fuel) => (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => setFuelType(fuel)}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-black border transition cursor-pointer truncate ${
                          fuelType === fuel
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs'
                            : isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                        title={selectedCountry.fuels[fuel]?.name}
                      >
                        {selectedCountry.fuels[fuel]?.name || fuel.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label
                  className={`text-[11px] font-bold block mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-800'
                  }`}
                >
                  {type === 'electric'
                    ? isEnglish
                      ? 'Battery Capacity / Motor (Optional):'
                      : 'Dung lượng pin / Động cơ (Tùy chọn):'
                    : t('manualEngineLabel')}
                </label>
                <input
                  type="text"
                  placeholder={
                    type === 'electric'
                      ? isEnglish
                        ? 'e.g. 18.64 kWh battery, 43 HP'
                        : 'VD: Pin 18.64 kWh, 43 mã lực'
                      : type === 'motorcycle'
                      ? isEnglish
                        ? 'e.g. 150cc'
                        : 'VD: 150cc'
                      : isEnglish
                      ? 'e.g. 2.0L'
                      : 'VD: 2.0L'
                  }
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  className={`w-full rounded-xl px-3 py-1.5 text-xs outline-none border ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="button"
                disabled={consumption <= 0}
                onClick={handleSave}
                className={`w-full mt-2 py-2.5 rounded-xl text-xs font-black disabled:opacity-40 text-slate-950 transition shadow cursor-pointer active:scale-98 ${
                  type === 'electric'
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'bg-amber-500 hover:bg-amber-600'
                }`}
              >
                {t('saveCustomBtn')}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
