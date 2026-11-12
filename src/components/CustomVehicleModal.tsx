import React, { useState } from 'react';
import type { Vehicle, VehicleType, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

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
  const [searchResult, setSearchResult] = useState<{
    consumption: number;
    engine: string;
    fuelType: 'ron95' | 'ron92' | 'diesel';
    source: string;
  } | null>(null);

  if (!isOpen) return null;

  const isEnglish = selectedCountry.language !== 'vi';

  const handleOnlineLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleName.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      setIsSearching(false);
      const nameLower = vehicleName.toLowerCase();
      let estConsumption = 2.5;
      let estEngine = isEnglish ? 'Standard Engine' : 'Động cơ tiêu chuẩn';
      let estFuel: 'ron95' | 'ron92' | 'diesel' = 'ron95';

      if (type === 'motorcycle') {
        if (nameLower.includes('110') || nameLower.includes('blade') || nameLower.includes('sirius') || nameLower.includes('wave')) {
          estConsumption = 1.7;
          estEngine = '110cc - 115cc SOHC';
          estFuel = 'ron92';
        } else if (nameLower.includes('125') || nameLower.includes('lead') || nameLower.includes('vision') || nameLower.includes('janus')) {
          estConsumption = 1.95;
          estEngine = '125cc SOHC';
        } else if (nameLower.includes('150') || nameLower.includes('155') || nameLower.includes('160') || nameLower.includes('vario') || nameLower.includes('nvx')) {
          estConsumption = 2.35;
          estEngine = '150cc - 160cc';
        } else if (nameLower.includes('300') || nameLower.includes('350') || nameLower.includes('400') || nameLower.includes('ninja') || nameLower.includes('rebel')) {
          estConsumption = 3.8;
          estEngine = '300cc - 400cc Twin';
        } else if (nameLower.includes('harley') || nameLower.includes('883') || nameLower.includes('1000') || nameLower.includes('bmw') || nameLower.includes('ducati')) {
          estConsumption = 5.1;
          estEngine = 'Heavy Cruiser / Big Bike > 800cc';
        } else {
          estConsumption = 2.4;
          estEngine = isEnglish ? 'Standard Motorcycle Engine' : 'Xe máy phổ thông';
        }
      } else {
        // Car
        if (nameLower.includes('dầu') || nameLower.includes('diesel')) {
          estConsumption = 7.4;
          estEngine = 'Turbo Diesel';
          estFuel = 'diesel';
        } else if (nameLower.includes('hybrid') || nameLower.includes('hev')) {
          estConsumption = 4.3;
          estEngine = isEnglish ? 'Gasoline-Electric Hybrid' : 'Xăng lai Điện (Hybrid)';
        } else if (nameLower.includes('i10') || nameLower.includes('morning') || nameLower.includes('fadil') || nameLower.includes('wigo') || nameLower.includes('attrage')) {
          estConsumption = 5.4;
          estEngine = '1.0L - 1.4L Compact';
        } else if (nameLower.includes('vios') || nameLower.includes('accent') || nameLower.includes('city') || nameLower.includes('mazda 2')) {
          estConsumption = 5.8;
          estEngine = '1.5L Subcompact';
        } else if (nameLower.includes('cx-5') || nameLower.includes('tucson') || nameLower.includes('cr-v') || nameLower.includes('cross') || nameLower.includes('seltos')) {
          estConsumption = 7.2;
          estEngine = '1.5L - 2.0L Compact SUV';
        } else if (nameLower.includes('f-150') || nameLower.includes('silverado') || nameLower.includes('ranger raptor') || nameLower.includes('v8')) {
          estConsumption = 11.8;
          estEngine = 'V6 / V8 Full-size Truck';
        } else {
          estConsumption = 7.0;
          estEngine = isEnglish ? 'Standard Gasoline Engine' : 'Động cơ xăng hỗn hợp';
        }
      }

      setSearchResult({
        consumption: estConsumption,
        engine: estEngine,
        fuelType: estFuel,
        source: isEnglish ? 'Official manufacturer technical documentation' : 'Tài liệu kỹ thuật công khai của nhà sản xuất',
      });
    }, 600);
  };

  const handleSave = () => {
    if (!vehicleName.trim() || !searchResult) return;

    const newVehicle: Vehicle = {
      id: `custom-${Date.now()}`,
      name: vehicleName.trim(),
      brand: brand.trim() || (isEnglish ? 'Custom' : 'Tùy chỉnh'),
      type,
      fuelConsumption: searchResult.consumption,
      fuelType: searchResult.fuelType === 'diesel' ? 'diesel' : 'gasoline',
      engineDisplacement: searchResult.engine,
      recommendedFuel: searchResult.fuelType,
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
              onClick={() => setType('motorcycle')}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                type === 'motorcycle'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t('motorcycleTab')}
            </button>
            <button
              type="button"
              onClick={() => setType('car')}
              className={`py-1.5 rounded-lg transition cursor-pointer ${
                type === 'car'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t('carTab')}
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
              onChange={(e) => setVehicleName(e.target.value)}
              placeholder={t('vehicleNamePlaceholder')}
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
              placeholder={t('brandPlaceholder')}
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
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer shadow disabled:opacity-50"
          >
            {isSearching ? t('searchingBtn') : t('searchOnlineBtn')}
          </button>

          {/* Search Result Box */}
          {searchResult && (
            <div
              className={`p-3.5 rounded-2xl border space-y-2 ${
                isDark ? 'bg-slate-950 border-emerald-500/40' : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {t('foundSpecsTitle')}
                </span>
                <span className="text-xs font-black text-amber-500">
                  {searchResult.consumption} L/100km
                </span>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                <div>{t('engineLabel')} <strong>{searchResult.engine}</strong></div>
                <div>{t('fuelTypeLabel')} <strong>{searchResult.fuelType.toUpperCase()}</strong></div>
                <div className="opacity-75">{searchResult.source}</div>
              </div>

              {/* Allow adjusting the number */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span>{t('adjustIfDesired')}</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="30"
                    value={searchResult.consumption}
                    onChange={(e) =>
                      setSearchResult({
                        ...searchResult,
                        consumption: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-16 rounded px-1.5 py-0.5 text-right font-bold bg-slate-800 text-white border border-slate-600 text-xs"
                  />
                  <span>L/100km</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer"
              >
                {t('addAndSelectBtn')}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
