import React, { useState } from 'react';
import type { Vehicle, VehicleType, CountryFuelData } from '../types';
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
  const [fuelType, setFuelType] = useState<'ron95' | 'ron92' | 'diesel'>('ron95');
  const [source, setSource] = useState<string>('');
  const [showManualForm, setShowManualForm] = useState(false);

  if (!isOpen) return null;

  const isEnglish = selectedCountry.language !== 'vi';

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
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-colors max-h-[92vh] flex flex-col ${
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
                setLookupState({ status: 'idle' });
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
                setLookupState({ status: 'idle' });
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
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
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
                type === 'motorcycle'
                  ? 'Ví dụ: Ninja 400, Ducati 821, Vario 160...'
                  : 'Ví dụ: Innova 2.0, Territory, G63, Veloz...'
              }
              className={`w-full rounded-xl px-3.5 py-2 text-xs outline-none border transition ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-600'
              }`}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
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

          {/* TRƯỜNG HỢP 1: TÌM THẤY CHÍNH XÁC (EXACT MATCH) - GIAO DIỆN TƯƠNG PHẢN CAO SẮC NÉT */}
          {lookupState.status === 'exact_found' && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-3 animate-fadeIn transition shadow-sm ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/60 text-white'
                  : 'bg-white border-emerald-500 text-slate-950'
              }`}
            >
              {/* Header kết quả */}
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200 dark:border-emerald-900">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1 shadow-xs">
                  <span>✓</span>
                  <span>Đã xác thực thông số</span>
                </span>
                <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                  {consumption} L/100km
                </span>
              </div>

              {/* Bảng thông số kỹ thuật - NỀN SÁNG RÕ RÀNG, CHỮ ĐEN ĐẬM SẮC NÉT */}
              <div
                className={`p-3 rounded-xl border space-y-2 text-xs ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Mẫu xe chuẩn hóa:</div>
                  <div className="font-black text-sm text-slate-950 dark:text-white mt-0.5">
                    {lookupState.entry.modelName}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Động cơ:</span>
                  <span className="font-bold text-slate-950 dark:text-white">{engine}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Nhiên liệu:</span>
                  <span className="font-black px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[11px]">
                    {fuelType.toUpperCase()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>Nguồn: {source}</span>
                </div>
              </div>

              {/* Chỉnh sửa nếu muốn */}
              <div
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}
              >
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {t('adjustIfDesired')}
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="40"
                    value={consumption}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className={`w-20 rounded-lg px-2 py-1 text-center font-black text-sm border-2 ${
                      isDark
                        ? 'bg-slate-900 border-emerald-500 text-white'
                        : 'bg-white border-emerald-500 text-slate-950 shadow-xs'
                    }`}
                  />
                  <span className="font-bold text-xs text-slate-600 dark:text-slate-400">L/100km</span>
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
                  ? 'bg-slate-900 border-amber-500/60 text-white'
                  : 'bg-amber-50/60 border-amber-400 text-slate-950'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-amber-500 text-lg">⚠️</span>
                <div>
                  <div className="text-xs font-black text-amber-700 dark:text-amber-400">
                    Không tồn tại phiên bản &quot;{vehicleName}&quot;
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                    Hồ sơ Cục Đăng kiểm không có số hiệu này. Dưới đây là các phiên bản{' '}
                    <strong>{lookupState.baseModel}</strong> chính thức có trong cơ sở dữ liệu:
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
                        : 'bg-white border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-slate-900'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black flex items-center gap-1.5">
                        <span>{s.type === 'motorcycle' ? '🏍️' : '🚗'}</span>
                        <span>{s.modelName}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {s.engine} • {s.fuelType.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-xs font-black text-amber-600 dark:text-amber-400">
                        {s.consumption} L/100km
                      </div>
                      <div className="text-[9px] text-emerald-600 font-bold">Chọn bản này →</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Nút bật form nhập tay nếu người dùng kiên quyết muốn thêm xe tự tạo */}
              {!showManualForm && (
                <button
                  type="button"
                  onClick={() => setShowManualForm(true)}
                  className="w-full text-center text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-500 pt-1 cursor-pointer underline"
                >
                  ✏️ Xe của tôi là bản tự độ / độ máy (Tự nhập tay số L/100km)
                </button>
              )}
            </div>
          )}

          {/* TRƯỜNG HỢP 3: HOÀN TOÀN KHÔNG TÌM THẤY (Chuỗi ngẫu nhiên như asdjkhaksd) */}
          {lookupState.status === 'not_found' && (
            <div
              className={`p-4 rounded-2xl border-2 space-y-3 animate-fadeIn ${
                isDark
                  ? 'bg-slate-900 border-rose-500/50 text-white'
                  : 'bg-rose-50/60 border-rose-300 text-slate-950'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-rose-500 text-lg">❌</span>
                <div>
                  <div className="text-xs font-black text-rose-700 dark:text-rose-400">
                    Không tìm thấy thông số cho &quot;{vehicleName}&quot;
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                    Chuỗi ký tự không khớp với bất kỳ phương tiện nào trong CSDL Cục Đăng kiểm Việt Nam & Nhà sản xuất. Bạn hãy nhập mức tiêu thụ thực tế bên dưới:
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
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                📝 Nhập thông số thực tế thủ công:
              </div>

              <div>
                <label className="text-[11px] font-bold block mb-1">
                  Định mức tiêu hao thực tế (L/100km): *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="40"
                    required
                    placeholder={type === 'motorcycle' ? 'VD: 2.2' : 'VD: 7.5'}
                    value={consumption || ''}
                    onChange={(e) => setConsumption(parseFloat(e.target.value) || 0)}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs outline-none border font-black ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600 shadow-xs'
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-500">L/100km</span>
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
                      className={`py-1.5 rounded-lg text-[10px] font-black border transition cursor-pointer ${
                        fuelType === fuel
                          ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-700'
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
                  placeholder={type === 'motorcycle' ? 'VD: 150cc' : 'VD: 2.0L'}
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
                className="w-full mt-2 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-slate-950 transition shadow cursor-pointer active:scale-98"
              >
                Lưu xe & Áp dụng ngay
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
