// Supplement Planner funkcionalnost
import { supplementPlan, dailyLimits, timePeriods } from '../data/supplementPlanner.js';

function initializeSupplementPlanner() {
    const container = document.getElementById('supplement-planner');
    if (!container) return;

    generateSupplementCards(container);
    setupSupplementInteractions();
}

function generateSupplementCards(container) {
    // Group supplements by timing
    const groupedSupplements = {};
    
    supplementPlan.forEach(supplement => {
        supplement.timing.forEach(timing => {
            if (!groupedSupplements[timing]) {
                groupedSupplements[timing] = [];
            }
            groupedSupplements[timing].push(supplement);
        });
    });

    let html = '';
    
    // Generate cards grouped by time periods
    Object.entries(timePeriods).forEach(([key, period]) => {
        if (groupedSupplements[key]) {
            html += `
                <div class="time-period-group mb-6">
                    <h3 class="text-lg font-semibold text-${period.color}-300 mb-3 flex items-center">
                        <i class="fas fa-clock mr-2"></i>
                        ${period.label} ${period.times[0] !== 'variabilan' && period.times[0] !== 'fleksibilno' ? `(${period.times.join(', ')})` : ''}
                    </h3>
                    <div class="grid grid-cols-1 gap-3">
            `;
            
            groupedSupplements[key].forEach(supplement => {
                const fastingClass = supplement.breaksFast ? 'bg-orange-800/30 border-orange-600/50' : 'bg-emerald-800/30 border-emerald-600/50';
                const fastingBadge = supplement.breaksFast ? 
                    '<span class="text-xs px-2 py-0.5 rounded bg-orange-600/50 text-orange-200">U prozoru</span>' :
                    '<span class="text-xs px-2 py-0.5 rounded bg-emerald-600/50 text-emerald-200">Ne kvari post</span>';
                
                const priorityIcon = supplement.priority === 1 ? 
                    '<i class="fas fa-star text-yellow-400" title="Visok prioritet"></i>' :
                    supplement.priority === 2 ?
                    '<i class="fas fa-star-half-alt text-yellow-500" title="Srednji prioritet"></i>' :
                    '<i class="far fa-star text-gray-400" title="Nizak prioritet"></i>';

                html += `
                    <div class="supplement-card p-4 rounded-lg border ${fastingClass} cursor-pointer transition-all duration-200 hover:shadow-lg"
                         data-supplement-id="${supplement.id}">
                        <div class="flex items-start justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <h4 class="font-medium text-white">${supplement.name}</h4>
                                ${priorityIcon}
                            </div>
                            ${fastingBadge}
                        </div>
                        <div class="text-sm text-gray-300 space-y-1">
                            <p><strong>Doza:</strong> ${supplement.dose}</p>
                            <p><strong>Timing:</strong> ${supplement.timeSlots.join(' ili ')}</p>
                            ${supplement.macros && (supplement.macros.protein > 0 || supplement.macros.fat > 0 || supplement.macros.carbs > 0) ?
                                `<p class="text-xs text-cyan-300">
                                    Makroi/serv: P ${supplement.macros.protein}g · M ${supplement.macros.fat}g · UH ${supplement.macros.carbs}g
                                </p>` : ''
                            }
                        </div>
                        <div class="supplement-actions mt-3 flex items-center justify-between">
                            <button class="taken-today-btn text-xs px-3 py-1 rounded bg-cyan-600/50 hover:bg-cyan-600/70 text-white transition-colors"
                                    data-supplement="${supplement.id}">
                                <i class="fas fa-check mr-1"></i>Uzeto danas
                            </button>
                            <button class="details-btn text-xs text-cyan-400 hover:text-cyan-300">
                                <i class="fas fa-info-circle mr-1"></i>Detalji
                            </button>
                        </div>
                        <div class="supplement-notes hidden mt-2 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
                            ${supplement.notes}
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });
    
    // Add daily dose counter
    html += generateDosageCounter();
    
    container.innerHTML = html;
}

function generateDosageCounter() {
    return `
        <div class="daily-dose-counter mt-6 p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg">
            <h3 class="text-lg font-semibold text-blue-300 mb-3 flex items-center">
                <i class="fas fa-calculator mr-2"></i>Dnevni Dose Counter
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="dose-item">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-300">Magnezij:</span>
                        <span class="dose-value font-mono text-sm" data-mineral="magnesium">0mg / 400mg</span>
                    </div>
                    <div class="dose-bar w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div class="dose-progress h-2 bg-green-500 rounded-full transition-all duration-300" 
                             data-mineral="magnesium" style="width: 0%"></div>
                    </div>
                </div>
                <div class="dose-item">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-300">Vitamin C:</span>
                        <span class="dose-value font-mono text-sm" data-mineral="vitaminC">0mg / 1000mg</span>
                    </div>
                    <div class="dose-bar w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div class="dose-progress h-2 bg-orange-500 rounded-full transition-all duration-300" 
                             data-mineral="vitaminC" style="width: 0%"></div>
                    </div>
                </div>
                <div class="dose-item">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-300">Cink:</span>
                        <span class="dose-value font-mono text-sm" data-mineral="zinc">0mg / 40mg</span>
                    </div>
                    <div class="dose-bar w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div class="dose-progress h-2 bg-purple-500 rounded-full transition-all duration-300" 
                             data-mineral="zinc" style="width: 0%"></div>
                    </div>
                </div>
            </div>
            <div class="warnings mt-3 text-xs text-amber-300" id="dose-warnings">
                <!-- Warning messages will appear here -->
            </div>
        </div>
    `;
}

function setupSupplementInteractions() {
    // Toggle supplement notes
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.supplement-card');
            const notes = card.querySelector('.supplement-notes');
            notes.classList.toggle('hidden');
        });
    });

    // Track taken supplements
    document.querySelectorAll('.taken-today-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const supplementId = this.dataset.supplement;
            toggleSupplementTaken(supplementId, this);
        });
    });

    // Load saved states
    loadSupplementStates();
}

function toggleSupplementTaken(supplementId, button) {
    const isCurrentlyTaken = button.classList.contains('taken');
    const supplement = supplementPlan.find(s => s.id === supplementId);
    
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
    
    updateDosageCounter();
}

function updateDosageCounter() {
    const takenSupplements = JSON.parse(localStorage.getItem('takenSupplements') || '[]');
    const dailyTotals = { magnesium: 0, vitaminC: 0, zinc: 0 };
    
    // Calculate totals from taken supplements
    takenSupplements.forEach(supplementId => {
        const supplement = supplementPlan.find(s => s.id === supplementId);
        if (supplement && supplement.minerals) {
            Object.entries(supplement.minerals).forEach(([mineral, amount]) => {
                if (dailyTotals.hasOwnProperty(mineral)) {
                    dailyTotals[mineral] += amount;
                }
            });
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
    
    // Update warnings
    updateDoseWarnings(dailyTotals);
}

function updateDoseWarnings(dailyTotals) {
    const warningsEl = document.getElementById('dose-warnings');
    if (!warningsEl) return;
    
    const warnings = [];
    
    Object.entries(dailyTotals).forEach(([mineral, amount]) => {
        const limit = dailyLimits[mineral];
        if (limit) {
            if (amount >= limit.max) {
                warnings.push(`⚠️ ${mineral}: prekoračena dnevna doza (${amount}${limit.unit}/${limit.max}${limit.unit})`);
            } else if (amount >= limit.warning) {
                warnings.push(`⚡ ${mineral}: blizu limita (${amount}${limit.unit}/${limit.max}${limit.unit})`);
            }
        }
    });
    
    warningsEl.innerHTML = warnings.length > 0 ? warnings.join('<br>') : 
        '<span class="text-green-400">✓ Svi minerali u optimalnom opsegu</span>';
}

function loadSupplementStates() {
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
    
    updateDosageCounter();
}

// Export function to be called from main.js
window.initializeSupplementPlanner = initializeSupplementPlanner;
