import React from 'react';
import type { SavedTrip, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trips: SavedTrip[];
  onDeleteTrip: (id: string) => void;
  onClearAll: () => void;
  selectedCountry: CountryFuelData;
  isDark: boolean;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  trips,
  onDeleteTrip,
  onClearAll,
  selectedCountry,
  isDark,
}) => {
  if (!isOpen) return null;

  const t = (k: string) => getTranslation(selectedCountry.language, k);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`w-full max-w-sm rounded-3xl p-5 shadow-2xl border transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm">{t('savedTripsTitle')}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {trips.length} {t('savedTripsDesc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="my-3 max-h-72 overflow-y-auto space-y-2 pr-1">
          {trips.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              {t('noSavedTrips')}
            </div>
          ) : (
            trips.map((trip) => (
              <div
                key={trip.id}
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-xs">{trip.routeName}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {trip.vehicleName} • {trip.distance} {trip.distanceUnit} ({trip.fuelVolume.toFixed(1)} {trip.volumeUnit})
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{trip.date}</div>
                </div>

                <div className="text-right flex flex-col items-end gap-1">
                  <div className="text-xs font-black text-amber-500">
                    {Math.round(trip.totalCost).toLocaleString()} {trip.currencySymbol}
                  </div>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                  >
                    {t('deleteBtn')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {trips.length > 0 && (
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              {t('clearAllBtn')}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 cursor-pointer"
            >
              {t('closeBtn')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
