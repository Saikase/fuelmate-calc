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
import type { CountryFuelData, Vehicle, CalculationResult, SavedTrip } from './types';
import { getTranslation } from './i18n/translations';
import { initializeAdMob } from './services/admob';

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

  // Mobile frame simulator toggle
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Step state: 1 (Xe) -> 2 (Quãng đường & Giá) -> 3 (Kết quả)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Country state
  const [selectedCountry, setSelectedCountry] = useState<CountryFuelData>(COUNTRIES[0]); // VN by default
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [livePrices, setLivePrices] = useState<Record<string, any> | null>(null);

  // Fetch updated prices from automated JSON feed & Init AdMob
  useEffect(() => {
    initializeAdMob();
    fetch('./fuel_prices.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.countries) {
          setLivePrices(data.countries);
        }
      })
      .catch(() => {
        // Offline bundled fallback
      });
  }, []);

  // Merge live dynamic prices with selected country
  const activeCountry = useMemo<CountryFuelData>(() => {
    if (livePrices && livePrices[selectedCountry.code]) {
      const remote = livePrices[selectedCountry.code];
      return {
        ...selectedCountry,
        lastUpdated: remote.lastUpdated ? `${remote.lastUpdated} (${remote.source || 'Online'})` : selectedCountry.lastUpdated,
        fuels: {
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
  const [selectedFuelType, setSelectedFuelType] = useState<'ron95' | 'ron92' | 'diesel'>('ron95');
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

  useEffect(() => {
    try {
      localStorage.setItem('fuelmate_saved_trips', JSON.stringify(savedTrips));
    } catch (e) {
      console.error(e);
    }
  }, [savedTrips]);

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
    if (selectedVehicle.recommendedFuel === 'diesel') {
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
    
    let fuelNeeded = 0;
    const activeFuel = activeCountry.fuels[selectedFuelType] || activeCountry.fuels.ron95;
    const fuelPrice = customFuelPrice !== null ? customFuelPrice : activeFuel.pricePerUnit;

    if (isImperial) {
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
      volumeUnit: isImperial ? 'gal' : 'L',
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
    const newTrip: SavedTrip = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(selectedCountry.language === 'vi' ? 'vi-VN' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
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
    alert(selectedCountry.language === 'vi' ? 'Đã lưu chuyến đi!' : 'Trip saved!');
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
      className={`min-h-screen transition-colors flex flex-col items-center justify-start sm:p-4 ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Container: If isMobileFrame, renders as a smartphone mockup */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          isMobileFrame
            ? `max-w-[430px] min-h-[92vh] sm:my-3 rounded-[36px] border-[6px] shadow-2xl overflow-hidden relative ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300'
              }`
            : `max-w-xl min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`
        }`}
      >
        {/* Dynamic Island on Mobile frame */}
        {isMobileFrame && (
          <div
            className={`hidden sm:flex justify-center pt-2 pb-1 border-b ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'
            }`}
          >
            <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800 ml-auto mr-2" />
            </div>
          </div>
        )}

        {/* Top Header */}
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          selectedCountry={activeCountry}
          onOpenCountryModal={() => setIsCountryModalOpen(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
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
              onCalculate={() => setCurrentStep(3)}
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

      {/* Saved Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedTripsOpen}
        onClose={() => setIsSavedTripsOpen(false)}
        trips={savedTrips}
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
