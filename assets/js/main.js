// main.js - Clean orchestrator for modular architecture
import { SupplementManager } from './components/SupplementManager.js';
import { TrainingManager } from './components/TrainingManager.js';
import { MealManager } from './components/MealManager.js';
import { ChecklistManager } from './components/ChecklistManager.js';
import { initializeIFTimer } from './components/ifTimer.js';
import { planData } from '../data/plan/planData.js';
import { TRAINING_DATA } from '../data/training/trainingData.js';
import { MEALS_DATA } from '../data/meals/mealsData.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Ensure planData is available globally
    if (!window.planData && planData) {
        window.planData = planData;
        debugLog('📅 PlanData set from ES6 module import');
    }
    
    // Ensure training data is available globally for weekly overview
    if (!window.TRAINING_DATA && TRAINING_DATA) {
        window.TRAINING_DATA = TRAINING_DATA;
        debugLog('🏋️ Training data set globally for weekly overview');
    }
    
    // Ensure meals data is available globally for weekly overview
    if (!window.MEALS_DATA && MEALS_DATA) {
        window.MEALS_DATA = MEALS_DATA;
        debugLog('🍽️ Meals data set globally for weekly overview');
    }
    
    await waitForData();

    // Initialize IF Timer
    initializeIFTimer();

    // Initialize Supplement Manager
    const supplementManager = new SupplementManager();
    await supplementManager.init();

    // Initialize Training Manager
    const trainingManager = new TrainingManager('training-container');
    trainingManager.init();

    // Initialize Meal Manager
    const mealManager = new MealManager('meals-container');
    mealManager.init();

    // Initialize Checklist Manager
    debugLog('📋 Initializing Checklist Manager...');
    debugLog('📋 Container element:', document.getElementById('checklist-container'));
    debugLog('📋 PlanData available:', !!window.planData);
    
    const checklistManager = new ChecklistManager('checklist-container');
    debugLog('📋 ChecklistManager created:', checklistManager);

    // Wait a bit for DOM to be ready
    setTimeout(() => {
        debugLog('📋 About to call init()...');
        checklistManager.init().then(() => {
            debugLog('📋 ChecklistManager init completed');
        }).catch(error => {
            console.error('📋 ChecklistManager init failed:', error);
        });
        window.checklistManager = checklistManager;
        debugLog('✅ Checklist Manager initialized');
    }, 100);

    // Initialize modal system
    if (typeof initializeModals === 'function') {
        initializeModals();
        debugLog('✅ Modal system initialized');
    }

    // Initialize collapsible sections
    initializeCollapsibleSections();
    debugLog('✅ Collapsible sections initialized');

    // Initialize legacy functions for accordion and weekly content
    initializeAccordion();
    
    // Initialize weekly content with graceful fallback
    setTimeout(() => {
        initializeWeeklyContent();
    }, 200); // Give planData.js time to load

    debugLog('✅ All managers and legacy functions initialized successfully');

    // Error handling for module loading
    window.addEventListener('error', (e) => {
        if (e.filename && e.filename.includes('.js')) {
            console.error(`❌ Module loading error: ${e.filename}:${e.lineno} - ${e.message}`);
        }
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('❌ Unhandled promise rejection:', e.reason);
    });
});

async function waitForData() {
    return new Promise(resolve => {
        let attempts = 0;
        const maxAttempts = 50; // Max 5 seconds
        
        const check = () => {
            attempts++;
            
            if (window.SUPPLEMENTS_DATA && window.TRAINING_DATA && window.planData && window.MEALS_DATA) {
                debugLog('✅ All data loaded:', {
                    supplements: !!window.SUPPLEMENTS_DATA,
                    training: !!window.TRAINING_DATA,
                    plan: !!window.planData,
                    meals: !!window.MEALS_DATA
                });
                resolve();
            } else if (attempts >= maxAttempts) {
                debugLog('⚠️ Timeout waiting for data, proceeding with available data:', {
                    supplements: !!window.SUPPLEMENTS_DATA,
                    training: !!window.TRAINING_DATA,
                    plan: !!window.planData,
                    meals: !!window.MEALS_DATA
                });
                resolve(); // Proceed anyway
            } else {
                debugLog('⏳ Waiting for data... (attempt ' + attempts + '/' + maxAttempts + ')', {
                    supplements: !!window.SUPPLEMENTS_DATA,
                    training: !!window.TRAINING_DATA,
                    plan: !!window.planData,
                    meals: !!window.MEALS_DATA
                });
                setTimeout(check, 100);
            }
        };
        check();
    });
}

// Global debug function
window.debugLog = function(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('%c[DEBUG]', 'color: #00ff88; font-weight: bold;', ...args);
    }
};

// Enable debug mode
window.debugMode = true;

// Legacy functions for accordion and weekly content
function initializeAccordion() {
    debugLog('🎯 Initializing accordion functionality');

    document.addEventListener('click', function(e) {
        const button = e.target.closest('.accordion-button');
        if (!button) return;

        e.preventDefault();

        const content = button.nextElementSibling;
        const chevron = button.querySelector('.fas');

        if (!content || !chevron) return;

        // Toggle content visibility
        const isOpen = content.classList.contains('open');

        if (isOpen) {
            content.classList.remove('open');
            chevron.classList.remove('fa-chevron-up');
            chevron.classList.add('fa-chevron-down');
        } else {
            content.classList.add('open');
            chevron.classList.remove('fa-chevron-down');
            chevron.classList.add('fa-chevron-up');
        }

        debugLog('🔄 Accordion toggled:', button.textContent.trim());
    });
}

function initializeWeeklyContent() {
    debugLog('📅 Initializing weekly content');

    // Generate content for each week
    generateWeekHTML(1, 7, 'sedmica-1-content');
    generateWeekHTML(8, 14, 'sedmica-2-content');
    generateWeekHTML(15, 21, 'sedmica-3-content');
    generateWeekHTML(22, 28, 'sedmica-4-content');

    debugLog('✅ Weekly content generated');
}

function generateWeekHTML(startDay, endDay, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        debugLog('❌ Container not found:', containerId);
        return;
    }

    let content = '<div class="week-days">';

    for (let i = startDay; i <= endDay; i++) {
        const dayKey = `Dan ${i}`;
        const day = window.planData ? window.planData[dayKey] : null;

        if (!day) {
            debugLog('⚠️ No data for day:', i);
            continue;
        }

        const dayDate = new Date('2025-09-14');
        dayDate.setDate(dayDate.getDate() + i - 1);

        const dayDetails = generateWeekDaySummary(day, i);
        const currentDay = getCurrentDay();
        const isCurrentDay = i === currentDay;
        const currentDayClass = isCurrentDay ? 'ring-2 ring-cyan-400 ring-opacity-75' : '';
        const currentDayBadge = isCurrentDay ? '<span class="text-xs bg-cyan-500 text-white px-2 py-0.5 rounded-full ml-2">DANAS</span>' : '';

        content += `
            <div class="day-container border border-gray-600 hover:border-cyan-500/50 transition-all duration-200 ${currentDayClass} rounded-lg overflow-hidden">
                <div class="day-card p-4 bg-gray-800/60 hover:bg-gray-700/70 cursor-pointer transition-all duration-200" data-day="${i}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 flex-1 min-w-0">
                            <div class="flex items-center justify-center w-12 h-12 bg-cyan-900/80 rounded-lg flex-shrink-0 border border-cyan-600">
                                <i class="fas fa-dumbbell text-xl text-cyan-400"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-3 mb-1">
                                    <h3 class="font-bold text-white text-lg">Dan ${i}${currentDayBadge}</h3>
                                    <span class="text-sm text-cyan-400 font-medium">${day.trening || 'Trening'}</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-gray-400">
                                    <span class="font-medium">${dayDate.getDate()}.${(dayDate.getMonth() + 1).toString().padStart(2, '0')}</span>
                                    <span>•</span>
                                    <span class="capitalize">${dayDate.toLocaleDateString('sr-RS', { weekday: 'short' })}</span>
                                </div>
                            </div>
                        </div>
                        <i class="fas fa-chevron-down transition-transform duration-300 text-gray-400 text-lg flex-shrink-0 ml-4"></i>
                    </div>
                </div>
                <div class="day-details max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="details-${i}">
                    <div class="p-4 sm:p-6 bg-gray-900/30 max-w-full overflow-x-auto">
                        ${dayDetails}
                    </div>
                </div>
            </div>
        `;
    }
    content += '</div>';
    container.innerHTML = content;

    // Add event listeners for expand/collapse
    document.querySelectorAll(`#${containerId} .day-card`).forEach(card => {
        card.addEventListener('click', () => {
            const dayIndex = card.getAttribute('data-day');
            const details = document.getElementById(`details-${dayIndex}`);
            const chevron = card.querySelector('.fas');

            document.querySelectorAll(`#${containerId} .day-details`).forEach(other => {
                if (other.id !== `details-${dayIndex}`) {
                    other.classList.remove('open');
                    other.style.maxHeight = '0';
                    const otherIndex = other.id.replace('details-', '');
                    const otherChevron = document.querySelector(`#${containerId} [data-day="${otherIndex}"] .fas`);
                    if (otherChevron) {
                        otherChevron.classList.remove('fa-chevron-up');
                        otherChevron.classList.add('fa-chevron-down');
                    }
                }
            });

            const isOpen = details.classList.contains('open');
            details.classList.toggle('open');
            chevron.classList.toggle('fa-chevron-up');
            chevron.classList.toggle('fa-chevron-down');

            if (isOpen) {
                details.style.maxHeight = '0';
            } else {
                details.style.maxHeight = details.scrollHeight + 'px';
                setTimeout(() => {
                    details.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    });
}

function generateWeekDaySummary(dayData, dayNumber) {
    debugLog(`📅 generateWeekDaySummary called for day ${dayNumber}`);
    debugLog(`📅 dayData:`, dayData);
    
    // Debug for weekly overview
    if (dayNumber === 1) {
        debugLog('� generateWeekDaySummary called for day 1');
    }
    
    return `
        <div class="day-content">
            <div class="training-section mb-6">
                <div class="section-header">
                    <i class="fas fa-dumbbell section-icon text-cyan-400"></i>
                    <h4 class="section-title text-white">Trening</h4>
                </div>
                <div class="training-card">
                    ${generateTrainingHTML(dayNumber, dayData)}
                </div>
            </div>

            <div class="meals-section mb-6">
                <div class="section-header">
                    <i class="fas fa-utensils section-icon text-cyan-400"></i>
                    <h4 class="section-title text-white">Obroci</h4>
                </div>
                <div class="meals-grid">
                    ${generateMealsHTML(dayNumber)}
                </div>
            </div>

            <div class="supplements-section mb-6">
                <div class="section-header">
                    <i class="fas fa-pills section-icon text-cyan-400"></i>
                    <h4 class="section-title text-white">Suplementacija</h4>
                </div>
                <div class="supplements-grid">
                    <div class="text-center py-4">
                        <p class="text-gray-400 text-sm">
                            <i class="fas fa-arrow-up mr-2"></i>
                            Pogledaj Advanced Supplement Manager iznad za detaljne informacije
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMealsHTML(dayNumber) {
    // Koristi prave podatke iz mealsData.js
    debugLog(`🍽️ generateMealsHTML called for day ${dayNumber}`);
    debugLog(`🍽️ MEALS_DATA available:`, !!window.MEALS_DATA);
    
    if (!window.MEALS_DATA) {
        debugLog('⚠️ MEALS_DATA not available, using fallback');
        return generateFallbackMealsHTML(dayNumber);
    }

    // Ciklira kroz dane (1-7) ako je potreban dan veći od 7
    const dayKey = ((dayNumber - 1) % 7) + 1;
    debugLog(`🍽️ Using dayKey: ${dayKey} for dayNumber: ${dayNumber}`);
    const dayMeals = window.MEALS_DATA[dayKey];
    
    if (!dayMeals) {
        debugLog(`⚠️ No meals for day ${dayKey}, using fallback`);
        debugLog(`🍽️ Available days:`, Object.keys(window.MEALS_DATA));
        return generateFallbackMealsHTML(dayNumber);
    }

    debugLog(`🍽️ Found meals for day ${dayKey}:`, dayMeals);
    const meals = [dayMeals.obrok1, dayMeals.obrok2];
    
    return meals.map((meal, index) => {
        if (!meal) return '';
        
        return `<div class="meal-card">
            <div class="meal-header">
                <h5 class="meal-title">${meal.name}</h5>
                <span class="meal-time" style="color: #9ca3af; font-size: 0.875rem;">${meal.time}</span>
            </div>
            <div class="meal-content">
                <div class="macros-info">
                    <i class="fas fa-chart-pie"></i>
                    <span>Proteini: ${meal.macros.protein}g | Masti: ${meal.macros.fat}g | Ugljeni hidrati: ${meal.macros.carbs}g</span>
                </div>
                <div class="calories-info" style="color: #22c55e; font-weight: 600; margin: 0.5rem 0;">
                    <i class="fas fa-fire"></i> ${meal.calories} kcal
                </div>
                <div class="prep-time" style="color: #fbbf24; font-size: 0.875rem;">
                    <i class="fas fa-clock"></i> Priprema: ${meal.prepTime}
                </div>
                <div class="portion-info" style="color: #9ca3af; font-size: 0.8125rem; margin-top: 0.25rem;">
                    Porcija: ${meal.portion}
                </div>
            </div>
        </div>`;
    }).filter(meal => meal !== '').join('');
}

// Generiraj training HTML sa detaljnim vježbama
function generateTrainingHTML(dayNumber, dayData) {
    debugLog(`🏋️ generateTrainingHTML called for day ${dayNumber}`);
    debugLog(`🏋️ dayData.trening: ${dayData.trening}`);
    
    // Provjeri da li su dostupni training podaci
    if (!window.TRAINING_DATA) {
        debugLog('⚠️ TRAINING_DATA not available, using fallback with dayData.trening');
        return `
            <div class="training-type">
                <i class="fas fa-dumbbell training-icon text-cyan-400"></i>
                <span class="training-text text-white">${dayData.trening || 'Trening za dan'}</span>
            </div>
        `;
    }

    const trainingKey = `dan${dayNumber}`;
    const trainingData = window.TRAINING_DATA[trainingKey];

    if (!trainingData) {
        debugLog(`⚠️ No training data for ${trainingKey}, using dayData.trening: ${dayData.trening}`);
        return `
            <div class="training-type">
                <i class="fas fa-dumbbell training-icon text-cyan-400"></i>
                <span class="training-text text-white">${dayData.trening || 'Trening za dan'}</span>
            </div>
        `;
    }

    // Koristi title iz planData (dayData.trening) umjesto trainingData.title za konzistentnost
    const displayTitle = dayData.trening || trainingData.title;
    debugLog(`🏋️ Using title: ${displayTitle}`);

    return `
        <div class="training-header mb-4">
            <div class="training-type">
                <i class="fas fa-dumbbell training-icon text-cyan-400 mr-2"></i>
                <span class="training-text text-white font-bold text-lg">${displayTitle}</span>
            </div>
        </div>
        
        <div class="exercises-list">
            <div class="exercises-header mb-3">
                <i class="fas fa-list-ul text-purple-400 mr-2"></i>
                <span class="text-purple-300 font-semibold">Vježbe (${trainingData.exercises.length})</span>
            </div>
            
            <div class="exercises-grid space-y-2">
                ${trainingData.exercises.map((exercise, index) => `
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
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="training-stats mt-4 p-3 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-lg border border-cyan-600/20">
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

// Fallback funkcija za slučaj da nisu učitani podaci
function generateFallbackMealsHTML(dayNumber) {
    const meals = [
        {
            title: "Obrok 1 (oko 11:30)",
            description: getMealForDay(dayNumber, 1),
            macros: "~30-40g proteina, ~25-35g masti, ~8-12g ugljenih hidrata"
        },
        {
            title: "Obrok 2 (oko 16:30)",
            description: getMealForDay(dayNumber, 2),
            macros: "~35-45g proteina, ~20-30g masti, ~10-15g ugljenih hidrata"
        }
    ];

    return meals.map(meal => `
        <div class="meal-card">
            <div class="meal-header">
                <h5 class="meal-title text-white">${meal.title}</h5>
                <button class="show-alternatives-btn" data-meal="${meal.title}">
                    <i class="fas fa-exchange-alt mr-1"></i>
                    Alternative
                </button>
            </div>
            <div class="meal-content">
                <p class="meal-description text-gray-300">${meal.description}</p>
                <div class="macros-info">
                    <i class="fas fa-chart-pie text-cyan-400 mr-2"></i>
                    <span class="font-medium text-white">${meal.macros}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getMealForDay(dayNumber, mealNumber) {
    const dayIndex = (dayNumber - 1) % 7;

    const mealOptions = {
        1: [
            "4 jaja kuvana + ½ avokada + 100g špinat + maslinovo ulje",
            "150g dimljenog lososa + 2 jaja + miješana salata + limun"
        ],
        2: [
            "200g pečene piletine + 300g brokoli + maslinovo ulje + začini",
            "220g junećeg mesa + 250g karfiol pire + pavlaka + luk"
        ]
    };

    return mealOptions[mealNumber] ? mealOptions[mealNumber][dayIndex % 2] : 'Obrok u pripremi';
}

function getCurrentDay() {
    const startDate = new Date('2025-09-14');
    const today = new Date();
    const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(diffDays, 1), 28);
}

// ===== COLLAPSIBLE ACCORDION FUNCTIONALITY =====
function initializeCollapsibleSections() {
    debugLog('🎯 Initializing collapsible sections');

    // Event delegation za sve accordion dugmad
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.accordion-button');
        if (!button) return;

        e.preventDefault();

        const content = button.nextElementSibling;
        const chevron = button.querySelector('.fas');
        const isOpen = content.classList.contains('open');

        debugLog(`🔄 Toggling section: ${button.textContent.trim()}`);

        // Opcionalno: Zatvori sve ostale sekcije (single-open mode)
        // Ukloni ovaj dio ako želiš da se više sekcija može otvoriti istovremeno
        /*
        document.querySelectorAll('.accordion-content').forEach(otherContent => {
            if (otherContent !== content) {
                otherContent.classList.remove('open');
                const otherButton = otherContent.previousElementSibling;
                const otherChevron = otherButton.querySelector('.fas');
                if (otherChevron) {
                    otherChevron.classList.remove('rotate-180');
                }
                otherButton.classList.remove('active');
            }
        });
        */

        // Toggle trenutne sekcije
        if (isOpen) {
            content.classList.remove('open');
            button.classList.remove('active');
            debugLog(`📉 Closed section: ${button.textContent.trim()}`);
        } else {
            content.classList.add('open');
            button.classList.add('active');
            debugLog(`📈 Opened section: ${button.textContent.trim()}`);
        }
    });

    // Set default state - možeš da promjeniš koji su otvoreni po defaultu
    setTimeout(() => {
        // Otvori Trening Program po defaultu
        const trainingButton = document.querySelector('#training-chevron')?.closest('.accordion-button');
        if (trainingButton) {
            trainingButton.click();
            debugLog('🏋️ Auto-opened Training Program section');
        }
    }, 500);
}
