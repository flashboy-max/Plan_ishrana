// MealCard.js - Komponenta za prikaz obroka
export class MealCard {
    constructor(mealData, mealType, dayNumber) {
        this.data = mealData;
        this.mealType = mealType; // 'obrok1' or 'obrok2'
        this.dayNumber = dayNumber;
        this.element = null;
    }

    render() {
        if (!this.data) {
            return this.renderEmptyCard();
        }

        const mealLabel = this.mealType === 'obrok1' ? 'Obrok 1 (13:00)' : 'Obrok 2 (17:30)';

        return `
            <div class="meal-card bg-gray-800/50 border border-gray-600/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300" data-meal="${this.mealType}" data-day="${this.dayNumber}">
                <div class="meal-header flex justify-between items-start mb-6">
                    <div class="meal-info">
                        <h2 class="meal-title text-2xl font-bold text-white mb-2">${this.data.name}</h2>
                        <div class="meal-meta flex items-center space-x-4 text-sm text-gray-400">
                            <span class="meal-time flex items-center"><i class="far fa-clock mr-1"></i> ${mealLabel}</span>
                            <span class="meal-calories flex items-center"><i class="fas fa-fire mr-1 text-orange-400"></i> ${this.data.calories} kcal</span>
                        </div>
                    </div>
                    <div class="meal-day-badge bg-cyan-600/20 px-3 py-2 rounded-full">
                        <span class="text-cyan-300 font-medium">Dan ${this.dayNumber}</span>
                    </div>
                </div>

                <div class="meal-macros grid grid-cols-3 gap-4 mb-8">
                    <div class="macro-item bg-blue-600/20 p-4 rounded-lg text-center border border-blue-500/20">
                        <div class="macro-label text-blue-300 text-xs font-medium mb-2 uppercase tracking-wide">Proteini</div>
                        <div class="macro-value text-white text-xl font-bold">${this.data.macros.protein}g</div>
                    </div>
                    <div class="macro-item bg-yellow-600/20 p-4 rounded-lg text-center border border-yellow-500/20">
                        <div class="macro-label text-yellow-300 text-xs font-medium mb-2 uppercase tracking-wide">Masti</div>
                        <div class="macro-value text-white text-xl font-bold">${this.data.macros.fat}g</div>
                    </div>
                    <div class="macro-item bg-green-600/20 p-4 rounded-lg text-center border border-green-500/20">
                        <div class="macro-label text-green-300 text-xs font-medium mb-2 uppercase tracking-wide">UH</div>
                        <div class="macro-value text-white text-xl font-bold">${this.data.macros.carbs}g</div>
                    </div>
                    <div class="macro-percentage col-span-3 text-center text-gray-400 text-sm mt-4 p-2 bg-gray-700/30 rounded-lg">${this.data.macros.percentages}</div>
                </div>

                <div class="meal-details grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-700/30 rounded-lg">
                    <div class="meal-prep flex items-center text-gray-300">
                        <i class="fas fa-clock text-cyan-400 mr-2"></i>
                        <span class="text-sm">${this.data.prepTime}</span>
                    </div>
                    <div class="meal-portion flex items-center text-gray-300">
                        <i class="fas fa-weight text-cyan-400 mr-2"></i>
                        <span class="text-sm">${this.data.portion}</span>
                    </div>
                </div>

                <div class="meal-ingredients mb-6">
                    <h3 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                        <i class="fas fa-utensils mr-2"></i>Sastojci:
                    </h3>
                    <ul class="ingredients-list space-y-2">
                        ${this.data.ingredients.map(ingredient => `
                            <li class="ingredient-item bg-gray-700/30 p-3 rounded-lg flex justify-between items-center">
                                <span class="ingredient-name text-white font-medium">${ingredient.item}</span>
                                <span class="ingredient-details text-gray-400 text-sm">${ingredient.details}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="meal-instructions mb-6">
                    <h3 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                        <i class="fas fa-list-ol mr-2"></i>Uputstvo za pripremu:
                    </h3>
                    <ol class="instructions-list space-y-2">
                        ${this.data.instructions.map((instruction, index) => `
                            <li class="instruction-item flex items-start">
                                <span class="inline-flex items-center justify-center w-6 h-6 bg-cyan-600 text-white text-sm font-bold rounded-full mr-3 mt-0.5 flex-shrink-0">${index + 1}</span>
                                <span class="text-gray-300">${instruction}</span>
                            </li>
                        `).join('')}
                    </ol>
                </div>

                ${this.data.supplements && this.data.supplements.length > 0 ? `
                    <div class="meal-supplements mb-6">
                        <h3 class="text-lg font-semibold text-cyan-300 mb-3 flex items-center">
                            <i class="fas fa-pills mr-2"></i>Preporučeni suplementi:
                        </h3>
                        <div class="supplements-list flex flex-wrap gap-2">
                            ${this.data.supplements.map(supplement => `
                                <span class="supplement-tag bg-purple-600/20 border border-purple-500/30 px-3 py-1 rounded-full text-purple-300 text-sm">${supplement}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${this.data.alternatives && this.data.alternatives.length > 0 ? `
                    <div class="meal-alternatives mb-8">
                        <h3 class="text-lg font-semibold text-cyan-300 mb-6 flex items-center">
                            <i class="fas fa-exchange-alt mr-2"></i>Alternative:
                        </h3>
                        <div class="alternatives-grid grid gap-6 md:grid-cols-2">
                            ${this.data.alternatives.map(alt => `
                                <div class="alternative-card bg-gray-700/30 border border-gray-600/50 rounded-xl p-5 hover:bg-gray-700/50 transition-all duration-200">
                                    <div class="flex justify-between items-start mb-3">
                                        <h5 class="font-semibold text-white text-base leading-tight">${alt.name}</h5>
                                        <span class="text-orange-400 font-bold text-sm ml-3 flex-shrink-0">${alt.calories} kcal</span>
                                    </div>
                                    <div class="macro-info flex gap-3 mb-3 text-sm">
                                        <span class="text-blue-400 bg-blue-400/10 px-2 py-1 rounded">${alt.macros.protein}g P</span>
                                        <span class="text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">${alt.macros.fat}g M</span>
                                        <span class="text-green-400 bg-green-400/10 px-2 py-1 rounded">${alt.macros.carbs}g UH</span>
                                    </div>
                                    <p class="text-cyan-300 text-sm mb-3 leading-relaxed">
                                        <i class="fas fa-lightbulb mr-2"></i>${alt.benefits}
                                    </p>
                                    <div class="ingredients-preview text-gray-300 text-sm">
                                        <i class="fas fa-list-ul mr-2 text-gray-500"></i>
                                        ${alt.ingredients.join(', ')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="meal-navigation mt-10 p-4 bg-gray-800/30 rounded-xl">
                    <!-- Desktop Layout -->
                    <div class="hidden md:flex items-center justify-between gap-4">
                        <button class="nav-btn prev-meal flex items-center space-x-2 px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 min-w-[140px]" data-direction="-1">
                            <i class="fas fa-chevron-left text-cyan-400"></i>
                            <span class="text-white text-sm font-medium">${this.mealType === 'obrok2' ? 'Prethodni obrok' : 'Prethodni dan'}</span>
                        </button>

                        <div class="meal-switcher flex bg-gray-700/60 rounded-xl p-1.5 gap-1">
                            <button class="meal-switch-btn px-6 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium min-w-[80px] ${this.mealType === 'obrok1' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-600/50'}" data-meal="obrok1">
                                Obrok 1
                            </button>
                            <button class="meal-switch-btn px-6 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium min-w-[80px] ${this.mealType === 'obrok2' ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-gray-600/50'}" data-meal="obrok2">
                                Obrok 2
                            </button>
                        </div>

                        <button class="nav-btn next-meal flex items-center space-x-2 px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 min-w-[140px]" data-direction="1">
                            <span class="text-white text-sm font-medium">${this.mealType === 'obrok1' ? 'Sledeći obrok' : 'Sledeći dan'}</span>
                            <i class="fas fa-chevron-right text-cyan-400"></i>
                        </button>
                    </div>

                    <!-- Mobile Layout -->
                    <div class="md:hidden space-y-4">
                        <div class="meal-switcher flex bg-gray-700/60 rounded-xl p-1.5 gap-1 w-full">
                            <button class="meal-switch-btn flex-1 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${this.mealType === 'obrok1' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}" data-meal="obrok1">
                                Obrok 1
                            </button>
                            <button class="meal-switch-btn flex-1 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${this.mealType === 'obrok2' ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:text-white'}" data-meal="obrok2">
                                Obrok 2
                            </button>
                        </div>

                        <div class="flex gap-3">
                            <button class="nav-btn prev-meal flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200" data-direction="-1">
                                <i class="fas fa-chevron-left text-cyan-400"></i>
                                <span class="text-white text-sm">Prethodni</span>
                            </button>
                            <button class="nav-btn next-meal flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200" data-direction="1">
                                <span class="text-white text-sm">Sledeći</span>
                                <i class="fas fa-chevron-right text-cyan-400"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyCard() {
        return `
            <div class="meal-card empty bg-gray-800/30 border border-gray-600/30 rounded-xl p-8">
                <div class="empty-state text-center">
                    <i class="fas fa-utensils text-4xl text-gray-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-400 mb-2">Nema podataka za obrok</h3>
                    <p class="text-gray-500">Podaci za ovaj obrok još nisu dostupni.</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Event listeners are now handled by MealManager directly
        // This method is kept for compatibility but doesn't attach events anymore
        debugLog('[MealCard] Event listeners handled by MealManager');
    }

    destroy() {
        // Cleanup
        this.element = null;
        debugLog(`[MealCard] Card for day ${this.dayNumber}, meal ${this.mealType} destroyed`);
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[MealCard]', ...args);
    }
}
