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
            <div class="meal-card" data-meal="${this.mealType}" data-day="${this.dayNumber}">
                <div class="meal-header">
                    <div class="meal-info">
                        <h2 class="meal-title">${this.data.name}</h2>
                        <div class="meal-meta">
                            <span class="meal-time">${mealLabel}</span>
                            <span class="meal-calories">${this.data.calories} kcal</span>
                        </div>
                    </div>
                    <div class="meal-day-badge">Dan ${this.dayNumber}</div>
                </div>

                <div class="meal-macros">
                    <div class="macro-item">
                        <span class="macro-label">Proteini:</span>
                        <span class="macro-value">${this.data.macros.protein}g</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-label">Masti:</span>
                        <span class="macro-value">${this.data.macros.fat}g</span>
                    </div>
                    <div class="macro-item">
                        <span class="macro-label">UH:</span>
                        <span class="macro-value">${this.data.macros.carbs}g</span>
                    </div>
                    <div class="macro-percentage">${this.data.macros.percentages}</div>
                </div>

                <div class="meal-details">
                    <div class="meal-prep">
                        <i class="fas fa-clock"></i>
                        <span>Vrijeme pripreme: ${this.data.prepTime}</span>
                    </div>
                    <div class="meal-portion">
                        <i class="fas fa-weight"></i>
                        <span>Porcija: ${this.data.portion}</span>
                    </div>
                </div>

                <div class="meal-ingredients">
                    <h3>Sastojci:</h3>
                    <ul class="ingredients-list">
                        ${this.data.ingredients.map(ingredient => `
                            <li class="ingredient-item">
                                <span class="ingredient-name">${ingredient.item}</span>
                                <span class="ingredient-details">${ingredient.details}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="meal-instructions">
                    <h3>Uputstvo za pripremu:</h3>
                    <ol class="instructions-list">
                        ${this.data.instructions.map(instruction => `
                            <li class="instruction-item">${instruction}</li>
                        `).join('')}
                    </ol>
                </div>

                ${this.data.supplements && this.data.supplements.length > 0 ? `
                    <div class="meal-supplements">
                        <h3>Preporučeni suplementi:</h3>
                        <div class="supplements-list">
                            ${this.data.supplements.map(supplement => `
                                <span class="supplement-tag">${supplement}</span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${this.data.alternatives && this.data.alternatives.length > 0 ? `
                    <div class="meal-alternatives">
                        <h3>Alternative:</h3>
                        <div class="alternatives-list">
                            ${this.data.alternatives.map(alt => `
                                <div class="alternative-item">
                                    <div class="alternative-header">
                                        <span class="alternative-name">${alt.name}</span>
                                        <span class="alternative-calories">${alt.calories} kcal</span>
                                    </div>
                                    <div class="alternative-macros">
                                        ${alt.macros.protein}g P, ${alt.macros.fat}g M, ${alt.macros.carbs}g UH
                                    </div>
                                    <div class="alternative-benefits">${alt.benefits}</div>
                                    <div class="alternative-ingredients">
                                        ${alt.ingredients.join(', ')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="meal-navigation">
                    <button class="nav-btn prev-meal" data-direction="-1">
                        <i class="fas fa-chevron-left"></i>
                        ${this.mealType === 'obrok2' ? 'Prethodni obrok' : 'Prethodni dan'}
                    </button>
                    <div class="meal-switcher">
                        <button class="meal-switch-btn ${this.mealType === 'obrok1' ? 'active' : ''}" data-meal="obrok1">
                            Obrok 1
                        </button>
                        <button class="meal-switch-btn ${this.mealType === 'obrok2' ? 'active' : ''}" data-meal="obrok2">
                            Obrok 2
                        </button>
                    </div>
                    <button class="nav-btn next-meal" data-direction="1">
                        ${this.mealType === 'obrok1' ? 'Sledeći obrok' : 'Sledeći dan'}
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderEmptyCard() {
        return `
            <div class="meal-card empty">
                <div class="empty-state">
                    <i class="fas fa-utensils"></i>
                    <h3>Nema podataka za obrok</h3>
                    <p>Podaci za ovaj obrok još nisu dostupni.</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Navigation buttons
        const prevBtn = this.element?.querySelector('.prev-meal');
        const nextBtn = this.element?.querySelector('.next-meal');
        const mealSwitchBtns = this.element?.querySelectorAll('.meal-switch-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const event = new CustomEvent('mealNavigation', { detail: { direction: -1 } });
                document.dispatchEvent(event);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const event = new CustomEvent('mealNavigation', { detail: { direction: 1 } });
                document.dispatchEvent(event);
            });
        }

        mealSwitchBtns?.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const meal = e.target.dataset.meal;
                const event = new CustomEvent('mealSwitch', { detail: { meal } });
                document.dispatchEvent(event);
            });
        });
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

export { MealCard };