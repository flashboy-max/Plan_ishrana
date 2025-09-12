// Supplement Timing Planner Data
export const supplementPlan = [
    {
        id: "hydration",
        name: "Hydration+ (Applied Nutrition)",
        dose: "1 kesica (8g)",
        timing: ["fasting", "pre-workout", "post-workout"],
        breaksFast: false,
        priority: 1,
        timeSlots: ["07:00", "pred trening", "post trening"],
        notes: "Elektroliti (K, Mg, Ca, Aquamin™). 1-2x/dan; više samo uz veliko znojenje.",
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { magnesium: 56.25, vitaminC: 80 }
    },
    {
        id: "collagen",
        name: "Keto Collagen (Applied Nutrition)",
        dose: "1 mjerica (~13g)",
        timing: ["meal1", "pre-workout"],
        breaksFast: true,
        priority: 1,
        timeSlots: ["13:00", "pred trening"],
        macros: { protein: 9, fat: 3, carbs: 0 },
        notes: "Kolagen + MCT. Računaj 3g masti + 9g proteina po serviranju; uz 500mg vit. C.",
        minerals: { vitaminC: 0 }
    },
    {
        id: "curcumin",
        name: "Curcumin 500 PRO (VAST Sports)",
        dose: "500mg + piperin",
        timing: ["meal1"],
        breaksFast: true,
        priority: 2,
        timeSlots: ["13:00"],
        notes: "C3 Complex® + BioPerine®; uz masniji obrok za apsorpciju.",
        macros: { protein: 0, fat: 0, carbs: 0 }
    },
    {
        id: "creatine",
        name: "Kreatin (CreGAAtine/Mono)",
        dose: "5g",
        timing: ["any"],
        breaksFast: false,
        priority: 1,
        timeSlots: ["bilo kada"],
        notes: "Svaki dan, vrijeme manje važno. Dosljednost > timing.",
        macros: { protein: 0, fat: 0, carbs: 0 }
    },
    {
        id: "omega3",
        name: "Omega-3 (Fish Oil)",
        dose: "EPA+DHA 1-2g",
        timing: ["meal1", "meal2"],
        breaksFast: true,
        priority: 2,
        timeSlots: ["13:00", "17:30"],
        notes: "Uz obrok za bolju apsorpciju.",
        macros: { protein: 0, fat: 1, carbs: 0 }
    },
    {
        id: "d3k2",
        name: "Vitamin D3+K2",
        dose: "D3 2000 IU",
        timing: ["meal1"],
        breaksFast: true,
        priority: 2,
        timeSlots: ["13:00"],
        notes: "Uz masniji obrok za apsorpciju.",
        macros: { protein: 0, fat: 0, carbs: 0 }
    },
    {
        id: "magnesium",
        name: "Magnezij (Glicinat/Citrat)",
        dose: "150-300mg",
        timing: ["pre-sleep"],
        breaksFast: false,
        priority: 1,
        timeSlots: ["22:00"],
        notes: "Ne iste noći sa ZMA. 30-60 min prije sna.",
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { magnesium: 225 }
    },
    {
        id: "zma",
        name: "ZMA Pro",
        dose: "prema etiketi",
        timing: ["pre-sleep"],
        breaksFast: false,
        priority: 2,
        timeSlots: ["22:00"],
        notes: "Rotiraj sa solo Mg; prazan stomak. 2-3h od kalcijuma.",
        macros: { protein: 0, fat: 0, carbs: 0 },
        minerals: { magnesium: 200, zinc: 15 }
    },
    {
        id: "whey",
        name: "Whey Protein Isolate",
        dose: "1 mjerica",
        timing: ["post-workout", "meal2"],
        breaksFast: true,
        priority: 3,
        timeSlots: ["post trening", "17:30"],
        notes: "Po potrebi da ispoštuješ dnevni protein cilj.",
        macros: { protein: 25, fat: 0, carbs: 1 }
    },
    {
        id: "ashwagandha",
        name: "Ashwagandha",
        dose: "300-600mg",
        timing: ["evening"],
        breaksFast: false,
        priority: 3,
        timeSlots: ["21:00"],
        notes: "Opciono za stres/san. Uveče za bolje djelovanje.",
        macros: { protein: 0, fat: 0, carbs: 0 }
    }
];

// Daily dose limits and warnings
export const dailyLimits = {
    magnesium: { max: 400, warning: 350, unit: "mg" },
    vitaminC: { max: 1000, warning: 800, unit: "mg" },
    zinc: { max: 40, warning: 30, unit: "mg" }
};

// Time periods for grouping
export const timePeriods = {
    fasting: { label: "Tokom posta", times: ["07:00-13:00"], color: "emerald" },
    "pre-workout": { label: "Pred trening", times: ["variabilan"], color: "blue" },
    meal1: { label: "Prvi obrok", times: ["13:00"], color: "orange" },
    meal2: { label: "Drugi obrok", times: ["17:30"], color: "orange" },
    "post-workout": { label: "Post trening", times: ["variabilan"], color: "purple" },
    evening: { label: "Uveče", times: ["21:00"], color: "indigo" },
    "pre-sleep": { label: "Prije sna", times: ["22:00"], color: "gray" },
    any: { label: "Bilo kada", times: ["fleksibilno"], color: "cyan" }
};
