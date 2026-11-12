import type { SavedTrip, MonthlyFuelExpense } from '../types';

export const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export interface ArchiveResult {
  activeTrips: SavedTrip[];
  monthlyExpenses: Record<string, MonthlyFuelExpense>;
  archivedCount: number;
}

/**
 * Normalizes a trip so it has valid timestamp and isoDate (YYYY-MM-DD).
 */
export const normalizeTrip = (trip: any): SavedTrip => {
  const ts =
    typeof trip.timestamp === 'number' && !isNaN(trip.timestamp)
      ? trip.timestamp
      : !isNaN(parseInt(trip.id)) && parseInt(trip.id) > 1600000000000
      ? parseInt(trip.id)
      : Date.now();

  const d = new Date(ts);
  const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;

  return {
    ...trip,
    timestamp: ts,
    isoDate: trip.isoDate || isoDate,
  };
};

/**
 * Scans trips: any trip older than 30 days is automatically consolidated
 * into monthlyExpenses (summing total cost, volume, distance, and daily breakdown),
 * and pruned from the active detailed trips list.
 */
export const archiveOldTrips = (
  rawTrips: SavedTrip[],
  existingMonthly: Record<string, MonthlyFuelExpense>
): ArchiveResult => {
  const now = Date.now();
  const normalized = rawTrips.map(normalizeTrip);
  const activeTrips: SavedTrip[] = [];
  const updatedMonthly: Record<string, MonthlyFuelExpense> = { ...existingMonthly };
  let archivedCount = 0;

  for (const trip of normalized) {
    const isOlderThan30Days = now - trip.timestamp > THIRTY_DAYS_MS;

    if (isOlderThan30Days) {
      archivedCount++;
      const d = new Date(trip.timestamp);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const yearMonth = `${year}-${String(month).padStart(2, '0')}`;
      const dayKey = trip.isoDate || `${yearMonth}-${String(d.getDate()).padStart(2, '0')}`;

      if (!updatedMonthly[yearMonth]) {
        updatedMonthly[yearMonth] = {
          yearMonth,
          year,
          month,
          totalCost: 0,
          currencySymbol: trip.currencySymbol,
          totalVolume: 0,
          volumeUnit: trip.volumeUnit,
          totalDistance: 0,
          distanceUnit: trip.distanceUnit,
          tripCount: 0,
          dailyCosts: {},
        };
      }

      const rec = updatedMonthly[yearMonth];
      rec.totalCost += trip.totalCost;
      rec.totalVolume += trip.fuelVolume;
      rec.totalDistance += trip.distance;
      rec.tripCount += 1;
      rec.dailyCosts = rec.dailyCosts || {};
      rec.dailyCosts[dayKey] = (rec.dailyCosts[dayKey] || 0) + trip.totalCost;
    } else {
      activeTrips.push(trip);
    }
  }

  return {
    activeTrips,
    monthlyExpenses: updatedMonthly,
    archivedCount,
  };
};

/**
 * Combines active trips and archived monthly records to provide
 * up-to-the-minute aggregated figures for any specific year-month.
 */
export const getAggregatedMonthData = (
  yearMonth: string,
  activeTrips: SavedTrip[],
  archivedMonthly: Record<string, MonthlyFuelExpense>
): MonthlyFuelExpense => {
  const archived = archivedMonthly[yearMonth];
  const [y, m] = yearMonth.split('-').map(Number);

  let totalCost = archived ? archived.totalCost : 0;
  let totalVolume = archived ? archived.totalVolume : 0;
  let totalDistance = archived ? archived.totalDistance : 0;
  let tripCount = archived ? archived.tripCount : 0;
  let currencySymbol = archived?.currencySymbol || '';
  let volumeUnit = archived?.volumeUnit || 'L';
  let distanceUnit = archived?.distanceUnit || 'km';
  const dailyCosts: Record<string, number> = { ...(archived?.dailyCosts || {}) };

  // Merge active trips that fall in this year-month
  const normalizedActive = activeTrips.map(normalizeTrip);
  for (const t of normalizedActive) {
    const d = new Date(t.timestamp);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (ym === yearMonth) {
      totalCost += t.totalCost;
      totalVolume += t.fuelVolume;
      totalDistance += t.distance;
      tripCount += 1;
      currencySymbol = t.currencySymbol;
      volumeUnit = t.volumeUnit;
      distanceUnit = t.distanceUnit;
      const dayKey = t.isoDate || `${ym}-${String(d.getDate()).padStart(2, '0')}`;
      dailyCosts[dayKey] = (dailyCosts[dayKey] || 0) + t.totalCost;
    }
  }

  return {
    yearMonth,
    year: y,
    month: m,
    totalCost,
    currencySymbol,
    totalVolume,
    volumeUnit,
    totalDistance,
    distanceUnit,
    tripCount,
    dailyCosts,
  };
};

/**
 * Returns all available year-months (sorted newest first)
 */
export const getAllAvailableMonths = (
  activeTrips: SavedTrip[],
  archivedMonthly: Record<string, MonthlyFuelExpense>
): string[] => {
  const months = new Set<string>();

  // Always include current month
  const now = new Date();
  const currentYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  months.add(currentYM);

  // Add from archived
  Object.keys(archivedMonthly).forEach((ym) => months.add(ym));

  // Add from active
  activeTrips.map(normalizeTrip).forEach((t) => {
    const d = new Date(t.timestamp);
    months.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  });

  return Array.from(months).sort().reverse();
};
