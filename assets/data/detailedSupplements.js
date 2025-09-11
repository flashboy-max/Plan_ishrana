// Detaljni supplement podaci sa kompletnim informacijama
export const detailedSupplements = {
    'collagen': {
        name: 'Kolagen Peptidi',
        brand: 'Applied Nutrition',
        dose: '10g',
        timing: ['pre-workout'],
        timeSlots: ['12:30'],
        frequency: '1x dnevno',
        priority: 1,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 9, fat: 0, carbs: 0 },
        minerals: { vitaminC: 100 },
        benefits: 'Prioritet #1 za oporavak tetive. Podrška za zglobove i kožu.',
        notes: 'Uzimati 30-60 min prije treninga sa Vitaminom C za bolju sintezu kolagena',
        interactions: 'Sinergija sa Vitamin C, najbolje na prazan stomak',
        category: 'recovery'
    },
    'hydration': {
        name: 'Hydration+',
        brand: 'Applied Nutrition',
        dose: '1 kesica u 500ml vode',
        timing: ['during-workout', 'post-workout'],
        timeSlots: ['14:00-16:00'],
        frequency: '1x dnevno',
        priority: 1,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 0, fat: 0, carbs: 8 },
        minerals: { magnesium: 50, vitaminC: 250 },
        benefits: 'Prioritet #2 za elektrolite. Sadrži i B-vitamine za energiju.',
        notes: 'Tokom/nakon treninga za optimalni oporavak i hidraciju',
        interactions: 'Sadrži magnesium i vitamin C - uračunaj u dnevnu dozu',
        category: 'performance'
    },
    'flex-pro': {
        name: 'Flex Pro+',
        brand: 'Muscle Freak',
        dose: '1 doza dnevno',
        timing: ['meal'],
        timeSlots: ['13:30', '17:30'],
        frequency: '1x dnevno',
        priority: 1,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 0, fat: 0, carbs: 2 },
        minerals: { vitaminC: 200, zinc: 5 },
        benefits: 'Prioritet #3. Sveobuhvatna podrška za zglobove, sadrži kurkumin.',
        notes: 'Uz obrok za najbolju apsorpciju. Kompleksna formula za zglobove.',
        interactions: 'Sadrži vitamin C i cink - prati ukupan unos',
        category: 'recovery'
    },
    'creatine': {
        name: 'Kreatin (CreGAAtine)',
        brand: 'Generic',
        dose: '5g',
        timing: ['flexible'],
        timeSlots: ['bilo kada'],
        frequency: '1x dnevno',
        priority: 2,
        fastingSafe: true,
        breaksFast: false,
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: {},
        benefits: 'Povećava snagu i mišićnu masu. Poboljšava performanse.',
        notes: 'Piti dosta vode. B-kompleks iz Hydration+ podržava metabolizam.',
        interactions: 'Nema značajnih interakcija, povećaj unos vode',
        category: 'performance'
    },
    'omega3': {
        name: 'Omega-3 (Fish Oil)',
        brand: 'Generic',
        dose: 'EPA+DHA 1-2g/dan',
        timing: ['meal'],
        timeSlots: ['13:30', '17:30'],
        frequency: '1x dnevno',
        priority: 2,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 0, fat: 2, carbs: 0 },
        minerals: {},
        benefits: 'Anti-inflamatorno; važno za tetivu i kardiovaskularno zdravlje.',
        notes: 'Uz obrok za najbolju apsorpciju. Kvalitetno ulje ribe.',
        interactions: 'Može pojačati dejstvo antikoagulasa',
        category: 'health'
    },
    'vitamin-d3': {
        name: 'Vitamin D3 + K2',
        brand: 'Generic',
        dose: '2000 IU D3',
        timing: ['meal'],
        timeSlots: ['13:30'],
        frequency: '1x dnevno',
        priority: 2,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: {},
        benefits: 'Koštano zdravlje i imunitet. Važno za apsorpciju kalcijuma.',
        notes: 'Prvi, masniji obrok za najbolju apsorpciju.',
        interactions: 'K2 poboljšava transport kalcijuma u kosti',
        category: 'health'
    },
    'vitamin-c': {
        name: 'Vitamin C',
        brand: 'Generic',
        dose: '500mg',
        timing: ['pre-workout'],
        timeSlots: ['12:30'],
        frequency: '1x dnevno',
        priority: 3,
        fastingSafe: true,
        breaksFast: false,
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { vitaminC: 500 },
        benefits: 'Antioksidans, podrška imunitetu, važan za sintezu kolagena.',
        notes: 'Zajedno sa kolagenom za maksimalnu efikasnost.',
        interactions: 'OPREZ: Flex Pro+ i Hydration+ također sadrže Vitamin C',
        category: 'health'
    },
    'magnesium': {
        name: 'Magnezij',
        brand: 'Generic',
        dose: '150-300mg',
        timing: ['evening'],
        timeSlots: ['21:00'],
        frequency: 'rotacija sa ZMA',
        priority: 2,
        fastingSafe: true,
        breaksFast: false,
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { magnesium: 250 },
        benefits: 'Relaksacija mišića, kvalitetan san, energetski metabolizam.',
        notes: '1h prije spavanja. Rotirati sa ZMA.',
        interactions: 'NE kombinovati sa ZMA iste noći. Može smanjiti apsorpciju cinka',
        category: 'sleep'
    },
    'zma': {
        name: 'ZMA Pro',
        brand: 'Generic',
        dose: 'Prema etiketi',
        timing: ['evening'],
        timeSlots: ['21:30'],
        frequency: 'rotacija sa magnezij',
        priority: 2,
        fastingSafe: true,
        breaksFast: false,
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { magnesium: 150, zinc: 15 },
        benefits: 'Oporavak mišića, kvalitetan san, hormonalna podrška.',
        notes: '30-60 min prije spavanja na prazan stomak.',
        interactions: 'Rotirati sa solo magnezij. Prazan stomak obavezno',
        category: 'sleep'
    },
    'curcumin': {
        name: 'Curcumin',
        brand: 'VAST Sports',
        dose: '500mg',
        timing: ['meal'],
        timeSlots: ['13:30', '17:30'],
        frequency: '1-2x dnevno',
        priority: 2,
        fastingSafe: false,
        breaksFast: true,
        macros: { protein: 0, fat: 0, carbs: 1 },
        minerals: {},
        benefits: 'Snažno antiinflamatorno djelovanje, podrška oporavku.',
        notes: 'Uz obrok sa malo masnoće za bolju apsorpciju.',
        interactions: 'Može pojačati dejstvo antiinflamatornih lijekova',
        category: 'recovery'
    }
};

// Supplement interakcije i upozorenja
export const supplementInteractions = {
    'magnesium': {
        conflicts: ['calcium', 'zinc'],
        warning: 'Može smanjiti apsorpciju cinka i kalcijuma ako se uzima istovremeno'
    },
    'vitaminC': {
        conflicts: ['iron'],
        warning: 'Prati ukupan dnevni unos - više suplemenata sadrži vitamin C',
        dailyLimit: 1000
    },
    'zinc': {
        conflicts: ['copper', 'iron', 'magnesium'],
        warning: 'Može smanjiti apsorpciju bakra i gvožđa',
        dailyLimit: 40
    }
};

// Timing periodi sa opisima
export const timingPeriods = {
    'morning': {
        label: 'Jutro',
        times: ['07:00-09:00'],
        icon: 'fas fa-sun',
        color: 'yellow',
        description: 'Na prazan stomak ili sa prvim obrokom'
    },
    'pre-workout': {
        label: 'Pre Treninga',
        times: ['12:30'],
        icon: 'fas fa-dumbbell',
        color: 'orange',
        description: '30-60 minuta prije treninga'
    },
    'during-workout': {
        label: 'Tokom Treninga',
        times: ['14:00-16:00'],
        icon: 'fas fa-tint',
        color: 'blue',
        description: 'Tokom treninškega perioda'
    },
    'post-workout': {
        label: 'Nakon Treninga',
        times: ['16:00-17:00'],
        icon: 'fas fa-check-circle',
        color: 'green',
        description: 'Odmah nakon treninga'
    },
    'meal': {
        label: 'Sa Hranom',
        times: ['13:30', '17:30'],
        icon: 'fas fa-utensils',
        color: 'purple',
        description: 'Uz glavni obrok'
    },
    'evening': {
        label: 'Večer',
        times: ['21:00-22:00'],
        icon: 'fas fa-moon',
        color: 'indigo',
        description: 'Prije spavanja'
    },
    'flexible': {
        label: 'Fleksibilno',
        times: ['bilo kada'],
        icon: 'fas fa-clock',
        color: 'gray',
        description: 'Bilo koje vrijeme tokom dana'
    }
};

// Daily dose limiti
export const dailyLimits = {
    magnesium: { max: 400, warning: 350, unit: 'mg' },
    vitaminC: { max: 1000, warning: 800, unit: 'mg' },
    zinc: { max: 40, warning: 35, unit: 'mg' }
};
