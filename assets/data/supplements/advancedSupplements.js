// Advanced Supplements Data - Detailed information from suplementi_advanced.md
export const ADVANCED_SUPPLEMENTS_DATA = {
    "cregaatine": {
        id: "cregaatine",
        name: "CreGAAtine",
        brand: "CarnoMed / Applied Bioenergetic Lab",
        priority: "⭐⭐⭐",
        fastingSafe: true,
        category: "Kreatin",

        // Advanced Details
        mechanismOfAction: "GAA (Guanidinoacetna kiselina) je prekursor kreatina. Kombinacija GAA + Kreatin monohidrat omogućava superiornu bioenergetiku mišića i mozga kroz poboljšanu saturaciju kreatinom u ćelijama.",
        drugInteractions: [
            "Hydration+ (bolja saturacija kreatina)",
            "MCT Oil (brža energija)",
            "Vitamin C (bolja apsorpcija)"
        ],
        contraindications: [
            "Bubrežne bolesti (konsultovati lekara)",
            "Dehidracija (povećati unos vode)",
            "Srčane aritmije (oprez)"
        ],
        naturalSources: [
            "Crveno meso (govedina, svinjetina)",
            "Riba (losos, tuna)",
            "Životinjski proizvodi (mleko, sir)"
        ],
        synergisticEffects: [
            "Beta-alanin (smanjuje parestezije)",
            "Taurin (bolja hidracija ćelija)",
            "Kofein (povećana performansa)"
        ],
        advancedDosing: {
            loading: "2 kesice dnevno (2g GAA + 2g kreatin)",
            maintenance: "1-2 kesice dnevno",
            timing: "Pre treninga (30-60min) ili posle treninga",
            cycling: "8 nedelja ON, 4 nedelje OFF"
        },
        expectedEffects: {
            strength: "2-4 nedelje",
            power: "1-2 nedelje",
            cognitive: "4-8 nedelja"
        },
        monitoring: [
            "Kreatinin u krvi (bubrežna funkcija)",
            "Telesna težina (hidracija)",
            "Mišićna snaga (performansa)"
        ]
    },

    "hydration-plus": {
        id: "hydration-plus",
        name: "Hydration+",
        brand: "Applied Nutrition (UK)",
        priority: "⭐⭐⭐",
        fastingSafe: true,
        category: "Elektroliti",

        mechanismOfAction: "Kompleksni elektrolitni sistem sa taurinom i prirodnim hidratacionim agensima. Optimizuje ćelijsku hidraciju i nadoknađuje elektrolite izgubljene znojenjem.",
        drugInteractions: [
            "Kreatin (bolja uptake)",
            "Kofein (povećana hidracija)",
            "Magnezijum (sinergija)"
        ],
        contraindications: [
            "Visok krvni pritisak (umereno zbog natrijuma)",
            "Bubrežne bolesti (ograničiti unos)",
            "Srčane insuficijencije"
        ],
        naturalSources: [
            "Kokosova voda",
            "Sportski napici",
            "Voćni sokovi",
            "Mineralna voda"
        ],
        synergisticEffects: [
            "Kreatin (bolja ćelijska hidracija)",
            "Taurin (neurotransmiterska podrška)",
            "Vitamin C (antioksidativna zaštita)"
        ],
        advancedDosing: {
            loading: "8g (1 kesica) u 500ml vode",
            maintenance: "Po potrebi tokom aktivnosti",
            timing: "Tokom treninga ili po potrebi",
            maxDaily: "24g (3 kesice)"
        },
        expectedEffects: {
            hydration: "Odmah",
            performance: "1-2 nedelje",
            recovery: "Kontinuirano"
        },
        monitoring: [
            "Elektroliti u krvi (Na, K, Mg)",
            "Krvni pritisak",
            "Telesna težina"
        ]
    },

    "collagen": {
        id: "collagen",
        name: "Collagen Peptides",
        brand: "Applied Nutrition (UK)",
        priority: "⭐⭐⭐",
        fastingSafe: false,
        category: "Struktura",

        mechanismOfAction: "Hidrolizovani kolagen tip I stimuliše sintezu kolagena u vezivnom tkivu. Poboljšava integritet kože, zglobova, kostiju i gastrointestinalnog trakta.",
        drugInteractions: [
            "Vitamin C (esencijalan kofaktor)",
            "FLEX PRO (kompletna podrška zglobovima)",
            "Hyaluronska kiselina (sinergija)"
        ],
        contraindications: [
            "Alergija na govedinu",
            "Fenilketonurija (aspartam)",
            "Teške bubrežne bolesti"
        ],
        naturalSources: [
            "Goveđe meso",
            "Riblji kolagen (riba)",
            "Želatin",
            "Kostna supa"
        ],
        synergisticEffects: [
            "Vitamin C (obavezno)",
            "Magnezijum (koštana mineralizacija)",
            "Vitamin D3 (apsorpcija)"
        ],
        advancedDosing: {
            loading: "20g dnevno (2 merice)",
            maintenance: "10-20g dnevno",
            timing: "Uz obrok sa vitaminom C",
            cycling: "Kontinuirano"
        },
        expectedEffects: {
            skin: "4-6 nedelja",
            joints: "8-12 nedelja",
            gut: "2-4 nedelje"
        },
        monitoring: [
            "Kolagen markeri u krvi",
            "Kožna hidratacija",
            "Zglobna pokretljivost"
        ]
    },

    "magnezijum": {
        id: "magnezijum",
        name: "Magnezijum Citrat",
        brand: "IronMaxx (Nemačka)",
        priority: "⭐⭐⭐",
        fastingSafe: true,
        category: "Minerali",

        mechanismOfAction: "Magnezijum citrat je visoko bioraspoloživa forma magnezijuma. Učestvuje u preko 300 enzimskih reakcija, posebno u nervnom sistemu i mišićnoj relaksaciji.",
        drugInteractions: [
            "Vitamin D3 (aktivacija)",
            "Kalcijum (antagonizam)",
            "Cink (kompeticija za apsorpciju)"
        ],
        contraindications: [
            "Bubrežne bolesti",
            "Srčane blokade",
            "Myasthenia gravis"
        ],
        naturalSources: [
            "Tamno lisnato povrće",
            "Orašasti plodovi",
            "Žitarice",
            "Mineralna voda"
        ],
        synergisticEffects: [
            "Vitamin D3 (aktivacija)",
            "Vitamin B6 (transport)",
            "Taurin (relaksacija)"
        ],
        advancedDosing: {
            loading: "300mg dnevno",
            maintenance: "150-300mg dnevno",
            timing: "Uveče, pre spavanja",
            maxDaily: "400mg (zbog gastrointestinalnih efekata)"
        },
        expectedEffects: {
            sleep: "1-3 dana",
            muscles: "1-2 nedelje",
            stress: "2-4 nedelje"
        },
        monitoring: [
            "Magnezijum u serumu",
            "Kalcijum/magnezijum odnos",
            "Gastrointestinalni simptomi"
        ]
    },

    "omega-3": {
        id: "omega-3",
        name: "Omega-3",
        brand: "Muscle Freak",
        priority: "⭐⭐",
        fastingSafe: false,
        category: "EFA",

        mechanismOfAction: "EPA i DHA iz ribljeg ulja smanjuju sistemsku upalu kroz inhibiciju proinflamatornih citokina. Podržavaju kardiovaskularno i kognitivno zdravlje.",
        drugInteractions: [
            "Vitamin D3 (bolja apsorpcija)",
            "Vitamin K2 (antagonizam)",
            "Statini (povećan rizik od krvarenja)"
        ],
        contraindications: [
            "Antikoagulanti (varfarin)",
            "Alergija na ribu",
            "Žučni kamenci"
        ],
        naturalSources: [
            "Masna riba (losos, sardine)",
            "Riblje ulje",
            "Laneno seme",
            "Orašasti plodovi"
        ],
        synergisticEffects: [
            "Vitamin D3 (imunitet)",
            "Koenzim Q10 (antioksidacija)",
            "Astaksantin (antioksidacija)"
        ],
        advancedDosing: {
            loading: "2-3g EPA+DHA dnevno",
            maintenance: "1-2g EPA+DHA dnevno",
            timing: "Uz obrok sa mastima",
            cycling: "Kontinuirano"
        },
        expectedEffects: {
            inflammation: "2-4 nedelje",
            cardiovascular: "6-8 nedelja",
            cognitive: "8-12 nedelja"
        },
        monitoring: [
            "Omega-3 indeks",
            "hsCRP (upalni marker)",
            "Trigliceridi"
        ]
    },

    "d3-k2": {
        id: "d3-k2",
        name: "D3+K2",
        brand: "Muscle Freak",
        priority: "⭐⭐",
        fastingSafe: false,
        category: "Vitamini",

        mechanismOfAction: "Vitamin D3 aktivira kalcijum metabolizam, dok K2 (MK-7) usmerava kalcijum u kosti i zube, sprečavajući kalcifikaciju krvnih sudova.",
        drugInteractions: [
            "Magnezijum (aktivacija D3)",
            "Omega-3 (apsorpcija)",
            "Statini (smanjuju D3)"
        ],
        contraindications: [
            "Hiperkalcemija",
            "Bubrežni kamenci",
            "Sarkoidoza"
        ],
        naturalSources: [
            "Sunčeva svetlost",
            "Masna riba",
            "Životinjska jetra",
            "Fermentisani mlečni proizvodi"
        ],
        synergisticEffects: [
            "Magnezijum (aktivacija)",
            "Cink (imunitet)",
            "Vitamin A (toksičnost prevencija)"
        ],
        advancedDosing: {
            loading: "2000-5000 IU D3 + 100-200mcg K2",
            maintenance: "1000-2000 IU D3 + 50-100mcg K2",
            timing: "Uz obrok sa mastima",
            testing: "Nivo 25-OH D3 svaka 3 meseca"
        },
        expectedEffects: {
            vitaminD: "8-12 nedelja",
            immunity: "2-4 nedelje",
            bones: "6-12 meseci"
        },
        monitoring: [
            "Vitamin D (25-OH)",
            "Kalcijum u krvi",
            "Paratiroidni hormon"
        ]
    },

    "vitamin-c": {
        id: "vitamin-c",
        name: "Vitamin C + Rosehip",
        brand: "Muscle Freak",
        priority: "⭐⭐",
        fastingSafe: false,
        category: "Antioksidans",

        mechanismOfAction: "Vitamin C je moćan antioksidans koji podržava imunitet, sintezu kolagena i regeneraciju vitamina E. Rosehip dodaje antiinflamatorne flavonoide.",
        drugInteractions: [
            "Kolagen (obavezno za sintezu)",
            "Gvožđe (poboljšava apsorpciju)",
            "Cink (imunitet)"
        ],
        contraindications: [
            "Bubrežni kamenci (oksalatni)",
            "Hemochromatosis",
            "G6PD deficiency"
        ],
        naturalSources: [
            "Citrusno voće",
            "Kivi",
            "Paprika",
            "Kupus"
        ],
        synergisticEffects: [
            "Kolagen (sinteza)",
            "Vitamin E (regeneracija)",
            "Selen (antioksidacija)"
        ],
        advancedDosing: {
            loading: "1000-2000mg dnevno",
            maintenance: "500-1000mg dnevno",
            timing: "Uz obrok",
            maxDaily: "2000mg (zbog gastrointestinalnih efekata)"
        },
        expectedEffects: {
            immunity: "1-2 nedelje",
            collagen: "Kontinuirano",
            antioxidant: "Odmah"
        },
        monitoring: [
            "Vitamin C u plazmi",
            "Oksalat u urinu",
            "Imuni markeri"
        ]
    },

    "mct-oil": {
        id: "mct-oil",
        name: "MCT Oil",
        brand: "Sports Research (SAD)",
        priority: "⭐⭐",
        fastingSafe: true,
        category: "Energija",

        mechanismOfAction: "Srednjelančane trigliceride (C8/C10) direktno ulaze u jetru gde se konvertuju u ketone. Obezbeđuju brzi izvor energije za mozak i mišiće.",
        drugInteractions: [
            "Kreatin (brža energija)",
            "NMN (ćelijska energija)",
            "Kofein (stimulacija)"
        ],
        contraindications: [
            "Gastrointestinalne smetnje",
            "Žučni problemi",
            "Dijabetes (pratiti šećer)"
        ],
        naturalSources: [
            "Kokosovo ulje",
            "Palmino jezgro ulje",
            "Mlečni proizvodi"
        ],
        synergisticEffects: [
            "Beta-hidroksibutirat",
            "Kreatin (energetika)",
            "Kofein (mentalna jasnoća)"
        ],
        advancedDosing: {
            loading: "5-15ml dnevno",
            maintenance: "15-30ml dnevno",
            timing: "Jutro ili pre treninga",
            maxDaily: "45ml (zbog gastrointestinalnih efekata)"
        },
        expectedEffects: {
            mental: "15-30 minuta",
            energy: "30-60 minuta",
            ketosis: "2-4 nedelje"
        },
        monitoring: [
            "Ketoni u krvi/urinu",
            "Glikemija",
            "Gastrointestinalni simptomi"
        ]
    },

    "flex-pro": {
        id: "flex-pro",
        name: "FLEX PRO",
        brand: "Muscle Freak",
        priority: "⭐⭐",
        fastingSafe: false,
        category: "Zglobovi",

        mechanismOfAction: "Kompleks glukozamin + hondroitin + MSM + hijaluronska kiselina + đumbir + kurkuma inhibira inflamatorne puteve i podržava obnovu hrskavice.",
        drugInteractions: [
            "Kolagen (sinergija)",
            "Vitamin C (već u formuli)",
            "Omega-3 (antiinflamatorno)"
        ],
        contraindications: [
            "Alergija na školjke",
            "Dijabetes (pratiti šećer)",
            "Antikoagulanti (kurkuma)"
        ],
        naturalSources: [
            "Hondroitin (životinjska hrskavica)",
            "Glukozamin (školjke)",
            "MSM (povrće)",
            "Đumbir (koren)"
        ],
        synergisticEffects: [
            "Kolagen (struktura)",
            "Omega-3 (inflamacija)",
            "Vitamin D3 (kalcijum)"
        ],
        advancedDosing: {
            loading: "11.3g dnevno",
            maintenance: "11.3g dnevno",
            timing: "Uz glavni obrok",
            cycling: "8 nedelja ON, 4 nedelje OFF"
        },
        expectedEffects: {
            inflammation: "2-4 nedelje",
            cartilage: "6-12 meseci",
            mobility: "4-8 nedelja"
        },
        monitoring: [
            "Zglobna pokretljivost",
            "Bol i ukočenost",
            "Inflamatorni markeri"
        ]
    },

    "zma-pro": {
        id: "zma-pro",
        name: "ZMA PRO+",
        brand: "Muscle Freak",
        priority: "⭐",
        fastingSafe: true,
        category: "San/Oporavak",

        mechanismOfAction: "ZMA kompleks sa melatoninom i GABA optimizuje hormonsku ravnotežu tokom noći, poboljšava duboki san i ubrzava oporavak.",
        drugInteractions: [
            "Kalcijum (blokira apsorpciju)",
            "Magnezijum (preklapanje)",
            "Ashwagandha (sinergija)"
        ],
        contraindications: [
            "Problemi sa spavanjem",
            "Depresija",
            "Autoimune bolesti"
        ],
        naturalSources: [
            "Orašasti plodovi (cink)",
            "Žitarice (magnezijum)",
            "Mlečni proizvodi (cink)",
            "Mahunarke (cink)"
        ],
        synergisticEffects: [
            "Ashwagandha (kortizol)",
            "Magnezijum (relaksacija)",
            "Melatonin (ritam)"
        ],
        advancedDosing: {
            loading: "2 kapsule uveče",
            maintenance: "1-2 kapsule uveče",
            timing: "30-60 min pre spavanja, prazan stomak",
            cycling: "Rotirati sa magnezijum citratom"
        },
        expectedEffects: {
            sleep: "1-3 dana",
            recovery: "2-4 nedelje",
            hormones: "4-8 nedelja"
        },
        monitoring: [
            "Testosteron",
            "Kortizol",
            "Melatonin"
        ]
    },

    "ashwagandha": {
        id: "ashwagandha",
        name: "Ashwagandha",
        brand: "Muscle Freak",
        priority: "⭐",
        fastingSafe: true,
        category: "Adaptogen",

        mechanismOfAction: "Ashwagandha (Withania somnifera) modulira HPA osu kroz adaptogene efekte, smanjuje kortizol i poboljšava otpornost na stres.",
        drugInteractions: [
            "ZMA (sinergija za san)",
            "Magnezijum (relaksacija)",
            "Tiroksin (hipotireoza)"
        ],
        contraindications: [
            "Autoimune bolesti",
            "Tireoidni problemi",
            "Trudnoća/dojenje"
        ],
        naturalSources: [
            "Ashwagandha koren",
            "Ginseng",
            "Rhodiola rosea",
            "Sveti baziljak"
        ],
        synergisticEffects: [
            "Magnezijum (relaksacija)",
            "L-teanin (smirenje)",
            "Omega-3 (inflamacija)"
        ],
        advancedDosing: {
            loading: "500-1000mg dnevno",
            maintenance: "300-600mg dnevno",
            timing: "Uveče ili ujutru",
            cycling: "8 nedelja ON, 2-4 nedelje OFF"
        },
        expectedEffects: {
            stress: "2-4 nedelje",
            cortisol: "4-8 nedelje",
            adaptation: "6-12 nedelja"
        },
        monitoring: [
            "Kortizol (jutarnji)",
            "DHEA-S",
            "Tireoidni panel"
        ]
    },

    "nmn": {
        id: "nmn",
        name: "NMN",
        brand: "Muscle Freak",
        priority: "⭐",
        fastingSafe: true,
        category: "Longevity",

        mechanismOfAction: "Nikotinamid mononukleotid je prekursor NAD+, koji je esencijalan za ćelijsku energiju, DNK popravku i mitohondrijalnu funkciju.",
        drugInteractions: [
            "MCT Oil (energetska sinergija)",
            "Kreatin (mitohondrije)",
            "Resveratrol (SIRT1 aktivacija)"
        ],
        contraindications: [
            "Eksperimentalno",
            "Trudnoća/dojenje",
            "Deca i adolescenti"
        ],
        naturalSources: [
            "Broccoli",
            "Kupus",
            "Avokado",
            "Edamame"
        ],
        synergisticEffects: [
            "Resveratrol",
            "Quercetin",
            "Fisetin"
        ],
        advancedDosing: {
            loading: "500-1000mg dnevno",
            maintenance: "300-600mg dnevno",
            timing: "Ujutru natašte",
            cycling: "Kontinuirano"
        },
        expectedEffects: {
            energy: "4-8 nedelja",
            metabolism: "8-12 nedelja",
            antiaging: "6-12 meseci"
        },
        monitoring: [
            "NAD+ nivoi",
            "Mitohondrijalna funkcija",
            "Biomarkeri starenja"
        ]
    },

    // Whey Protein Isolate
    "whey-protein": {
        id: "whey-protein",
        name: "Whey Protein Isolate",
        brand: "Various Brands",
        priority: "⭐",
        fastingSafe: true,
        category: "Protein",

        mechanismOfAction: "Whey protein isolate je visoko kvalitetan protein sa brzom apsorpcijom. Sadrži sve esencijalne aminokiseline, posebno leucin koji stimuliše sintezu mišićnih proteina.",
        drugInteractions: [
            "Kreatin (bolja apsorpcija)",
            "Vitamin D (bolja iskoristivost)",
            "ZMA (oporavak mišića)"
        ],
        contraindications: [
            "Alergija na mlečne proteine",
            "Fenilketonurija (zbog aspartama)",
            "Teška bubrežna insuficijencija"
        ],
        naturalSources: [
            "Mleko",
            "Sir",
            "Jogurt",
            "Mlečni proizvodi"
        ],
        synergisticEffects: [
            "Kreatin monohidrat",
            "Beta-alanin",
            "Glutamin"
        ],
        advancedDosing: {
            loading: "20-40g nakon treninga",
            maintenance: "20-30g dnevno",
            timing: "Nakon treninga ili kao obrok",
            maxDaily: "50g"
        },
        expectedEffects: {
            muscle: "2-4 nedelje",
            recovery: "1-2 nedelje",
            strength: "4-6 nedelja"
        },
        monitoring: [
            "Tjelesna težina",
            "Mišićna masa",
            "Nivo proteina u krvi"
        ]
    },

    // Ashwagandha
    "ashwagandha": {
        id: "ashwagandha",
        name: "Ashwagandha",
        brand: "Various Brands",
        priority: "⭐",
        fastingSafe: true,
        category: "Adaptogen",

        mechanismOfAction: "Ashwagandha je adaptogen koji pomaže tijelu da se nosi sa stresom. Smanjuje kortizol, poboljšava funkciju štitne žlezde i ima anti-anksiozni efekat.",
        drugInteractions: [
            "Sedativi (pojačava efekat)",
            "Imunosupresivi (može interferirati)",
            "Tiroksin (utiče na štitnu žlezdu)"
        ],
        contraindications: [
            "Trudnoća i dojenje",
            "Autoimune bolesti",
            "Operacije (sedativni efekat)"
        ],
        naturalSources: [
            "Ashwagandha korijen",
            "Ginseng",
            "Rhodiola rosea",
            "Sveti bazilika"
        ],
        synergisticEffects: [
            "Magnezij",
            "Vitamin B kompleks",
            "Omega-3 masne kiseline"
        ],
        advancedDosing: {
            loading: "600-1000mg dnevno",
            maintenance: "300-600mg dnevno",
            timing: "Uveče, 1-2h prije spavanja",
            maxDaily: "1000mg"
        },
        expectedEffects: {
            stress: "2-4 nedelje",
            sleep: "1-2 nedelje",
            cortisol: "4-6 nedelja"
        },
        monitoring: [
            "Nivo kortizola",
            "Kvalitet sna",
            "Stres nivoi"
        ]
    },

    // MCT Oil
    "mct-oil": {
        id: "mct-oil",
        name: "MCT Oil C8",
        brand: "Various Brands",
        priority: "⭐",
        fastingSafe: true,
        category: "Energy",

        mechanismOfAction: "MCT ulje se direktno apsorbuje u jetru i pretvara u ketone. C8 varijanta je najefikasnija jer najbrže prelazi krvno-moždanu barijeru.",
        drugInteractions: [
            "Kofein (pojačava energiju)",
            "Kreatin (bolja iskoristivost)",
            "Vitamin D (bolja apsorpcija)"
        ],
        contraindications: [
            "Gallstones",
            "Liver disease",
            "Pancreatitis",
            "Digestive issues"
        ],
        naturalSources: [
            "Kokosovo ulje",
            "Palmino ulje",
            "Mlečni proizvodi"
        ],
        synergisticEffects: [
            "Kofein",
            "L-karnitin",
            "Vitamin B kompleks"
        ],
        advancedDosing: {
            loading: "1 kašičica (5ml) dnevno",
            maintenance: "1-2 kašičice (5-10ml) dnevno",
            timing: "Ujutru ili prije treninga",
            maxDaily: "2 kašičice (10ml)"
        },
        expectedEffects: {
            energy: "1-2 dana",
            ketones: "1-3 dana",
            mental: "1-7 dana"
        },
        monitoring: [
            "Ketone nivoi",
            "Energija i fokus",
            "Digestivni simptomi"
        ]
    }
};

// Export for global access
if (typeof window !== 'undefined') {
    window.ADVANCED_SUPPLEMENTS_DATA = ADVANCED_SUPPLEMENTS_DATA;
}