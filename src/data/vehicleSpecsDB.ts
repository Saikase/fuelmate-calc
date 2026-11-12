export interface VehicleSpecEntry {
  modelName: string;
  brand: string;
  type: 'motorcycle' | 'car';
  engine: string;
  consumption: number; // in L/100km
  fuelType: 'ron95' | 'ron92' | 'diesel';
  source: string;
  aliases: string[];
}

export const VEHICLE_SPECS_DB: VehicleSpecEntry[] = [
  // ==========================================
  // XE MÁY & MÔ TÔ (HONDA)
  // ==========================================
  {
    modelName: 'Honda Wave Alpha 110',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '109.1cc 4 thì, làm mát không khí',
    consumption: 1.72,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam (Công khai mức tiêu thụ nhiên liệu)',
    aliases: ['wave alpha', 'wave 110', 'wave a', 'honda wave'],
  },
  {
    modelName: 'Honda Wave RSX Fi 110',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '109.2cc PGM-FI',
    consumption: 1.70,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['wave rsx', 'wave rsx fi', 'rsx 110'],
  },
  {
    modelName: 'Honda Blade 110',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '109.1cc SOHC',
    consumption: 1.85,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['blade', 'blade 110', 'honda blade'],
  },
  {
    modelName: 'Honda Future 125 Fi',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.9cc PGM-FI',
    consumption: 1.54,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam (Xe số tiết kiệm xăng hàng đầu)',
    aliases: ['future', 'future 125', 'fu mập', 'future fi', 'future led'],
  },
  {
    modelName: 'Honda Super Cub C125',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124cc PGM-FI SOHC',
    consumption: 1.50,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['super cub', 'cub 125', 'cub c125', 'honda cub'],
  },
  {
    modelName: 'Honda Vision 110 eSP',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '109.5cc eSP thế hệ mới',
    consumption: 1.85,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['vision', 'honda vision', 'vision 110', 'xe vision'],
  },
  {
    modelName: 'Honda Lead 125 eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.8cc eSP+ 4 van làm mát dung dịch',
    consumption: 2.16,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['lead', 'lead 125', 'honda lead', 'ninja lead'],
  },
  {
    modelName: 'Honda Air Blade 125 eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.8cc eSP+ 4 van',
    consumption: 2.26,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['air blade 125', 'ab 125', 'airblade 125', 'air blade'],
  },
  {
    modelName: 'Honda Air Blade 160 eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '156.9cc eSP+ 4 van',
    consumption: 2.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['air blade 160', 'ab 160', 'airblade 160'],
  },
  {
    modelName: 'Honda Vario 125',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.8cc eSP',
    consumption: 2.16,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['vario 125', 'vario125', 'honda vario 125'],
  },
  {
    modelName: 'Honda Vario 160 eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '156.9cc eSP+ 4 van',
    consumption: 2.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['vario 160', 'vario160', 'honda vario 160', 'vario'],
  },
  {
    modelName: 'Honda SH Mode 125',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.8cc eSP+ 4 van',
    consumption: 2.12,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sh mode', 'shmode', 'sh mode 125'],
  },
  {
    modelName: 'Honda SH 125i eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '124.8cc eSP+ 4 van',
    consumption: 2.46,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sh 125', 'sh 125i', 'sh125', 'honda sh 125'],
  },
  {
    modelName: 'Honda SH 160i eSP+',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '156.9cc eSP+ 4 van',
    consumption: 2.52,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sh 160', 'sh 160i', 'sh160', 'sh 150', 'sh 150i', 'honda sh 160'],
  },
  {
    modelName: 'Honda SH 350i',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '329.6cc eSP+ SOHC',
    consumption: 3.54,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sh 350', 'sh 350i', 'sh350', 'honda sh 350'],
  },
  {
    modelName: 'Honda Winner X 150',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '149.1cc DOHC 6 số côn tay',
    consumption: 1.98,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['winner x', 'winner', 'winner 150', 'winner v3', 'honda winner'],
  },
  {
    modelName: 'Honda CBR150R',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '149.2cc DOHC 4 van côn tay',
    consumption: 2.25,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['cbr 150', 'cbr150', 'cbr150r'],
  },
  {
    modelName: 'Honda CBR500R',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '471cc 2 xi-lanh song song',
    consumption: 3.50,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Honda Motor',
    aliases: ['cbr 500', 'cbr500', 'cbr500r'],
  },
  {
    modelName: 'Honda CBR650R',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '649cc 4 xi-lanh thẳng hàng',
    consumption: 4.90,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Honda Motor',
    aliases: ['cbr 650', 'cbr650', 'cbr650r'],
  },
  {
    modelName: 'Honda CB650R',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '649cc 4 xi-lanh Neo Sports Café',
    consumption: 4.90,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Honda Motor',
    aliases: ['cb 650', 'cb650', 'cb650r'],
  },
  {
    modelName: 'Honda Rebel 500',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '471cc 2 xi-lanh Cruiser',
    consumption: 3.60,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Honda Motor',
    aliases: ['rebel 500', 'rebel500', 'honda rebel'],
  },
  {
    modelName: 'Honda Gold Wing 1800',
    brand: 'Honda',
    type: 'motorcycle',
    engine: '1833cc 6 xi-lanh đối đỉnh Boxer',
    consumption: 5.50,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Honda Motor',
    aliases: ['gold wing', 'goldwing', 'honda goldwing'],
  },

  // ==========================================
  // XE MÁY (YAMAHA)
  // ==========================================
  {
    modelName: 'Yamaha Sirius 110 (Bình xăng con)',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '110.3cc 4 thì, 2 van SOHC',
    consumption: 1.99,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sirius cơ', 'sirius bxc', 'sirius 110', 'xe sirius', 'yamaha sirius'],
  },
  {
    modelName: 'Yamaha Sirius 115 Fi',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '114cc Phun xăng điện tử Fi',
    consumption: 1.65,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['sirius fi', 'sirius 115', 'sirius phun xang'],
  },
  {
    modelName: 'Yamaha Jupiter Finn 115 Fi',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '113.7cc Phun xăng điện tử Fi',
    consumption: 1.64,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['jupiter finn', 'finn 115', 'yamaha finn'],
  },
  {
    modelName: 'Yamaha Grande Hybrid 125',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '125cc Blue Core Hybrid',
    consumption: 1.66,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam (Top 1 tiết kiệm xăng tay ga)',
    aliases: ['grande', 'grande hybrid', 'yamaha grande', 'xe grande'],
  },
  {
    modelName: 'Yamaha Janus 125',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '125cc Blue Core',
    consumption: 1.87,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['janus', 'yamaha janus', 'janus 125'],
  },
  {
    modelName: 'Yamaha Exciter 155 VVA',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '155cc VVA van biến thiên 6 số',
    consumption: 2.09,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['exciter 155', 'ex 155', 'exciter 155 vva', 'yamaha exciter'],
  },
  {
    modelName: 'Yamaha Exciter 150',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '149.7cc SOHC 5 số',
    consumption: 2.00,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['exciter 150', 'ex 150', 'exciter'],
  },
  {
    modelName: 'Yamaha NVX 155 VVA',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '155.1cc Blue Core VVA',
    consumption: 2.17,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['nvx 155', 'nvx', 'yamaha nvx', 'aerox 155'],
  },
  {
    modelName: 'Yamaha PG-1 115',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '113.7cc 4 thì làm mát không khí',
    consumption: 1.69,
    fuelType: 'ron92',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['pg-1', 'pg1', 'yamaha pg1', 'yamaha pg-1'],
  },
  {
    modelName: 'Yamaha XSR 155',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '155cc VVA Neo Retro',
    consumption: 2.00,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['xsr 155', 'xsr155', 'yamaha xsr'],
  },
  {
    modelName: 'Yamaha R15 V4',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '155cc VVA Sportbike',
    consumption: 2.00,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['r15', 'r15 v4', 'r15v4', 'yamaha r15'],
  },
  {
    modelName: 'Yamaha MT-03',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '321cc 2 xi-lanh song song',
    consumption: 3.80,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['mt 03', 'mt03', 'yamaha mt-03'],
  },
  {
    modelName: 'Yamaha MT-07',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '689cc CP2 2 xi-lanh Crossplane',
    consumption: 4.20,
    fuelType: 'ron95',
    source: 'Yamaha Motor Europe Technical Specs',
    aliases: ['mt 07', 'mt07', 'yamaha mt-07'],
  },
  {
    modelName: 'Yamaha MT-09',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '890cc CP3 3 xi-lanh Crossplane',
    consumption: 5.00,
    fuelType: 'ron95',
    source: 'Yamaha Motor Europe Technical Specs',
    aliases: ['mt 09', 'mt09', 'yamaha mt-09'],
  },
  {
    modelName: 'Yamaha YZF-R1',
    brand: 'Yamaha',
    type: 'motorcycle',
    engine: '998cc CP4 Crossplane Superbike',
    consumption: 7.20,
    fuelType: 'ron95',
    source: 'Yamaha Motor Europe Technical Specs',
    aliases: ['r1', 'yamaha r1', 'yzf-r1', 'r1m'],
  },

  // ==========================================
  // PIAGGIO / VESPA
  // ==========================================
  {
    modelName: 'Vespa Sprint 125 i-Get',
    brand: 'Piaggio Vespa',
    type: 'motorcycle',
    engine: '124.5cc i-Get 3 van',
    consumption: 2.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['vespa sprint', 'sprint 125', 'vespa sprint 125', 'vespa'],
  },
  {
    modelName: 'Vespa Primavera 125 i-Get',
    brand: 'Piaggio Vespa',
    type: 'motorcycle',
    engine: '124.5cc i-Get 3 van',
    consumption: 2.63,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['primavera', 'vespa primavera', 'primavera 125'],
  },
  {
    modelName: 'Vespa GTS Super 300 HPE',
    brand: 'Piaggio Vespa',
    type: 'motorcycle',
    engine: '278cc HPE xi-lanh đơn',
    consumption: 3.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['gts 300', 'vespa gts', 'gts super 300'],
  },
  {
    modelName: 'Piaggio Liberty 125 i-Get',
    brand: 'Piaggio Vespa',
    type: 'motorcycle',
    engine: '124cc i-Get',
    consumption: 2.74,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['liberty', 'liberty 125', 'piaggio liberty'],
  },

  // ==========================================
  // SUZUKI XE MÁY
  // ==========================================
  {
    modelName: 'Suzuki Raider R150 Fi',
    brand: 'Suzuki',
    type: 'motorcycle',
    engine: '147.3cc DOHC 4 van làm mát dung dịch',
    consumption: 2.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['raider', 'raider 150', 'raider r150', 'suzuki raider'],
  },
  {
    modelName: 'Suzuki Satria F150 Fi',
    brand: 'Suzuki',
    type: 'motorcycle',
    engine: '147.3cc DOHC 4 van',
    consumption: 2.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['satria', 'satria 150', 'satria f150', 'suzuki satria'],
  },
  {
    modelName: 'Suzuki Hayabusa 1340',
    brand: 'Suzuki',
    type: 'motorcycle',
    engine: '1340cc 4 xi-lanh Hyper-Sport',
    consumption: 6.70,
    fuelType: 'ron95',
    source: 'Suzuki Motor Corporation Official Spec',
    aliases: ['hayabusa', 'suzuki hayabusa', 'than gio hayabusa'],
  },

  // ==========================================
  // KAWASAKI
  // ==========================================
  {
    modelName: 'Kawasaki Ninja 400',
    brand: 'Kawasaki',
    type: 'motorcycle',
    engine: '399cc DOHC 2 xi-lanh song song',
    consumption: 3.80,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam & Kawasaki Motors',
    aliases: ['ninja 400', 'ninja400', 'kawasaki ninja 400', 'ninja'],
  },
  {
    modelName: 'Kawasaki Ninja ZX-25R',
    brand: 'Kawasaki',
    type: 'motorcycle',
    engine: '249.8cc DOHC 4 xi-lanh thẳng hàng',
    consumption: 4.30,
    fuelType: 'ron95',
    source: 'Kawasaki Heavy Industries Specification',
    aliases: ['zx 25r', 'zx25r', 'ninja zx-25r'],
  },
  {
    modelName: 'Kawasaki Ninja ZX-4R',
    brand: 'Kawasaki',
    type: 'motorcycle',
    engine: '399cc DOHC 4 xi-lanh (80 mã lực)',
    consumption: 5.10,
    fuelType: 'ron95',
    source: 'Kawasaki Heavy Industries Specification',
    aliases: ['zx 4r', 'zx4r', 'ninja zx-4r', 'zx-4rr'],
  },
  {
    modelName: 'Kawasaki Z900',
    brand: 'Kawasaki',
    type: 'motorcycle',
    engine: '948cc DOHC 4 xi-lanh thẳng hàng',
    consumption: 5.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['z900', 'z 900', 'kawasaki z900'],
  },
  {
    modelName: 'Kawasaki Z1000',
    brand: 'Kawasaki',
    type: 'motorcycle',
    engine: '1043cc DOHC 4 xi-lanh Thần thánh',
    consumption: 6.10,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam & Kawasaki',
    aliases: ['z1000', 'z 1000', 'kawasaki z1000', 'z1k'],
  },

  // ==========================================
  // DUCATI
  // ==========================================
  {
    modelName: 'Ducati Monster 821',
    brand: 'Ducati',
    type: 'motorcycle',
    engine: '821cc Testastretta 11° L-Twin',
    consumption: 5.40,
    fuelType: 'ron95',
    source: 'Ducati Motor Holding SpA Technical Sheet',
    aliases: ['monster 821', 'ducati 821', 'ducati monster 821'],
  },
  {
    modelName: 'Ducati Monster 937',
    brand: 'Ducati',
    type: 'motorcycle',
    engine: '937cc Testastretta 11° Desmodromic',
    consumption: 5.20,
    fuelType: 'ron95',
    source: 'Ducati Motor Holding SpA Official Spec',
    aliases: ['monster 937', 'ducati 937', 'ducati monster', 'monster new'],
  },
  {
    modelName: 'Ducati Scrambler Icon 800',
    brand: 'Ducati',
    type: 'motorcycle',
    engine: '803cc Desmodromic L-Twin 2 van',
    consumption: 5.10,
    fuelType: 'ron95',
    source: 'Ducati Motor Holding SpA Official Spec',
    aliases: ['scrambler', 'scrambler 800', 'ducati scrambler'],
  },
  {
    modelName: 'Ducati Panigale V4',
    brand: 'Ducati',
    type: 'motorcycle',
    engine: '1103cc Desmosedici Stradale V4 90°',
    consumption: 7.60,
    fuelType: 'ron95',
    source: 'Ducati Motor Holding SpA Official Spec',
    aliases: ['panigale v4', 'panigale', 'ducati v4', 'v4s', 'panigale v4s'],
  },
  {
    modelName: 'Ducati Multistrada V4',
    brand: 'Ducati',
    type: 'motorcycle',
    engine: '1158cc V4 Granturismo',
    consumption: 6.50,
    fuelType: 'ron95',
    source: 'Ducati Motor Holding SpA Official Spec',
    aliases: ['multistrada', 'multistrada v4', 'ducati multistrada'],
  },

  // ==========================================
  // BMW MOTORRAD
  // ==========================================
  {
    modelName: 'BMW S 1000 RR',
    brand: 'BMW',
    type: 'motorcycle',
    engine: '999cc 4 xi-lanh ShiftCam (205 HP)',
    consumption: 6.40,
    fuelType: 'ron95',
    source: 'BMW Motorrad Official Technical Sheet',
    aliases: ['s1000rr', 's 1000 rr', 'ca map s1000rr', 'bmw s1000rr'],
  },
  {
    modelName: 'BMW R 1250 GS Adventure',
    brand: 'BMW',
    type: 'motorcycle',
    engine: '1254cc Boxer ShiftCam 2 xi-lanh',
    consumption: 4.75,
    fuelType: 'ron95',
    source: 'BMW Motorrad Official Technical Sheet',
    aliases: ['r1250gs', 'r 1250 gs', 'bmw gs', 'gs 1250', 'r1300gs'],
  },

  // ==========================================
  // HARLEY-DAVIDSON
  // ==========================================
  {
    modelName: 'Harley-Davidson Iron 883',
    brand: 'Harley-Davidson',
    type: 'motorcycle',
    engine: '883cc Evolution V-Twin làm mát gió',
    consumption: 4.90,
    fuelType: 'ron95',
    source: 'US EPA / Harley-Davidson Technical Sheet',
    aliases: ['iron 883', 'harley 883', 'sportster 883', 'harley-davidson'],
  },

  // ==========================================
  // Ô TÔ (TOYOTA)
  // ==========================================
  {
    modelName: 'Toyota Wigo 1.2 AT',
    brand: 'Toyota',
    type: 'car',
    engine: '1.2L 3 xi-lanh Dual VVT-i (WA-VE)',
    consumption: 5.14,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['wigo', 'toyota wigo', 'wigo 1.2'],
  },
  {
    modelName: 'Toyota Vios 1.5G / 1.5E',
    brand: 'Toyota',
    type: 'car',
    engine: '1.5L 2NR-FE Dual VVT-i',
    consumption: 5.80,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['vios', 'toyota vios', 'vios 1.5', 'vios g', 'vios e'],
  },
  {
    modelName: 'Toyota Raize 1.0 Turbo',
    brand: 'Toyota',
    type: 'car',
    engine: '1.0L Turbo 1KR-VET D-CVT',
    consumption: 5.60,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['raize', 'toyota raize', 'raize 1.0'],
  },
  {
    modelName: 'Toyota Yaris Cross 1.5 Xăng',
    brand: 'Toyota',
    type: 'car',
    engine: '1.5L 2NR-VE D-CVT',
    consumption: 5.95,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['yaris cross', 'toyota yaris cross'],
  },
  {
    modelName: 'Toyota Yaris Cross HEV (Hybrid)',
    brand: 'Toyota',
    type: 'car',
    engine: '1.5L Xăng lai Điện Hybrid (2NR-VEX)',
    consumption: 3.56,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam (Xe tiết kiệm xăng kỷ lục)',
    aliases: ['yaris cross hybrid', 'yaris cross hev'],
  },
  {
    modelName: 'Toyota Veloz Cross 1.5',
    brand: 'Toyota',
    type: 'car',
    engine: '1.5L 2NR-VE D-CVT',
    consumption: 6.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['veloz', 'veloz cross', 'toyota veloz'],
  },
  {
    modelName: 'Toyota Corolla Cross 1.8V',
    brand: 'Toyota',
    type: 'car',
    engine: '1.8L 2ZR-FBE Dual VVT-i',
    consumption: 7.55,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['corolla cross', 'cross 1.8', 'cross v', 'toyota cross'],
  },
  {
    modelName: 'Toyota Corolla Cross HEV (Hybrid)',
    brand: 'Toyota',
    type: 'car',
    engine: '1.8L Xăng lai Điện (2ZR-FXE)',
    consumption: 4.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['cross hybrid', 'cross hev', 'corolla cross hybrid'],
  },
  {
    modelName: 'Toyota Camry 2.0Q',
    brand: 'Toyota',
    type: 'car',
    engine: '2.0L M20A-FKS Direct Shift-CVT',
    consumption: 6.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['camry', 'camry 2.0', 'toyota camry'],
  },
  {
    modelName: 'Toyota Camry 2.5Q',
    brand: 'Toyota',
    type: 'car',
    engine: '2.5L A25A-FKS 8 cấp tự động',
    consumption: 7.10,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['camry 2.5', 'camry 2.5q'],
  },
  {
    modelName: 'Toyota Innova 2.0 (G/V)',
    brand: 'Toyota',
    type: 'car',
    engine: '2.0L 1TR-FE Dual VVT-i',
    consumption: 8.60,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['innova', 'toyota innova', 'innova 2.0', 'innova g', 'innova v'],
  },
  {
    modelName: 'Toyota Innova Cross 2.0V',
    brand: 'Toyota',
    type: 'car',
    engine: '2.0L M20A-FKS Direct Shift-CVT',
    consumption: 7.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['innova cross', 'innova cross 2.0', 'toyota innova cross'],
  },
  {
    modelName: 'Toyota Innova Cross HEV (Hybrid)',
    brand: 'Toyota',
    type: 'car',
    engine: '2.0L Xăng lai Điện (M20A-FXS)',
    consumption: 4.92,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['innova cross hybrid', 'innova cross hev', 'innova hybrid'],
  },
  {
    modelName: 'Toyota Fortuner 2.4L Dầu',
    brand: 'Toyota',
    type: 'car',
    engine: '2.4L 2GD-FTV Turbo Diesel',
    consumption: 7.20,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['fortuner dau', 'fortuner 2.4', 'toyota fortuner', 'fortuner'],
  },
  {
    modelName: 'Toyota Fortuner 2.7L Xăng',
    brand: 'Toyota',
    type: 'car',
    engine: '2.7L 2TR-FE Dual VVT-i',
    consumption: 10.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['fortuner xang', 'fortuner 2.7'],
  },
  {
    modelName: 'Toyota Land Cruiser 300 (V6 3.5 Turbo)',
    brand: 'Toyota',
    type: 'car',
    engine: '3.5L V6 Twin-Turbo (V35A-FTS)',
    consumption: 12.55,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['land cruiser', 'land cruiser 300', 'lc300', 'land 300'],
  },
  {
    modelName: 'Toyota Land Cruiser Prado 2.7',
    brand: 'Toyota',
    type: 'car',
    engine: '2.7L 2TR-FE Dual VVT-i',
    consumption: 11.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['prado', 'land cruiser prado', 'toyota prado'],
  },

  // ==========================================
  // HYUNDAI
  // ==========================================
  {
    modelName: 'Hyundai Grand i10 1.2',
    brand: 'Hyundai',
    type: 'car',
    engine: '1.2L Kappa MPI',
    consumption: 5.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['i10', 'grand i10', 'hyundai i10', 'xe i10'],
  },
  {
    modelName: 'Hyundai Accent 1.5 AT',
    brand: 'Hyundai',
    type: 'car',
    engine: '1.5L SmartStream G1.5',
    consumption: 5.86,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['accent', 'hyundai accent', 'accent 1.4', 'accent 1.5'],
  },
  {
    modelName: 'Hyundai Creta 1.5',
    brand: 'Hyundai',
    type: 'car',
    engine: '1.5L SmartStream G1.5 IVT',
    consumption: 6.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['creta', 'hyundai creta', 'creta 1.5'],
  },
  {
    modelName: 'Hyundai Tucson 2.0 Xăng',
    brand: 'Hyundai',
    type: 'car',
    engine: '2.0L SmartStream G2.0',
    consumption: 8.10,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['tucson', 'hyundai tucson', 'tucson xang', 'tucson 2.0'],
  },
  {
    modelName: 'Hyundai Tucson 2.0 Dầu (Diesel)',
    brand: 'Hyundai',
    type: 'car',
    engine: '2.0L SmartStream D2.0 Turbo Diesel',
    consumption: 6.30,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['tucson dau', 'tucson diesel', 'tucson 2.0 dau'],
  },
  {
    modelName: 'Hyundai Santa Fe 2.5 Xăng',
    brand: 'Hyundai',
    type: 'car',
    engine: '2.5L SmartStream G2.5',
    consumption: 8.60,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['santafe', 'santa fe', 'hyundai santa fe', 'santafe xang'],
  },
  {
    modelName: 'Hyundai Santa Fe 2.2 Dầu (Diesel)',
    brand: 'Hyundai',
    type: 'car',
    engine: '2.2L SmartStream D2.2 Turbo Diesel',
    consumption: 6.40,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['santafe dau', 'santa fe dau', 'santafe diesel'],
  },
  {
    modelName: 'Hyundai Custin 1.5 Turbo',
    brand: 'Hyundai',
    type: 'car',
    engine: '1.5L Turbo GDI SmartStream 8AT',
    consumption: 6.90,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['custin', 'hyundai custin', 'custin 1.5'],
  },
  {
    modelName: 'Hyundai Stargazer 1.5',
    brand: 'Hyundai',
    type: 'car',
    engine: '1.5L SmartStream IVT',
    consumption: 6.35,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['stargazer', 'hyundai stargazer'],
  },

  // ==========================================
  // KIA
  // ==========================================
  {
    modelName: 'Kia Morning 1.25',
    brand: 'Kia',
    type: 'car',
    engine: '1.25L Kappa MPI',
    consumption: 5.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['morning', 'kia morning', 'morning 1.25'],
  },
  {
    modelName: 'Kia Soluto 1.4',
    brand: 'Kia',
    type: 'car',
    engine: '1.4L Kappa',
    consumption: 5.50,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['soluto', 'kia soluto'],
  },
  {
    modelName: 'Kia K3 1.6 AT',
    brand: 'Kia',
    type: 'car',
    engine: '1.6L Gamma MPI',
    consumption: 6.50,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['k3', 'kia k3', 'cerato', 'kia cerato'],
  },
  {
    modelName: 'Kia Seltos 1.4 Turbo',
    brand: 'Kia',
    type: 'car',
    engine: '1.4L Kappa T-GDi 7DCT',
    consumption: 6.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['seltos', 'kia seltos', 'seltos 1.4', 'seltos turbo'],
  },
  {
    modelName: 'Kia Carnival 2.2 Dầu',
    brand: 'Kia',
    type: 'car',
    engine: '2.2L SmartStream D2.2 Turbo Diesel',
    consumption: 7.00,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['carnival', 'kia carnival', 'carnival dau', 'sedona'],
  },

  // ==========================================
  // MAZDA
  // ==========================================
  {
    modelName: 'Mazda 2 1.5 Sedan',
    brand: 'Mazda',
    type: 'car',
    engine: '1.5L SkyActiv-G 6AT',
    consumption: 5.05,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam (Xe tiết kiệm xăng bậc nhất)',
    aliases: ['mazda 2', 'mazda2'],
  },
  {
    modelName: 'Mazda 3 1.5 Sedan',
    brand: 'Mazda',
    type: 'car',
    engine: '1.5L SkyActiv-G 6AT',
    consumption: 5.47,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['mazda 3', 'mazda3', 'm3'],
  },
  {
    modelName: 'Mazda 6 2.0',
    brand: 'Mazda',
    type: 'car',
    engine: '2.0L SkyActiv-G 6AT',
    consumption: 6.55,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['mazda 6', 'mazda6', 'm6'],
  },
  {
    modelName: 'Mazda CX-5 2.0',
    brand: 'Mazda',
    type: 'car',
    engine: '2.0L SkyActiv-G FWD',
    consumption: 7.10,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['cx5', 'cx-5', 'mazda cx-5', 'mazda cx5'],
  },
  {
    modelName: 'Mazda CX-8 2.5',
    brand: 'Mazda',
    type: 'car',
    engine: '2.5L SkyActiv-G 7 chỗ',
    consumption: 8.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['cx8', 'cx-8', 'mazda cx-8', 'mazda cx8'],
  },

  // ==========================================
  // HONDA Ô TÔ
  // ==========================================
  {
    modelName: 'Honda City 1.5',
    brand: 'Honda',
    type: 'car',
    engine: '1.5L i-VTEC DOHC CVT',
    consumption: 5.68,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['city', 'honda city', 'city rs', 'city l'],
  },
  {
    modelName: 'Honda Civic 1.5 Turbo',
    brand: 'Honda',
    type: 'car',
    engine: '1.5L VTEC Turbo 176 mã lực',
    consumption: 6.35,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['civic', 'honda civic', 'civic rs', 'civic turbo'],
  },
  {
    modelName: 'Honda HR-V 1.5 Turbo',
    brand: 'Honda',
    type: 'car',
    engine: '1.5L VTEC Turbo',
    consumption: 6.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['hr-v', 'hrv', 'honda hrv', 'honda hr-v'],
  },
  {
    modelName: 'Honda BR-V 1.5',
    brand: 'Honda',
    type: 'car',
    engine: '1.5L DOHC i-VTEC 7 chỗ',
    consumption: 6.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['br-v', 'brv', 'honda brv', 'honda br-v'],
  },
  {
    modelName: 'Honda CR-V 1.5 Turbo',
    brand: 'Honda',
    type: 'car',
    engine: '1.5L VTEC Turbo CVT',
    consumption: 7.50,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['cr-v', 'crv', 'honda crv', 'honda cr-v'],
  },
  {
    modelName: 'Honda CR-V e:HEV (Hybrid)',
    brand: 'Honda',
    type: 'car',
    engine: '2.0L Xăng lai 2 mô tơ điện Hybrid',
    consumption: 5.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['crv hybrid', 'cr-v hybrid', 'crv hev', 'cr-v e:hev'],
  },

  // ==========================================
  // FORD
  // ==========================================
  {
    modelName: 'Ford Territory 1.5 EcoBoost',
    brand: 'Ford',
    type: 'car',
    engine: '1.5L EcoBoost Turbo 7DCT',
    consumption: 7.03,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['territory', 'ford territory'],
  },
  {
    modelName: 'Ford Everest 2.0 Bi-Turbo Dầu',
    brand: 'Ford',
    type: 'car',
    engine: '2.0L Bi-Turbo Diesel 10AT 4x4',
    consumption: 8.00,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['everest', 'ford everest', 'everest bi-turbo', 'everest titanium'],
  },
  {
    modelName: 'Ford Ranger 2.0 Bi-Turbo Dầu',
    brand: 'Ford',
    type: 'car',
    engine: '2.0L Bi-Turbo Diesel 10AT 4x4',
    consumption: 8.00,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['ranger', 'ford ranger', 'ranger wildtrak', 'ranger xls'],
  },
  {
    modelName: 'Ford Ranger Raptor 2.0 Bi-Turbo',
    brand: 'Ford',
    type: 'car',
    engine: '2.0L Bi-Turbo Diesel FOX Shocks',
    consumption: 8.90,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['raptor', 'ranger raptor', 'ford raptor', 'raptor dau'],
  },
  {
    modelName: 'Ford Ranger Raptor 3.0 V6 Xăng Twin-Turbo',
    brand: 'Ford',
    type: 'car',
    engine: '3.0L V6 EcoBoost Twin-Turbo (397 HP)',
    consumption: 13.50,
    fuelType: 'ron95',
    source: 'Hồ sơ kỹ thuật Ford Motor Performance',
    aliases: ['raptor v6', 'raptor xang', 'ranger raptor v6'],
  },
  {
    modelName: 'Ford Explorer 2.3 EcoBoost',
    brand: 'Ford',
    type: 'car',
    engine: '2.3L EcoBoost 301 HP 10AT 4WD',
    consumption: 9.80,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['explorer', 'ford explorer'],
  },
  {
    modelName: 'Ford F-150 3.5 EcoBoost',
    brand: 'Ford',
    type: 'car',
    engine: '3.5L V6 EcoBoost Twin-Turbo 400 HP',
    consumption: 11.80,
    fuelType: 'ron95',
    source: 'US EPA Official Fuel Economy Data',
    aliases: ['f-150', 'f150', 'ford f150', 'ford f-150'],
  },

  // ==========================================
  // MITSUBISHI
  // ==========================================
  {
    modelName: 'Mitsubishi Xforce 1.5',
    brand: 'Mitsubishi',
    type: 'car',
    engine: '1.5L MIVEC CVT',
    consumption: 6.00,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['xforce', 'mitsubishi xforce'],
  },
  {
    modelName: 'Mitsubishi Xpander 1.5 AT',
    brand: 'Mitsubishi',
    type: 'car',
    engine: '1.5L MIVEC 4AT',
    consumption: 6.90,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['xpander', 'mitsubishi xpander', 'xpander cross'],
  },
  {
    modelName: 'Mitsubishi Outlander 2.0',
    brand: 'Mitsubishi',
    type: 'car',
    engine: '2.0L MIVEC CVT',
    consumption: 7.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['outlander', 'mitsubishi outlander'],
  },
  {
    modelName: 'Mitsubishi Triton 2.4 Dầu',
    brand: 'Mitsubishi',
    type: 'car',
    engine: '2.4L MIVEC Turbo Diesel',
    consumption: 7.50,
    fuelType: 'diesel',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['triton', 'mitsubishi triton', 'triton dau'],
  },

  // ==========================================
  // SUZUKI Ô TÔ
  // ==========================================
  {
    modelName: 'Suzuki Swift 1.2',
    brand: 'Suzuki',
    type: 'car',
    engine: '1.2L 4 xi-lanh CVT',
    consumption: 5.19,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['swift', 'suzuki swift'],
  },
  {
    modelName: 'Suzuki XL7 1.5 AT',
    brand: 'Suzuki',
    type: 'car',
    engine: '1.5L K15B 4AT',
    consumption: 5.99,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['xl7', 'suzuki xl7'],
  },
  {
    modelName: 'Suzuki Jimny 1.5 AllGrip',
    brand: 'Suzuki',
    type: 'car',
    engine: '1.5L K15B 4WD địa hình',
    consumption: 7.00,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['jimny', 'suzuki jimny'],
  },

  // ==========================================
  // VINFAST (XĂNG)
  // ==========================================
  {
    modelName: 'VinFast Fadil 1.4',
    brand: 'VinFast',
    type: 'car',
    engine: '1.4L 4 xi-lanh CVT',
    consumption: 5.85,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['fadil', 'vinfast fadil'],
  },
  {
    modelName: 'VinFast Lux A2.0',
    brand: 'VinFast',
    type: 'car',
    engine: '2.0L Turbo N20 BMW phát triển',
    consumption: 8.30,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['lux a', 'lux a2.0', 'vinfast lux a'],
  },
  {
    modelName: 'VinFast Lux SA2.0',
    brand: 'VinFast',
    type: 'car',
    engine: '2.0L Turbo 228 HP ZF 8 cấp',
    consumption: 10.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['lux sa', 'lux sa2.0', 'vinfast lux sa'],
  },

  // ==========================================
  // MERCEDES-BENZ
  // ==========================================
  {
    modelName: 'Mercedes-Benz C200 Avantgarde Plus',
    brand: 'Mercedes-Benz',
    type: 'car',
    engine: '1.5L Turbo EQ Boost 9G-TRONIC',
    consumption: 7.20,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['c200', 'mercedes c200', 'mercedes c-class'],
  },
  {
    modelName: 'Mercedes-Benz C300 AMG',
    brand: 'Mercedes-Benz',
    type: 'car',
    engine: '2.0L Turbo 258 HP EQ Boost',
    consumption: 7.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['c300', 'c300 amg', 'mercedes c300'],
  },
  {
    modelName: 'Mercedes-Benz GLC 300 4MATIC',
    brand: 'Mercedes-Benz',
    type: 'car',
    engine: '2.0L Turbo 258 HP Mild-Hybrid',
    consumption: 8.60,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['glc 300', 'glc300', 'mercedes glc 300', 'glc'],
  },
  {
    modelName: 'Mercedes-AMG G63',
    brand: 'Mercedes-Benz',
    type: 'car',
    engine: '4.0L V8 Bi-Turbo 585 HP 850 Nm',
    consumption: 14.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['g63', 'g63 amg', 'mercedes g63', 'g-class'],
  },

  // ==========================================
  // BMW Ô TÔ
  // ==========================================
  {
    modelName: 'BMW 320i Sport Line',
    brand: 'BMW',
    type: 'car',
    engine: '2.0L TwinPower Turbo 8AT',
    consumption: 6.40,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['bmw 320i', '320i', 'bmw 3 series'],
  },
  {
    modelName: 'BMW 330i M Sport',
    brand: 'BMW',
    type: 'car',
    engine: '2.0L TwinPower Turbo 258 HP',
    consumption: 6.70,
    fuelType: 'ron95',
    source: 'Cục Đăng kiểm Việt Nam',
    aliases: ['bmw 330i', '330i', '330i m sport'],
  },

  // ==========================================
  // PORSCHE
  // ==========================================
  {
    modelName: 'Porsche Macan 2.0 Turbo',
    brand: 'Porsche',
    type: 'car',
    engine: '2.0L 4 xi-lanh Turbo 265 HP PDK',
    consumption: 8.80,
    fuelType: 'ron95',
    source: 'Porsche AG Technical Data / Cục Đăng kiểm VN',
    aliases: ['macan', 'porsche macan', 'macan 2.0'],
  },
  {
    modelName: 'Porsche Cayenne 3.0 V6',
    brand: 'Porsche',
    type: 'car',
    engine: '3.0L V6 Turbo 353 HP Tiptronic S',
    consumption: 9.80,
    fuelType: 'ron95',
    source: 'Porsche AG Technical Data',
    aliases: ['cayenne', 'porsche cayenne'],
  },
];

export type LookupResult =
  | {
      status: 'exact_found';
      entry: VehicleSpecEntry;
    }
  | {
      status: 'variant_mismatch';
      baseModel: string;
      suggestions: VehicleSpecEntry[];
    }
  | {
      status: 'not_found';
    };

/**
 * Tra cứu thông số kỹ thuật xe chính xác từ cơ sở dữ liệu định mức
 * - Trả về 'exact_found' khi xe và phiên bản động cơ/số hiệu khớp hoàn toàn
 * - Trả về 'variant_mismatch' khi nhận diện được dòng xe cơ sở nhưng phiên bản số/chữ (VD: 999.0) không có thật
 * - Trả về 'not_found' khi chuỗi là ngẫu nhiên hoặc xe hoàn toàn không có trong hồ sơ
 */
export function lookupVehicleSpec(
  vehicleName: string,
  brandHint?: string,
  preferredType?: 'motorcycle' | 'car'
): LookupResult {
  const cleanName = vehicleName.trim().toLowerCase();
  const cleanBrand = (brandHint || '').trim().toLowerCase();

  // Từ chối chuỗi quá ngắn hoặc rỗng
  if (cleanName.length < 2) {
    return { status: 'not_found' };
  }

  // Tách các số trong chuỗi người dùng nhập (ví dụ: "999.0", "999", "2.0", "400")
  const rawNumbers = cleanName.match(/\d+(\.\d+)?/g) || [];
  const numbersInInput = rawNumbers.map((n) => n.toLowerCase());

  // 1. TÌM KHỚP CHÍNH XÁC (EXACT MATCH)
  // Nếu người dùng nhập tên khớp tên xe hoặc alias, VÀ mọi số hiệu người dùng gõ đều phải có trong xe đó
  for (const entry of VEHICLE_SPECS_DB) {
    const modelLower = entry.modelName.toLowerCase();
    const entryText = `${modelLower} ${entry.engine.toLowerCase()} ${entry.aliases.join(' ')}`;

    // Kiểm tra xem cleanName có khớp tên model hoặc alias nào không
    const isNameMatch =
      modelLower === cleanName ||
      entry.aliases.some((a) => a === cleanName || cleanName === `${entry.brand.toLowerCase()} ${a}`);

    if (isNameMatch) {
      // Xác minh số hiệu: Nếu người dùng có gõ số, số đó BẮT BUỘC phải tồn tại trong entry này
      const allNumbersMatch =
        numbersInInput.length === 0 ||
        numbersInInput.every((num) => entryText.includes(num));

      if (allNumbersMatch) {
        return { status: 'exact_found', entry };
      }
    }
  }

  // 2. TÌM KHỚP THEO TỪ KHÓA ĐẦY ĐỦ (FULL KEYWORDS MATCH)
  const inputWords = cleanName.split(/\s+/).filter((w) => w.length > 0);
  let bestCandidate: VehicleSpecEntry | null = null;
  let candidateScore = 0;

  for (const entry of VEHICLE_SPECS_DB) {
    const modelLower = entry.modelName.toLowerCase();
    const brandLower = entry.brand.toLowerCase();
    const entryFullText = `${modelLower} ${brandLower} ${entry.engine.toLowerCase()} ${entry.aliases.join(' ')}`;

    // Kiểm tra xem tất cả các từ người dùng gõ có nằm trong entry không
    const allWordsPresent = inputWords.every((w) => entryFullText.includes(w));

    if (allWordsPresent) {
      // Đảm bảo số hiệu không bị lệch
      const numbersMatch =
        numbersInInput.length === 0 ||
        numbersInInput.every((num) => entryFullText.includes(num));

      if (numbersMatch) {
        let score = 80;
        if (cleanBrand && brandLower.includes(cleanBrand)) score += 20;
        if (preferredType && entry.type === preferredType) score += 10;
        if (score > candidateScore) {
          candidateScore = score;
          bestCandidate = entry;
        }
      }
    }
  }

  if (bestCandidate && candidateScore >= 80) {
    return { status: 'exact_found', entry: bestCandidate };
  }

  // 3. KIỂM TRA LỆCH PHIÊN BẢN (VARIANT MISMATCH)
  // Ví dụ người dùng gõ "Innova 999.0", "Wave 9999", "Vios 100"...
  // Tên cơ sở "Innova" hoặc "Wave" có thật, nhưng số 999.0 không tồn tại ở bất kỳ bản nào
  const relatedVariants: VehicleSpecEntry[] = [];
  let detectedBaseModel = '';

  for (const entry of VEHICLE_SPECS_DB) {
    for (const a of entry.aliases) {
      // Nếu alias xuất hiện như 1 từ độc lập trong input (ví dụ 'innova', 'wave', 'vios', 'camry')
      const regex = new RegExp(`\\b${a}\\b`, 'i');
      if (regex.test(cleanName)) {
        if (!detectedBaseModel) {
          detectedBaseModel = entry.modelName.split(' ')[1] || a.toUpperCase();
        }
        if (!relatedVariants.some((v) => v.modelName === entry.modelName)) {
          relatedVariants.push(entry);
        }
        break;
      }
    }
  }

  if (relatedVariants.length > 0) {
    // Có dòng xe cơ sở nhưng số hiệu người dùng gõ không khớp bản nào -> LỆCH PHIÊN BẢN
    return {
      status: 'variant_mismatch',
      baseModel: detectedBaseModel || cleanName,
      suggestions: relatedVariants.slice(0, 4),
    };
  }

  // 4. HOÀN TOÀN KHÔNG TÌM THẤY (Chuỗi ngẫu nhiên hoặc xe lạ)
  return { status: 'not_found' };
}
