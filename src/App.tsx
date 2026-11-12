import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VehicleSelector } from './components/VehicleSelector';
import { RouteAndFuelStep } from './components/RouteAndFuelStep';
import { ResultStep } from './components/ResultStep';
import { AdMobBanner } from './components/AdMobBanner';
import { CountrySelectModal } from './components/CountrySelectModal';
import { CustomVehicleModal } from './components/CustomVehicleModal';
import { EditPriceModal } from './components/EditPriceModal';
import { SavedTripsModal } from './components/SavedTripsModal';
import { TermsPrivacyModal } from './components/TermsPrivacyModal';
import { COUNTRIES } from './data/countries';
import { VEHICLES } from './data/vehicles';
import type { CountryFuelData, Vehicle, CalculationResult, SavedTrip, MonthlyFuelExpense, FuelKey } from './types';
import { getTranslation } from './i18n/translations';
import { initializeAdMob, showCalculationInterstitialAd } from './services/admob';
import { archiveOldTrips } from './utils/tripArchive';

export function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('fuelmate_theme') as 'dark' | 'light') || 'dark';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    localStorage.setItem('fuelmate_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Step state: 1 (Xe) -> 2 (Quãng đường & Giá) -> 3 (Kết quả)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Country state
  const [selectedCountry, setSelectedCountry] = useState<CountryFuelData>(COUNTRIES[0]); // VN by default
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [livePrices, setLivePrices] = useState<Record<string, any> | null>(null);

  // Fetch updated prices: Try live GitHub raw feed first, fallback to local bundle when offline
  useEffect(() => {
    // Delay native AdMob initialization slightly to let Android view hierarchy fully attach
    const timer = setTimeout(() => {
      initializeAdMob().catch((err) => console.warn('[AdMob] Init deferred error:', err));
    }, 1500);

    const REMOTE_PRICE_URL = 'https://raw.githubusercontent.com/Saikase/fuelmate-calc/main/public/fuel_prices.json';

    fetch(REMOTE_PRICE_URL, { cache: 'no-cache', signal: AbortSignal.timeout(3000) })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.countries) {
          console.log('[FuelMate] Loaded live remote fuel prices from GitHub cloud.');
          setLivePrices(data.countries);
        } else {
          throw new Error('Invalid remote data');
        }
      })
      .catch(() => {
        // Offline bundled fallback (Works 100% with NO internet or airplane mode)
        fetch('./fuel_prices.json')
          .then((res) => (res.ok ? res.json() : null))
          .then((localData) => {
            if (localData && localData.countries) {
              console.log('[FuelMate] Loaded offline bundled fuel prices.');
              setLivePrices(localData.countries);
            }
          })
          .catch(() => {
            // Memory baseline in src/data/countries.ts remains active
          });
      });

    return () => clearTimeout(timer);
  }, []);

  // Merge live dynamic prices with selected country
  const activeCountry = useMemo<CountryFuelData>(() => {
    if (livePrices && livePrices[selectedCountry.code]) {
      const remote = livePrices[selectedCountry.code];
      return {
        ...selectedCountry,
        lastUpdated: remote.lastUpdated ? `${remote.lastUpdated} (${remote.source || 'Online'})` : selectedCountry.lastUpdated,
        fuels: {
          ...selectedCountry.fuels,
          ron95: {
            ...selectedCountry.fuels.ron95,
            pricePerUnit: remote.fuels?.ron95?.price ?? selectedCountry.fuels.ron95.pricePerUnit,
          },
          ron92: selectedCountry.fuels.ron92
            ? {
                ...selectedCountry.fuels.ron92,
                pricePerUnit: remote.fuels?.ron92?.price ?? selectedCountry.fuels.ron92.pricePerUnit,
              }
            : undefined,
          diesel: {
            ...selectedCountry.fuels.diesel,
            pricePerUnit: remote.fuels?.diesel?.price ?? selectedCountry.fuels.diesel.pricePerUnit,
          },
          electricFast: selectedCountry.fuels.electricFast,
          electricHome: selectedCountry.fuels.electricHome,
        },
      };
    }
    return selectedCountry;
  }, [selectedCountry, livePrices]);

  // Vehicles list
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>(() => {
    try {
      const stored = localStorage.getItem('fuelmate_custom_vehicles');
      return stored ? [...JSON.parse(stored), ...VEHICLES] : VEHICLES;
    } catch {
      return VEHICLES;
    }
  });

  // Selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    VEHICLES.find((v) => v.id === 'honda-sh-125i') || VEHICLES[0]
  );
  const [conditionFactor, setConditionFactor] = useState<number>(1.0);

  // Route & Fuel
  const [selectedFuelType, setSelectedFuelType] = useState<FuelKey>('ron95');
  const [customFuelPrice, setCustomFuelPrice] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(15);
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  // Modals
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCustomVehicleOpen, setIsCustomVehicleOpen] = useState(false);
  const [isEditPriceOpen, setIsEditPriceOpen] = useState(false);
  const [isSavedTripsOpen, setIsSavedTripsOpen] = useState(false);
  const [isTermsPrivacyOpen, setIsTermsPrivacyOpen] = useState(false);

  // Saved trips
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const stored = localStorage.getItem('fuelmate_saved_trips');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Consolidated monthly fuel expenses (auto-archived after 30 days)
  const [monthlyExpenses, setMonthlyExpenses] = useState<Record<string, MonthlyFuelExpense>>(() => {
    try {
      const stored = localStorage.getItem('fuelmate_monthly_expenses');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Auto-archive trips older than 30 days on mount
  useEffect(() => {
    const res = archiveOldTrips(savedTrips, monthlyExpenses);
    if (res.archivedCount > 0) {
      setSavedTrips(res.activeTrips);
      setMonthlyExpenses(res.monthlyExpenses);
      try {
        localStorage.setItem('fuelmate_saved_trips', JSON.stringify(res.activeTrips));
        localStorage.setItem('fuelmate_monthly_expenses', JSON.stringify(res.monthlyExpenses));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fuelmate_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.error(e);
    }
  }, [savedTrips]);

  useEffect(() => {
    try {
      localStorage.setItem('fuelmate_monthly_expenses', JSON.stringify(monthlyExpenses));
    } catch (e) {
      console.error(e);
    }
  }, [monthlyExpenses]);

  // When country changes: pick matching vehicle & reset custom fuel price
  const handleSelectCountry = (country: CountryFuelData) => {
    setSelectedCountry(country);
    setCustomFuelPrice(null);

    const suitable = vehiclesList.find(
      (v) => v.regions?.includes(country.code) || v.regions?.includes('GLOBAL')
    );
    if (suitable) {
      setSelectedVehicle(suitable);
    }
  };

  // Synchronize fuel type when vehicle changes
  useEffect(() => {
    if (selectedVehicle.type === 'electric') {
      setSelectedFuelType(selectedVehicle.recommendedFuel || 'electricFast');
    } else if (selectedVehicle.recommendedFuel === 'diesel') {
      setSelectedFuelType('diesel');
    } else if (selectedVehicle.recommendedFuel === 'ron92' && selectedCountry.fuels.ron92) {
      setSelectedFuelType('ron92');
    } else {
      setSelectedFuelType('ron95');
    }
    setCustomFuelPrice(null);
  }, [selectedVehicle, selectedCountry]);

  // Handle adding custom vehicle from online lookup
  const handleAddCustomVehicle = (newVehicle: Vehicle) => {
    const updated = [newVehicle, ...vehiclesList];
    setVehiclesList(updated);
    setSelectedVehicle(newVehicle);
    try {
      const customs = updated.filter((v) => v.id.startsWith('custom-'));
      localStorage.setItem('fuelmate_custom_vehicles', JSON.stringify(customs));
    } catch (e) {
      console.error(e);
    }
  };

  // Calculation Result
  const isImperial = activeCountry.unitSystem === 'imperial';
  const calculationResult: CalculationResult = useMemo(() => {
    const actualDist = distance * (isRoundTrip ? 2 : 1);
    const effectiveConsumption = selectedVehicle.fuelConsumption * conditionFactor;
    const isElectric = selectedVehicle.type === 'electric';
    
    let fuelNeeded = 0;
    const activeFuel =
      activeCountry.fuels[selectedFuelType] ||
      (isElectric ? activeCountry.fuels.electricFast : null) ||
      activeCountry.fuels.ron95;
    const fuelPrice = customFuelPrice !== null ? customFuelPrice : activeFuel.pricePerUnit;

    if (isElectric) {
      fuelNeeded = (actualDist / 100) * effectiveConsumption; // kWh
    } else if (isImperial) {
      const effectiveMpg = 235.215 / effectiveConsumption;
      fuelNeeded = actualDist / effectiveMpg; // in Gallons
    } else {
      fuelNeeded = (actualDist / 100) * effectiveConsumption; // in Liters
    }

    const totalCost = fuelNeeded * fuelPrice;
    const costPerDistanceUnit = actualDist > 0 ? totalCost / actualDist : 0;

    return {
      distance,
      isRoundTrip,
      actualDistance: actualDist,
      vehicle: selectedVehicle,
      effectiveConsumption,
      fuelNeeded,
      fuelPrice,
      fuelName: activeFuel.name,
      totalCost,
      costPerDistanceUnit,
      currency: activeCountry.currency,
      currencySymbol: activeCountry.currencySymbol,
      distanceUnit: isImperial ? 'mi' : 'km',
      volumeUnit: isElectric ? 'kWh' : (isImperial ? 'gal' : 'L'),
      isElectric,
    };
  }, [
    distance,
    isRoundTrip,
    selectedVehicle,
    conditionFactor,
    activeCountry,
    selectedFuelType,
    customFuelPrice,
    isImperial,
  ]);

  const handleSaveTrip = () => {
    const nowTs = Date.now();
    const d = new Date(nowTs);
    const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

    const newTrip: SavedTrip = {
      id: nowTs.toString(),
      timestamp: nowTs,
      date: d.toLocaleDateString(selectedCountry.language === 'vi' ? 'vi-VN' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isoDate,
      routeName: `${selectedVehicle.name} (${calculationResult.actualDistance} ${calculationResult.distanceUnit})`,
      distance: calculationResult.actualDistance,
      distanceUnit: calculationResult.distanceUnit,
      vehicleName: selectedVehicle.name,
      totalCost: calculationResult.totalCost,
      currencySymbol: calculationResult.currencySymbol,
      fuelVolume: calculationResult.fuelNeeded,
      volumeUnit: calculationResult.volumeUnit,
    };
    setSavedTrips([newTrip, ...savedTrips]);
    setIsSavedTripsOpen(true);
  };

  const handleDeleteTrip = (id: string) => {
    setSavedTrips(savedTrips.filter((t) => t.id !== id));
  };

  const handleClearAllTrips = () => {
    setSavedTrips([]);
  };

  const t = (k: string) => getTranslation(selectedCountry.language, k);

  return (
    <div
      className={`min-h-screen w-full transition-colors flex flex-col ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Full-bleed edge-to-edge container: fits any phone screen perfectly, centered max-w-lg on desktop */}
      <div
        className={`w-full max-w-lg mx-auto flex-1 flex flex-col min-h-screen shadow-none ${
          isDark ? 'bg-slate-950' : 'bg-slate-50'
        }`}
      >
        {/* Top Header */}
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          selectedCountry={activeCountry}
          onOpenCountryModal={() => setIsCountryModalOpen(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        {/* Wizard Step Indicator Bar */}
        <div
          className={`px-4 py-2 border-b flex items-center justify-between text-xs font-bold ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {[
            { step: 1, label: t('step1') },
            { step: 2, label: t('step2') },
            { step: 3, label: t('step3') },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step as 1 | 2 | 3)}
              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition cursor-pointer ${
                currentStep === item.step
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : currentStep > item.step
                  ? 'text-amber-500'
                  : 'text-slate-400'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area - Step by Step Wizard */}
        <main className="flex-1 p-3.5 space-y-3.5 overflow-y-auto">
          {/* STEP 1: CHỌN XE */}
          {currentStep === 1 && (
            <VehicleSelector
              vehicles={vehiclesList}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
              conditionFactor={conditionFactor}
              onChangeConditionFactor={setConditionFactor}
              selectedCountry={activeCountry}
              onOpenCustomVehicleModal={() => setIsCustomVehicleOpen(true)}
              onNextStep={() => setCurrentStep(2)}
              isDark={isDark}
            />
          )}

          {/* STEP 2: QUÃNG ĐƯỜNG & GIÁ NHIÊN LIỆU */}
          {currentStep === 2 && (
            <RouteAndFuelStep
              selectedVehicle={selectedVehicle}
              selectedCountry={activeCountry}
              selectedFuelType={selectedFuelType}
              onSelectFuelType={setSelectedFuelType}
              customFuelPrice={customFuelPrice}
              onOpenEditPriceModal={() => setIsEditPriceOpen(true)}
              distance={distance}
              onChangeDistance={setDistance}
              isRoundTrip={isRoundTrip}
              onToggleRoundTrip={() => setIsRoundTrip(!isRoundTrip)}
              onPrevStep={() => setCurrentStep(1)}
              onCalculate={() => {
                setCurrentStep(3);
                showCalculationInterstitialAd();
              }}
              isDark={isDark}
            />
          )}

          {/* STEP 3: KẾT QUẢ CHI PHÍ */}
          {currentStep === 3 && (
            <ResultStep
              result={calculationResult}
              selectedCountry={activeCountry}
              onSaveTrip={handleSaveTrip}
              onNewTrip={() => setCurrentStep(1)}
              isDark={isDark}
            />
          )}
        </main>

        {/* Persistent AdMob Adaptive Banner */}
        <div className="px-3 pb-2">
          <AdMobBanner isDark={isDark} language={activeCountry.language} />
        </div>

        {/* Footer info bar */}
        <footer
          style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
          className={`py-2 px-4 border-t text-[10px] flex items-center justify-between ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-500'
              : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <span>FuelMate v1.0</span>
          <span>{activeCountry.name} • {activeCountry.currency}</span>
        </footer>
      </div>

      {/* Sidebar Drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedCountry={activeCountry}
        onOpenCountryModal={() => setIsCountryModalOpen(true)}
        onOpenCustomVehicleModal={() => setIsCustomVehicleOpen(true)}
        onOpenSavedTrips={() => setIsSavedTripsOpen(true)}
        savedTripsCount={savedTrips.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenTermsPrivacy={() => setIsTermsPrivacyOpen(true)}
      />

      {/* Country Select Modal */}
      <CountrySelectModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        selectedCountry={activeCountry}
        onSelectCountry={handleSelectCountry}
        isDark={isDark}
      />

      {/* Custom Vehicle Adder with Online Lookup Modal */}
      <CustomVehicleModal
        isOpen={isCustomVehicleOpen}
        onClose={() => setIsCustomVehicleOpen(false)}
        onAddVehicle={handleAddCustomVehicle}
        selectedCountry={activeCountry}
        isDark={isDark}
      />

      {/* Local Price Edit Modal */}
      <EditPriceModal
        isOpen={isEditPriceOpen}
        onClose={() => setIsEditPriceOpen(false)}
        selectedCountry={activeCountry}
        fuelType={selectedFuelType}
        customPrice={customFuelPrice}
        onSavePrice={setCustomFuelPrice}
        isDark={isDark}
      />

      {/* Saved Trips & Fuel Calendar Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        trips={savedTrips}
        monthlyExpenses={monthlyExpenses}
        onDeleteTrip={handleDeleteTrip}
        onClearAll={handleClearAllTrips}
        selectedCountry={activeCountry}
        isDark={isDark}
      />

      {/* Terms of Service & Privacy Policy Modal */}
      <TermsPrivacyModal
        isOpen={isTermsPrivacyOpen}
        onClose={() => setIsTermsPrivacyOpen(false)}
        isDark={isDark}
        language={activeCountry.language}
      />
    </div>
  );
}

export default App;
