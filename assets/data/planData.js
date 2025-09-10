// 28-dnevni plan ishrane sa treninzima
const planData = {
    "Dan 1": {
        trening: "PUSH (Grudni koš, ramena, tricepsi) + 30min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)", 
            "Suplementi prema preporuci",
            "30 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 2": {
        trening: "PULL (Leđa, bicepsi) + 30min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci", 
            "30 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 3": {
        trening: "LEGS (Noge, gluteusi) + 30min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "30 minuta šetnje + trening", 
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 4": {
        trening: "Aktivni odmor - 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta umjerene šetnje",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 5": {
        trening: "UPPER (Gornji dio tijela - kombinovano) + 30min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "30 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 6": {
        trening: "LOWER (Donji dio tijela - kombinovano) + 30min šetnja", 
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "30 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 7": {
        trening: "Potpuni odmor ili laka joga",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "Potpuni odmor ili 20min joge",
            "Pravilno spavanje (7-8h)",
            "Nedeljni pregled napretka"
        ]
    },
    "Dan 8": {
        trening: "PUSH (Grudni koš, ramena, tricepsi) + 35min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "35 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 9": {
        trening: "PULL (Leđa, bicepsi) + 35min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "35 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 10": {
        trening: "LEGS (Noge, gluteusi) + 35min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "35 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 11": {
        trening: "Aktivni odmor - 50min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "50 minuta umjerene šetnje",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 12": {
        trening: "UPPER (Gornji dio tijela - kombinovano) + 35min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "35 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 13": {
        trening: "LOWER (Donji dio tijela - kombinovano) + 35min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "35 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 14": {
        trening: "Potpuni odmor ili laka joga",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "Potpuni odmor ili 25min joge",
            "Pravilno spavanje (7-8h)",
            "Dvonedeljni pregled napretka",
            "Fotografisanje napretka"
        ]
    },
    "Dan 15": {
        trening: "PUSH (Grudni koš, ramena, tricepsi) + 40min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "40 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 16": {
        trening: "PULL (Leđa, bicepsi) + 40min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "40 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 17": {
        trening: "LEGS (Noge, gluteusi) + 40min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "40 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 18": {
        trening: "Aktivni odmor - 55min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "55 minuta umjerene šetnje",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 19": {
        trening: "UPPER (Gornji dio tijela - kombinovano) + 40min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "40 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 20": {
        trening: "LOWER (Donji dio tijela - kombinovano) + 40min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "40 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 21": {
        trening: "Potpuni odmor ili laka joga",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "Potpuni odmor ili 30min joge",
            "Pravilno spavanje (7-8h)",
            "Tronedeljni pregled napretka"
        ]
    },
    "Dan 22": {
        trening: "PUSH (Grudni koš, ramena, tricepsi) + 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 23": {
        trening: "PULL (Leđa, bicepsi) + 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 24": {
        trening: "LEGS (Noge, gluteusi) + 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 25": {
        trening: "Aktivni odmor - 60min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "60 minuta umjerene šetnje",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 26": {
        trening: "UPPER (Gornji dio tijela - kombinovano) + 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 27": {
        trening: "LOWER (Donji dio tijela - kombinovano) + 45min šetnja",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "45 minuta šetnje + trening",
            "Pravilno spavanje (7-8h)"
        ]
    },
    "Dan 28": {
        trening: "Završni trening - celo tijelo + proslava!",
        checklist: [
            "Intermittent Fasting 18/6 protokol (11:00-19:00)",
            "Unos 2250 kcal sa keto makroima",
            "8 čaša vode (2L minimum)",
            "Suplementi prema preporuci",
            "Završni trening celo tijelo",
            "Pravilno spavanje (7-8h)",
            "Finalno fotografisanje napretka",
            "Proslava završetka transformacije! 🎉"
        ]
    }
};
