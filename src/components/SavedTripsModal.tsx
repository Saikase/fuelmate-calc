import React, { useState, useMemo } from 'react';
import type { SavedTrip, MonthlyFuelExpense, CountryFuelData } from '../types';
import { getTranslation } from '../i18n/translations';
import {
  getAggregatedMonthData,
  getAllAvailableMonths,
} from '../utils/tripArchive';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trips: SavedTrip[];
  monthlyExpenses: Record<string, MonthlyFuelExpense>;
  onDeleteTrip: (id: string) => void;
  onClearAll: () => void;
  selectedCountry: CountryFuelData;
  isDark: boolean;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  trips,
  monthlyExpenses,
  onDeleteTrip,
  onClearAll,
  selectedCountry,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<'recent' | 'calendar'>('recent');

  // Month navigation in Fuel Calendar
  const now = new Date();
  const currentYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const [selectedYM, setSelectedYM] = useState<string>(currentYM);
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);

  const t = (k: string) => getTranslation(selectedCountry.language, k);
  const isVi = selectedCountry.language === 'vi';
  const isImperial = selectedCountry.unitSystem === 'imperial';

  // 1. Calculate Recent Trips summary (Total accumulated cost, distance, volume)
  const { totalRecentCost, totalRecentDist, totalRecentVol } = useMemo(() => {
    let cost = 0;
    let dist = 0;
    let vol = 0;
    for (const trip of trips) {
      cost += trip.totalCost || 0;
      dist += trip.distance || 0;
      vol += trip.fuelVolume || 0;
    }
    return {
      totalRecentCost: cost,
      totalRecentDist: dist,
      totalRecentVol: vol,
    };
  }, [trips]);

  // 2. Available months for calendar navigation
  const availableMonths = useMemo(() => {
    return getAllAvailableMonths(trips, monthlyExpenses);
  }, [trips, monthlyExpenses]);

  // Current selected month's aggregated data
  const currentMonthData = useMemo(() => {
    return getAggregatedMonthData(selectedYM, trips, monthlyExpenses);
  }, [selectedYM, trips, monthlyExpenses]);

  // Calendar calculations for selectedYM
  const [yearNum, monthNum] = useMemo(() => {
    const parts = selectedYM.split('-').map(Number);
    return [parts[0] || now.getFullYear(), parts[1] || now.getMonth() + 1];
  }, [selectedYM]);

  const daysInMonth = useMemo(() => {
    return new Date(yearNum, monthNum, 0).getDate();
  }, [yearNum, monthNum]);

  const startDayOfWeek = useMemo(() => {
    // 0 = Monday, 6 = Sunday
    const day = new Date(yearNum, monthNum - 1, 1).getDay();
    return (day + 6) % 7;
  }, [yearNum, monthNum]);

  if (!isOpen) return null;

  const handlePrevMonth = () => {
    const prevDate = new Date(yearNum, monthNum - 2, 1);
    const ym = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedYM(ym);
    setSelectedDayKey(null);
  };

  const handleNextMonth = () => {
    const nextDate = new Date(yearNum, monthNum, 1);
    const ym = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedYM(ym);
    setSelectedDayKey(null);
  };

  const dayHeaders = isVi
    ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthDisplayTitle = isVi
    ? `Tháng ${monthNum} / ${yearNum}`
    : new Date(yearNum, monthNum - 1).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });

  const currencySymbol = trips[0]?.currencySymbol || selectedCountry.currencySymbol;
  const distUnit = trips[0]?.distanceUnit || (isImperial ? 'mi' : 'km');
  const volUnit = trips[0]?.volumeUnit || (isImperial ? 'gal' : 'L');

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className={`w-full max-w-md rounded-3xl p-4 sm:p-5 shadow-2xl border transition-colors max-h-[92vh] flex flex-col ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-3 border-b shrink-0 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div>
            <h3 className="font-black text-base">{t('savedTripsTitle')}</h3>
            <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {trips.length} {t('savedTripsDesc')}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full text-base font-bold cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            ✕
          </button>
        </div>

        {/* 2 Tabs: Recent Trips vs Fuel Calendar */}
        <div
          className={`grid grid-cols-2 gap-1 p-1 rounded-2xl text-xs font-bold my-3 shrink-0 border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={() => setActiveTab('recent')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>🚗</span>
            <span>{t('recentTripsTab')}</span>
            {trips.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/20 font-mono">
                {trips.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>📅</span>
            <span>{t('fuelCalendarTab')}</span>
          </button>
        </div>

        {/* Tab 1: Recent Trips */}
        {activeTab === 'recent' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Top Accumulated Cost Banner */}
            <div
              className={`p-3.5 rounded-2xl border-2 space-y-2.5 transition shadow-sm ${
                isDark
                  ? 'bg-slate-950 border-amber-500/50 text-white'
                  : 'bg-amber-50/70 border-amber-400 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}
                >
                  {t('totalAccumulatedCost')}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  {trips.length} {t('tripsCountLabel')}
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">
                {Math.round(totalRecentCost).toLocaleString()}{' '}
                <span className="text-lg font-bold">{currencySymbol}</span>
              </div>

              {/* Sub-stats: distance, volume, count */}
              <div
                className={`grid grid-cols-2 gap-2 pt-2 border-t text-[11px] ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-amber-200 text-slate-700'
                }`}
              >
                <div>
                  <span className="opacity-75">{t('totalDistanceTraveled')}: </span>
                  <strong className="font-black">
                    {Math.round(totalRecentDist).toLocaleString()} {distUnit}
                  </strong>
                </div>
                <div>
                  <span className="opacity-75">{t('totalFuelConsumed')}: </span>
                  <strong className="font-black">
                    {totalRecentVol.toFixed(1)} {volUnit}
                  </strong>
                </div>
              </div>

              {/* Auto-archive note */}
              <div
                className={`text-[10px] leading-relaxed p-2 rounded-xl border ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800 text-slate-400'
                    : 'bg-white/80 border-amber-200 text-slate-600'
                }`}
              >
                {t('autoArchiveNote')}
              </div>
            </div>

            {/* Individual trips list */}
            {trips.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                {t('noSavedTrips')}
              </div>
            ) : (
              <div className="space-y-2">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs">{trip.routeName}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {trip.distance} {trip.distanceUnit} • {trip.fuelVolume.toFixed(1)}{' '}
                        {trip.volumeUnit}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{trip.date}</div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1 shrink-0 ml-2">
                      <div className="text-xs font-black text-amber-500">
                        {Math.round(trip.totalCost).toLocaleString()} {trip.currencySymbol}
                      </div>
                      <button
                        onClick={() => onDeleteTrip(trip.id)}
                        className="text-[11px] font-bold text-rose-500 hover:text-rose-600 cursor-pointer"
                      >
                        {t('deleteBtn')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Fuel Calendar (Lịch xài xăng) */}
        {activeTab === 'calendar' && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Month Navigator Header */}
            <div
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={handlePrevMonth}
                className={`p-1.5 rounded-lg border font-black text-xs cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
                title="Previous month"
              >
                ◀
              </button>

              <div className="text-center">
                <div className="text-xs font-black text-amber-500">{monthDisplayTitle}</div>
                <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentMonthData.tripCount > 0
                    ? `${currentMonthData.tripCount} ${t('tripsCountLabel')}`
                    : t('noTripsThisMonth')}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextMonth}
                className={`p-1.5 rounded-lg border font-black text-xs cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
                title="Next month"
              >
                ▶
              </button>
            </div>

            {/* Selected Month Total Cost Card */}
            <div
              className={`p-3.5 rounded-2xl border-2 space-y-2 transition ${
                isDark
                  ? 'bg-slate-950 border-emerald-500/60 text-white'
                  : 'bg-emerald-50/70 border-emerald-500 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  {t('monthlyTotal')} ({monthNum}/{yearNum})
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                  {currentMonthData.tripCount} {t('tripsCountLabel')}
                </span>
              </div>

              <div className="text-3xl font-black text-emerald-500 tracking-tight">
                {Math.round(currentMonthData.totalCost).toLocaleString()}{' '}
                <span className="text-lg font-bold">{currencySymbol}</span>
              </div>

              {/* Monthly stats */}
              <div
                className={`grid grid-cols-3 gap-1.5 pt-2 border-t text-[10px] ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-emerald-200 text-slate-700'
                }`}
              >
                <div>
                  <div className="opacity-75">{t('totalFuelConsumed')}:</div>
                  <strong className="font-bold text-xs">
                    {currentMonthData.totalVolume.toFixed(1)} {volUnit}
                  </strong>
                </div>
                <div>
                  <div className="opacity-75">{t('totalDistanceTraveled')}:</div>
                  <strong className="font-bold text-xs">
                    {Math.round(currentMonthData.totalDistance).toLocaleString()} {distUnit}
                  </strong>
                </div>
                <div>
                  <div className="opacity-75">{t('dailyAvg')}:</div>
                  <strong className="font-bold text-xs">
                    {Math.round(currentMonthData.totalCost / daysInMonth).toLocaleString()}{' '}
                    {currencySymbol}
                  </strong>
                </div>
              </div>
            </div>

            {/* Interactive Month Calendar Grid */}
            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                {dayHeaders.map((dh) => (
                  <div
                    key={dh}
                    className={`text-[10px] font-black uppercase py-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {dh}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells before startDayOfWeek */}
                {Array.from({ length: startDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square opacity-0" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayKey = `${selectedYM}-${String(day).padStart(2, '0')}`;
                  const dayCost = currentMonthData.dailyCosts?.[dayKey] || 0;
                  const hasExpense = dayCost > 0;
                  const isSelectedDay = selectedDayKey === dayKey;

                  return (
                    <button
                      key={dayKey}
                      type="button"
                      onClick={() => setSelectedDayKey(dayKey)}
                      className={`aspect-square rounded-xl p-1 text-center transition cursor-pointer flex flex-col justify-between items-center border ${
                        isSelectedDay
                          ? 'border-amber-500 ring-2 ring-amber-500/40 bg-amber-500/20 font-black'
                          : hasExpense
                          ? isDark
                            ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-black'
                            : 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                          : isDark
                          ? 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[11px] leading-none">{day}</span>
                      {hasExpense ? (
                        <div className="w-full text-center">
                          <span className="text-[9px] block leading-none">⛽</span>
                          <span className="text-[8px] font-black leading-none block mt-0.5 truncate max-w-full">
                            {dayCost >= 1000
                              ? `${Math.round(dayCost / 1000)}k`
                              : Math.round(dayCost)}
                          </span>
                        </div>
                      ) : (
                        <span className="h-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Day Detail Pop-down */}
              {selectedDayKey && (
                <div
                  className={`mt-2.5 p-2 rounded-xl text-xs flex items-center justify-between border ${
                    isDark
                      ? 'bg-slate-900 border-amber-500/40 text-white'
                      : 'bg-amber-50 border-amber-300 text-slate-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    <span>⛽</span>
                    <span>
                      {selectedDayKey}:{' '}
                      <strong className="text-amber-500 font-black">
                        {(currentMonthData.dailyCosts?.[selectedDayKey] || 0).toLocaleString()}{' '}
                        {currencySymbol}
                      </strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedDayKey(null)}
                    className="text-[10px] opacity-75 hover:opacity-100 px-1.5 py-0.5 rounded cursor-pointer font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* List of All Months Recorded */}
            <div className="space-y-1.5 pt-1">
              <div
                className={`text-[11px] font-black uppercase tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {t('allMonthsHistory')}
              </div>

              {availableMonths.map((ym) => {
                const mData = getAggregatedMonthData(ym, trips, monthlyExpenses);
                const isSelected = ym === selectedYM;
                return (
                  <button
                    key={ym}
                    type="button"
                    onClick={() => {
                      setSelectedYM(ym);
                      setSelectedDayKey(null);
                    }}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                          : 'bg-amber-50 border-amber-500 text-slate-950 font-bold'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{ym}</div>
                      <div className="text-[10px] opacity-75">
                        {mData.tripCount} {t('tripsCountLabel')} • {mData.totalVolume.toFixed(1)}{' '}
                        {volUnit}
                      </div>
                    </div>
                    <div className="text-xs font-black text-amber-500">
                      {Math.round(mData.totalCost).toLocaleString()} {currencySymbol}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className={`pt-3 border-t flex justify-between items-center shrink-0 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          {activeTab === 'recent' && trips.length > 0 ? (
            <button
              onClick={onClearAll}
              className="text-xs text-rose-500 hover:underline font-bold cursor-pointer"
            >
              {t('clearAllBtn')}
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            {t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
};
