// TrainingManager.js - Upravljanje trening programom
import { TrainingCard } from './TrainingCard.js';

export class TrainingManager {
    constructor(containerId, trainingData = null) {
        this.container = document.getElementById(containerId);
        this.data = trainingData || window.planData;
        this.currentDay = this.getCurrentDay();
        
        // Listen for day changes from other managers
        window.addEventListener('dayChanged', (event) => {
            if (event.detail.source !== 'TrainingManager') {
                debugLog(`[TrainingManager] Day changed by ${event.detail.source} to day ${event.detail.day}`);
                this.setCurrentDay(event.detail.day);
            }
        });
    }

    init() {
        this.renderCurrentDay();
        this.setupEventListeners();
        debugLog('[TrainingManager] Initialized');
    }

    renderCurrentDay() {
        if (!this.container) {
            console.error('[TrainingManager] Container not found');
            return;
        }

        if (!this.data) {
            console.error('[TrainingManager] No training data available');
            return;
        }

        const dayKey = `Dan ${this.currentDay}`;
        const dayData = this.data[dayKey];
        
        if (!dayData) {
            console.error(`[TrainingManager] No data for day ${this.currentDay}`);
            return;
        }

        // Add day info to the data
        const enrichedData = {
            ...dayData,
            day: this.currentDay,
            totalDays: 28
        };

        const card = new TrainingCard(enrichedData);
        this.container.innerHTML = card.render();

        // Setup navigation event listeners
        this.setupNavigationListeners();
        
        // Setup exercise completion listeners
        this.setupExerciseListeners();

        debugLog(`[TrainingManager] Rendered day ${this.currentDay}`);
    }

    getCurrentDay() {
        const startDate = new Date('2025-09-14');
        const today = new Date();
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return Math.min(Math.max(diffDays, 1), 28);
    }

    setCurrentDay(day) {
        this.currentDay = Math.min(Math.max(day, 1), 28);
        this.renderCurrentDay();
    }

    nextDay() {
        if (this.currentDay < 28) {
            this.currentDay++;
            this.renderCurrentDay();
            
            // Notify other managers about day change
            window.dispatchEvent(new CustomEvent('dayChanged', { 
                detail: { day: this.currentDay, source: 'TrainingManager' } 
            }));
        }
    }

    previousDay() {
        if (this.currentDay > 1) {
            this.currentDay--;
            this.renderCurrentDay();
            
            // Notify other managers about day change
            window.dispatchEvent(new CustomEvent('dayChanged', { 
                detail: { day: this.currentDay, source: 'TrainingManager' } 
            }));
        }
    }

    setupNavigationListeners() {
        // Navigation buttons
        const prevBtn = this.container.querySelector('.prev-day');
        const nextBtn = this.container.querySelector('.next-day');

        if (prevBtn && !prevBtn.disabled) {
            prevBtn.addEventListener('click', () => this.previousDay());
        }

        if (nextBtn && !nextBtn.disabled) {
            nextBtn.addEventListener('click', () => this.nextDay());
        }
    }

    setupExerciseListeners() {
        // Exercise completion buttons
        const completeBtns = this.container.querySelectorAll('.exercise-complete-btn');
        completeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exerciseBtn = e.target.closest('.exercise-complete-btn');
                this.markExerciseComplete(exerciseBtn);
            });
        });
    }

    markExerciseComplete(btn) {
        if (btn) {
            btn.classList.add('completed', 'bg-green-600/40', 'cursor-not-allowed');
            btn.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Završeno';
            btn.disabled = true;
        }
    }

    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
                switch (event.key) {
                    case 'ArrowRight':
                        event.preventDefault();
                        this.nextDay();
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        this.previousDay();
                        break;
                }
            }
        });
    }

    refresh() {
        this.currentDay = this.getCurrentDay();
        this.renderCurrentDay();
    }

    destroy() {
        // Cleanup if needed
        debugLog('[TrainingManager] Destroyed');
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[TrainingManager]', ...args);
    }
}