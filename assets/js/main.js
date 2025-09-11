// Glavna JavaScript datoteka - inicijalizacija i konfiguracija
const startDate = new Date('2025-09-11T00:00:00');

// === GLOBAL DEBUG FUNCTION ===
window.debugLog = function(...args) {
    // UVIJEK loguj za debugging SupplementPlanner problema
    console.log('%c[DEBUG]', 'color: #00ff88; font-weight: bold;', ...args);
};

// Enable debug mode
window.DEBUG = true;

// Make debugLog available globally for imports
globalThis.debugLog = window.debugLog;

// UKLONJENA FUNKCIJA: generateSupplementCardsHTML
// Razlog: Nove SupplementPlanner klasa preuzima potpunu kontrolu
function generateSupplementCardsHTML_DEPRECATED() {
    // FUNKCIJA ONEMOGUĆENA - koristi se nova SupplementPlanner klasa
    console.warn('⚠️ generateSupplementCardsHTML pozvan - DEPRECATED! Koristi SupplementPlanner umesto toga');
    return '<div class="error">Koristi SupplementPlanner klasu</div>';
    
    if (typeof detailedSupplements === 'undefined') {
        debugLog('⚠️ detailedSupplements nije dostupan - koristim fallback');
        // Fallback na osnovne suplementi
        return `
            <div class="supplement-card priority-1" data-supplement-id="omega-3" data-priority="1" data-fasting-safe="false" data-timing="sa-hranom">
                <span class="supplement-link tooltip-trigger" data-supplement="Omega-3">Omega-3</span>
                <span class="timing">Sa hranom</span>
                <div class="supplement-tooltip hidden">
                    <h4>Omega-3</h4>
                    <p><strong>Doza:</strong> 1-2 kapsule</p>
                    <p><strong>Benefiti:</strong> Antiinflamatorno, zdravlje srca</p>
                </div>
            </div>
            <div class="supplement-card priority-2" data-supplement-id="vitamin-d3" data-priority="2" data-fasting-safe="true" data-timing="ujutru">
                <span class="supplement-link tooltip-trigger" data-supplement="Vitamin D3">Vitamin D3</span>
                <span class="timing">Ujutru</span>
                <div class="supplement-tooltip hidden">
                    <h4>Vitamin D3</h4>
                    <p><strong>Doza:</strong> 2000-4000 IU</p>
                    <p><strong>Benefiti:</strong> Imunitet, kosti</p>
                </div>
            </div>
            <div class="supplement-card priority-3" data-supplement-id="magnezijum" data-priority="3" data-fasting-safe="true" data-timing="uvece">
                <span class="supplement-link tooltip-trigger" data-supplement="Magnezijum">Magnezijum</span>
                <span class="timing">Uveče</span>
                <div class="supplement-tooltip hidden">
                    <h4>Magnezijum</h4>
                    <p><strong>Doza:</strong> 400mg</p>
                    <p><strong>Benefiti:</strong> Relaksacija, san</p>
                </div>
            </div>
            <div class="supplement-card" data-supplement-id="mct-oil" data-priority="2" data-fasting-safe="true" data-timing="ujutru">
                <span class="supplement-link tooltip-trigger" data-supplement="MCT Oil">MCT Oil</span>
                <span class="timing">Ujutru</span>
                <div class="supplement-tooltip hidden">
                    <h4>MCT Oil</h4>
                    <p><strong>Doza:</strong> 1 kašičica</p>
                    <p><strong>Benefiti:</strong> Brza energija</p>
                </div>
            </div>
            <div class="supplement-card" data-supplement-id="elektroliti" data-priority="2" data-fasting-safe="true" data-timing="tokom-dana">
                <span class="supplement-link tooltip-trigger" data-supplement="Elektroliti">Elektroliti</span>
                <span class="timing">Tokom dana</span>
                <div class="supplement-tooltip hidden">
                    <h4>Elektroliti</h4>
                    <p><strong>Doza:</strong> Prema potrebi</p>
                    <p><strong>Benefiti:</strong> Hidratacija</p>
                </div>
            </div>
            <div class="supplement-card" data-supplement-id="kreatin" data-priority="1" data-fasting-safe="true" data-timing="bilo-kada">
                <span class="supplement-link tooltip-trigger" data-supplement="Kreatin">Kreatin</span>
                <span class="timing">Bilo kada</span>
                <div class="supplement-tooltip hidden">
                    <h4>Kreatin</h4>
                    <p><strong>Doza:</strong> 5g</p>
                    <p><strong>Benefiti:</strong> Snaga, performanse</p>
                </div>
            </div>
        `;
    }

    // Koristi detaljne podatke iz detailedSupplements.js
    const supplements = Object.entries(detailedSupplements);
    
    return supplements.map(([id, supplement]) => `
        <div class="supplement-card ${supplement.fastingSafe ? 'fasting-safe' : 'breaks-fast'}" 
             data-supplement-id="${id}"
             data-priority="${supplement.priority}"
             data-fasting-safe="${supplement.fastingSafe}"
             data-timing="${supplement.timing.join(',')}"
             data-category="${supplement.category}">
             
            <div class="supplement-header">
                <span class="supplement-link tooltip-trigger font-medium text-white" 
                      data-supplement="${id}">
                    ${supplement.name}
                </span>
                <div class="supplement-badges">
                    <span class="priority-badge priority-${supplement.priority}">
                        ${'★'.repeat(supplement.priority)}
                    </span>
                    <span class="fasting-badge ${supplement.fastingSafe ? 'safe' : 'breaks-fast'}">
                        ${supplement.fastingSafe ? 'Ne kvari post' : 'U prozoru'}
                    </span>
                </div>
            </div>
            
            <div class="supplement-details">
                <div class="detail-row">
                    <span class="detail-label">Doza:</span>
                    <span class="detail-value">${supplement.dose}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Kada:</span>
                    <span class="detail-value">${supplement.timeSlots.join(', ')}</span>
                </div>
            </div>
            
            <div class="supplement-actions">
                <button class="taken-today-btn" data-supplement="${id}">
                    <i class="fas fa-check mr-1"></i>Uzeto danas
                </button>
                <button class="details-btn" data-supplement="${id}">
                    <i class="fas fa-info-circle mr-1"></i>Detalji
                </button>
            </div>
            
            <!-- Hidden tooltip -->
            <div class="supplement-tooltip hidden">
                <h4>${supplement.name}</h4>
                <p><strong>Brend:</strong> ${supplement.brand}</p>
                <p><strong>Benefiti:</strong> ${supplement.benefits}</p>
                <p><strong>Napomene:</strong> ${supplement.notes}</p>
                <p><strong>Interakcije:</strong> ${supplement.interactions}</p>
            </div>
        </div>
    `).join('');
}

// Globalna inicijalizacija kada se stranica učita
document.addEventListener('DOMContentLoaded', function () {
    // Inicijalizuj osnovne komponente
    initializeModals();
    initializeIFTimer();

    // Ažuriraj progress bar na osnovu trenutnog dana
    const currentDay = getCurrentDay();
    updateProgressBar(currentDay);

    // Generisanje današnjeg fokusa - BEZ supplement sekcije na početak
    initializeTodayFocusBasic(currentDay);

    // Generisanje sedmičnih pregleda (bez checklist-a)
    generateWeekHTML(1, 7, 'sedmica-1-content');
    generateWeekHTML(8, 14, 'sedmica-2-content');
    generateWeekHTML(15, 21, 'sedmica-3-content');
    generateWeekHTML(22, 28, 'sedmica-4-content');

    // Inicijalizuj checklist samo za danas (ne za sedmične preglede)
    initializeTodayChecklist(currentDay);

    // Inicijalizuj accordion funkcionalnost
    initializeAccordion();

    // ISKLJUČI stari tooltip sistem - prelazimo na Advanced Supplement Manager
    // initializeTooltips(); // ← ZAKOMENTARISANO

    // Čekaj učitavanje modula prije inicijalizacije
    waitForModules().then(() => {
        debugLog('✅ Moduli učitani - inicijalizujem Advanced Manager');

        // Inicijalizuj Advanced Supplement Manager (novu SupplementPlanner klasu)
        // Koristi globalnu instancu koja se automatski kreira u advancedSupplementManager.js
        if (window.supplementPlanner) {
            debugLog('🎯 SupplementPlanner već inicijalizovan automatski');
        } else {
            debugLog('⚠️ Kreiram novu instancu SupplementPlanner');
            window.supplementPlanner = new window.SupplementPlanner();
        }

        // UKLONJEN: updateDailySupplementsWithTooltips() - nova SupplementPlanner klasa preuzima kontrolu
        debugLog('🎯 SupplementPlanner preuzeo kontrolu nad #supplement-planner containerom');

        // FORSIRAJ REFLOW ZA STABILIZACIJU LAYOUT-A
        // Ovo rješava "layout flash" problem na inicijalnom load-u
        requestAnimationFrame(() => {
            const grid = document.querySelector('#danasnji-plan-container .supplements-grid');
            if (grid) {
                // Pristupanje offsetHeight svojstvu tjera pretraživač na ponovno izračunavanje
                grid.offsetHeight;
                debugLog('🔧 Layout reflow forsiran');
            }
            // Opcionalno, može pomoći da se trigeruje i resize event
            window.dispatchEvent(new Event('resize'));
        });

        // ZAMIJENI stare tooltip event listener-e sa modal sistemom
        initializeSupplementCards();

    }).catch(error => {
        console.error('❌ Greška pri učitavanju modula:', error);
        debugLog('🔄 Pokušavam fallback inicijalizaciju...');

        // Fallback: Pokušaj ručnu inicijalizaciju
        setTimeout(() => {
            try {
                if (typeof window.SupplementPlanner !== 'undefined') {
                    debugLog('✅ Koristim globalnu SupplementPlanner klasu');
                    window.supplementPlanner = new window.SupplementPlanner();
                } else {
                    debugLog('❌ Nema dostupne SupplementPlanner klase');
                    // Show error message in the container
                    const container = document.getElementById('supplement-planner');
                    if (container) {
                        container.innerHTML = `
                            <div class="error-state">
                                <div class="error-icon">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </div>
                                <h3>Greška pri učitavanju</h3>
                                <p>Supplement Planner se nije mogao učitati. Pokušajte refresh stranice.</p>
                                <button onclick="location.reload()" class="retry-btn">
                                    <i class="fas fa-redo"></i> Osveži stranicu
                                </button>
                            </div>
                        `;
                    }
                }
            } catch (fallbackError) {
                console.error('❌ Fallback inicijalizacija takođe nije uspjela:', fallbackError);
            }
        }, 1000); // Wait 1 second before fallback
    });

    // Zatraži dozvolu za notifikacije
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

// NOVA FUNKCIJA: Čekaj učitavanje modula sa Promise
function waitForModules() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 50; // 5 sekundi (50 * 100ms)
        let attempts = 0;

        const checkModules = () => {
            attempts++;

            debugLog(`🔍 Pokušaj ${attempts}/50 - Čekam module:`);
            debugLog(`   - SUPPLEMENTS_DATA: ${typeof SUPPLEMENTS_DATA !== 'undefined' ? '✅' : '❌'}`);
            debugLog(`   - window.SUPPLEMENTS_DATA: ${typeof window.SUPPLEMENTS_DATA !== 'undefined' ? '✅' : '❌'}`);
            debugLog(`   - window.SupplementPlanner: ${typeof window.SupplementPlanner !== 'undefined' ? '✅' : '❌'}`);
            debugLog(`   - detailedSupplements: ${typeof detailedSupplements !== 'undefined' ? '✅' : '❌'}`);

            // Check both ES6 imports and global variables
            const hasData = typeof SUPPLEMENTS_DATA !== 'undefined' || typeof window.SUPPLEMENTS_DATA !== 'undefined';
            const hasPlanner = typeof window.SupplementPlanner !== 'undefined';

            if (hasData && hasPlanner) {
                debugLog('🎉 SVI MODULI UČITANI - pokretam SupplementPlanner!');
                resolve();
            } else if (attempts >= maxAttempts) {
                debugLog('❌ Timeout: Moduli se nisu učitali u roku od 5 sekundi');
                debugLog('📊 Final status - Data:', hasData, 'Planner:', hasPlanner);
                reject(new Error('Timeout: Moduli se nisu učitali u roku od 5 sekundi'));
            } else {
                debugLog(`⏳ Čekam učitavanje modula... (${attempts}/${maxAttempts})`);
                setTimeout(checkModules, 100);
            }
        };

        checkModules();
    });
}

// UKLONJENA FUNKCIJA: updateDailySupplementsWithTooltips  
// Razlog: Nova SupplementPlanner klasa preuzima potpunu kontrolu nad supplement prikauom
function updateDailySupplementsWithTooltips_DEPRECATED() {
    console.warn('⚠️ updateDailySupplementsWithTooltips pozvan - DEPRECATED! Koristi SupplementPlanner umesto toga');
    // Funkcija onemogućena - SupplementPlanner preuzima kontrolu
}

// NOVA FUNKCIJA: Supplement cards modal handling
function initializeSupplementCards() {
    debugLog('🎯 Inicijalizujem supplement card handlers');
    
    // Event delegation za "Detalji" dugmad - SIGURNO
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.details-btn');
        if (button) {
            e.preventDefault();
            const supplementId = button.dataset.supplement;
            
            debugLog('🔍 Klik na Detalji za:', supplementId);
            
            if (supplementId && window.supplementModal) {
                window.supplementModal.show(supplementId);
            }
        }
    });

    // Event delegation za "Uzeto danas" dugmad - SIGURNO
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.taken-today-btn');
        if (button) {
            e.preventDefault();
            const supplementId = button.dataset.supplement;
            
            debugLog('✅ Klik na Uzeto danas za:', supplementId);
            
            if (supplementId) {
                toggleSupplementTaken(supplementId, button);
            }
        }
    });
}

function toggleSupplementTaken(supplementId, button) {
    const current = localStorage.getItem(`taken_${supplementId}`) === 'true';
    localStorage.setItem(`taken_${supplementId}`, (!current).toString());
    
    debugLog('🔄 Toggled taken status for:', supplementId, 'to:', !current);
    
    if (!current) {
        button.classList.add('taken');
        button.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Uzeto ✓';
        button.className = button.className.replace('bg-cyan-600', 'bg-green-600');
    } else {
        button.classList.remove('taken');
        button.innerHTML = '<i class="fas fa-check mr-1"></i>Uzeto danas';
        button.className = button.className.replace('bg-green-600', 'bg-cyan-600');
    }
}

// Cleanup na window unload
window.addEventListener('beforeunload', function() {
    if (window.supplementManager && typeof window.supplementManager.destroy === 'function') {
        window.supplementManager.destroy();
    }

    // Debug mode
    if (window.location.hash === '#debug') {
        enableDebugMode();
    }
});

// Debug mode funkcionalnost
function enableDebugMode() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
        max-width: 300px;
    `;

    debugPanel.innerHTML = `
        <strong>🔧 Debug Panel</strong><br>
        <button onclick="testAllFunctions()">Test All Functions</button><br>
        <button onclick="clearAllData()">Clear localStorage</button><br>
        <button onclick="showDataInfo()">Show Data Info</button>
    `;

    document.body.appendChild(debugPanel);
}

// Debug funkcije
function testAllFunctions() {
    // Test functions can be called individually if needed
}

function clearAllData() {
    if (confirm('Da li ste sigurni da želite da obrišete sve sačuvane podatke?')) {
        for (let i = 1; i <= 28; i++) {
            localStorage.removeItem(`checklist_day_${i}`);
        }
        location.reload();
    }
}

function showDataInfo() {
    let storageData = {};
    for (let i = 1; i <= 28; i++) {
        const key = `checklist_day_${i}`;
        const data = localStorage.getItem(key);
        if (data) {
            storageData[key] = JSON.parse(data);
        }
    }
    debugLog('localStorage data:', storageData);
}

// NOVA FUNKCIJA: Osnovni danas fokus BEZ supplement sekcije
function initializeTodayFocusBasic(currentDay) {
    const dayKey = `Dan ${currentDay}`;
    const todayData = planData[dayKey];

    if (!todayData) {
        console.warn(`Nema podataka za ${dayKey}`);
        return;
    }

    const todayDate = new Date(startDate);
    todayDate.setDate(startDate.getDate() + currentDay - 1);

    const dateElement = document.getElementById('danasnji-datum');
    if (dateElement) {
        dateElement.textContent = `${todayDate.getDate()}.${(todayDate.getMonth() + 1).toString().padStart(2, '0')} | Dan ${currentDay} od 28`;
    }

    const container = document.getElementById('danasnji-plan-container');
    if (container) {
        // Generiši komplet današnji HTML - sada sa loading indikatorom
        container.innerHTML = generateDayHTML(todayData, currentDay);
        debugLog('📅 Inicijalizovan osnovni današnji fokus za Dan', currentDay);
    }
}

// Utility funkcije
function formatDate(date) {
    return date.toLocaleDateString('sr-RS', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function calculateDaysDifference(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Export funkcije za debug ili testiranje
window.debugFunctions = {
    testAllFunctions,
    clearAllData,
    showDataInfo,
    getCurrentDay,
    updateProgressBar,
    resetIFTimer
};

// === FUNKCIJE ZA GENERISANJE SADRŽAJA ===

function initializeTodayFocus(currentDay) {
    const dayKey = `Dan ${currentDay}`;
    const todayData = planData[dayKey];

    if (!todayData) {
        console.warn(`Nema podataka za ${dayKey}`);
        return;
    }

    const todayDate = new Date(startDate);
    todayDate.setDate(startDate.getDate() + currentDay - 1);

    const dateElement = document.getElementById('danasnji-datum');
    if (dateElement) {
        dateElement.textContent = `${todayDate.getDate()}.${(todayDate.getMonth() + 1).toString().padStart(2, '0')} | Dan ${currentDay} od 28`;
    }

    const container = document.getElementById('danasnji-plan-container');
    if (container) {
        container.innerHTML = generateDayHTML(todayData, currentDay);
    }
}

function generateDayHTML(dayData, dayNumber) {
    let dayHTML = `
        <div class="day-content">
            <div class="training-section mb-6">
                <div class="section-header">
                    <i class="fas fa-dumbbell section-icon"></i>
                    <h4 class="section-title">Danas trening</h4>
                </div>
                <div class="training-card">
                    <div class="training-type">
                        <i class="fas fa-dumbbell training-icon"></i>
                        <span class="training-text">${dayData.trening}</span>
                    </div>
                </div>
            </div>

            <div class="meals-section mb-6">
                <div class="section-header">
                    <i class="fas fa-utensils section-icon"></i>
                    <h4 class="section-title">Obroci (IF 18/6: 13:00-19:00)</h4>
                </div>
                <div class="meals-grid">
                    ${generateMealsHTML(dayNumber)}
                </div>
            </div>

            <div class="supplements-section mb-6">
                <div class="section-header">
                    <i class="fas fa-pills section-icon"></i>
                    <h4 class="section-title">Suplementacija</h4>
                </div>
                <div class="supplements-grid" id="daily-supplements-loading">
                    <div class="loading-placeholder text-center py-8">
                        <div class="animate-spin inline-block w-6 h-6 border-2 border-cyan-500 border-r-transparent rounded-full mb-2"></div>
                        <p class="text-gray-400">Učitavam supplement podatke...</p>
                    </div>
                </div>
            </div>

            <div class="daily-checklist mb-6">
                <div class="section-header">
                    <i class="fas fa-list-check section-icon"></i>
                    <h4 class="section-title">Dnevni checklist</h4>
                </div>
                <div class="checklist-items" data-day="${dayNumber}">
    `;

    dayData.checklist.forEach(task => {
        const taskId = task.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        dayHTML += `
            <div class="checklist-item">
                <label for="${taskId}-${dayNumber}" class="checklist-label">
                    <input type="checkbox" id="${taskId}-${dayNumber}"
                           class="checklist-checkbox"
                           data-task="${taskId}">
                    <span class="task-text">${task}</span>
                </label>
            </div>
        `;
    });

    dayHTML += `
                </div>
                <div class="checklist-summary mt-4 pt-3 border-t border-gray-700">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-400">
                            Završeno: <span class="checklist-progress">0/${dayData.checklist.length}</span>
                        </span>
                        <span class="text-sm font-medium completion-percentage">0%</span>
                    </div>
                    <div class="completion-message text-sm text-cyan-300 mt-2">
                        Počni dan sa prvim zadatkom!
                    </div>
                </div>
            </div>
        </div>
    `;

    return dayHTML;
}

// Nova funkcija za sedmični pregled - BEZ checklist-a
function generateWeekDaySummary(dayData, dayNumber) {
    return `
        <div class="day-content">
            <div class="training-section mb-6">
                <div class="section-header">
                    <i class="fas fa-dumbbell section-icon"></i>
                    <h4 class="section-title">Trening</h4>
                </div>
                <div class="training-card">
                    <div class="training-type">
                        <i class="fas fa-dumbbell training-icon"></i>
                        <span class="training-text">${dayData.trening}</span>
                    </div>
                </div>
            </div>

            <div class="meals-section mb-6">
                <div class="section-header">
                    <i class="fas fa-utensils section-icon"></i>
                    <h4 class="section-title">Obroci</h4>
                </div>
                <div class="meals-grid">
                    ${generateMealsHTML(dayNumber)}
                </div>
            </div>

            <div class="supplements-section mb-6">
                <div class="section-header">
                    <i class="fas fa-pills section-icon"></i>
                    <h4 class="section-title">Suplementacija</h4>
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

function generateWeekHTML(startDay, endDay, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let content = '<div class="week-days">';

    for (let i = startDay; i <= endDay; i++) {
        const dayKey = `Dan ${i}`;
        const day = planData[dayKey];
        if (!day) continue;

        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i - 1);

        let bgColor, borderColor, typeColor, icon;
        if (day.trening.includes('PUSH')) {
            bgColor = 'bg-orange-900/60 hover:bg-orange-800/70';
            borderColor = 'border-orange-600/50';
            typeColor = 'text-orange-400';
            icon = 'fa-arrow-up';
        } else if (day.trening.includes('PULL')) {
            bgColor = 'bg-blue-900/60 hover:bg-blue-800/70';
            borderColor = 'border-blue-600/50';
            typeColor = 'text-blue-400';
            icon = 'fa-arrow-down';
        } else if (day.trening.includes('LEGS')) {
            bgColor = 'bg-red-900/60 hover:bg-red-800/70';
            borderColor = 'border-red-600/50';
            typeColor = 'text-red-400';
            icon = 'fa-shoe-prints';
        } else if (day.trening.includes('odmor') || day.trening.includes('joga')) {
            bgColor = 'bg-indigo-900/60 hover:bg-indigo-800/70';
            borderColor = 'border-indigo-600/50';
            typeColor = 'text-indigo-400';
            icon = 'fa-bed';
        } else if (day.trening.includes('UPPER')) {
            bgColor = 'bg-yellow-900/60 hover:bg-yellow-800/70';
            borderColor = 'border-yellow-600/50';
            typeColor = 'text-yellow-400';
            icon = 'fa-arrow-up';
        } else if (day.trening.includes('LOWER')) {
            bgColor = 'bg-purple-900/60 hover:bg-purple-800/70';
            borderColor = 'border-purple-600/50';
            typeColor = 'text-purple-400';
            icon = 'fa-arrow-down';
        } else {
            bgColor = 'bg-green-900/60 hover:bg-green-800/70';
            borderColor = 'border-green-600/50';
            typeColor = 'text-green-400';
            icon = 'fa-dumbbell';
        }

        const dayDetails = generateWeekDaySummary(day, i);
        const currentDay = getCurrentDay();
        const isCurrentDay = i === currentDay;
        const currentDayClass = isCurrentDay ? 'ring-2 ring-cyan-400 ring-opacity-75' : '';
        const currentDayBadge = isCurrentDay ? '<span class="text-xs bg-cyan-500 text-white px-2 py-0.5 rounded-full ml-2">DANAS</span>' : '';

        content += `
            <div class="day-container border ${borderColor} ${currentDayClass} rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div class="day-card p-4 ${bgColor} cursor-pointer transition-all duration-200" data-day="${i}">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4 flex-1 min-w-0">
                            <div class="flex items-center justify-center w-12 h-12 ${bgColor.replace('/60', '/80').replace('hover:', '')} rounded-lg flex-shrink-0 border ${borderColor}">
                                <i class="fas ${icon} text-xl ${typeColor}"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-3 mb-1">
                                    <h3 class="font-bold text-white text-lg">Dan ${i}${currentDayBadge}</h3>
                                    <span class="text-sm ${typeColor} font-medium">${day.trening.split(' ')[0]}</span>
                                </div>
                                <div class="flex items-center gap-2 text-sm text-gray-400">
                                    <span class="font-medium">${dayDate.getDate()}.${(dayDate.getMonth() + 1).toString().padStart(2, '0')}</span>
                                    <span>•</span>
                                    <span class="capitalize">${dayDate.toLocaleDateString('sr-RS', { weekday: 'short' })}</span>
                                </div>
                            </div>
                        </div>
                        <i class="fas fa-chevron-down transition-transform duration-300 text-gray-400 text-lg flex-shrink-0 ml-4" id="chevron-${i}"></i>
                    </div>
                </div>
                <div class="day-details collapsed max-h-0 overflow-hidden transition-all duration-300 ease-in-out" id="details-${i}">
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
            const chevron = document.getElementById(`chevron-${dayIndex}`);

            document.querySelectorAll(`#${containerId} .day-details`).forEach(other => {
                if (other.id !== `details-${dayIndex}`) {
                    other.classList.add('collapsed');
                    other.style.maxHeight = '0';
                    const otherIndex = other.id.replace('details-', '');
                    const otherChevron = document.getElementById(`chevron-${otherIndex}`);
                    if (otherChevron) {
                        otherChevron.classList.remove('rotate-180');
                    }
                }
            });

            const isCollapsed = details.classList.contains('collapsed');
            details.classList.toggle('collapsed');
            chevron.classList.toggle('rotate-180');

            if (isCollapsed) {
                details.style.maxHeight = details.scrollHeight + 'px';
                setTimeout(() => {
                    details.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            } else {
                details.style.maxHeight = '0';
            }
        });
    });
}

// Accordion funkcionalnost
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isOpen = this.classList.contains('open');

            accordionButtons.forEach(btn => {
                btn.classList.remove('open');
                btn.nextElementSibling.classList.remove('open');
            });

            if (!isOpen) {
                this.classList.add('open');
                content.classList.add('open');
            }
        });
    });
}

function generateMealsHTML(dayNumber) {
    const meals = [
        {
            title: "Obrok 1 (oko 13:30)",
            description: getMealForDay(dayNumber, 1),
            macros: "~30-40g proteina, ~25-35g masti, ~8-12g ugljenih hidrata"
        },
        {
            title: "Obrok 2 (oko 17:30)",
            description: getMealForDay(dayNumber, 2),
            macros: "~35-45g proteina, ~20-30g masti, ~10-15g ugljenih hidrata"
        }
    ];

    return meals.map(meal => `
        <div class="meal-card">
            <div class="meal-header">
                <h5 class="meal-title">${meal.title}</h5>
                <button class="show-alternatives-btn" data-meal="${meal.title}">
                    <i class="fas fa-exchange-alt mr-1"></i>
                    Alternative
                </button>
            </div>
            <div class="meal-content">
                <p class="meal-description">${meal.description}</p>
                <div class="macros-info">
                    <i class="fas fa-chart-pie text-cyan-400 mr-2"></i>
                    <span class="font-medium">${meal.macros}</span>
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

    return mealOptions[mealNumber][dayIndex % 2];
}

console.log('📦 main.js uspešno učitan!');

