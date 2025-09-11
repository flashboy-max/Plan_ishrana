// Napredni Supplement Filter & Management Sistem
import { detailedSupplements, supplementInteractions, timingPeriods, dailyLimits } from '../data/detailedSupplements.js';

class AdvancedSupplementManager {
    constructor() {
        this.activeFilter = 'all';
        this.activeTiming = 'all';
        this.activeCategory = 'all';
        this.filterTimeout = null;
        this.notificationInterval = null;
        
        this.initializeManager();
    }

    initializeManager() {
        this.generateSupplementInterface();
        this.initializeFilters();
        this.initializeTooltips();
        this.initializeQuickActions();
        this.initializeTimingNotifications();
        this.loadSupplementStates();
        this.updateConsistencyTracker();
    }

    generateSupplementInterface() {
        const container = document.getElementById('supplement-planner');
        if (!container) return;

        // Generate filter panel
        const filterHTML = this.generateFilterPanel();
        
        // Generate quick actions panel
        const quickActionsHTML = this.generateQuickActionsPanel();
        
        // Generate consistency tracker
        const consistencyHTML = this.generateConsistencyTracker();
        
        // Generate supplement cards
        const cardsHTML = this.generateSupplementCards();
        
        // Generate daily dose counter
        const doseCounterHTML = this.generateDosageCounter();

        container.innerHTML = `
            ${filterHTML}
            ${quickActionsHTML}
            ${consistencyHTML}
            <div class="supplements-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                ${cardsHTML}
            </div>
            ${doseCounterHTML}
        `;
    }

    generateFilterPanel() {
        return `
            <div class="supplement-filters mb-6 p-4 bg-gray-800/30 border border-gray-600/50 rounded-lg">
                <h4 class="text-sm font-semibold text-gray-300 mb-3 flex items-center">
                    <i class="fas fa-filter mr-2"></i>Smart Filteri
                </h4>
                
                <!-- Glavni filteri -->
                <div class="flex flex-wrap gap-2 mb-3">
                    <button class="filter-btn active" data-filter="all">
                        <i class="fas fa-pills mr-2"></i>Svi suplementi
                        <span class="count-badge">10</span>
                    </button>
                    <button class="filter-btn" data-filter="fasting-safe">
                        <i class="fas fa-clock mr-2"></i>Ne kvare post
                        <span class="count-badge">4</span>
                    </button>
                    <button class="filter-btn" data-filter="high-priority">
                        <i class="fas fa-star mr-2"></i>Visoki prioritet
                        <span class="count-badge">3</span>
                    </button>
                    <button class="filter-btn" data-filter="taken-today">
                        <i class="fas fa-check-circle mr-2"></i>Uzeto danas
                        <span class="count-badge taken-count">0</span>
                    </button>
                    <button class="filter-btn" data-filter="missed">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Propušteno
                        <span class="count-badge missed-count">0</span>
                    </button>
                </div>
                
                <!-- Timing filteri -->
                <div class="flex flex-wrap gap-2 mb-3">
                    <button class="timing-filter-btn active" data-timing="all">Svi periodi</button>
                    <button class="timing-filter-btn" data-timing="morning">
                        <i class="fas fa-sun mr-1"></i>Jutro
                    </button>
                    <button class="timing-filter-btn" data-timing="pre-workout">
                        <i class="fas fa-dumbbell mr-1"></i>Pre treninga
                    </button>
                    <button class="timing-filter-btn" data-timing="meal">
                        <i class="fas fa-utensils mr-1"></i>Sa hranom
                    </button>
                    <button class="timing-filter-btn" data-timing="evening">
                        <i class="fas fa-moon mr-1"></i>Večer
                    </button>
                    <button class="timing-filter-btn" data-timing="flexible">
                        <i class="fas fa-clock mr-1"></i>Fleksibilno
                    </button>
                </div>

                <!-- Kategorija filteri -->
                <div class="flex flex-wrap gap-2">
                    <button class="category-filter-btn active" data-category="all">Sve kategorije</button>
                    <button class="category-filter-btn" data-category="recovery">
                        <i class="fas fa-heart mr-1"></i>Oporavak
                    </button>
                    <button class="category-filter-btn" data-category="performance">
                        <i class="fas fa-bolt mr-1"></i>Performanse
                    </button>
                    <button class="category-filter-btn" data-category="health">
                        <i class="fas fa-shield-alt mr-1"></i>Zdravlje
                    </button>
                    <button class="category-filter-btn" data-category="sleep">
                        <i class="fas fa-bed mr-1"></i>San
                    </button>
                </div>
            </div>
        `;
    }

    generateQuickActionsPanel() {
        return `
            <div class="quick-actions-panel mb-4 p-3 bg-blue-900/20 border border-blue-600/50 rounded-lg">
                <div class="flex flex-wrap gap-2 items-center">
                    <span class="text-sm text-blue-200 mr-2">Brze akcije:</span>
                    <button class="quick-action-btn" data-action="mark-all-taken">
                        <i class="fas fa-check-circle mr-1"></i>Označi sve kao uzeto
                    </button>
                    <button class="quick-action-btn" data-action="mark-high-priority">
                        <i class="fas fa-star mr-1"></i>Označi prioritetne
                    </button>
                    <button class="quick-action-btn" data-action="reset-today">
                        <i class="fas fa-undo mr-1"></i>Resetuj dan
                    </button>
                    <button class="quick-action-btn" data-action="show-schedule">
                        <i class="fas fa-calendar mr-1"></i>Prikaži raspored
                    </button>
                </div>
            </div>
        `;
    }

    generateConsistencyTracker() {
        return `
            <div class="consistency-tracker mb-4 p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-600/50 rounded-lg">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="consistency-ring relative">
                            <svg width="60" height="60" class="transform -rotate-90">
                                <circle cx="30" cy="30" r="25" stroke="#374151" stroke-width="6" fill="none"/>
                                <circle cx="30" cy="30" r="25" stroke="#3b82f6" stroke-width="6" fill="none" 
                                        stroke-dasharray="157" stroke-dashoffset="157" 
                                        class="consistency-progress transition-all duration-500"/>
                            </svg>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="consistency-percentage text-lg font-bold text-white">0%</span>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-white">Dnevna Konzistentnost</h4>
                            <p class="text-sm text-gray-300">
                                <span class="taken-count-text">0</span> od <span class="total-count-text">10</span> suplemenata uzeto
                            </p>
                        </div>
                    </div>
                    <div class="consistency-stats text-right">
                        <div class="text-sm text-gray-300">Sedmična konzistentnost</div>
                        <div class="text-xl font-bold text-cyan-400 weekly-consistency">85%</div>
                        <div class="text-xs text-gray-400">Prosjek 7 dana</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateSupplementCards() {
        let cardsHTML = '';
        
        Object.entries(detailedSupplements).forEach(([id, supplement]) => {
            const priorityClass = `priority-${supplement.priority}`;
            const fastingClass = supplement.fastingSafe ? 'fasting-safe' : 'breaks-fast';
            const priorityIcon = '★'.repeat(supplement.priority);
            const priorityColor = supplement.priority === 1 ? 'text-yellow-400' : 
                                supplement.priority === 2 ? 'text-yellow-500' : 'text-gray-400';
            
            const timingBadges = supplement.timing.map(timing => {
                const period = timingPeriods[timing];
                return `<span class="timing-badge timing-${timing} text-xs px-2 py-1 rounded-full bg-${period.color}-600/30 text-${period.color}-200">
                    <i class="${period.icon} mr-1"></i>${period.label}
                </span>`;
            }).join(' ');

            cardsHTML += `
                <div class="supplement-card ${priorityClass} ${fastingClass}" 
                     data-supplement-id="${id}"
                     data-priority="${supplement.priority}"
                     data-fasting-safe="${supplement.fastingSafe}"
                     data-timing="${supplement.timing.join(',')}"
                     data-category="${supplement.category}">
                    
                    <div class="supplement-header mb-3">
                        <div class="flex items-start justify-between">
                            <span class="supplement-link tooltip-trigger font-medium text-white" 
                                  data-supplement="${id}">
                                ${supplement.name}
                            </span>
                            <div class="supplement-badges flex items-center gap-2">
                                <span class="priority-badge ${priorityColor}" title="Prioritet ${supplement.priority}">
                                    ${priorityIcon}
                                </span>
                                ${supplement.fastingSafe ? 
                                    '<span class="fasting-badge safe">Ne kvari post</span>' :
                                    '<span class="fasting-badge breaks-fast">U prozoru</span>'
                                }
                            </div>
                        </div>
                        <div class="text-xs text-gray-400 mt-1">${supplement.brand}</div>
                    </div>
                    
                    <div class="supplement-details mb-3 space-y-2">
                        <div class="detail-row">
                            <span class="detail-label">Doza:</span>
                            <span class="detail-value">${supplement.dose}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Kada:</span>
                            <span class="detail-value">${Array.isArray(supplement.timeSlots) ? supplement.timeSlots.join(', ') : supplement.timeSlots}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Učestalost:</span>
                            <span class="detail-value">${supplement.frequency}</span>
                        </div>
                    </div>

                    <div class="timing-badges mb-3">
                        ${timingBadges}
                    </div>

                    <div class="supplement-actions flex items-center justify-between">
                        <button class="taken-today-btn text-xs px-3 py-1 rounded bg-cyan-600/50 hover:bg-cyan-600/70 text-white transition-colors"
                                data-supplement="${id}">
                            <i class="fas fa-check mr-1"></i>Uzeto danas
                        </button>
                        <button class="details-btn text-xs text-cyan-400 hover:text-cyan-300"
                                data-supplement="${id}">
                            <i class="fas fa-info-circle mr-1"></i>Detalji
                        </button>
                    </div>
                    
                    <!-- Hidden tooltip content -->
                    <div class="supplement-tooltip hidden absolute z-50 p-4 bg-gray-900 border border-gray-600 rounded-lg shadow-xl max-w-sm">
                        <h4 class="font-bold text-cyan-400 mb-2">${supplement.name}</h4>
                        <p class="text-sm text-gray-300 mb-2"><strong>Brend:</strong> ${supplement.brand}</p>
                        <p class="text-sm text-gray-300 mb-2"><strong>Benefiti:</strong> ${supplement.benefits}</p>
                        <p class="text-sm text-gray-300 mb-2"><strong>Napomene:</strong> ${supplement.notes}</p>
                        <p class="text-sm text-amber-300"><strong>Interakcije:</strong> ${supplement.interactions}</p>
                    </div>
                </div>
            `;
        });

        return cardsHTML;
    }

    generateDosageCounter() {
        return `
            <div class="daily-dose-counter mt-6 p-4 bg-red-900/20 border border-red-600/50 rounded-lg">
                <h3 class="text-lg font-semibold text-red-300 mb-3 flex items-center">
                    <i class="fas fa-calculator mr-2"></i>Daily Dose Monitor
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="dose-item">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm text-gray-300">Magnezij:</span>
                            <span class="dose-value font-mono text-sm" data-mineral="magnesium">0mg / 400mg</span>
                        </div>
                        <div class="dose-bar w-full bg-gray-700 rounded-full h-3">
                            <div class="dose-progress h-3 bg-green-500 rounded-full transition-all duration-300" 
                                 data-mineral="magnesium" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="dose-item">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm text-gray-300">Vitamin C:</span>
                            <span class="dose-value font-mono text-sm" data-mineral="vitaminC">0mg / 1000mg</span>
                        </div>
                        <div class="dose-bar w-full bg-gray-700 rounded-full h-3">
                            <div class="dose-progress h-3 bg-orange-500 rounded-full transition-all duration-300" 
                                 data-mineral="vitaminC" style="width: 0%"></div>
                        </div>
                    </div>
                    <div class="dose-item">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-sm text-gray-300">Cink:</span>
                            <span class="dose-value font-mono text-sm" data-mineral="zinc">0mg / 40mg</span>
                        </div>
                        <div class="dose-bar w-full bg-gray-700 rounded-full h-3">
                            <div class="dose-progress h-3 bg-purple-500 rounded-full transition-all duration-300" 
                                 data-mineral="zinc" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Interaction warnings -->
                <div class="interaction-warnings" id="interaction-warnings">
                    <!-- Warning messages will appear here -->
                </div>
                
                <!-- Daily macro summary -->
                <div class="macro-summary mt-3 p-3 bg-gray-800/50 rounded">
                    <h4 class="text-sm font-semibold text-gray-300 mb-2">Makroi iz suplemenata:</h4>
                    <div class="flex gap-4 text-sm">
                        <span class="macro-protein">Proteini: <strong>0g</strong></span>
                        <span class="macro-fat">Masti: <strong>0g</strong></span>
                        <span class="macro-carbs">UH: <strong>0g</strong></span>
                    </div>
                </div>
            </div>
        `;
    }

    initializeFilters() {
        // Main filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.activeFilter = e.target.dataset.filter;
                this.debouncedApplyFilters();
            });
        });

        // Timing filters
        document.querySelectorAll('.timing-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.timing-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.activeTiming = e.target.dataset.timing;
                this.debouncedApplyFilters();
            });
        });

        // Category filters
        document.querySelectorAll('.category-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.activeCategory = e.target.dataset.category;
                this.debouncedApplyFilters();
            });
        });
    }

    debouncedApplyFilters() {
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(() => this.applyFilters(), 150);
    }

    applyFilters() {
        const cards = document.querySelectorAll('.supplement-card');
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        
        cards.forEach(card => {
            let showCard = true;
            const supplementId = card.dataset.supplementId;

            // Filter by main categories
            if (this.activeFilter === 'fasting-safe' && card.dataset.fastingSafe !== 'true') {
                showCard = false;
            }
            
            if (this.activeFilter === 'high-priority' && card.dataset.priority !== '1') {
                showCard = false;
            }

            if (this.activeFilter === 'taken-today' && !takenSupplements.includes(supplementId)) {
                showCard = false;
            }

            if (this.activeFilter === 'missed') {
                const shouldBeTaken = this.shouldSupplementBeTakenByNow(supplementId);
                if (!shouldBeTaken || takenSupplements.includes(supplementId)) {
                    showCard = false;
                }
            }

            // Filter by timing
            if (this.activeTiming !== 'all') {
                const cardTimings = card.dataset.timing.split(',');
                if (!cardTimings.includes(this.activeTiming)) {
                    showCard = false;
                }
            }

            // Filter by category
            if (this.activeCategory !== 'all' && card.dataset.category !== this.activeCategory) {
                showCard = false;
            }

            // Apply filter
            if (showCard) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
            }
        });

        this.updateFilterCounts();
    }

    shouldSupplementBeTakenByNow(supplementId) {
        const supplement = detailedSupplements[supplementId];
        if (!supplement) return false;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        // Check if any of the supplement's time slots have passed
        return supplement.timeSlots.some(timeSlot => {
            if (timeSlot === 'bilo kada') return false;
            
            const [hours, minutes] = timeSlot.split(':').map(Number);
            const slotTime = hours * 60 + minutes;
            
            return currentTime >= slotTime;
        });
    }

    updateFilterCounts() {
        const totalCards = document.querySelectorAll('.supplement-card').length;
        const visibleCards = document.querySelectorAll('.supplement-card[style*="display: block"], .supplement-card:not([style*="display: none"])').length;
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        
        // Update count badges
        document.querySelector('[data-filter="all"] .count-badge').textContent = totalCards;
        document.querySelector('[data-filter="fasting-safe"] .count-badge').textContent = 
            Object.values(detailedSupplements).filter(s => s.fastingSafe).length;
        document.querySelector('[data-filter="high-priority"] .count-badge').textContent = 
            Object.values(detailedSupplements).filter(s => s.priority === 1).length;
        document.querySelector('.taken-count').textContent = takenSupplements.length;
        
        // Calculate missed supplements
        const missedCount = Object.keys(detailedSupplements).filter(id => 
            this.shouldSupplementBeTakenByNow(id) && !takenSupplements.includes(id)
        ).length;
        document.querySelector('.missed-count').textContent = missedCount;
    }

    initializeTooltips() {
        document.querySelectorAll('.tooltip-trigger').forEach(trigger => {
            const card = trigger.closest('.supplement-card');
            const tooltip = card.querySelector('.supplement-tooltip');
            
            if (tooltip) {
                trigger.addEventListener('mouseenter', (e) => {
                    this.showTooltip(tooltip, e.target);
                });
                
                trigger.addEventListener('mouseleave', () => {
                    this.hideTooltip(tooltip);
                });
            }
        });

        // Details button functionality
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.supplement-card');
                const tooltip = card.querySelector('.supplement-tooltip');
                tooltip.classList.toggle('hidden');
            });
        });
    }

    showTooltip(tooltip, trigger) {
        tooltip.classList.remove('hidden');
        
        const rect = trigger.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = `${rect.left}px`;
        tooltip.style.top = `${rect.bottom + 10}px`;
        tooltip.style.zIndex = '1000';
    }

    hideTooltip(tooltip) {
        tooltip.classList.add('hidden');
    }

    initializeQuickActions() {
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // Supplement taken buttons
        document.querySelectorAll('.taken-today-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const supplementId = e.target.dataset.supplement;
                this.toggleSupplementTaken(supplementId, e.target);
            });
        });
    }

    handleQuickAction(action) {
        switch(action) {
            case 'mark-all-taken':
                this.markAllSupplementsTaken();
                break;
            case 'mark-high-priority':
                this.markHighPriorityTaken();
                break;
            case 'reset-today':
                this.resetTodaySupplements();
                break;
            case 'show-schedule':
                this.showSupplementSchedule();
                break;
        }
    }

    markAllSupplementsTaken() {
        const allSupplementIds = Object.keys(detailedSupplements);
        localStorage.setItem('takenSupplements', JSON.stringify(allSupplementIds));
        this.loadSupplementStates();
        this.updateDosageCounter();
        this.updateConsistencyTracker();
        this.updateFilterCounts();
    }

    markHighPriorityTaken() {
        const highPriorityIds = Object.entries(detailedSupplements)
            .filter(([id, supplement]) => supplement.priority === 1)
            .map(([id]) => id);
        
        const currentTaken = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        const newTaken = [...new Set([...currentTaken, ...highPriorityIds])];
        
        localStorage.setItem('takenSupplements', JSON.stringify(newTaken));
        this.loadSupplementStates();
        this.updateDosageCounter();
        this.updateConsistencyTracker();
        this.updateFilterCounts();
    }

    resetTodaySupplements() {
        localStorage.removeItem('takenSupplements');
        this.loadSupplementStates();
        this.updateDosageCounter();
        this.updateConsistencyTracker();
        this.updateFilterCounts();
    }

    showSupplementSchedule() {
        // Create schedule modal or expand view
        const scheduleHTML = this.generateScheduleView();
        // Implementation for showing schedule modal...
        console.log('Schedule view would open here');
    }

    toggleSupplementTaken(supplementId, button) {
        const isCurrentlyTaken = button.classList.contains('taken');
        
        if (isCurrentlyTaken) {
            // Mark as not taken
            button.classList.remove('taken');
            button.innerHTML = '<i class="fas fa-check mr-1"></i>Uzeto danas';
            button.classList.remove('bg-green-600/70');
            button.classList.add('bg-cyan-600/50');
            
            // Remove from local storage
            const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
            const filtered = takenSupplements.filter(id => id !== supplementId);
            localStorage.setItem('takenSupplements', JSON.stringify(filtered));
        } else {
            // Mark as taken
            button.classList.add('taken');
            button.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Uzeto ✓';
            button.classList.add('bg-green-600/70');
            button.classList.remove('bg-cyan-600/50');
            
            // Add to local storage
            const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
            if (!takenSupplements.includes(supplementId)) {
                takenSupplements.push(supplementId);
                localStorage.setItem('takenSupplements', JSON.stringify(takenSupplements));
            }
        }
        
        this.updateDosageCounter();
        this.updateConsistencyTracker();
        this.updateFilterCounts();
        this.checkInteractionWarnings();
    }

    updateDosageCounter() {
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        const dailyTotals = { magnesium: 0, vitaminC: 0, zinc: 0 };
        const macroTotals = { protein: 0, fat: 0, carbs: 0 };
        
        // Calculate totals from taken supplements
        takenSupplements.forEach(supplementId => {
            const supplement = detailedSupplements[supplementId];
            if (supplement) {
                // Minerals
                if (supplement.minerals) {
                    Object.entries(supplement.minerals).forEach(([mineral, amount]) => {
                        if (dailyTotals.hasOwnProperty(mineral)) {
                            dailyTotals[mineral] += amount;
                        }
                    });
                }
                
                // Macros
                if (supplement.macros) {
                    macroTotals.protein += supplement.macros.protein;
                    macroTotals.fat += supplement.macros.fat;
                    macroTotals.carbs += supplement.macros.carbs;
                }
            }
        });
        
        // Update UI
        Object.entries(dailyTotals).forEach(([mineral, amount]) => {
            const limit = dailyLimits[mineral];
            if (limit) {
                const percentage = Math.min((amount / limit.max) * 100, 100);
                const valueEl = document.querySelector(`[data-mineral="${mineral}"].dose-value`);
                const progressEl = document.querySelector(`[data-mineral="${mineral}"].dose-progress`);
                
                if (valueEl && progressEl) {
                    valueEl.textContent = `${amount}${limit.unit} / ${limit.max}${limit.unit}`;
                    progressEl.style.width = `${percentage}%`;
                    
                    // Color coding
                    if (amount >= limit.max) {
                        progressEl.className = progressEl.className.replace(/bg-\w+-500/, 'bg-red-500');
                    } else if (amount >= limit.warning) {
                        progressEl.className = progressEl.className.replace(/bg-\w+-500/, 'bg-yellow-500');
                    } else {
                        progressEl.className = progressEl.className.replace(/bg-\w+-500/, 'bg-green-500');
                    }
                }
            }
        });

        // Update macro summary
        document.querySelector('.macro-protein strong').textContent = `${macroTotals.protein}g`;
        document.querySelector('.macro-fat strong').textContent = `${macroTotals.fat}g`;
        document.querySelector('.macro-carbs strong').textContent = `${macroTotals.carbs}g`;
    }

    checkInteractionWarnings() {
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        const warnings = [];
        const mineralCounts = {};

        // Count minerals from taken supplements
        takenSupplements.forEach(supplementId => {
            const supplement = detailedSupplements[supplementId];
            if (supplement && supplement.minerals) {
                Object.keys(supplement.minerals).forEach(mineral => {
                    mineralCounts[mineral] = (mineralCounts[mineral] || 0) + 1;
                });
            }
        });

        // Check for interactions
        Object.entries(mineralCounts).forEach(([mineral, count]) => {
            if (count > 1 && supplementInteractions[mineral]) {
                warnings.push(`⚠️ ${supplementInteractions[mineral].warning}`);
            }
            
            if (supplementInteractions[mineral] && supplementInteractions[mineral].dailyLimit) {
                const totalAmount = this.calculateTotalMineral(mineral, takenSupplements);
                if (totalAmount >= supplementInteractions[mineral].dailyLimit) {
                    warnings.push(`🚨 ${mineral}: Prekoračen dnevni limit (${totalAmount}mg)`);
                }
            }
        });

        // Update warnings UI
        const warningsEl = document.getElementById('interaction-warnings');
        if (warningsEl) {
            warningsEl.innerHTML = warnings.length > 0 ? 
                `<div class="bg-amber-900/30 border border-amber-600/50 rounded p-2 text-sm text-amber-200">
                    ${warnings.join('<br>')}
                </div>` : 
                '<div class="text-green-400 text-sm">✓ Nema detektovanih interakcija</div>';
        }
    }

    calculateTotalMineral(mineral, takenSupplements) {
        let total = 0;
        takenSupplements.forEach(supplementId => {
            const supplement = detailedSupplements[supplementId];
            if (supplement && supplement.minerals && supplement.minerals[mineral]) {
                total += supplement.minerals[mineral];
            }
        });
        return total;
    }

    updateConsistencyTracker() {
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        const totalSupplements = Object.keys(detailedSupplements).length;
        const consistency = Math.round((takenSupplements.length / totalSupplements) * 100);
        
        // Update ring progress
        const progressCircle = document.querySelector('.consistency-progress');
        const percentageEl = document.querySelector('.consistency-percentage');
        const takenCountEl = document.querySelector('.taken-count-text');
        const totalCountEl = document.querySelector('.total-count-text');
        
        if (progressCircle && percentageEl) {
            const circumference = 157; // 2 * π * 25
            const offset = circumference - (consistency / 100) * circumference;
            
            progressCircle.style.strokeDashoffset = offset;
            percentageEl.textContent = `${consistency}%`;
            takenCountEl.textContent = takenSupplements.length;
            totalCountEl.textContent = totalSupplements;
        }

        // Update weekly consistency (placeholder - would need real historical data)
        this.updateWeeklyConsistency();
    }

    updateWeeklyConsistency() {
        // Placeholder for weekly tracking
        // In real implementation, this would calculate from historical data
        const weeklyEl = document.querySelector('.weekly-consistency');
        if (weeklyEl) {
            const simulatedWeekly = Math.round(75 + Math.random() * 20); // Placeholder
            weeklyEl.textContent = `${simulatedWeekly}%`;
        }
    }

    initializeTimingNotifications() {
        // Check every 15 minutes for timing notifications
        this.notificationInterval = setInterval(() => {
            this.checkTimingNotifications();
        }, 15 * 60 * 1000);

        // Initial check
        this.checkTimingNotifications();
    }

    checkTimingNotifications() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');

        Object.entries(detailedSupplements).forEach(([id, supplement]) => {
            if (takenSupplements.includes(id)) return; // Already taken

            supplement.timeSlots.forEach(timeSlot => {
                if (timeSlot === 'bilo kada') return;

                const [hours, minutes] = timeSlot.split(':').map(Number);
                const slotTime = hours * 60 + minutes;
                
                // Check if within 15 minutes of timing
                if (Math.abs(currentTime - slotTime) <= 15) {
                    this.showTimingNotification(supplement, timeSlot);
                }
            });
        });
    }

    showTimingNotification(supplement, timeSlot) {
        // Create notification (you could use browser notifications or in-app notifications)
        if (Notification.permission === 'granted') {
            new Notification(`Vrijeme za ${supplement.name}`, {
                body: `Preporučeno vrijeme: ${timeSlot}`,
                icon: 'assets/icons/supplement-icon.png' // Add icon if available
            });
        }
        
        // In-app notification alternative
        this.showInAppNotification(supplement, timeSlot);
    }

    showInAppNotification(supplement, timeSlot) {
        // Create temporary notification banner
        const notification = document.createElement('div');
        notification.className = 'timing-notification fixed top-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-clock text-blue-200"></i>
                <div>
                    <div class="font-semibold">${supplement.name}</div>
                    <div class="text-sm text-blue-200">Preporučeno vrijeme: ${timeSlot}</div>
                </div>
                <button class="ml-2 text-blue-200 hover:text-white" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    loadSupplementStates() {
        const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
        
        takenSupplements.forEach(supplementId => {
            const button = document.querySelector(`[data-supplement="${supplementId}"]`);
            if (button) {
                button.classList.add('taken');
                button.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Uzeto ✓';
                button.classList.add('bg-green-600/70');
                button.classList.remove('bg-cyan-600/50');
            }
        });
        
        this.updateDosageCounter();
        this.updateConsistencyTracker();
        this.checkInteractionWarnings();
    }

    // Cleanup method
    destroy() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
    }
}

// Export for use in main.js
window.AdvancedSupplementManager = AdvancedSupplementManager;
