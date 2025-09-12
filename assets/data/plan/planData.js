// 28-day keto & training plan data
const planData = {
    "Dan 1": {
        "trening": "LOWER 1 (Noge + Core)",
        "fokus": "Početak programa - fokus na formu",
        "checklist": [
            "Ustani u 7:00",
            "Izmeri težinu i obim struka",
            "Pripremi obroke za dan",
            "Popij 500ml vode prije treninga",
            "Trening: Leg press 3x12-15",
            "Trening: Romanian deadlift 3x10-12",
            "Trening: Walking lunges 3x12 per leg",
            "Obrok 1: 4 jaja + avokado",
            "Obrok 2: Piletina + brokoli",
            "Popij 3L vode ukupno",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 2": {
        "trening": "UPPER 1 (Push)",
        "fokus": "Gornji deo tela - push vezbe",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x8-10",
            "Trening: Overhead press 3x10-12",
            "Trening: Incline dumbbell press 3x10-12",
            "Trening: Tricep dips 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Magnezijum uveče",
            "Proteinski shake posle treninga"
        ]
    },
    "Dan 3": {
        "trening": "LOWER 2 (Noge + Core)",
        "fokus": "Nastavak lower body programa",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Squats 3x10-12",
            "Trening: Bulgarian split squats 3x10 per leg",
            "Trening: Calf raises 4x15-20",
            "Trening: Plank 3x30-45sec",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli + maslinovo ulje",
            "Vitamin D3 + K2",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 4": {
        "trening": "UPPER 2 (Pull)",
        "fokus": "Gornji deo tela - pull vezbe",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Deadlift 3x8-10",
            "Trening: Pull-ups 3x8-12",
            "Trening: Bent-over rows 3x10-12",
            "Trening: Face pulls 3x15-20",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol pire",
            "Omega-3 fish oil",
            "Magnezijum uveče"
        ]
    },
    "Dan 5": {
        "trening": "REST OR LIGHT CARDIO",
        "fokus": "Aktivni odmor - lagana aktivnost",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Lagana šetnja 30-45 minuta",
            "Ili lagana vožnja bicikla",
            "Obrok 1: Jaja + avokado",
            "Obrok 2: Piletina + salata",
            "Fokus na hidrataciju",
            "Magnezijum uveče",
            "Pripremi obroke za sutra"
        ]
    },
    "Dan 6": {
        "trening": "LOWER 3 (Noge + Core)",
        "fokus": "Napredak u lower body treningu",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Leg press 3x12-15",
            "Trening: Romanian deadlift 3x10-12",
            "Trening: Walking lunges 3x12 per leg",
            "Trening: Russian twists 3x20 per side",
            "Obrok 1: Jaja + špinat + avokado",
            "Obrok 2: Piletina + brokoli",
            "Kreatin 5g",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 7": {
        "trening": "UPPER 3 (Push)",
        "fokus": "Push vezbe - fokus na formu",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x8-10",
            "Trening: Overhead press 3x10-12",
            "Trening: Incline dumbbell press 3x10-12",
            "Trening: Tricep extensions 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Vitamin C sa hranom",
            "Magnezijum uveče"
        ]
    },
    "Dan 8": {
        "trening": "LOWER 4 (Noge + Core)",
        "fokus": "Kraj prve sedmice - test snage",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Squats 3x10-12",
            "Trening: Bulgarian split squats 3x10 per leg",
            "Trening: Calf raises 4x15-20",
            "Trening: Hanging leg raises 3x12-15",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli",
            "ZMA kompleks uveče",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 9": {
        "trening": "UPPER 4 (Pull)",
        "fokus": "Pull vezbe - balansiran trening",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Deadlift 3x8-10",
            "Trening: Lat pulldown 3x10-12",
            "Trening: Bent-over rows 3x10-12",
            "Trening: Bicep curls 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol pire",
            "Omega-3 fish oil",
            "Magnezijum uveče"
        ]
    },
    "Dan 10": {
        "trening": "REST OR LIGHT CARDIO",
        "fokus": "Aktivni odmor - regeneracija",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Lagana šetnja 45 minuta",
            "Ili joga/stretching 30 minuta",
            "Obrok 1: Jaja + avokado",
            "Obrok 2: Piletina + salata",
            "Fokus na hidrataciju",
            "Magnezijum uveče",
            "Reflektuj na prvu sedmicu"
        ]
    },
    "Dan 11": {
        "trening": "LOWER 5 (Noge + Core)",
        "fokus": "Druga sedmica - povećaj težine",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Leg press 3x12-15 (+težina)",
            "Trening: Romanian deadlift 3x10-12 (+težina)",
            "Trening: Walking lunges 3x12 per leg",
            "Trening: Plank 3x45-60sec",
            "Obrok 1: Jaja + špinat + avokado",
            "Obrok 2: Piletina + brokoli",
            "Kreatin 5g",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 12": {
        "trening": "UPPER 5 (Push)",
        "fokus": "Push vezbe - progresivno opterećenje",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x8-10 (+težina)",
            "Trening: Overhead press 3x10-12 (+težina)",
            "Trening: Incline dumbbell press 3x10-12",
            "Trening: Tricep dips 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Vitamin C sa hranom",
            "Magnezijum uveče"
        ]
    },
    "Dan 13": {
        "trening": "LOWER 6 (Noge + Core)",
        "fokus": "Core fokus - stabilnost i snaga",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Squats 3x10-12 (+težina)",
            "Trening: Bulgarian split squats 3x10 per leg",
            "Trening: Calf raises 4x15-20",
            "Trening: Bicycle crunches 3x20 per side",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli",
            "ZMA kompleks uveče",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 14": {
        "trening": "UPPER 6 (Pull)",
        "fokus": "Pull vezbe - balans i simetrija",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Deadlift 3x8-10 (+težina)",
            "Trening: Pull-ups 3x8-12",
            "Trening: Bent-over rows 3x10-12 (+težina)",
            "Trening: Hammer curls 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol pire",
            "Omega-3 fish oil",
            "Magnezijum uveče"
        ]
    },
    "Dan 15": {
        "trening": "REST OR LIGHT CARDIO",
        "fokus": "Sredina programa - evaluacija",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Lagana šetnja 45-60 minuta",
            "Ili lagana kardio aktivnost",
            "Obrok 1: Jaja + avokado",
            "Obrok 2: Piletina + salata",
            "Fokus na hidrataciju",
            "Magnezijum uveče",
            "Izmeri napredak"
        ]
    },
    "Dan 16": {
        "trening": "LOWER 7 (Noge + Core)",
        "fokus": "Treća sedmica - intenzitet raste",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Leg press 3x12-15 (+težina)",
            "Trening: Romanian deadlift 3x10-12 (+težina)",
            "Trening: Walking lunges 3x12 per leg",
            "Trening: Russian twists 3x20 per side",
            "Obrok 1: Jaja + špinat + avokado",
            "Obrok 2: Piletina + brokoli",
            "Kreatin 5g",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 17": {
        "trening": "UPPER 7 (Push)",
        "fokus": "Push vezbe - snaga i eksplozija",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x8-10 (+težina)",
            "Trening: Overhead press 3x10-12 (+težina)",
            "Trening: Incline dumbbell press 3x10-12 (+težina)",
            "Trening: Overhead tricep extension 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Vitamin C sa hranom",
            "Magnezijum uveče"
        ]
    },
    "Dan 18": {
        "trening": "LOWER 8 (Noge + Core)",
        "fokus": "Core development - funkcionalnost",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Squats 3x10-12 (+težina)",
            "Trening: Bulgarian split squats 3x10 per leg",
            "Trening: Calf raises 4x15-20",
            "Trening: Mountain climbers 3x30sec",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli",
            "ZMA kompleks uveče",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 19": {
        "trening": "UPPER 8 (Pull)",
        "fokus": "Pull vezbe - završetak ciklusa",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Deadlift 3x8-10 (+težina)",
            "Trening: Lat pulldown 3x10-12 (+težina)",
            "Trening: Bent-over rows 3x10-12 (+težina)",
            "Trening: Face pulls 3x15-20",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol pire",
            "Omega-3 fish oil",
            "Magnezijum uveče"
        ]
    },
    "Dan 20": {
        "trening": "REST OR LIGHT CARDIO",
        "fokus": "Aktivni odmor - oporavak",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Lagana šetnja 60 minuta",
            "Ili lagana vožnja bicikla",
            "Obrok 1: Jaja + avokado",
            "Obrok 2: Piletina + salata",
            "Fokus na hidrataciju",
            "Magnezijum uveče",
            "Planiraj finalnu sedmicu"
        ]
    },
    "Dan 21": {
        "trening": "LOWER 9 (Noge + Core)",
        "fokus": "Četvrta sedmica - peak performance",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Leg press 3x12-15 (max težina)",
            "Trening: Romanian deadlift 3x10-12 (max težina)",
            "Trening: Walking lunges 3x12 per leg",
            "Trening: Plank 3x45-60sec",
            "Obrok 1: Jaja + špinat + avokado",
            "Obrok 2: Piletina + brokoli",
            "Kreatin 5g",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 22": {
        "trening": "UPPER 9 (Push)",
        "fokus": "Push vezbe - maksimalni napor",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x8-10 (max težina)",
            "Trening: Overhead press 3x10-12 (max težina)",
            "Trening: Incline dumbbell press 3x10-12 (max težina)",
            "Trening: Tricep dips 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Vitamin C sa hranom",
            "Magnezijum uveče"
        ]
    },
    "Dan 23": {
        "trening": "LOWER 10 (Noge + Core)",
        "fokus": "Final lower body session",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Squats 3x10-12 (max težina)",
            "Trening: Bulgarian split squats 3x10 per leg",
            "Trening: Calf raises 4x15-20",
            "Trening: Hanging leg raises 3x12-15",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli",
            "ZMA kompleks uveče",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 24": {
        "trening": "UPPER 10 (Pull)",
        "fokus": "Final pull session - program complete",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Deadlift 3x8-10 (max težina)",
            "Trening: Pull-ups 3x8-12",
            "Trening: Bent-over rows 3x10-12 (max težina)",
            "Trening: Bicep curls 3x12-15",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol pire",
            "Omega-3 fish oil",
            "Magnezijum uveče"
        ]
    },
    "Dan 25": {
        "trening": "REST OR LIGHT CARDIO",
        "fokus": "Final rest - evaluacija rezultata",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Lagana šetnja 45 minuta",
            "Ili joga/stretching",
            "Obrok 1: Jaja + avokado",
            "Obrok 2: Piletina + salata",
            "Fokus na hidrataciju",
            "Magnezijum uveče",
            "Izmeri finalne rezultate"
        ]
    },
    "Dan 26": {
        "trening": "LOWER 11 (Noge + Core)",
        "fokus": "Bonus trening - test snage",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Leg press 3x10-12 (test snage)",
            "Trening: Romanian deadlift 3x8-10 (test snage)",
            "Trening: Walking lunges 3x10 per leg",
            "Trening: Russian twists 3x20 per side",
            "Obrok 1: Jaja + špinat + avokado",
            "Obrok 2: Piletina + brokoli",
            "Kreatin 5g",
            "Spavaj minimum 7 sati"
        ]
    },
    "Dan 27": {
        "trening": "UPPER 11 (Push)",
        "fokus": "Bonus trening - gornji deo",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Bench press 3x6-8 (test snage)",
            "Trening: Overhead press 3x8-10 (test snage)",
            "Trening: Incline dumbbell press 3x8-10",
            "Trening: Tricep extensions 3x10-12",
            "Obrok 1: Losos + jaja + salata",
            "Obrok 2: Govedina + karfiol",
            "Vitamin C sa hranom",
            "Magnezijum uveče"
        ]
    },
    "Dan 28": {
        "trening": "FINAL DAY - Full Body",
        "fokus": "Program završen - evaluacija i plan sledećeg ciklusa",
        "checklist": [
            "Ustani u 7:00",
            "Popij 500ml vode",
            "Trening: Full body circuit (optional)",
            "Ili lagana aktivnost po izboru",
            "Obrok 1: Jaja + avokado + špinat",
            "Obrok 2: Piletina + brokoli + salata",
            "Finalna mjerenja težine i obima",
            "Magnezijum uveče",
            "Planiraj sledeći ciklus"
        ]
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    try {
        window.planData = planData;
        console.log('[DEBUG] 📅 PlanData loaded successfully with', Object.keys(planData).length, 'days');
        console.log('[DEBUG] 📋 First day key:', Object.keys(planData)[0]);
        console.log('[DEBUG] 🔍 Window.planData type:', typeof window.planData);
    } catch (error) {
        console.error('[DEBUG] ❌ Error loading planData:', error);
    }
} else {
    console.error('[DEBUG] ❌ Window object not available!');
}

// ES6 export for module compatibility
export { planData };
