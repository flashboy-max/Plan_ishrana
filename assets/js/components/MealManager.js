// MealManager.js - Upravljanje obrokom
import { MEALS_DATA } from '../../data/meals/mealsData.js';
import { MealCard } from './MealCard.js';

export class MealManager {
    constructor(containerId, mealsData = MEALS_DATA) {
        this.container = document.getElementById(containerId);
        this.data = mealsData;
        this.currentDay = this.getCurrentDay();
        this.currentMeal = 'obrok1'; // 'obrok1' or 'obrok2'
    }

    init() {
        this.renderCurrentMeal();
        this.setupEventListeners();
        debugLog('[MealManager] Initialized');
    }

    renderCurrentMeal() {
        if (!this.container) {
            console.error('[MealManager] Container not found');
            return;
        }

        const dayData = this.data[this.currentDay];
        if (!dayData || !dayData[this.currentMeal]) {
            console.error(`[MealManager] No data for day ${this.currentDay}, meal ${this.currentMeal}`);
            return;
        }

        const mealData = dayData[this.currentMeal];
        const card = new MealCard(mealData, this.currentMeal, this.currentDay);
        this.container.innerHTML = card.render();

        // Setup card event listeners after DOM update
        setTimeout(() => {
            this.setupCardEventListeners();
        }, 50);

        debugLog(`[MealManager] Rendered day ${this.currentDay}, meal ${this.currentMeal}`);
    }

    getCurrentDay() {
        const startDate = new Date('2025-09-14');
        const today = new Date();
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return Math.min(Math.max(diffDays, 1), 28);
    }

    setCurrentDay(day) {
        this.currentDay = Math.min(Math.max(day, 1), 28);
        this.renderCurrentMeal();
    }

    setCurrentMeal(meal) {
        if (meal === 'obrok1' || meal === 'obrok2') {
            this.currentMeal = meal;
            this.renderCurrentMeal();
        }
    }

    nextMeal() {
        if (this.currentMeal === 'obrok1') {
            this.currentMeal = 'obrok2';
        } else {
            // Move to next day
            if (this.currentDay < 28) {
                this.currentDay++;
                this.currentMeal = 'obrok1';
            }
        }
        this.renderCurrentMeal();
    }

    previousMeal() {
        if (this.currentMeal === 'obrok2') {
            this.currentMeal = 'obrok1';
        } else {
            // Move to previous day
            if (this.currentDay > 1) {
                this.currentDay--;
                this.currentMeal = 'obrok2';
            }
        }
        this.renderCurrentMeal();
    }

    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
                switch (event.key) {
                    case 'ArrowRight':
                        event.preventDefault();
                        this.nextMeal();
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        this.previousMeal();
                        break;
                    case '1':
                        event.preventDefault();
                        this.setCurrentMeal('obrok1');
                        break;
                    case '2':
                        event.preventDefault();
                        this.setCurrentMeal('obrok2');
                        break;
                }
            }
        });

        // Listen for custom events from MealCard
        document.addEventListener('mealNavigation', (e) => {
            this.handleNavigation(e.detail.direction);
        });

        document.addEventListener('mealSwitch', (e) => {
            this.switchMeal(e.detail.meal);
        });
    }

    setupCardEventListeners() {
        // Navigation buttons
        const prevBtn = this.container.querySelector('.prev-meal');
        const nextBtn = this.container.querySelector('.next-meal');
        const meal1Btn = this.container.querySelector('.meal-switch-btn[data-meal="obrok1"]');
        const meal2Btn = this.container.querySelector('.meal-switch-btn[data-meal="obrok2"]');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                debugLog('[MealManager] 🔄 Previous button clicked');
                this.handleNavigation(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                debugLog('[MealManager] 🔄 Next button clicked');
                this.handleNavigation(1);
            });
        }

        if (meal1Btn) {
            meal1Btn.addEventListener('click', (e) => {
                e.preventDefault();
                debugLog('[MealManager] 🔄 Meal 1 button clicked');
                this.switchMeal('obrok1');
            });
        }

        if (meal2Btn) {
            meal2Btn.addEventListener('click', (e) => {
                e.preventDefault();
                debugLog('[MealManager] 🔄 Meal 2 button clicked');
                this.switchMeal('obrok2');
            });
        }

        debugLog('[MealManager] 🎧 Card event listeners attached');
    }

    handleNavigation(direction) {
        debugLog(`[MealManager] 🧭 Navigation triggered: ${direction > 0 ? 'next' : 'previous'}`);
        debugLog(`[MealManager] 📍 Current: day ${this.currentDay}, meal ${this.currentMeal}`);

        if (direction === 1) { // Next
            if (this.currentMeal === 'obrok1') {
                debugLog('[MealManager] ➡️ Switching to obrok2');
                this.switchMeal('obrok2');
            } else {
                debugLog('[MealManager] ➡️ Going to next day');
                this.nextDay();
            }
        } else if (direction === -1) { // Previous
            if (this.currentMeal === 'obrok2') {
                debugLog('[MealManager] ⬅️ Switching to obrok1');
                this.switchMeal('obrok1');
            } else {
                debugLog('[MealManager] ⬅️ Going to previous day');
                this.previousDay();
            }
        }
    }

    switchMeal(meal) {
        if (meal === 'obrok1' || meal === 'obrok2') {
            this.currentMeal = meal;
            debugLog(`[MealManager] 🔄 Switched to meal: ${meal}`);
            this.renderCurrentMeal();
        }
    }

    nextDay() {
        if (this.currentDay < 28) {
            this.currentDay++;
            this.currentMeal = 'obrok1'; // Reset to first meal of new day
            debugLog(`[MealManager] ➡️ Moved to day: ${this.currentDay}`);
            this.renderCurrentMeal();
        }
    }

    previousDay() {
        if (this.currentDay > 1) {
            this.currentDay--;
            this.currentMeal = 'obrok2'; // Go to last meal of previous day
            debugLog(`[MealManager] ⬅️ Moved to day: ${this.currentDay}`);
            this.renderCurrentMeal();
        }
    }

    refresh() {
        this.currentDay = this.getCurrentDay();
        this.renderCurrentMeal();
    }

    destroy() {
        // Cleanup if needed
        debugLog('[MealManager] Destroyed');
    }

    // Get meal data for external use
    getCurrentMealData() {
        const dayData = this.data[this.currentDay];
        return dayData ? dayData[this.currentMeal] : null;
    }

    getMealData(day, meal) {
        const dayData = this.data[day];
        return dayData ? dayData[meal] : null;
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[MealManager]', ...args);
    }
}
