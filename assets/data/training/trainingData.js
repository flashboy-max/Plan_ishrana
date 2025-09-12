// Training data for 28-day program
export const TRAINING_DATA = {
    "dan1": {
        id: "dan1",
        title: "LOWER 1 (Noge + Core)",
        exercises: [
            { name: "Leg press", sets: 3, reps: "12-15" },
            { name: "Romanian deadlift", sets: 3, reps: "10-12" },
            { name: "Walking lunges", sets: 3, reps: "12 per leg" },
            { name: "Leg extensions", sets: 3, reps: "15-20" },
            { name: "Leg curls", sets: 3, reps: "15-20" },
            { name: "Plank", sets: 3, reps: "30-45 sec" },
            { name: "Russian twists", sets: 3, reps: "20 per side" }
        ]
    },
    "dan2": {
        id: "dan2",
        title: "UPPER 1 (Push)",
        exercises: [
            { name: "Bench press", sets: 3, reps: "8-10" },
            { name: "Overhead press", sets: 3, reps: "10-12" },
            { name: "Incline dumbbell press", sets: 3, reps: "10-12" },
            { name: "Tricep dips", sets: 3, reps: "12-15" },
            { name: "Overhead tricep extension", sets: 3, reps: "12-15" },
            { name: "Lateral raises", sets: 3, reps: "15-20" }
        ]
    },
    "dan3": {
        id: "dan3",
        title: "LOWER 2 (Noge + Core)",
        exercises: [
            { name: "Squats", sets: 3, reps: "10-12" },
            { name: "Bulgarian split squats", sets: 3, reps: "10 per leg" },
            { name: "Calf raises", sets: 4, reps: "15-20" },
            { name: "Hanging leg raises", sets: 3, reps: "12-15" },
            { name: "Bicycle crunches", sets: 3, reps: "20 per side" },
            { name: "Mountain climbers", sets: 3, reps: "30 sec" }
        ]
    },
    "dan4": {
        id: "dan4",
        title: "UPPER 2 (Pull)",
        exercises: [
            { name: "Deadlift", sets: 3, reps: "8-10" },
            { name: "Pull-ups or Lat pulldown", sets: 3, reps: "8-12" },
            { name: "Bent-over rows", sets: 3, reps: "10-12" },
            { name: "Face pulls", sets: 3, reps: "15-20" },
            { name: "Bicep curls", sets: 3, reps: "12-15" },
            { name: "Hammer curls", sets: 3, reps: "12-15" }
        ]
    },
    // Continue with days 5-28 following the program structure
    // This is a placeholder - full 28-day program data should be added
    "dan5": { id: "dan5", title: "REST OR LIGHT CARDIO", exercises: [] },
    "dan6": { id: "dan6", title: "LOWER 3 (Noge + Core)", exercises: [] },
    "dan7": { id: "dan7", title: "UPPER 3 (Push)", exercises: [] },
    "dan8": { id: "dan8", title: "LOWER 4 (Noge + Core)", exercises: [] },
    "dan9": { id: "dan9", title: "UPPER 4 (Pull)", exercises: [] },
    "dan10": { id: "dan10", title: "REST OR LIGHT CARDIO", exercises: [] },
    "dan11": { id: "dan11", title: "LOWER 5 (Noge + Core)", exercises: [] },
    "dan12": { id: "dan12", title: "UPPER 5 (Push)", exercises: [] },
    "dan13": { id: "dan13", title: "LOWER 6 (Noge + Core)", exercises: [] },
    "dan14": { id: "dan14", title: "UPPER 6 (Pull)", exercises: [] },
    "dan15": { id: "dan15", title: "REST OR LIGHT CARDIO", exercises: [] },
    "dan16": { id: "dan16", title: "LOWER 7 (Noge + Core)", exercises: [] },
    "dan17": { id: "dan17", title: "UPPER 7 (Push)", exercises: [] },
    "dan18": { id: "dan18", title: "LOWER 8 (Noge + Core)", exercises: [] },
    "dan19": { id: "dan19", title: "UPPER 8 (Pull)", exercises: [] },
    "dan20": { id: "dan20", title: "REST OR LIGHT CARDIO", exercises: [] },
    "dan21": { id: "dan21", title: "LOWER 9 (Noge + Core)", exercises: [] },
    "dan22": { id: "dan22", title: "UPPER 9 (Push)", exercises: [] },
    "dan23": { id: "dan23", title: "LOWER 10 (Noge + Core)", exercises: [] },
    "dan24": { id: "dan24", title: "UPPER 10 (Pull)", exercises: [] },
    "dan25": { id: "dan25", title: "REST OR LIGHT CARDIO", exercises: [] },
    "dan26": { id: "dan26", title: "LOWER 11 (Noge + Core)", exercises: [] },
    "dan27": { id: "dan27", title: "UPPER 11 (Push)", exercises: [] },
    "dan28": { id: "dan28", title: "FINAL DAY - Full Body", exercises: [] }
};

// Make available globally for backward compatibility
window.TRAINING_DATA = TRAINING_DATA;