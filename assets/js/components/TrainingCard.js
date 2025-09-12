// TrainingCard.js - Komponenta za trening kartice

// Helper function for debugging
const debugLog = (message) => {
    if (window.DEBUG_MODE || true) {
        console.log(`[DEBUG] ${message}`);
    }
};

export class TrainingCard {
    constructor(dayData) {
        this.data = dayData;
        this.element = null;
    }

    render() {
        if (!this.data) {
            return this.renderEmptyCard();
        }

        const isRestDay = this.data.trening.toLowerCase().includes('rest') || 
                         this.data.trening.toLowerCase().includes('odmor');

        return `
            <div class="training-card bg-gray-800/50 rounded-xl p-6 border border-gray-600">
                <!-- Header with Day Info -->
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h2 class="text-xl font-bold text-white mb-1">${this.data.trening}</h2>
                        <p class="text-cyan-300 text-sm">${this.data.fokus}</p>
                    </div>
                    <div class="bg-cyan-600/20 border border-cyan-500/50 rounded-lg px-3 py-2">
                        <span class="text-cyan-300 font-semibold">Dan ${this.data.day}</span>
                    </div>
                </div>

                <!-- Training Content -->
                <div class="space-y-4 mb-6">
                    ${isRestDay ? this.renderRestDay() : this.renderTrainingDay()}
                </div>

                <!-- Navigation -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-700">
                    <button class="prev-day flex items-center px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white rounded-lg transition-colors ${this.data.day <= 1 ? 'opacity-50 cursor-not-allowed' : ''}" ${this.data.day <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left mr-2"></i>
                        Prethodni dan
                    </button>
                    
                    <div class="text-gray-400 text-sm">
                        ${this.data.day} / ${this.data.totalDays}
                    </div>
                    
                    <button class="next-day flex items-center px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 hover:text-cyan-200 rounded-lg transition-colors ${this.data.day >= this.data.totalDays ? 'opacity-50 cursor-not-allowed' : ''}" ${this.data.day >= this.data.totalDays ? 'disabled' : ''}>
                        Sledeći dan
                        <i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderTrainingDay() {
        // Koristi detaljne vježbe iz TRAINING_DATA ako su dostupne
        debugLog(`🏋️ TrainingCard.renderTrainingDay - day: ${this.data.day}`);
        debugLog(`🏋️ window.TRAINING_DATA available: ${!!window.TRAINING_DATA}`);
        
        if (window.TRAINING_DATA) {
            const trainingKey = `dan${this.data.day}`;
            const trainingData = window.TRAINING_DATA[trainingKey];
            
            debugLog(`🏋️ Looking for key: ${trainingKey}`);
            debugLog(`🏋️ Found trainingData: ${!!trainingData}`);
            if (trainingData) {
                debugLog(`🏋️ Exercises count: ${trainingData.exercises?.length || 0}`);
            }
            
            if (trainingData && trainingData.exercises && trainingData.exercises.length > 0) {
                return `
                    <div class="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                        <h3 class="text-blue-300 font-semibold mb-3 flex items-center">
                            <i class="fas fa-dumbbell mr-2"></i>
                            Detaljne Vježbe
                        </h3>
                        <div class="space-y-2">
                            ${trainingData.exercises.map((exercise, index) => this.renderDetailedExercise(exercise, index)).join('')}
                        </div>
                        <div class="mt-4 p-3 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-600/20">
                            <div class="flex items-center justify-between text-sm">
                                <div class="flex items-center text-cyan-300">
                                    <i class="fas fa-stopwatch mr-2"></i>
                                    <span>Ukupno vježbi: <strong>${trainingData.exercises.length}</strong></span>
                                </div>
                                <div class="flex items-center text-blue-300">
                                    <i class="fas fa-fire mr-2"></i>
                                    <span>Tip: <strong>${trainingData.title}</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Fallback na checklist vježbe ako nema detaljnih podataka
        const trainingItems = this.data.checklist.filter(item => 
            item.toLowerCase().includes('trening:')
        );

        if (trainingItems.length === 0) {
            return `<div class="text-gray-400 text-center py-4">Nema definisanih vježbi za ovaj dan</div>`;
        }

        return `
            <div class="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <h3 class="text-blue-300 font-semibold mb-3 flex items-center">
                    <i class="fas fa-dumbbell mr-2"></i>
                    Trening Plan
                </h3>
                <div class="space-y-2">
                    ${trainingItems.map(item => this.renderExercise(item)).join('')}
                </div>
            </div>
        `;
    }

    renderRestDay() {
        return `
            <div class="bg-green-900/20 border border-green-600/30 rounded-lg p-6 text-center">
                <i class="fas fa-bed text-green-400 text-3xl mb-3"></i>
                <h3 class="text-green-300 font-semibold mb-2">Dan Odmora</h3>
                <p class="text-gray-300">Lagana kardio aktivnost ili potpuni odmor</p>
            </div>
        `;
    }

    renderDetailedExercise(exercise, index) {
        return `
            <div class="exercise-item bg-gray-800/40 p-3 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-all">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="exercise-number bg-cyan-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mr-3">
                            ${index + 1}
                        </span>
                        <span class="exercise-name text-white font-medium">${exercise.name}</span>
                    </div>
                    <div class="exercise-details text-right">
                        <div class="sets-reps text-cyan-300 text-sm font-semibold">
                            ${exercise.sets} × ${exercise.reps}
                        </div>
                        <button class="exercise-complete-btn mt-1 px-2 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded text-xs transition-colors" data-exercise="${exercise.name}">
                            <i class="fas fa-check mr-1"></i>
                            Završeno
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderExercise(exerciseItem) {
        // Parse exercise from checklist format: "Trening: Exercise name 3x8-10"
        const exerciseText = exerciseItem.replace('Trening: ', '').trim();
        
        return `
            <div class="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div class="flex-1">
                    <span class="text-white">${exerciseText}</span>
                </div>
                <button class="exercise-complete-btn ml-3 px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-300 rounded text-sm transition-colors" data-exercise="${exerciseText}">
                    <i class="fas fa-check mr-1"></i>
                    Završeno
                </button>
            </div>
        `;
    }

    renderEmptyCard() {
        return `
            <div class="training-card empty">
                <div class="empty-state">
                    <i class="fas fa-calendar-alt"></i>
                    <h3>Nema podataka za trening</h3>
                    <p>Podaci za ovaj dan još nisu dostupni.</p>
                </div>
            </div>
        `;
    }

    setupExerciseListeners() {
        // Exercise completion buttons - will be handled by parent component
        const completeBtns = document.querySelectorAll('.exercise-complete-btn');
        completeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exerciseName = e.target.closest('.exercise-complete-btn').dataset.exercise;
                this.markExerciseComplete(e.target.closest('.exercise-complete-btn'));
            });
        });
    }

    markExerciseComplete(btn) {
        if (btn) {
            btn.classList.add('completed', 'bg-green-600/40');
            btn.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Završeno';
            btn.disabled = true;
        }

        debugLog(`[TrainingCard] Exercise completed`);
    }

    destroy() {
        // Cleanup
        this.element = null;
        debugLog(`[TrainingCard] Card for ${this.data?.id} destroyed`);
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[TrainingCard]', ...args);
    }
}