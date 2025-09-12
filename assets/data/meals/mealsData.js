// mealsData.js - Strukturirani podaci za keto obroce
export const MEALS_DATA = {
    1: {
        obrok1: {
            name: "4 Jaja + Avokado + Špinat",
            time: "13:00",
            calories: 850,
            macros: { protein: 35, fat: 60, carbs: 8, percentages: "16% P, 64% F, 4% C" },
            prepTime: "10 min",
            portion: "~400g",
            ingredients: [
                { item: "4 velika jaja", details: "280 kcal, 24g proteina" },
                { item: "½ avokada (100g)", details: "160 kcal, 15g masti" },
                { item: "100g svježeg špinata", details: "25 kcal, 3g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati špinat i avokado",
                "Izrezati avokado na kockice",
                "U tavi zagrijati maslinovo ulje",
                "Dodati jaja i špinat, kuhati 3-4 minuta",
                "Dodati avokado na kraju, začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: [
                {
                    name: "Losos + Jaja + Salata",
                    calories: 780,
                    macros: { protein: 40, fat: 45, carbs: 6 },
                    benefits: "Više omega-3, manje zasićenih masti",
                    ingredients: ["150g dimljenog lososa", "2 jaja", "miješana salata", "maslinovo ulje"]
                },
                {
                    name: "Omlet Deluxe",
                    calories: 720,
                    macros: { protein: 35, fat: 25, carbs: 8 },
                    benefits: "Više kalcijuma, manje masti",
                    ingredients: ["4 jaja", "šampinjoni", "špinat", "30g feta sira"]
                }
            ]
        },
        obrok2: {
            name: "Piletina + Brokoli + Maslinovo Ulje",
            time: "17:30",
            calories: 750,
            macros: { protein: 45, fat: 35, carbs: 12, percentages: "24% P, 42% F, 6% C" },
            prepTime: "20 min",
            portion: "~450g",
            ingredients: [
                { item: "200g pilećih grudi", details: "330 kcal, 62g proteina" },
                { item: "300g brokoli", details: "90 kcal, 9g proteina, 12g UH" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati i isjeckati brokoli",
                "Pileću grudi isjeckati na kockice",
                "U tavi zagrijati maslinovo ulje",
                "Dodati piletinu, začiniti i kuhati 8-10 minuta",
                "Dodati brokoli, kuhati još 5-7 minuta"
            ],
            supplements: ["Kreatin"],
            alternatives: [
                {
                    name: "Govedina + Karfiol Pire",
                    calories: 780,
                    macros: { protein: 50, fat: 40, carbs: 8 },
                    benefits: "Više željeza i cinka",
                    ingredients: ["220g junećeg mesa", "250g karfiol pire", "pavlaka"]
                },
                {
                    name: "Losos + Povrće",
                    calories: 720,
                    macros: { protein: 42, fat: 38, carbs: 10 },
                    benefits: "Antiinflamatorno djelovanje",
                    ingredients: ["200g lososa", "miješano povrće", "maslinovo ulje"]
                }
            ]
        }
    },
    2: {
        obrok1: {
            name: "Losos + Jaja + Salata",
            time: "13:00",
            calories: 780,
            macros: { protein: 40, fat: 45, carbs: 6, percentages: "21% P, 52% F, 3% C" },
            prepTime: "10 min",
            portion: "~350g",
            ingredients: [
                { item: "150g dimljenog lososa", details: "320 kcal, 30g proteina" },
                { item: "2 velika jaja", details: "140 kcal, 12g proteina" },
                { item: "100g miješane salate", details: "20 kcal, 2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati salatu i iscijediti limun",
                "Izrezati losos na tanke kriške",
                "Kuhati jaja po želji",
                "Pomiješati sve sastojke"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "4 Jaja + Avokado + Špinat",
                    calories: 850,
                    macros: { protein: 35, fat: 60, carbs: 8 },
                    benefits: "Više masti, zasićeniji obrok",
                    ingredients: ["4 jaja", "½ avokada", "špinat", "maslinovo ulje"]
                }
            ]
        },
        obrok2: {
            name: "Govedina + Karfiol Pire + Pavlaka",
            time: "17:30",
            calories: 780,
            macros: { protein: 50, fat: 40, carbs: 8, percentages: "26% P, 46% F, 4% C" },
            prepTime: "25 min",
            portion: "~470g",
            ingredients: [
                { item: "220g junećeg mesa", details: "400 kcal, 45g proteina" },
                { item: "250g karfiol pire", details: "60 kcal, 5g proteina" },
                { item: "2 kašike pavlake", details: "100 kcal, 10g masti" }
            ],
            instructions: [
                "Karfiol skuhati i napraviti pire",
                "Govedinu isjeckati i propržiti",
                "Dodati pavlaku u pire",
                "Složiti zajedno"
            ],
            supplements: ["ZMA kompleks"],
            alternatives: [
                {
                    name: "Piletina + Brokoli + Maslinovo Ulje",
                    calories: 750,
                    macros: { protein: 45, fat: 35, carbs: 12 },
                    benefits: "Manje zasićenih masti",
                    ingredients: ["200g piletine", "300g brokoli", "maslinovo ulje"]
                }
            ]
        }
    },
    3: {
        obrok1: {
            name: "Losos + Jaja + Salata",
            time: "13:00",
            calories: 780,
            macros: { protein: 40, fat: 45, carbs: 6, percentages: "21% P, 52% F, 3% C" },
            prepTime: "10 min",
            portion: "~350g",
            ingredients: [
                { item: "150g dimljenog lososa", details: "320 kcal, 30g proteina" },
                { item: "2 velika jaja", details: "140 kcal, 12g proteina" },
                { item: "100g miješane salate", details: "20 kcal, 2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati salatu i iscijediti limun",
                "Izrezati losos na tanke kriške",
                "Kuhati jaja po želji",
                "Pomiješati sve sastojke"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "4 Jaja + Avokado + Špinat",
                    calories: 850,
                    macros: { protein: 35, fat: 60, carbs: 8 },
                    benefits: "Više masti, zasićeniji obrok",
                    ingredients: ["4 jaja", "½ avokada", "špinat", "maslinovo ulje"]
                }
            ]
        },
        obrok2: {
            name: "Govedina + Karfiol Pire + Pavlaka",
            time: "17:30",
            calories: 780,
            macros: { protein: 50, fat: 40, carbs: 8, percentages: "26% P, 46% F, 4% C" },
            prepTime: "25 min",
            portion: "~470g",
            ingredients: [
                { item: "220g junećeg mesa", details: "400 kcal, 45g proteina" },
                { item: "250g karfiol pire", details: "60 kcal, 5g proteina" },
                { item: "2 kašike pavlake", details: "100 kcal, 10g masti" }
            ],
            instructions: [
                "Karfiol skuhati i napraviti pire",
                "Govedinu isjeckati i propržiti",
                "Dodati pavlaku u pire",
                "Složiti zajedno"
            ],
            supplements: ["ZMA kompleks"],
            alternatives: [
                {
                    name: "Piletina + Brokoli + Maslinovo Ulje",
                    calories: 750,
                    macros: { protein: 45, fat: 35, carbs: 12 },
                    benefits: "Manje zasićenih masti",
                    ingredients: ["200g piletine", "300g brokoli", "maslinovo ulje"]
                }
            ]
        }
    },
    4: {
        obrok1: {
            name: "Keto English Breakfast",
            time: "13:00",
            calories: 780,
            macros: { protein: 35, fat: 60, carbs: 8, percentages: "18% P, 69% F, 4% C" },
            prepTime: "15 min",
            portion: "~350g",
            ingredients: [
                { item: "3 velika jaja (poširana)", details: "210 kcal, 18g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina, 32g masti" },
                { item: "100g šampinjona", details: "25 kcal, 3g proteina" },
                { item: "100g cherry rajčice", details: "20 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati tavu sa maslinovim uljem",
                "Dodati šampinjone i cherry rajčice, kuhati 5 minuta",
                "Dodati slaninu, pržiti do hrskave",
                "Poširati jaja u zasebnoj posudi",
                "Složiti zajedno i začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: [
                {
                    name: "Mediterranean Omlet",
                    calories: 650,
                    macros: { protein: 32, fat: 50, carbs: 6 },
                    benefits: "Više povrća, manje zasićenih masti",
                    ingredients: ["4 jaja", "50g feta", "masline", "rukvica", "cherry rajčice"]
                }
            ]
        },
        obrok2: {
            name: "Mediterranean Losos",
            time: "17:30",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 8, percentages: "25% P, 63% F, 5% C" },
            prepTime: "25 min",
            portion: "~380g",
            ingredients: [
                { item: "200g svježeg lososa", details: "350 kcal, 40g proteina" },
                { item: "150g tikvice", details: "30 kcal, 2g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "30g feta sira", details: "75 kcal, 4g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Isjeckati tikvice i masline",
                "Začiniti lososa origanom i maslinovim uljem",
                "Peći lososa 15 minuta",
                "Dodati tikvice i masline u posljednjih 10 minuta",
                "Poslužiti sa fetom"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "Biftek sa Pesto Povrćem",
                    calories: 750,
                    macros: { protein: 48, fat: 55, carbs: 8 },
                    benefits: "Više proteina, gurmanski ukus",
                    ingredients: ["180g bifteka", "brokoli", "pesto", "pine nuts"]
                }
            ]
        }
    },
    5: {
        obrok1: {
            name: "Mediterranean Omlet",
            time: "13:00",
            calories: 650,
            macros: { protein: 32, fat: 50, carbs: 6, percentages: "20% P, 69% F, 4% C" },
            prepTime: "12 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "50g feta sira", details: "130 kcal, 7g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "50g cherry rajčice", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Izlupati jaja u posudu",
                "Dodati isjeckane masline, rukvicu i rajčice",
                "Usuti u zagrijanu tavu sa maslinovim uljem",
                "Kuhati na srednjoj temperaturi 3-4 minuta",
                "Dodati feta sir i sklopiti omlet",
                "Kuhati još 2-3 minuta"
            ],
            supplements: ["Vitamin C", "Omega-3"],
            alternatives: [
                {
                    name: "Keto English Breakfast",
                    calories: 780,
                    macros: { protein: 35, fat: 60, carbs: 8 },
                    benefits: "Više proteina, tradicionalni ukus",
                    ingredients: ["3 jaja", "4 trake slanine", "šampinjoni", "cherry rajčice"]
                }
            ]
        },
        obrok2: {
            name: "Biftek sa Pesto Povrćem",
            time: "17:30",
            calories: 750,
            macros: { protein: 48, fat: 55, carbs: 8, percentages: "26% P, 66% F, 4% C" },
            prepTime: "20 min",
            portion: "~350g",
            ingredients: [
                { item: "180g bifteka (goveđeg)", details: "380 kcal, 42g proteina" },
                { item: "200g brokoli", details: "60 kcal, 6g proteina" },
                { item: "2 kašike pesto", details: "160 kcal, 16g masti" },
                { item: "20g pine nuts", details: "130 kcal, 13g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Pržiti biftek 3-4 minuta sa svake strane",
                "Kuhati brokoli na pari 8-10 minuta",
                "Pomiješati pesto sa pine nuts",
                "Složiti zajedno"
            ],
            supplements: ["Vitamin C", "ZMA kompleks"],
            alternatives: [
                {
                    name: "Mediterranean Losos",
                    calories: 680,
                    macros: { protein: 42, fat: 48, carbs: 8 },
                    benefits: "Više omega-3, zdraviji profil",
                    ingredients: ["200g lososa", "tikvice", "masline", "feta"]
                }
            ]
        }
    },
    6: {
        obrok1: {
            name: "Avokado Toast (bez hleba!)",
            time: "13:00",
            calories: 720,
            macros: { protein: 30, fat: 58, carbs: 8, percentages: "17% P, 72% F, 4% C" },
            prepTime: "10 min",
            portion: "~300g",
            ingredients: [
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "½ avokada (100g)", details: "160 kcal, 15g masti" },
                { item: "50g halloumi sira (pržen)", details: "160 kcal, 10g proteina" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Pržiti halloumi sir u maslinovom ulju do zlatne boje",
                "Poširati jaja",
                "Izrezati avokado na kriške",
                "Složiti: avokado kao 'hleba', sir i jaja kao 'namaz'",
                "Dodati rukvicu i začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: [
                {
                    name: "Skandinavski Losos",
                    calories: 680,
                    macros: { protein: 38, fat: 52, carbs: 5 },
                    benefits: "Više omega-3, tradicionalni ukus",
                    ingredients: ["120g lososa", "krem sir", "kaperi", "crveni luk"]
                }
            ]
        },
        obrok2: {
            name: "Punjena Piletina",
            time: "17:30",
            calories: 680,
            macros: { protein: 52, fat: 44, carbs: 6, percentages: "31% P, 58% F, 4% C" },
            prepTime: "30 min",
            portion: "~320g",
            ingredients: [
                { item: "200g pilećih grudi", details: "330 kcal, 62g proteina" },
                { item: "100g špinata", details: "25 kcal, 3g proteina" },
                { item: "50g krem sira", details: "150 kcal, 15g masti" },
                { item: "30g sušenih rajčica", details: "25 kcal, 0.2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Napraviti rez u pilećoj grudi",
                "Pomiješati špinat, krem sir i sušene rajčice",
                "Napuniti piletinu",
                "Pržiti u maslinovom ulju 15-20 minuta",
                "Poslužiti sa začinima"
            ],
            supplements: ["Kreatin", "Vitamin C"],
            alternatives: [
                {
                    name: "Tuna Nicoise Salad",
                    calories: 580,
                    macros: { protein: 38, fat: 42, carbs: 8 },
                    benefits: "Svježiji obrok, manje kuhanja",
                    ingredients: ["150g tune", "1 jaje", "masline", "salata"]
                }
            ]
        }
    },
    7: {
        obrok1: {
            name: "Skandinavski Losos",
            time: "13:00",
            calories: 680,
            macros: { protein: 38, fat: 52, carbs: 5, percentages: "22% P, 69% F, 3% C" },
            prepTime: "5 min",
            portion: "~280g",
            ingredients: [
                { item: "120g dimljenog lososa", details: "250 kcal, 28g proteina" },
                { item: "50g krem sira", details: "150 kcal, 15g masti" },
                { item: "20g kaperi", details: "5 kcal, 0.5g proteina" },
                { item: "30g crvenog luka", details: "15 kcal, 0.5g proteina" },
                { item: "1 jaje (kuvano)", details: "70 kcal, 6g proteina" }
            ],
            instructions: [
                "Namazati krem sir na tanjir",
                "Dodati dimljenog lososa",
                "Ukrasiti kaperima, lukom i kuvanim jajetom",
                "Začiniti koprom i limunovim sokom"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "Avokado Toast",
                    calories: 720,
                    macros: { protein: 30, fat: 58, carbs: 8 },
                    benefits: "Više povrća, moderniji stil",
                    ingredients: ["2 jaja", "½ avokada", "halloumi", "rukvica"]
                }
            ]
        },
        obrok2: {
            name: "Tuna Nicoise Salad",
            time: "17:30",
            calories: 580,
            macros: { protein: 38, fat: 42, carbs: 8, percentages: "26% P, 65% F, 6% C" },
            prepTime: "15 min",
            portion: "~300g",
            ingredients: [
                { item: "150g tune (konzerva u maslinovom ulju)", details: "250 kcal, 30g proteina" },
                { item: "1 jaje (kuvano)", details: "70 kcal, 6g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "20g kaperi", details: "5 kcal, 0.5g proteina" },
                { item: "100g miješane salate", details: "20 kcal, 2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Ocijediti tunu",
                "Kuhati jaje 8 minuta",
                "Oprati salatu",
                "Pomiješati sve sastojke",
                "Zaliti maslinovim uljem"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "Punjena Piletina",
                    calories: 680,
                    macros: { protein: 52, fat: 44, carbs: 6 },
                    benefits: "Više proteina, topliji obrok",
                    ingredients: ["200g piletine", "špinat", "krem sir", "sušene rajčice"]
                }
            ]
        }
    },
    8: {
        obrok1: {
            name: "Steak & Eggs",
            time: "13:00",
            calories: 602,
            macros: { protein: 45, fat: 38, carbs: 4, percentages: "30% P, 57% F, 3% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "150g mali biftek", details: "350 kcal, 35g proteina" },
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "50g špinata", details: "12 kcal, 1.5g proteina" },
                { item: "1 kašika putera", details: "100 kcal, 12g masti" }
            ],
            instructions: [
                "Zagrijati puter u tavi",
                "Dodati špinat, kuhati 2 minuta",
                "Pržiti biftek 3-4 minuta sa svake strane",
                "Poširati jaja",
                "Složiti zajedno"
            ],
            supplements: ["ZMA kompleks", "Vitamin C"],
            alternatives: [
                {
                    name: "Škampi Skrambl",
                    calories: 580,
                    macros: { protein: 42, fat: 38, carbs: 6 },
                    benefits: "Više omega-3, morska hrana",
                    ingredients: ["150g škampi", "3 jaja", "češnjak", "peršun"]
                }
            ]
        },
        obrok2: {
            name: "Meatballs u Krem Umaku",
            time: "17:30",
            calories: 720,
            macros: { protein: 42, fat: 56, carbs: 8, percentages: "23% P, 70% F, 4% C" },
            prepTime: "25 min",
            portion: "~350g",
            ingredients: [
                { item: "200g mljevene govedine", details: "400 kcal, 40g proteina" },
                { item: "Krem umak (pavlaka + začini)", details: "200 kcal, 20g masti" },
                { item: "150g tikvice noodles", details: "30 kcal, 2g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Napraviti ćufte od mljevene govedine",
                "Pržiti ćufte u maslinovom ulju",
                "Napraviti krem umak od pavlake i češnjaka",
                "Napraviti tikvice noodles",
                "Složiti zajedno"
            ],
            supplements: ["Vitamin C"],
            alternatives: [
                {
                    name: "Coconut Curry Škampi",
                    calories: 650,
                    macros: { protein: 38, fat: 48, carbs: 10 },
                    benefits: "Egzotičniji ukus, više začina",
                    ingredients: ["200g škampi", "kokosovo mleko", "curry pasta"]
                }
            ]
        }
    },
    9: {
        obrok1: {
            name: "Škampi Skrambl",
            time: "13:00",
            calories: 580,
            macros: { protein: 42, fat: 38, carbs: 6, percentages: "29% P, 59% F, 4% C" },
            prepTime: "12 min",
            portion: "~280g",
            ingredients: [
                { item: "150g škampi (oljuštenih)", details: "120 kcal, 28g proteina" },
                { item: "3 jaja", details: "210 kcal, 18g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "10g peršuna", details: "5 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Dodati češnjak i škampi, kuhati 3 minuta",
                "Dodati jaja i praviti skrambl",
                "Dodati peršun i začine",
                "Poslužiti sa limunom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: [
                {
                    name: "Steak & Eggs",
                    calories: 602,
                    macros: { protein: 45, fat: 38, carbs: 4 },
                    benefits: "Više proteina, tradicionalni ukus",
                    ingredients: ["150g biftek", "2 jaja", "špinat", "puter"]
                }
            ]
        },
        obrok2: {
            name: "Coconut Curry Škampi",
            time: "17:30",
            calories: 650,
            macros: { protein: 38, fat: 48, carbs: 10, percentages: "23% P, 66% F, 6% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "200g škampi", details: "160 kcal, 38g proteina" },
                { item: "100ml kokosovo mleko", details: "200 kcal, 20g masti" },
                { item: "1 kašika curry paste", details: "50 kcal, 4g masti" },
                { item: "100g špinata", details: "25 kcal, 3g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u woku",
                "Dodati češnjak i curry pastu",
                "Dodati škampi, kuhati 3-4 minuta",
                "Dodati kokosovo mleko i špinat",
                "Kuhati još 5 minuta"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: [
                {
                    name: "Meatballs u Krem Umaku",
                    calories: 720,
                    macros: { protein: 42, fat: 56, carbs: 8 },
                    benefits: "Više proteina, tradicionalniji ukus",
                    ingredients: ["200g govedine", "krem umak", "tikvice noodles"]
                }
            ]
        }
    },
    10: {
        obrok1: {
            name: "Caprese Keto Bowl",
            time: "13:00",
            calories: 620,
            macros: { protein: 25, fat: 52, carbs: 10, percentages: "16% P, 75% F, 6% C" },
            prepTime: "8 min",
            portion: "~280g",
            ingredients: [
                { item: "100g mozzarella", details: "280 kcal, 20g proteina" },
                { item: "150g cherry rajčice", details: "30 kcal, 1.5g proteina" },
                { item: "10g bosiljka", details: "5 kcal, 0.5g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" },
                { item: "1 kašika balsamico", details: "25 kcal, 0g proteina" }
            ],
            instructions: [
                "Izrezati mozzarella na kockice",
                "Oprati i prepoloviti cherry rajčice",
                "Izrezati avokado",
                "Pomiješati sve sastojke",
                "Zaliti maslinovim uljem i balsamicom",
                "Ukrasiti bosiljkom"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: [
                {
                    name: "Carbonara Style Eggs",
                    calories: 940,
                    macros: { protein: 35, fat: 78, carbs: 4 },
                    benefits: "Više proteina, kremastiji ukus",
                    ingredients: ["4 jaja", "slanina", "parmezan", "pavlaka"]
                }
            ]
        },
        obrok2: {
            name: "Zapečena Piletina sa Sirom",
            time: "17:30",
            calories: 700,
            macros: { protein: 48, fat: 50, carbs: 8, percentages: "27% P, 64% F, 5% C" },
            prepTime: "35 min",
            portion: "~340g",
            ingredients: [
                { item: "200g pileći bataci", details: "350 kcal, 40g proteina" },
                { item: "50g mozzarella", details: "140 kcal, 10g proteina" },
                { item: "150g brokoli", details: "45 kcal, 4.5g proteina" },
                { item: "3 čena češnjaka", details: "15 kcal, 0.8g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Začiniti pileće batake",
                "Pržiti batake u maslinovom ulju 10 minuta",
                "Dodati brokoli i češnjak",
                "Posuti mozzarellom",
                "Peći 15 minuta"
            ],
            supplements: ["Kreatin", "Vitamin D3"],
            alternatives: [
                {
                    name: "Asian Losos Bowl",
                    calories: 680,
                    macros: { protein: 42, fat: 48, carbs: 10 },
                    benefits: "Više omega-3, azijski ukus",
                    ingredients: ["180g lososa", "pak choi", "sezam", "avokado"]
                }
            ]
        }
    },
    11: {
        obrok1: {
            name: "Carbonara Style Eggs",
            time: "13:00",
            calories: 940,
            macros: { protein: 35, fat: 78, carbs: 4, percentages: "15% P, 75% F, 2% C" },
            prepTime: "15 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina" },
                { item: "50g parmezan", details: "200 kcal, 18g proteina" },
                { item: "2 kašike pavlake", details: "100 kcal, 10g masti" }
            ],
            instructions: [
                "Pržiti slaninu do hrskave",
                "Kuhati jaja u pavlaci",
                "Dodati parmezan",
                "Pomiješati sa slaninom",
                "Začiniti biberom"
            ],
            supplements: ["Vitamin C"],
            alternatives: [
                {
                    name: "Caprese Keto Bowl",
                    calories: 620,
                    macros: { protein: 25, fat: 52, carbs: 10 },
                    benefits: "Svježiji obrok, manje zasićenih masti",
                    ingredients: ["100g mozzarella", "cherry rajčice", "avokado", "bosiljak"]
                }
            ]
        },
        obrok2: {
            name: "Asian Losos Bowl",
            time: "17:30",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 10, percentages: "25% P, 63% F, 6% C" },
            prepTime: "22 min",
            portion: "~360g",
            ingredients: [
                { item: "180g lososa", details: "315 kcal, 36g proteina" },
                { item: "100g pak choi", details: "15 kcal, 2g proteina" },
                { item: "1 kašika sezam", details: "60 kcal, 5g masti" },
                { item: "1 kašika soja umak", details: "10 kcal, 0.1g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u tavi",
                "Pržiti lososa 4-5 minuta sa svake strane",
                "Dodati pak choi i sezam",
                "Zaliti soja umakom",
                "Poslužiti sa avokadom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: [
                {
                    name: "Zapečena Piletina sa Sirom",
                    calories: 700,
                    macros: { protein: 48, fat: 50, carbs: 8 },
                    benefits: "Više proteina, topliji obrok",
                    ingredients: ["200g piletine", "mozzarella", "brokoli", "češnjak"]
                }
            ]
        }
    },
    12: {
        obrok1: {
            name: "Avokado Benedict",
            time: "13:00",
            calories: 680,
            macros: { protein: 28, fat: 58, carbs: 6, percentages: "17% P, 77% F, 4% C" },
            prepTime: "15 min",
            portion: "~320g",
            ingredients: [
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "½ avokada (100g)", details: "160 kcal, 15g masti" },
                { item: "50g dimljenog lososa", details: "100 kcal, 12g proteina" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Poširati jaja",
                "Izrezati avokado na kriške",
                "Dodati losos i rukvicu",
                "Zaliti maslinovim uljem",
                "Začiniti i poslužiti"
            ],
            supplements: ["Vitamin D3 + K2", "Omega-3"],
            alternatives: [
                {
                    name: "Feta Shakshuka",
                    calories: 650,
                    macros: { protein: 32, fat: 50, carbs: 8 },
                    benefits: "Više povrća, mediteranski ukus",
                    ingredients: ["4 jaja", "80g feta", "cherry rajčice", "špinat"]
                }
            ]
        },
        obrok2: {
            name: "Govedina Stir-Fry",
            time: "17:30",
            calories: 720,
            macros: { protein: 45, fat: 52, carbs: 8, percentages: "25% P, 65% F, 4% C" },
            prepTime: "20 min",
            portion: "~350g",
            ingredients: [
                { item: "180g mljevene govedine", details: "380 kcal, 40g proteina" },
                { item: "150g brokoli", details: "45 kcal, 4.5g proteina" },
                { item: "3 čena češnjaka", details: "15 kcal, 0.8g proteina" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" },
                { item: "1 kašika soja umak", details: "10 kcal, 0.1g proteina" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u woku",
                "Dodati češnjak i govedinu",
                "Kuhati 5-7 minuta",
                "Dodati brokoli i začine",
                "Zaliti soja umakom",
                "Kuhati još 3-4 minuta"
            ],
            supplements: ["Vitamin C", "ZMA kompleks"],
            alternatives: [
                {
                    name: "Pileći Fajitas",
                    calories: 680,
                    macros: { protein: 48, fat: 44, carbs: 10 },
                    benefits: "Više povrća, meksički stil",
                    ingredients: ["200g piletine", "paprika", "luk", "avokado"]
                }
            ]
        }
    },
    13: {
        obrok1: {
            name: "Feta Shakshuka",
            time: "13:00",
            calories: 650,
            macros: { protein: 32, fat: 50, carbs: 8, percentages: "20% P, 69% F, 5% C" },
            prepTime: "18 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "80g feta sira", details: "200 kcal, 12g proteina" },
                { item: "100g cherry rajčice", details: "20 kcal, 1g proteina" },
                { item: "50g špinata", details: "12 kcal, 1.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Dodati cherry rajčice i začine",
                "Kuhati 3-4 minuta",
                "Dodati špinat i fetu",
                "Napraviti udubljenja za jaja",
                "Dodati jaja i kuhati poklopljeno"
            ],
            supplements: ["Vitamin C"],
            alternatives: [
                {
                    name: "Avokado Benedict",
                    calories: 680,
                    macros: { protein: 28, fat: 58, carbs: 6 },
                    benefits: "Više masti, elegantniji stil",
                    ingredients: ["2 jaja", "½ avokada", "dimljeni losos", "rukvica"]
                }
            ]
        },
        obrok2: {
            name: "Pileći Fajitas",
            time: "17:30",
            calories: 680,
            macros: { protein: 48, fat: 44, carbs: 10, percentages: "28% P, 58% F, 6% C" },
            prepTime: "22 min",
            portion: "~340g",
            ingredients: [
                { item: "200g pilećih grudi", details: "330 kcal, 62g proteina" },
                { item: "100g paprika", details: "30 kcal, 1g proteina" },
                { item: "50g luka", details: "20 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" },
                { item: "50g avokada", details: "80 kcal, 7.5g masti" }
            ],
            instructions: [
                "Pileću grudi isjeckati na trake",
                "Zagrijati maslinovo ulje",
                "Dodati piletinu i začine",
                "Kuhati 8-10 minuta",
                "Dodati povrće",
                "Poslužiti sa avokadom"
            ],
            supplements: ["Kreatin", "Vitamin C"],
            alternatives: [
                {
                    name: "Govedina Stir-Fry",
                    calories: 720,
                    macros: { protein: 45, fat: 52, carbs: 8 },
                    benefits: "Više proteina, azijski stil",
                    ingredients: ["180g govedine", "brokoli", "češnjak", "kokosovo ulje"]
                }
            ]
        }
    },
    14: {
        obrok1: {
            name: "BLT Omelet",
            time: "13:00",
            calories: 720,
            macros: { protein: 38, fat: 58, carbs: 6, percentages: "21% P, 72% F, 3% C" },
            prepTime: "12 min",
            portion: "~330g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "3 trake slanine (60g)", details: "270 kcal, 12g proteina" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "50g cherry rajčice", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Pržiti slaninu do hrskave",
                "Izlupati jaja u posudu",
                "Dodati rukvicu i rajčice",
                "Usuti u tavu sa maslinovim uljem",
                "Dodati slaninu na pola kuhanja",
                "Sklopiti omlet"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: [
                {
                    name: "Avokado Benedict",
                    calories: 680,
                    macros: { protein: 28, fat: 58, carbs: 6 },
                    benefits: "Više masti, elegantniji stil",
                    ingredients: ["2 jaja", "½ avokada", "dimljeni losos", "rukvica"]
                }
            ]
        },
        obrok2: {
            name: "Tuna Melt Bowl",
            time: "17:30",
            calories: 650,
            macros: { protein: 42, fat: 44, carbs: 8, percentages: "26% P, 61% F, 5% C" },
            prepTime: "15 min",
            portion: "~320g",
            ingredients: [
                { item: "150g tune (konzerva)", details: "250 kcal, 30g proteina" },
                { item: "50g mozzarelle", details: "140 kcal, 10g proteina" },
                { item: "100g miješane salate", details: "20 kcal, 2g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Ocijediti tunu",
                "Pomiješati sa mozzarellom",
                "Dodati masline i začine",
                "Poslužiti na salati",
                "Zaliti maslinovim uljem"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: [
                {
                    name: "Govedina Stir-Fry",
                    calories: 720,
                    macros: { protein: 45, fat: 52, carbs: 8 },
                    benefits: "Više proteina, topliji obrok",
                    ingredients: ["180g govedine", "brokoli", "češnjak", "kokosovo ulje"]
                }
            ]
        }
    },
    // Rotacija za dane 15-28 koristeći postojeće obroke
    15: {
        obrok1: {
            name: "Mediterranean Losos",
            time: "13:00",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 8, percentages: "25% P, 63% F, 5% C" },
            prepTime: "25 min",
            portion: "~380g",
            ingredients: [
                { item: "200g svježeg lososa", details: "350 kcal, 40g proteina" },
                { item: "150g tikvice", details: "30 kcal, 2g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "30g feta sira", details: "75 kcal, 4g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Isjeckati tikvice i masline",
                "Začiniti lososa origanom i maslinovim uljem",
                "Peći lososa 15 minuta",
                "Dodati tikvice i masline u posljednjih 10 minuta",
                "Poslužiti sa fetom"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: []
        },
        obrok2: {
            name: "Keto English Breakfast",
            time: "17:30",
            calories: 780,
            macros: { protein: 35, fat: 60, carbs: 8, percentages: "18% P, 69% F, 4% C" },
            prepTime: "15 min",
            portion: "~350g",
            ingredients: [
                { item: "3 velika jaja (poširana)", details: "210 kcal, 18g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina, 32g masti" },
                { item: "100g šampinjona", details: "25 kcal, 3g proteina" },
                { item: "100g cherry rajčice", details: "20 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati tavu sa maslinovim uljem",
                "Dodati šampinjone i cherry rajčice, kuhati 5 minuta",
                "Dodati slaninu, pržiti do hrskave",
                "Poširati jaja u zasebnoj posudi",
                "Složiti zajedno i začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        }
    },
    16: {
        obrok1: {
            name: "Steak & Eggs",
            time: "13:00",
            calories: 602,
            macros: { protein: 45, fat: 38, carbs: 4, percentages: "30% P, 57% F, 3% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "150g mali biftek", details: "350 kcal, 35g proteina" },
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "50g špinata", details: "12 kcal, 1.5g proteina" },
                { item: "1 kašika putera", details: "100 kcal, 12g masti" }
            ],
            instructions: [
                "Zagrijati puter u tavi",
                "Dodati špinat, kuhati 2 minuta",
                "Pržiti biftek 3-4 minuta sa svake strane",
                "Poširati jaja",
                "Složiti zajedno"
            ],
            supplements: ["ZMA kompleks", "Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Meatballs u Krem Umaku",
            time: "17:30",
            calories: 720,
            macros: { protein: 42, fat: 56, carbs: 8, percentages: "23% P, 70% F, 4% C" },
            prepTime: "25 min",
            portion: "~350g",
            ingredients: [
                { item: "200g mljevene govedine", details: "400 kcal, 40g proteina" },
                { item: "Krem umak (pavlaka + začini)", details: "200 kcal, 20g masti" },
                { item: "150g tikvice noodles", details: "30 kcal, 2g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Napraviti ćufte od mljevene govedine",
                "Pržiti ćufte u maslinovom ulju",
                "Napraviti krem umak od pavlake i češnjaka",
                "Napraviti tikvice noodles",
                "Složiti zajedno"
            ],
            supplements: ["Vitamin C"],
            alternatives: []
        }
    },
    17: {
        obrok1: {
            name: "Škampi Skrambl",
            time: "13:00",
            calories: 580,
            macros: { protein: 42, fat: 38, carbs: 6, percentages: "29% P, 59% F, 4% C" },
            prepTime: "12 min",
            portion: "~280g",
            ingredients: [
                { item: "150g škampi (oljuštenih)", details: "120 kcal, 28g proteina" },
                { item: "3 jaja", details: "210 kcal, 18g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "10g peršuna", details: "5 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Dodati češnjak i škampi, kuhati 3 minuta",
                "Dodati jaja i praviti skrambl",
                "Dodati peršun i začine",
                "Poslužiti sa limunom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Coconut Curry Škampi",
            time: "17:30",
            calories: 650,
            macros: { protein: 38, fat: 48, carbs: 10, percentages: "23% P, 66% F, 6% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "200g škampi", details: "160 kcal, 38g proteina" },
                { item: "100ml kokosovo mleko", details: "200 kcal, 20g masti" },
                { item: "1 kašika curry paste", details: "50 kcal, 4g masti" },
                { item: "100g špinata", details: "25 kcal, 3g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u woku",
                "Dodati češnjak i curry pastu",
                "Dodati škampi, kuhati 3-4 minuta",
                "Dodati kokosovo mleko i špinat",
                "Kuhati još 5 minuta"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        }
    },
    18: {
        obrok1: {
            name: "Caprese Keto Bowl",
            time: "13:00",
            calories: 620,
            macros: { protein: 25, fat: 52, carbs: 10, percentages: "16% P, 75% F, 6% C" },
            prepTime: "8 min",
            portion: "~280g",
            ingredients: [
                { item: "100g mozzarella", details: "280 kcal, 20g proteina" },
                { item: "150g cherry rajčice", details: "30 kcal, 1.5g proteina" },
                { item: "10g bosiljka", details: "5 kcal, 0.5g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" },
                { item: "1 kašika balsamico", details: "25 kcal, 0g proteina" }
            ],
            instructions: [
                "Izrezati mozzarella na kockice",
                "Oprati i prepoloviti cherry rajčice",
                "Izrezati avokado",
                "Pomiješati sve sastojke",
                "Zaliti maslinovim uljem i balsamicom",
                "Ukrasiti bosiljkom"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        },
        obrok2: {
            name: "Zapečena Piletina sa Sirom",
            time: "17:30",
            calories: 700,
            macros: { protein: 48, fat: 50, carbs: 8, percentages: "27% P, 64% F, 5% C" },
            prepTime: "35 min",
            portion: "~340g",
            ingredients: [
                { item: "200g pileći bataci", details: "350 kcal, 40g proteina" },
                { item: "50g mozzarella", details: "140 kcal, 10g proteina" },
                { item: "150g brokoli", details: "45 kcal, 4.5g proteina" },
                { item: "3 čena češnjaka", details: "15 kcal, 0.8g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Začiniti pileće batake",
                "Pržiti batake u maslinovom ulju 10 minuta",
                "Dodati brokoli i češnjak",
                "Posuti mozzarellom",
                "Peći 15 minuta"
            ],
            supplements: ["Kreatin", "Vitamin D3"],
            alternatives: []
        }
    },
    19: {
        obrok1: {
            name: "Carbonara Style Eggs",
            time: "13:00",
            calories: 940,
            macros: { protein: 35, fat: 78, carbs: 4, percentages: "15% P, 75% F, 2% C" },
            prepTime: "15 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina" },
                { item: "50g parmezan", details: "200 kcal, 18g proteina" },
                { item: "2 kašike pavlake", details: "100 kcal, 10g masti" }
            ],
            instructions: [
                "Pržiti slaninu do hrskave",
                "Kuhati jaja u pavlaci",
                "Dodati parmezan",
                "Pomiješati sa slaninom",
                "Začiniti biberom"
            ],
            supplements: ["Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Asian Losos Bowl",
            time: "17:30",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 10, percentages: "25% P, 63% F, 6% C" },
            prepTime: "22 min",
            portion: "~360g",
            ingredients: [
                { item: "180g lososa", details: "315 kcal, 36g proteina" },
                { item: "100g pak choi", details: "15 kcal, 2g proteina" },
                { item: "1 kašika sezam", details: "60 kcal, 5g masti" },
                { item: "1 kašika soja umak", details: "10 kcal, 0.1g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u tavi",
                "Pržiti lososa 4-5 minuta sa svake strane",
                "Dodati pak choi i sezam",
                "Zaliti soja umakom",
                "Poslužiti sa avokadom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        }
    },
    20: {
        obrok1: {
            name: "Mediterranean Losos",
            time: "13:00",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 8, percentages: "25% P, 63% F, 5% C" },
            prepTime: "25 min",
            portion: "~380g",
            ingredients: [
                { item: "200g svježeg lososa", details: "350 kcal, 40g proteina" },
                { item: "150g tikvice", details: "30 kcal, 2g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "30g feta sira", details: "75 kcal, 4g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Isjeckati tikvice i masline",
                "Začiniti lososa origanom i maslinovim uljem",
                "Peći lososa 15 minuta",
                "Dodati tikvice i masline u posljednjih 10 minuta",
                "Poslužiti sa fetom"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: []
        },
        obrok2: {
            name: "Keto English Breakfast",
            time: "17:30",
            calories: 780,
            macros: { protein: 35, fat: 60, carbs: 8, percentages: "18% P, 69% F, 4% C" },
            prepTime: "15 min",
            portion: "~350g",
            ingredients: [
                { item: "3 velika jaja (poširana)", details: "210 kcal, 18g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina, 32g masti" },
                { item: "100g šampinjona", details: "25 kcal, 3g proteina" },
                { item: "100g cherry rajčice", details: "20 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati tavu sa maslinovim uljem",
                "Dodati šampinjone i cherry rajčice, kuhati 5 minuta",
                "Dodati slaninu, pržiti do hrskave",
                "Poširati jaja u zasebnoj posudi",
                "Složiti zajedno i začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        }
    },
    21: {
        obrok1: {
            name: "Mediterranean Omlet",
            time: "13:00",
            calories: 650,
            macros: { protein: 32, fat: 50, carbs: 6, percentages: "20% P, 69% F, 4% C" },
            prepTime: "12 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "50g feta sira", details: "130 kcal, 7g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "50g cherry rajčice", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Izlupati jaja u posudu",
                "Dodati isjeckane masline, rukvicu i rajčice",
                "Usuti u zagrijanu tavu sa maslinovim uljem",
                "Kuhati na srednjoj temperaturi 3-4 minuta",
                "Dodati feta sir i sklopiti omlet",
                "Kuhati još 2-3 minuta"
            ],
            supplements: ["Vitamin C", "Omega-3"],
            alternatives: []
        },
        obrok2: {
            name: "Biftek sa Pesto Povrćem",
            time: "17:30",
            calories: 750,
            macros: { protein: 48, fat: 55, carbs: 8, percentages: "26% P, 66% F, 4% C" },
            prepTime: "20 min",
            portion: "~350g",
            ingredients: [
                { item: "180g bifteka (goveđeg)", details: "380 kcal, 42g proteina" },
                { item: "200g brokoli", details: "60 kcal, 6g proteina" },
                { item: "2 kašike pesto", details: "160 kcal, 16g masti" },
                { item: "20g pine nuts", details: "130 kcal, 13g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Pržiti biftek 3-4 minuta sa svake strane",
                "Kuhati brokoli na pari 8-10 minuta",
                "Pomiješati pesto sa pine nuts",
                "Složiti zajedno"
            ],
            supplements: ["Vitamin C", "ZMA kompleks"],
            alternatives: []
        }
    },
    22: {
        obrok1: {
            name: "Avokado Toast (bez hleba!)",
            time: "13:00",
            calories: 720,
            macros: { protein: 30, fat: 58, carbs: 8, percentages: "17% P, 72% F, 4% C" },
            prepTime: "10 min",
            portion: "~300g",
            ingredients: [
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "½ avokada (100g)", details: "160 kcal, 15g masti" },
                { item: "50g halloumi sira (pržen)", details: "160 kcal, 10g proteina" },
                { item: "50g rukvice", details: "15 kcal, 1g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Pržiti halloumi sir u maslinovom ulju do zlatne boje",
                "Poširati jaja",
                "Izrezati avokado na kriške",
                "Složiti: avokado kao 'hleba', sir i jaja kao 'namaz'",
                "Dodati rukvicu i začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        },
        obrok2: {
            name: "Punjena Piletina",
            time: "17:30",
            calories: 680,
            macros: { protein: 52, fat: 44, carbs: 6, percentages: "31% P, 58% F, 4% C" },
            prepTime: "30 min",
            portion: "~320g",
            ingredients: [
                { item: "200g pilećih grudi", details: "330 kcal, 62g proteina" },
                { item: "100g špinata", details: "25 kcal, 3g proteina" },
                { item: "50g krem sira", details: "150 kcal, 15g masti" },
                { item: "30g sušenih rajčica", details: "25 kcal, 0.2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Napraviti rez u pilećoj grudi",
                "Pomiješati špinat, krem sir i sušene rajčice",
                "Napuniti piletinu",
                "Pržiti u maslinovom ulju 15-20 minuta",
                "Poslužiti sa začinima"
            ],
            supplements: ["Kreatin", "Vitamin C"],
            alternatives: []
        }
    },
    23: {
        obrok1: {
            name: "Skandinavski Losos",
            time: "13:00",
            calories: 680,
            macros: { protein: 38, fat: 52, carbs: 5, percentages: "22% P, 69% F, 3% C" },
            prepTime: "5 min",
            portion: "~280g",
            ingredients: [
                { item: "120g dimljenog lososa", details: "250 kcal, 28g proteina" },
                { item: "50g krem sira", details: "150 kcal, 15g masti" },
                { item: "20g kaperi", details: "5 kcal, 0.5g proteina" },
                { item: "30g crvenog luka", details: "15 kcal, 0.5g proteina" },
                { item: "1 jaje (kuvano)", details: "70 kcal, 6g proteina" }
            ],
            instructions: [
                "Namazati krem sir na tanjir",
                "Dodati dimljenog lososa",
                "Ukrasiti kaperima, lukom i kuvanim jajetom",
                "Začiniti koprom i limunovim sokom"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: []
        },
        obrok2: {
            name: "Tuna Nicoise Salad",
            time: "17:30",
            calories: 580,
            macros: { protein: 38, fat: 42, carbs: 8, percentages: "26% P, 65% F, 6% C" },
            prepTime: "15 min",
            portion: "~300g",
            ingredients: [
                { item: "150g tune (konzerva u maslinovom ulju)", details: "250 kcal, 30g proteina" },
                { item: "1 jaje (kuvano)", details: "70 kcal, 6g proteina" },
                { item: "50g masline", details: "75 kcal, 7g masti" },
                { item: "20g kaperi", details: "5 kcal, 0.5g proteina" },
                { item: "100g miješane salate", details: "20 kcal, 2g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Ocijediti tunu",
                "Kuhati jaje 8 minuta",
                "Oprati salatu",
                "Pomiješati sve sastojke",
                "Zaliti maslinovim uljem"
            ],
            supplements: ["Omega-3", "Vitamin D3"],
            alternatives: []
        }
    },
    24: {
        obrok1: {
            name: "Steak & Eggs",
            time: "13:00",
            calories: 602,
            macros: { protein: 45, fat: 38, carbs: 4, percentages: "30% P, 57% F, 3% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "150g mali biftek", details: "350 kcal, 35g proteina" },
                { item: "2 jaja (poširana)", details: "140 kcal, 12g proteina" },
                { item: "50g špinata", details: "12 kcal, 1.5g proteina" },
                { item: "1 kašika putera", details: "100 kcal, 12g masti" }
            ],
            instructions: [
                "Zagrijati puter u tavi",
                "Dodati špinat, kuhati 2 minuta",
                "Pržiti biftek 3-4 minuta sa svake strane",
                "Poširati jaja",
                "Složiti zajedno"
            ],
            supplements: ["ZMA kompleks", "Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Meatballs u Krem Umaku",
            time: "17:30",
            calories: 720,
            macros: { protein: 42, fat: 56, carbs: 8, percentages: "23% P, 70% F, 4% C" },
            prepTime: "25 min",
            portion: "~350g",
            ingredients: [
                { item: "200g mljevene govedine", details: "400 kcal, 40g proteina" },
                { item: "Krem umak (pavlaka + začini)", details: "200 kcal, 20g masti" },
                { item: "150g tikvice noodles", details: "30 kcal, 2g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Napraviti ćufte od mljevene govedine",
                "Pržiti ćufte u maslinovom ulju",
                "Napraviti krem umak od pavlake i češnjaka",
                "Napraviti tikvice noodles",
                "Složiti zajedno"
            ],
            supplements: ["Vitamin C"],
            alternatives: []
        }
    },
    25: {
        obrok1: {
            name: "Škampi Skrambl",
            time: "13:00",
            calories: 580,
            macros: { protein: 42, fat: 38, carbs: 6, percentages: "29% P, 59% F, 4% C" },
            prepTime: "12 min",
            portion: "~280g",
            ingredients: [
                { item: "150g škampi (oljuštenih)", details: "120 kcal, 28g proteina" },
                { item: "3 jaja", details: "210 kcal, 18g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "10g peršuna", details: "5 kcal, 0.5g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati maslinovo ulje u tavi",
                "Dodati češnjak i škampi, kuhati 3 minuta",
                "Dodati jaja i praviti skrambl",
                "Dodati peršun i začine",
                "Poslužiti sa limunom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Coconut Curry Škampi",
            time: "17:30",
            calories: 650,
            macros: { protein: 38, fat: 48, carbs: 10, percentages: "23% P, 66% F, 6% C" },
            prepTime: "20 min",
            portion: "~320g",
            ingredients: [
                { item: "200g škampi", details: "160 kcal, 38g proteina" },
                { item: "100ml kokosovo mleko", details: "200 kcal, 20g masti" },
                { item: "1 kašika curry paste", details: "50 kcal, 4g masti" },
                { item: "100g špinata", details: "25 kcal, 3g proteina" },
                { item: "2 čena češnjaka", details: "10 kcal, 0.5g proteina" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u woku",
                "Dodati češnjak i curry pastu",
                "Dodati škampi, kuhati 3-4 minuta",
                "Dodati kokosovo mleko i špinat",
                "Kuhati još 5 minuta"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        }
    },
    26: {
        obrok1: {
            name: "Caprese Keto Bowl",
            time: "13:00",
            calories: 620,
            macros: { protein: 25, fat: 52, carbs: 10, percentages: "16% P, 75% F, 6% C" },
            prepTime: "8 min",
            portion: "~280g",
            ingredients: [
                { item: "100g mozzarella", details: "280 kcal, 20g proteina" },
                { item: "150g cherry rajčice", details: "30 kcal, 1.5g proteina" },
                { item: "10g bosiljka", details: "5 kcal, 0.5g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" },
                { item: "1 kašika balsamico", details: "25 kcal, 0g proteina" }
            ],
            instructions: [
                "Izrezati mozzarella na kockice",
                "Oprati i prepoloviti cherry rajčice",
                "Izrezati avokado",
                "Pomiješati sve sastojke",
                "Zaliti maslinovim uljem i balsamicom",
                "Ukrasiti bosiljkom"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        },
        obrok2: {
            name: "Zapečena Piletina sa Sirom",
            time: "17:30",
            calories: 700,
            macros: { protein: 48, fat: 50, carbs: 8, percentages: "27% P, 64% F, 5% C" },
            prepTime: "35 min",
            portion: "~340g",
            ingredients: [
                { item: "200g pileći bataci", details: "350 kcal, 40g proteina" },
                { item: "50g mozzarella", details: "140 kcal, 10g proteina" },
                { item: "150g brokoli", details: "45 kcal, 4.5g proteina" },
                { item: "3 čena češnjaka", details: "15 kcal, 0.8g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati rernu na 200°C",
                "Začiniti pileće batake",
                "Pržiti batake u maslinovom ulju 10 minuta",
                "Dodati brokoli i češnjak",
                "Posuti mozzarellom",
                "Peći 15 minuta"
            ],
            supplements: ["Kreatin", "Vitamin D3"],
            alternatives: []
        }
    },
    27: {
        obrok1: {
            name: "Carbonara Style Eggs",
            time: "13:00",
            calories: 940,
            macros: { protein: 35, fat: 78, carbs: 4, percentages: "15% P, 75% F, 2% C" },
            prepTime: "15 min",
            portion: "~320g",
            ingredients: [
                { item: "4 jaja", details: "280 kcal, 24g proteina" },
                { item: "4 trake slanine", details: "360 kcal, 14g proteina" },
                { item: "50g parmezan", details: "200 kcal, 18g proteina" },
                { item: "2 kašike pavlake", details: "100 kcal, 10g masti" }
            ],
            instructions: [
                "Pržiti slaninu do hrskave",
                "Kuhati jaja u pavlaci",
                "Dodati parmezan",
                "Pomiješati sa slaninom",
                "Začiniti biberom"
            ],
            supplements: ["Vitamin C"],
            alternatives: []
        },
        obrok2: {
            name: "Asian Losos Bowl",
            time: "17:30",
            calories: 680,
            macros: { protein: 42, fat: 48, carbs: 10, percentages: "25% P, 63% F, 6% C" },
            prepTime: "22 min",
            portion: "~360g",
            ingredients: [
                { item: "180g lososa", details: "315 kcal, 36g proteina" },
                { item: "100g pak choi", details: "15 kcal, 2g proteina" },
                { item: "1 kašika sezam", details: "60 kcal, 5g masti" },
                { item: "1 kašika soja umak", details: "10 kcal, 0.1g proteina" },
                { item: "100g avokada", details: "160 kcal, 15g masti" },
                { item: "1 kašika kokosovo ulje", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Zagrijati kokosovo ulje u tavi",
                "Pržiti lososa 4-5 minuta sa svake strane",
                "Dodati pak choi i sezam",
                "Zaliti soja umakom",
                "Poslužiti sa avokadom"
            ],
            supplements: ["Omega-3", "Vitamin C"],
            alternatives: []
        }
    },
    28: {
        obrok1: {
            name: "4 Jaja + Avokado + Špinat",
            time: "13:00",
            calories: 850,
            macros: { protein: 35, fat: 60, carbs: 8, percentages: "16% P, 64% F, 4% C" },
            prepTime: "10 min",
            portion: "~400g",
            ingredients: [
                { item: "4 velika jaja", details: "280 kcal, 24g proteina" },
                { item: "½ avokada (100g)", details: "160 kcal, 15g masti" },
                { item: "100g svježeg špinata", details: "25 kcal, 3g proteina" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati špinat i avokado",
                "Izrezati avokado na kockice",
                "U tavi zagrijati maslinovo ulje",
                "Dodati jaja i špinat, kuhati 3-4 minuta",
                "Dodati avokado na kraju, začiniti"
            ],
            supplements: ["Vitamin D3 + K2"],
            alternatives: []
        },
        obrok2: {
            name: "Piletina + Brokoli + Maslinovo Ulje",
            time: "17:30",
            calories: 750,
            macros: { protein: 45, fat: 35, carbs: 12, percentages: "24% P, 42% F, 6% C" },
            prepTime: "20 min",
            portion: "~450g",
            ingredients: [
                { item: "200g pilećih grudi", details: "330 kcal, 62g proteina" },
                { item: "300g brokoli", details: "90 kcal, 9g proteina, 12g UH" },
                { item: "1 kašika maslinovog ulja", details: "120 kcal, 14g masti" }
            ],
            instructions: [
                "Oprati i isjeckati brokoli",
                "Pileću grudi isjeckati na kockice",
                "U tavi zagrijati maslinovo ulje",
                "Dodati piletinu, začiniti i kuhati 8-10 minuta",
                "Dodati brokoli, kuhati još 5-7 minuta"
            ],
            supplements: ["Kreatin"],
            alternatives: []
        }
    }
};

// Global export - delayed to avoid initialization error
setTimeout(() => {
    if (typeof window !== 'undefined') {
        window.MEALS_DATA = MEALS_DATA;
        console.log('[MealsData] ✅ Podaci eksportovani globalno');
    }
}, 0);
