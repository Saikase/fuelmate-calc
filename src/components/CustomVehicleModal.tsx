import React, { useState } from 'react';
import type { Vehicle, VehicleType, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';
import { lookupVehicleSpec, type VehicleSpecEntry } from '../data/vehicleSpecsDB';

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
  const [searchStatus, setSearchStatus] = useState<'idle' | 'found' | 'not_found'>('idle');

  // Specs when found or manually entered
  const [consumption, setConsumption] = useState<number>(0);
  const [engine, setEngine] = useState<string>('');
  const [fuelType, setFuelType] = useState<'ron95' | 'ron92' | 'diesel'>('ron95');
  const [source, setSource] = useState<string>('');

  if (!isOpen) return null;

  const isEnglish = selectedCountry.language !== 'vi';

  const handleOnlineLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleName.trim()) return;

    setIsSearching(true);
    setSearchStatus('idle');

    setTimeout(() => {
      setIsSearching(false);
      // Tra cứu từ cơ sở dữ liệu định mức kỹ thuật thực tế
      const match: VehicleSpecEntry | null = lookupVehicleSpec(vehicleName, brand, type);

      if (match) {
        // TÌM THẤY TRONG DATABASE CHÍNH HÃNG / CỤC ĐĂNG KIỂM
        setSearchStatus('found');
        setConsumption(match.consumption);
        setEngine(match.engine);
        setFuelType(match.fuelType);
        setSource(match.source);
        setType(match.type);
        if (!brand.trim()) {
          setBrand(match.brand);
        }
      } else {
        // KHÔNG TÌM THẤY (chuỗi ngẫu nhiên hoặc không có trong hồ sơ)
        // Tuyệt đối KHÔNG giả lập thông số ảo 7.0 L/100km!
        setSearchStatus('not_found');
        setConsumption(0);
        setEngine('');
        setSource('');
      }
    }, 400);
  };

  const handleSave = () => {
    if (!vehicleName.trim() || consumption <= 0) return;

    const newVehicle: Vehicle = {
      id: `custom-${Date.now()}`,
      name: vehicleName.trim(),
      brand: brand.trim() || (isEnglish ? 'Custom' : 'Tùy chỉnh'),
      type,
      fuelConsumption: consumption,
      fuelType: fuelType === 'diesel' ? 'diesel' : 'gasoline',
      engineDisplacement: engine.trim() || (type === 'motorcycle' ? '125cc' : '1.5L'),
      recommendedFuel: fuelType,
      popular: true,
      regions: ['GLOBAL'],
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-colors max-h-[90vh] flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h3 className="font-bold text-base">{t('customVehicleModalTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t('customVehicleModalDesc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleOnlineLookup} className="space-y-3 my-3 flex-1 overflow-y-auto pr-1">
          {/* Type selector */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 text-xs font-bold border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setType('motorcycle');
                setSearchStatus('idle');
              }}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                type === 'motorcycle'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <span>🏍️</span>
              <span>{t('motorcycleTab')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('car');
                setSearchStatus('idle');
              }}
              className={`py-1.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                type === 'car'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <span>🚗</span>
              <span>{t('carTab')}</span>
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t('vehicleNameLabel')}
            </label>
            <input
              type="text"
              required
              value={vehicleName}
              onChange={(e) => {
                setVehicleName(e.target.value);
                if (searchStatus !== 'idle') setSearchStatus('idle');
              }}
              placeholder={
                type === 'motorcycle'
                  ? 'Ví dụ: Ninja 400, Ducati 821, Vario 160, Raider...'
                  : 'Ví dụ: Innova 2.0, Territory, G63, Veloz, VF3...'
              }
              className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border transition ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {t('brandLabel')}
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Honda, Yamaha, Toyota, Ford, Ducati..."
              className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border transition ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSearching || !vehicleName.trim()}
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer shadow disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isSearching ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                <span>{t('searchingBtn')}</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Tra cứu thông số kỹ thuật (Cục Đăng Kiểm)</span>
              </>
            )}
          </button>

          {/* TRƯỜNG HỢP 1: TÌM THẤY TRONG DATABASE */}
          {searchStatus === 'found' && (
            <div
              className={`p-3.5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                isDark ? 'bg-slate-950 border-emerald-500/50' : 'bg-emerald-50/80 border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>✓</span>
                  <span>Đã xác thực thông số kỹ thuật</span>
                </span>
                <span className="text-sm font-black text-amber-500">
                  {consumption} L/100km
                </span>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1 bg-black/10 dark:bg-black/30 p-2.5 rounded-xl">
                <div>
                  {t('engineLabel')} <strong className="text-slate-800 dark:text-slate-200">{engine}</strong>
                </div>
                <div>
                  {t('fuelTypeLabel')}{' '}
                  <strong className="text-amber-500">{fuelType.toUpperCase()}</strong>
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1">
                  <span>🏛️</span>
                  <span>Nguồn: {source}</span>
                </div>
              </div>

              {/* Cho phép tinh chỉnh nếu người dùng muốn */}
              <div className="pt-1 flex items-center justify-between text-xs">
                <span className="text-slate-500">{t('adjustIfDesired')}</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="40"
                    value={consumption}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className="w-16 rounded px-1.5 py-0.5 text-right font-bold bg-slate-800 text-white border border-slate-600 text-xs"
                  />
                  <span>L/100km</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer active:scale-98"
              >
                {t('addAndSelectBtn')}
              </button>
            </div>
          )}

          {/* TRƯỜNG HỢP 2: KHÔNG TÌM THẤY (Chuỗi ngẫu nhiên hoặc xe chưa có trong hồ sơ) */}
          {searchStatus === 'not_found' && (
            <div
              className={`p-3.5 rounded-2xl border space-y-2.5 animate-fadeIn ${
                isDark ? 'bg-slate-950 border-amber-500/40' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-base">⚠️</span>
                <div>
                  <div className="text-xs font-bold text-amber-500">
                    Không tìm thấy dữ liệu cho &quot;{vehicleName}&quot;
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Tên xe không khớp với hồ sơ kỹ thuật của Cục Đăng kiểm hoặc Nhà sản xuất. Bạn vui lòng tự nhập định mức tiêu hao thực tế bên dưới:
                  </div>
                </div>
              </div>

              {/* Form nhập định mức thủ công */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div>
                  <label className="text-[11px] font-bold block mb-1">
                    Mức tiêu hao thực tế (L/100km): *
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="40"
                      required
                      placeholder={type === 'motorcycle' ? 'VD: 2.2' : 'VD: 6.8'}
                      value={consumption || ''}
                      onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                      className={`flex-1 rounded-xl px-3 py-1.5 text-xs outline-none border font-bold ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                    <span className="text-xs font-bold text-slate-400">L/100km</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold block mb-1">
                    Loại nhiên liệu:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {(['ron95', 'ron92', 'diesel'] as const).map((fuel) => (
                      <button
                        key={fuel}
                        type="button"
                        onClick={() => setFuelType(fuel)}
                        className={`py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                          fuelType === fuel
                            ? 'bg-amber-500 border-amber-500 text-slate-950'
                            : isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {fuel.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold block mb-1">
                    Mô tả động cơ (Tùy chọn):
                  </label>
                  <input
                    type="text"
                    placeholder={type === 'motorcycle' ? 'VD: 150cc' : 'VD: 1.5L Turbo'}
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
                  className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 transition shadow cursor-pointer active:scale-98"
                >
                  Lưu xe & Áp dụng ngay
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
