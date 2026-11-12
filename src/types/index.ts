export type VehicleType = 'motorcycle' | 'car' | 'electric';
export type EvSubtype = 'electric_car' | 'electric_motorcycle';
export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric';
export type FuelKey = 'ron95' | 'ron92' | 'diesel' | 'electricFast' | 'electricHome';
export type UnitSystem = 'metric' | 'imperial'; // metric: km & L, imperial: miles & gallons

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: VehicleType;
  evSubtype?: EvSubtype;
  fuelConsumption: number; // In L/100km for gas, or kWh/100km for electric
  fuelType: FuelType;
  engineDisplacement?: string;
  recommendedFuel: FuelKey;
  popular?: boolean;
  regions?: string[]; // e.g. ['VN', 'TH', 'GLOBAL', 'US']
}

export interface FuelPriceItem {
  id: string;
  name: string;
  pricePerUnit: number;
  unitLabel: string; // e.g. '₫/lít', '$/gal', '€/L', '₫/kWh', '$/kWh'
}

export interface CountryFuelData {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  language: string; // 'vi', 'en', 'ja', 'ko', 'th', 'fr', 'de', 'es', 'zh', etc.
  currency: string;
  currencySymbol: string;
  unitSystem: UnitSystem;
  sourceName: string;
  lastUpdated: string;
  fuels: {
    ron95: FuelPriceItem;
    ron92?: FuelPriceItem;
    diesel: FuelPriceItem;
    electricFast?: FuelPriceItem; // Public fast charging (e.g. V-GREEN 3.858 ₫/kWh, Tesla Supercharger $0.42/kWh)
    electricHome?: FuelPriceItem; // Home residential charging (e.g. EVN 2.600 ₫/kWh, US EIA $0.17/kWh)
  };
}

export interface CalculationResult {
  distance: number; // in km or miles
  isRoundTrip: boolean;
  actualDistance: number;
  vehicle: Vehicle;
  effectiveConsumption: number;
  fuelNeeded: number; // in Liters, Gallons, or kWh
  fuelPrice: number;
  fuelName: string;
  totalCost: number;
  costPerDistanceUnit: number;
  currency: string;
  currencySymbol: string;
  distanceUnit: 'km' | 'mi';
  volumeUnit: 'L' | 'gal' | 'kWh';
  isElectric?: boolean;
}

export interface SavedTrip {
  id: string;
  timestamp: number; // Unix timestamp in ms
  date: string;
  isoDate?: string; // YYYY-MM-DD
  routeName: string;
  distance: number;
  distanceUnit: string;
  vehicleName: string;
  totalCost: number;
  currencySymbol: string;
  fuelVolume: number;
  volumeUnit: string;
}

export interface MonthlyFuelExpense {
  yearMonth: string; // "YYYY-MM", e.g. "2026-11"
  year: number;
  month: number; // 1 - 12
  totalCost: number;
  currencySymbol: string;
  totalVolume: number;
  volumeUnit: string;
  totalDistance: number;
  distanceUnit: string;
  tripCount: number;
  dailyCosts: Record<string, number>; // "YYYY-MM-DD" -> cost
}
