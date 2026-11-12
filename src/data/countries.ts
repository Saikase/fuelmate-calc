import type { CountryFuelData } from '../types';

export const COUNTRIES: CountryFuelData[] = [
  // 1. VIỆT NAM (Cập nhật chuẩn kỳ điều hành 12/11/2026 theo ảnh thực tế)
  {
    code: 'VN',
    name: 'Việt Nam',
    nativeName: 'Việt Nam',
    flag: '🇻🇳',
    language: 'vi',
    currency: 'VND',
    currencySymbol: '₫',
    unitSystem: 'metric',
    sourceName: 'Petrolimex & Liên Bộ Công Thương (Tham chiếu GlobalPetrolPrices)',
    lastUpdated: '12/11/2026 (Kỳ điều hành giảm 1.310đ)',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Xăng RON 95-III (E10)',
        pricePerUnit: 19840,
        unitLabel: '₫/lít',
      },
      ron92: {
        id: 'ron92',
        name: 'Xăng E5 RON 92-II',
        pricePerUnit: 19390,
        unitLabel: '₫/lít',
      },
      diesel: {
        id: 'diesel',
        name: 'Dầu DO 0,05S-II',
        pricePerUnit: 26820,
        unitLabel: '₫/lít',
      },
    },
  },

  // 2. HOA KỲ (USA) - Dùng hệ Imperial (Miles, Gallons, $/gal)
  {
    code: 'US',
    name: 'United States',
    nativeName: 'United States',
    flag: '🇺🇸',
    language: 'en',
    currency: 'USD',
    currencySymbol: '$',
    unitSystem: 'imperial',
    sourceName: 'U.S. Energy Information Administration (EIA) & GlobalPetrolPrices',
    lastUpdated: 'EIA Weekly National Retail Average',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Premium Gasoline (91/93)',
        pricePerUnit: 3.85,
        unitLabel: '$/gal',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Gasoline (87)',
        pricePerUnit: 3.15,
        unitLabel: '$/gal',
      },
      diesel: {
        id: 'diesel',
        name: 'Ultra-Low Sulfur Diesel',
        pricePerUnit: 3.65,
        unitLabel: '$/gal',
      },
    },
  },

  // 3. THÁI LAN
  {
    code: 'TH',
    name: 'Thailand',
    nativeName: 'ประเทศไทย',
    flag: '🇹🇭',
    language: 'th',
    currency: 'THB',
    currencySymbol: '฿',
    unitSystem: 'metric',
    sourceName: 'PTT Oil & Retail Business & GlobalPetrolPrices',
    lastUpdated: 'Bangkok Metropolitan Retail Rate',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Gasohol 95',
        pricePerUnit: 37.8,
        unitLabel: '฿/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Gasohol 91',
        pricePerUnit: 36.2,
        unitLabel: '฿/L',
      },
      diesel: {
        id: 'diesel',
        name: 'High Speed Diesel B7',
        pricePerUnit: 32.9,
        unitLabel: '฿/L',
      },
    },
  },

  // 4. NHẬT BẢN
  {
    code: 'JP',
    name: 'Japan',
    nativeName: '日本',
    flag: '🇯🇵',
    language: 'ja',
    currency: 'JPY',
    currencySymbol: '¥',
    unitSystem: 'metric',
    sourceName: 'Oil Information Center Japan & GlobalPetrolPrices',
    lastUpdated: 'National Weekly Survey',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'High-Octane (ハイオク)',
        pricePerUnit: 184,
        unitLabel: '¥/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular (レギュラー)',
        pricePerUnit: 173,
        unitLabel: '¥/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diesel (軽油)',
        pricePerUnit: 152,
        unitLabel: '¥/L',
      },
    },
  },

  // 5. HÀN QUỐC
  {
    code: 'KR',
    name: 'South Korea',
    nativeName: '대한민국',
    flag: '🇰🇷',
    language: 'ko',
    currency: 'KRW',
    currencySymbol: '₩',
    unitSystem: 'metric',
    sourceName: 'Korea National Oil Corporation (Opinet) & GlobalPetrolPrices',
    lastUpdated: 'Opinet Real-time Station Feed',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Premium (고급휘발유)',
        pricePerUnit: 1890,
        unitLabel: '₩/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Gasoline (보통휘발유)',
        pricePerUnit: 1640,
        unitLabel: '₩/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Automotive Diesel (자동차용경유)',
        pricePerUnit: 1530,
        unitLabel: '₩/L',
      },
    },
  },

  // 6. ANH QUỐC (UK)
  {
    code: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    flag: '🇬🇧',
    language: 'en',
    currency: 'GBP',
    currencySymbol: '£',
    unitSystem: 'metric',
    sourceName: 'RAC Fuel Watch & GlobalPetrolPrices',
    lastUpdated: 'UK National Forecourt Average',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Super Unleaded (E5)',
        pricePerUnit: 1.48,
        unitLabel: '£/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Standard Unleaded (E10)',
        pricePerUnit: 1.38,
        unitLabel: '£/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Standard Diesel',
        pricePerUnit: 1.44,
        unitLabel: '£/L',
      },
    },
  },

  // 7. ĐỨC (Germany)
  {
    code: 'DE',
    name: 'Germany',
    nativeName: 'Deutschland',
    flag: '🇩🇪',
    language: 'de',
    currency: 'EUR',
    currencySymbol: '€',
    unitSystem: 'metric',
    sourceName: 'ADAC Kraftstoffpreise & GlobalPetrolPrices',
    lastUpdated: 'Federal Cartel Office Transparency Feed',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Super E10 (95)',
        pricePerUnit: 1.78,
        unitLabel: '€/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diesel Kraftstoff',
        pricePerUnit: 1.69,
        unitLabel: '€/L',
      },
    },
  },

  // 8. PHÁP (France)
  {
    code: 'FR',
    name: 'France',
    nativeName: 'France',
    flag: '🇫🇷',
    language: 'fr',
    currency: 'EUR',
    currencySymbol: '€',
    unitSystem: 'metric',
    sourceName: 'Ministère de la Transition Écologique & GlobalPetrolPrices',
    lastUpdated: 'Prix des Carburants Officiel',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'SP95-E10',
        pricePerUnit: 1.82,
        unitLabel: '€/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Gazole Diesel',
        pricePerUnit: 1.72,
        unitLabel: '€/L',
      },
    },
  },

  // 9. ÚC (Australia)
  {
    code: 'AU',
    name: 'Australia',
    nativeName: 'Australia',
    flag: '🇦🇺',
    language: 'en',
    currency: 'AUD',
    currencySymbol: 'A$',
    unitSystem: 'metric',
    sourceName: 'Australian Institute of Petroleum & GlobalPetrolPrices',
    lastUpdated: 'Capital Cities Weekly Benchmark',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Premium Unleaded 95',
        pricePerUnit: 2.08,
        unitLabel: 'A$/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Unleaded 91',
        pricePerUnit: 1.89,
        unitLabel: 'A$/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Automotive Diesel',
        pricePerUnit: 1.99,
        unitLabel: 'A$/L',
      },
    },
  },

  // 10. CANADA
  {
    code: 'CA',
    name: 'Canada',
    nativeName: 'Canada',
    flag: '🇨🇦',
    language: 'en',
    currency: 'CAD',
    currencySymbol: 'C$',
    unitSystem: 'metric',
    sourceName: 'Natural Resources Canada & GlobalPetrolPrices',
    lastUpdated: 'Average Retail Pump Prices',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Premium Gasoline',
        pricePerUnit: 1.78,
        unitLabel: 'C$/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Gasoline',
        pricePerUnit: 1.54,
        unitLabel: 'C$/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Automotive Diesel',
        pricePerUnit: 1.68,
        unitLabel: 'C$/L',
      },
    },
  },

  // 11. SINGAPORE
  {
    code: 'SG',
    name: 'Singapore',
    nativeName: 'Singapore',
    flag: '🇸🇬',
    language: 'en',
    currency: 'SGD',
    currencySymbol: 'S$',
    unitSystem: 'metric',
    sourceName: 'Consumers Association of Singapore (Fuel Kaki) & GlobalPetrolPrices',
    lastUpdated: 'Pump Price Listing (SPC / Shell / Esso)',
    fuels: {
      ron95: {
        id: 'ron95',
        name: '95 Octane',
        pricePerUnit: 2.82,
        unitLabel: 'S$/L',
      },
      ron92: {
        id: 'ron92',
        name: '92 Octane',
        pricePerUnit: 2.74,
        unitLabel: 'S$/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Ultra Low Diesel',
        pricePerUnit: 2.58,
        unitLabel: 'S$/L',
      },
    },
  },

  // 12. MALAYSIA
  {
    code: 'MY',
    name: 'Malaysia',
    nativeName: 'Malaysia',
    flag: '🇲🇾',
    language: 'en',
    currency: 'MYR',
    currencySymbol: 'RM',
    unitSystem: 'metric',
    sourceName: 'Ministry of Finance Malaysia & GlobalPetrolPrices',
    lastUpdated: 'Weekly Automatic Price Mechanism (APM)',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'RON 97 (Thị trường tự do)',
        pricePerUnit: 3.42,
        unitLabel: 'RM/L',
      },
      ron92: {
        id: 'ron92',
        name: 'RON 95 (Trợ giá nhà nước)',
        pricePerUnit: 2.05,
        unitLabel: 'RM/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Euro 5 Diesel B10',
        pricePerUnit: 2.95,
        unitLabel: 'RM/L',
      },
    },
  },

  // 13. INDONESIA
  {
    code: 'ID',
    name: 'Indonesia',
    nativeName: 'Indonesia',
    flag: '🇮🇩',
    language: 'en',
    currency: 'IDR',
    currencySymbol: 'Rp',
    unitSystem: 'metric',
    sourceName: 'Pertamina Official & GlobalPetrolPrices',
    lastUpdated: 'Pertamina BBM Non-Subsidi',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Pertamax Turbo (RON 98/95)',
        pricePerUnit: 14500,
        unitLabel: 'Rp/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Pertamax (RON 92)',
        pricePerUnit: 12950,
        unitLabel: 'Rp/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Dexlite / Pertamina Dex',
        pricePerUnit: 14200,
        unitLabel: 'Rp/L',
      },
    },
  },

  // 14. PHILIPPINES
  {
    code: 'PH',
    name: 'Philippines',
    nativeName: 'Pilipinas',
    flag: '🇵🇭',
    language: 'en',
    currency: 'PHP',
    currencySymbol: '₱',
    unitSystem: 'metric',
    sourceName: 'Department of Energy (DOE) Philippines & GlobalPetrolPrices',
    lastUpdated: 'Metro Manila Weekly Price Monitoring',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Premium Gasoline (95)',
        pricePerUnit: 64.5,
        unitLabel: '₱/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Unleaded Gasoline (91)',
        pricePerUnit: 58.2,
        unitLabel: '₱/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Automotive Diesel',
        pricePerUnit: 54.0,
        unitLabel: '₱/L',
      },
    },
  },

  // 15. ẤN ĐỘ (India)
  {
    code: 'IN',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    language: 'en',
    currency: 'INR',
    currencySymbol: '₹',
    unitSystem: 'metric',
    sourceName: 'Indian Oil Corporation (IOCL) & GlobalPetrolPrices',
    lastUpdated: 'New Delhi Daily Dynamic Fuel Pricing',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'XP95 / Speed Premium',
        pricePerUnit: 101.5,
        unitLabel: '₹/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Petrol',
        pricePerUnit: 94.7,
        unitLabel: '₹/L',
      },
      diesel: {
        id: 'diesel',
        name: 'High Speed Diesel',
        pricePerUnit: 87.6,
        unitLabel: '₹/L',
      },
    },
  },

  // 16. TRUNG QUỐC (China)
  {
    code: 'CN',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    language: 'zh',
    currency: 'CNY',
    currencySymbol: '¥',
    unitSystem: 'metric',
    sourceName: 'National Development and Reform Commission (NDRC) & GlobalPetrolPrices',
    lastUpdated: 'Beijing Ceiling Retail Price Guide',
    fuels: {
      ron95: {
        id: 'ron95',
        name: '汽油 95号 (Gasoline 95)',
        pricePerUnit: 8.12,
        unitLabel: '¥/L',
      },
      ron92: {
        id: 'ron92',
        name: '汽油 92号 (Gasoline 92)',
        pricePerUnit: 7.64,
        unitLabel: '¥/L',
      },
      diesel: {
        id: 'diesel',
        name: '柴油 0号 (Diesel 0#)',
        pricePerUnit: 7.28,
        unitLabel: '¥/L',
      },
    },
  },

  // 17. TÂY BAN NHA (Spain)
  {
    code: 'ES',
    name: 'Spain',
    nativeName: 'España',
    flag: '🇪🇸',
    language: 'es',
    currency: 'EUR',
    currencySymbol: '€',
    unitSystem: 'metric',
    sourceName: 'Ministerio para la Transición Ecológica & GlobalPetrolPrices',
    lastUpdated: 'Geoportal Gasolineras Media Nacional',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Gasolina 95 E5',
        pricePerUnit: 1.58,
        unitLabel: '€/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Gasóleo A (Diesel)',
        pricePerUnit: 1.49,
        unitLabel: '€/L',
      },
    },
  },

  // 18. Ý (Italy)
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    flag: '🇮🇹',
    language: 'en',
    currency: 'EUR',
    currencySymbol: '€',
    unitSystem: 'metric',
    sourceName: 'Ministero delle Imprese e del Made in Italy & GlobalPetrolPrices',
    lastUpdated: 'Osservaprezzi Carburanti Media Self',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Benzina Self (95)',
        pricePerUnit: 1.76,
        unitLabel: '€/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Gasolio Self (Diesel)',
        pricePerUnit: 1.65,
        unitLabel: '€/L',
      },
    },
  },

  // 19. BRAZIL
  {
    code: 'BR',
    name: 'Brazil',
    nativeName: 'Brasil',
    flag: '🇧🇷',
    language: 'es',
    currency: 'BRL',
    currencySymbol: 'R$',
    unitSystem: 'metric',
    sourceName: 'Agência Nacional do Petróleo (ANP) & GlobalPetrolPrices',
    lastUpdated: 'Levantamento de Preços de Combustíveis',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Gasolina Aditivada',
        pricePerUnit: 6.32,
        unitLabel: 'R$/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Gasolina Comum',
        pricePerUnit: 6.12,
        unitLabel: 'R$/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diesel S10',
        pricePerUnit: 5.98,
        unitLabel: 'R$/L',
      },
    },
  },

  // 20. MEXICO
  {
    code: 'MX',
    name: 'Mexico',
    nativeName: 'México',
    flag: '🇲🇽',
    language: 'es',
    currency: 'MXN',
    currencySymbol: '$',
    unitSystem: 'metric',
    sourceName: 'Comisión Reguladora de Energía (CRE) & GlobalPetrolPrices',
    lastUpdated: 'Promedio Nacional Diario',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Gasolina Premium',
        pricePerUnit: 25.4,
        unitLabel: '$/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Gasolina Regular (Magna)',
        pricePerUnit: 23.8,
        unitLabel: '$/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diésel Automotriz',
        pricePerUnit: 25.1,
        unitLabel: '$/L',
      },
    },
  },

  // 21. LÀO (Laos)
  {
    code: 'LA',
    name: 'Laos',
    nativeName: 'ລາວ',
    flag: '🇱🇦',
    language: 'en',
    currency: 'LAK',
    currencySymbol: '₭',
    unitSystem: 'metric',
    sourceName: 'Lao State Fuel Company & GlobalPetrolPrices',
    lastUpdated: 'Vientiane Fuel Board Notification',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Super Gasoline',
        pricePerUnit: 30800,
        unitLabel: '₭/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Gasoline',
        pricePerUnit: 25600,
        unitLabel: '₭/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diesel Fuel',
        pricePerUnit: 21900,
        unitLabel: '₭/L',
      },
    },
  },

  // 22. CAMPUCHIA (Cambodia)
  {
    code: 'KH',
    name: 'Cambodia',
    nativeName: 'កម្ពុជា',
    flag: '🇰🇭',
    language: 'en',
    currency: 'KHR',
    currencySymbol: '៛',
    unitSystem: 'metric',
    sourceName: 'Ministry of Commerce of Cambodia & GlobalPetrolPrices',
    lastUpdated: '10-Day Retail Fuel Adjustment Directive',
    fuels: {
      ron95: {
        id: 'ron95',
        name: 'Super Gasoline (EA95)',
        pricePerUnit: 4650,
        unitLabel: '៛/L',
      },
      ron92: {
        id: 'ron92',
        name: 'Regular Gasoline (EA92)',
        pricePerUnit: 4100,
        unitLabel: '៛/L',
      },
      diesel: {
        id: 'diesel',
        name: 'Diesel Fuel 50ppm',
        pricePerUnit: 3950,
        unitLabel: '៛/L',
      },
    },
  },
];
