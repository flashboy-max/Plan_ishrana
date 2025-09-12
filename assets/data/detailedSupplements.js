// Centralizovani Supplement Data Model - BEZ DUPLIKATA
export const SUPPLEMENTS_DATA = {
    // FASTING PERIOD (prije prvog obroka)
    fasting: {
        'creatine': {
            id: 'creatine',
            name: 'Kreatin (CreGAAtine)',
            brand: 'Generic',
            dosage: '5g',
            frequency: '1x dnevno',
            priority: 2,
            fastingSafe: true,
            breaksFast: false,
            category: 'performance',
            benefits: 'Povećava snagu i mišićnu masu. Poboljšava performanse.',
            notes: 'Piti dosta vode. B-kompleks iz Hydration+ podržava metabolizam.',
            interactions: 'Nema značajnih interakcija, povećaj unos vode',
            minerals: {},
            macros: { protein: 0, fat: 0, carbs: 0 }
        },
        'vitamin-c': {
            id: 'vitamin-c',
            name: 'Vitamin C',
            brand: 'Generic',
            dosage: '500mg',
            frequency: '1x dnevno',
            priority: 3,
            fastingSafe: true,
            breaksFast: false,
            category: 'health',
            benefits: 'Antioksidans, podrška imunitetu, važan za sintezu kolagena.',
            notes: 'Zajedno sa kolagenom za maksimalnu efikasnost.',
            interactions: 'OPREZ: Flex Pro+ i Hydration+ također sadrže Vitamin C',
            minerals: { vitaminC: 500 },
            macros: { protein: 0, fat: 0, carbs: 0 }
        }
    },

    // MEAL 1 (sa prvim obrokom)
    meal1: {
        'flex-pro': {
            id: 'flex-pro',
            name: 'Flex Pro+',
            brand: 'Muscle Freak',
            dosage: '1 doza dnevno',
            frequency: '1x dnevno',
            priority: 1,
            fastingSafe: false,
            breaksFast: true,
            category: 'recovery',
            benefits: 'Sveobuhvatna podrška za zglobove, sadrži kurkumin.',
            notes: 'Uz obrok za najbolju apsorpciju. Kompleksna formula za zglobove.',
            interactions: 'Sadrži vitamin C i cink - prati ukupan unos',
            minerals: { vitaminC: 200, zinc: 5 },
            macros: { protein: 0, fat: 0, carbs: 2 }
        },
        'vitamin-d3': {
            id: 'vitamin-d3',
            name: 'Vitamin D3 + K2',
            brand: 'Generic',
            dosage: '2000 IU D3',
            frequency: '1x dnevno',
            priority: 2,
            fastingSafe: false,
            breaksFast: true,
            category: 'health',
            benefits: 'Koštano zdravlje i imunitet. Važno za apsorpciju kalcijuma.',
            notes: 'Prvi, masniji obrok za najbolju apsorpciju.',
            interactions: 'K2 poboljšava transport kalcijuma u kosti',
            minerals: {},
            macros: { protein: 0, fat: 0, carbs: 0 }
        },
        'omega3': {
            id: 'omega3',
            name: 'Omega-3 (Fish Oil)',
            brand: 'Generic',
            dosage: 'EPA+DHA 1-2g/dan',
            frequency: '1x dnevno',
            priority: 2,
            fastingSafe: false,
            breaksFast: true,
            category: 'health',
            benefits: 'Anti-inflamatorno; važno za tetivu i kardiovaskularno zdravlje.',
            notes: 'Uz obrok za najbolju apsorpciju. Kvalitetno ulje ribe.',
            interactions: 'Može pojačati dejstvo antikoagulasa',
            minerals: {},
            macros: { protein: 0, fat: 2, carbs: 0 }
        }
    },

    // PRE-WORKOUT (30-60 min prije treninga)
    preWorkout: {
        'collagen': {
            id: 'collagen',
            name: 'Kolagen Peptidi',
            brand: 'Applied Nutrition',
            dosage: '10g',
            frequency: '1x dnevno',
            priority: 1,
            fastingSafe: false,
            breaksFast: true,
            category: 'recovery',
            benefits: 'Prioritet #1 za oporavak tetive. Podrška za zglobove i kožu.',
            notes: 'Uzimati 30-60 min prije treninga sa Vitaminom C za bolju sintezu kolagena',
            interactions: 'Sinergija sa Vitamin C, najbolje na prazan stomak',
            minerals: { vitaminC: 100 },
            macros: { protein: 9, fat: 0, carbs: 0 }
        }
    },

    // DURING WORKOUT (tokom treninga)
    duringWorkout: {
        'hydration': {
            id: 'hydration',
            name: 'Hydration+',
            brand: 'Applied Nutrition',
            dosage: '1 kesica u 500ml vode',
            frequency: '1x dnevno',
            priority: 1,
            fastingSafe: false,
            breaksFast: true,
            category: 'performance',
            benefits: 'Prioritet #2 za elektrolite. Sadrži i B-vitamine za energiju.',
            notes: 'Tokom/nakon treninga za optimalni oporavak i hidraciju',
            interactions: 'Sadrži magnesium i vitamin C - uračunaj u dnevnu dozu',
            minerals: { magnesium: 50, vitaminC: 250 },
            macros: { protein: 0, fat: 0, carbs: 8 }
        }
    },

    // POST-WORKOUT (odmah nakon treninga)
    postWorkout: {
        'hydration': {
            id: 'hydration',
            name: 'Hydration+',
            brand: 'Applied Nutrition',
            dosage: '500ml vode',
            frequency: 'Nakon treninga',
            priority: 1,
            fastingSafe: false,
            breaksFast: true,
            category: 'recovery',
            benefits: 'Brza rehidracija nakon treninga. Elektroliti za oporavak.',
            notes: 'Odmah nakon treninga za optimalnu rehidraciju i oporavak.',
            interactions: 'Sadrži magnesium i vitamin C - uračunaj u dnevnu dozu',
            minerals: { magnesium: 50, vitaminC: 250, sodium: 200, potassium: 150 },
            macros: { protein: 0, fat: 0, carbs: 8 }
        },
        'protein': {
            id: 'protein',
            name: 'Whey Protein Isolate',
            brand: 'Generic',
            dosage: '30g',
            frequency: '30min nakon treninga',
            priority: 1,
            fastingSafe: false,
            breaksFast: true,
            category: 'recovery',
            benefits: 'Brz oporavak mišića nakon treninga. Visokokvalitetni protein.',
            notes: 'Uzeti sa vodom ili mlijekom u roku od 30-60min nakon treninga.',
            interactions: 'Nema poznatih interakcija.',
            minerals: {},
            macros: { protein: 25, fat: 1, carbs: 3 }
        }
    },

    // MEAL 2 (sa drugim obrokom)
    meal2: {
        'curcumin': {
            id: 'curcumin',
            name: 'Curcumin',
            brand: 'VAST Sports',
            dosage: '500mg',
            frequency: '1-2x dnevno',
            priority: 2,
            fastingSafe: false,
            breaksFast: true,
            category: 'recovery',
            benefits: 'Snažno antiinflamatorno djelovanje, podrška oporavku.',
            notes: 'Uz obrok sa malo masnoće za bolju apsorpciju.',
            interactions: 'Može pojačati dejstvo antiinflamatornih lijekova',
            minerals: {},
            macros: { protein: 0, fat: 0, carbs: 1 }
        }
    },

    // EVENING (večer, 1h prije spavanja)
    evening: {
        'magnesium': {
            id: 'magnesium',
            name: 'Magnezij',
            brand: 'Generic',
            dosage: '150-300mg',
            frequency: 'rotacija sa ZMA',
            priority: 2,
            fastingSafe: true,
            breaksFast: false,
            category: 'sleep',
            benefits: 'Relaksacija mišića, kvalitetan san, energetski metabolizam.',
            notes: '1h prije spavanja. Rotirati sa ZMA.',
            interactions: 'NE kombinovati sa ZMA iste noći. Može smanjiti apsorpciju cinka',
            minerals: { magnesium: 250 },
            macros: { protein: 0, fat: 0, carbs: 0 }
        }
    },

    // BEDTIME (30-60 min prije spavanja)
    bedtime: {
        'zma': {
            id: 'zma',
            name: 'ZMA Pro',
            brand: 'Generic',
            dosage: 'Prema etiketi',
            frequency: 'rotacija sa magnezij',
            priority: 2,
            fastingSafe: true,
            breaksFast: false,
            category: 'sleep',
            benefits: 'Oporavak mišića, kvalitetan san, hormonalna podrška.',
            notes: '30-60 min prije spavanja na prazan stomak.',
            interactions: 'Rotirati sa solo magnezij. Prazan stomak obavezno',
            minerals: { magnesium: 150, zinc: 15 },
            macros: { protein: 0, fat: 0, carbs: 0 }
        }
    }
};

// Helper funkcije za rad sa podacima
export const getSupplementsByPeriod = (period) => {
    return SUPPLEMENTS_DATA[period] || {};
};

export const getAllSupplements = () => {
    const all = {};
    Object.values(SUPPLEMENTS_DATA).forEach(periodSupplements => {
        Object.assign(all, periodSupplements);
    });
    return all;
};

export const getSupplementById = (id) => {
    const all = getAllSupplements();
    return all[id] || null;
};

// Period informacije
export const PERIOD_INFO = {
    fasting: {
        label: 'Fasting Period',
        time: '07:00-12:30',
        icon: 'fas fa-sun',
        color: 'yellow',
        description: 'Prije prvog obroka'
    },
    meal1: {
        label: 'Meal 1',
        time: '13:30',
        icon: 'fas fa-utensils',
        color: 'green',
        description: 'Sa prvim obrokom'
    },
    preWorkout: {
        label: 'Pre-Workout',
        time: '12:30',
        icon: 'fas fa-dumbbell',
        color: 'orange',
        description: '30-60 min prije treninga'
    },
    duringWorkout: {
        label: 'During Workout',
        time: '14:00-16:00',
        icon: 'fas fa-tint',
        color: 'blue',
        description: 'Tokom treninga'
    },
    postWorkout: {
        label: 'Post-Workout',
        time: '16:00-17:00',
        icon: 'fas fa-check-circle',
        color: 'purple',
        description: 'Nakon treninga'
    },
    meal2: {
        label: 'Meal 2',
        time: '17:30',
        icon: 'fas fa-utensils',
        color: 'teal',
        description: 'Sa drugim obrokom'
    },
    evening: {
        label: 'Evening',
        time: '21:00',
        icon: 'fas fa-moon',
        color: 'indigo',
        description: '1h prije spavanja'
    },
    bedtime: {
        label: 'Bedtime',
        time: '21:30-22:00',
        icon: 'fas fa-bed',
        color: 'gray',
        description: 'Prije spavanja'
    }
};

// Daily limits za praćenje
export const DAILY_LIMITS = {
    magnesium: { max: 400, warning: 350, unit: 'mg' },
    vitaminC: { max: 1000, warning: 800, unit: 'mg' },
    zinc: { max: 40, warning: 35, unit: 'mg' }
};

// Kompatibilnost sa starim kodom
export const detailedSupplements = getAllSupplements();
export const timingPeriods = PERIOD_INFO;
export const dailyLimits = DAILY_LIMITS;

// Eksport za globalni opseg
window.SUPPLEMENTS_DATA = SUPPLEMENTS_DATA;
window.detailedSupplements = detailedSupplements;
window.dailyLimits = DAILY_LIMITS;
window.getSupplementsByPeriod = getSupplementsByPeriod;
window.getAllSupplements = getAllSupplements;
window.getSupplementById = getSupplementById;
window.PERIOD_INFO = PERIOD_INFO;

console.log('[DEBUG] 📡 Globalne funkcije eksportovane:', {
    getSupplementById: typeof window.getSupplementById,
    getAllSupplements: typeof window.getAllSupplements,
    getSupplementsByPeriod: typeof window.getSupplementsByPeriod,
    PERIOD_INFO: typeof window.PERIOD_INFO,
    DAILY_LIMITS: typeof window.DAILY_LIMITS
});
