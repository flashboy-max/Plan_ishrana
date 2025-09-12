// NOVI SUPPLEMENT PLANNER - KORISTI GLOBALNE VARIJABLE
// Podaci se učitavaju preko main.js i dostupni su globalno

class SupplementPlanner {
    constructor() {
        this.container = null;
        this.currentPeriod = 'fasting'; // Trenutni vremenski period
        this.cardCache = new Map(); // Cache za generirane kartice
        this.skeletonLoader = null; // Skeleton loader element
        this.consistencyData = {
            total: 0,
            taken: 0,
            percentage: 0
        };
        this.mineralsTracker = {}; // Praćenje minerala

        this.init();
    }

    async init() {
        try {
            this.container = document.getElementById('supplement-planner');
            if (!this.container) {
                throw new Error('Supplement planner container not found');
            }

            // Prikaži skeleton loader
            this.showSkeletonLoader();

            // Sačekaj da se podaci učitaju
            await this.waitForData();

            // Inicijalizuj period na osnovu trenutnog vremena
            this.currentPeriod = this.getCurrentPeriod();
            debugLog('🕐 Trenutni period:', this.currentPeriod);
            debugLog('📋 Dostupni PERIOD_INFO:', window.PERIOD_INFO ? Object.keys(window.PERIOD_INFO) : 'undefined');

            this.renderInterface();
            this.calculateConsistency();
            this.updateMineralsTracker();

            debugLog('✅ SupplementPlanner inicijalizovan');

        } catch (error) {
            console.error('❌ Greška pri inicijalizaciji SupplementPlanner:', error);
            this.showErrorState(error.message);
        }
    }

    // Čekaj da se podaci učitaju - koristi globalni pristup
    async waitForData() {
        return new Promise((resolve) => {
            debugLog('🔍 Direktno proveravam globalne podatke...');
            debugLog('   - window.SUPPLEMENTS_DATA:', typeof window.SUPPLEMENTS_DATA !== 'undefined' ? '✅' : '❌');
            debugLog('   - window.detailedSupplements:', typeof window.detailedSupplements !== 'undefined' ? '✅' : '❌');
            
            // Podaci su već dostupni kad main.js pozove SupplementPlanner
            if (typeof window.SUPPLEMENTS_DATA !== 'undefined') {
                debugLog('🎉 Podaci odmah dostupni - nastavljam!');
                resolve();
            } else {
                console.error('❌ window.SUPPLEMENTS_DATA nije dostupan u SupplementPlanner');
                this.showErrorState('Podaci nisu dostupni');
                resolve(); // Nastavi bez podataka
            }
        });
    }

    // Odredi trenutni period na osnovu vremena
    getCurrentPeriod() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour * 60 + minute;

        // Definiraj vremenske granice za periode
        const periods = {
            fasting: { start: 7 * 60, end: 12 * 60 + 30 }, // 07:00 - 12:30
            preWorkout: { start: 12 * 60 + 30, end: 14 * 60 }, // 12:30 - 14:00
            duringWorkout: { start: 14 * 60, end: 16 * 60 }, // 14:00 - 16:00
            postWorkout: { start: 16 * 60, end: 17 * 60 }, // 16:00 - 17:00
            meal1: { start: 13 * 60 + 30, end: 14 * 60 }, // 13:30 - 14:00
            meal2: { start: 17 * 60 + 30, end: 19 * 60 }, // 17:30 - 19:00
            evening: { start: 21 * 60, end: 21 * 60 + 30 }, // 21:00 - 21:30
            bedtime: { start: 21 * 60 + 30, end: 22 * 60 } // 21:30 - 22:00
        };

        for (const [period, times] of Object.entries(periods)) {
            if (currentTime >= times.start && currentTime < times.end) {
                return period;
            }
        }

        return 'fasting'; // Default period
    }

    // SKELETON LOADER
    showSkeletonLoader() {
        if (!this.container) return;

        const skeletonHTML = `
            <div class="supplement-skeleton">
                <div class="skeleton-header">
                    <div class="skeleton-title skeleton-pulse"></div>
                    <div class="skeleton-badge skeleton-pulse"></div>
                </div>
                <div class="skeleton-content">
                    <div class="skeleton-line skeleton-pulse"></div>
                    <div class="skeleton-line skeleton-pulse"></div>
                    <div class="skeleton-line skeleton-pulse"></div>
                </div>
                <div class="skeleton-actions">
                    <div class="skeleton-button skeleton-pulse"></div>
                    <div class="skeleton-button skeleton-pulse"></div>
                </div>
            </div>
        `;

        this.container.innerHTML = skeletonHTML;
    }

    generateFallbackInterface(periodInfo, supplementCards) {
        return `
            <div class="supplement-planner-container">
                <!-- Period Header -->
                <div class="period-header">
                    <div class="period-info">
                        <div class="period-icon">
                            <i class="${periodInfo.icon}"></i>
                        </div>
                        <div class="period-details">
                            <h2 class="period-title">${periodInfo.label}</h2>
                            <p class="period-time">${periodInfo.time}</p>
                            <p class="period-description">${periodInfo.description}</p>
                        </div>
                    </div>
                </div>

                <!-- Supplements Grid -->
                <div class="supplements-grid">
                    ${supplementCards || '<p class="text-gray-400">Nema dostupnih suplemenata za trenutni period.</p>'}
                </div>
            </div>
        `;
    }

    // ERROR STATE
    showErrorState(message) {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>Greška pri učitavanju</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i> Pokušaj ponovo
                </button>
            </div>
        `;
    }

    // GLAVNI RENDER - PERIOD-BASED
    renderInterface() {
        if (!this.container) return;

        debugLog('🎨 Početak renderInterface() za period:', this.currentPeriod);

        // Koristi globalne funkcije i podatke
        let periodSupplements = {};
        if (window.getSupplementsByPeriod) {
            periodSupplements = window.getSupplementsByPeriod(this.currentPeriod);
            debugLog('✅ Koristim window.getSupplementsByPeriod za period:', this.currentPeriod);
        } else if (window.SUPPLEMENTS_DATA) {
            periodSupplements = window.SUPPLEMENTS_DATA[this.currentPeriod] || {};
            debugLog('⚠️ Direktni pristup window.SUPPLEMENTS_DATA za period:', this.currentPeriod);
        } else {
            debugLog('❌ Nema dostupnih podataka za period:', this.currentPeriod);
        }
        const supplementIds = Object.keys(periodSupplements);

        debugLog('📊 Pronađeno suplementa za period:', supplementIds.length);
        debugLog('📋 Suplementi:', supplementIds);

        // Generiraj kartice sa stabilnim ključevima
        const supplementCards = supplementIds
            .map(id => this.generateSupplementCard(id, periodSupplements[id]))
            .join('');

        // Period info sa fallback-om
        const periodInfo = window.PERIOD_INFO ? window.PERIOD_INFO[this.currentPeriod] : null;
        
        if (!periodInfo) {
            debugLog('❌ PERIOD_INFO nije dostupan za period:', this.currentPeriod);
            debugLog('   Dostupni periodi u PERIOD_INFO:', window.PERIOD_INFO ? Object.keys(window.PERIOD_INFO) : 'undefined');
            
            // Fallback period info
            const fallbackPeriod = {
                label: 'Trenutni Period',
                time: 'Ceo dan',
                description: 'Suplementi za trenutni period',
                icon: 'fas fa-pills'
            };
            
            this.container.innerHTML = this.generateFallbackInterface(fallbackPeriod, supplementCards);
            return;
        }

        this.container.innerHTML = `
            <div class="supplement-planner-container">

                <!-- Period Header -->
                <div class="period-header">
                    <div class="period-info">
                        <div class="period-icon">
                            <i class="${periodInfo.icon}"></i>
                        </div>
                        <div class="period-details">
                            <h2 class="period-title">${periodInfo.label}</h2>
                            <p class="period-time">${periodInfo.time}</p>
                            <p class="period-description">${periodInfo.description}</p>
                        </div>
                    </div>
                    <div class="period-nav">
                        <button class="nav-btn prev-btn" onclick="supplementPlanner.changePeriod(-1)">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <span class="current-period">${this.currentPeriod}</span>
                        <button class="nav-btn next-btn" onclick="supplementPlanner.changePeriod(1)">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="consistency-tracker">
                    <div class="progress-header">
                        <h3>Dnevna Konzistentnost</h3>
                        <span class="progress-percentage">${this.consistencyData.percentage}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.consistencyData.percentage}%"></div>
                    </div>
                    <p class="progress-text">
                        ${this.consistencyData.taken} od ${this.consistencyData.total} suplementa uzeto
                    </p>
                </div>

                <!-- Minerals Tracker -->
                <div class="minerals-tracker">
                    <h4>Praćenje Minerala</h4>
                    <div class="minerals-grid">
                        ${this.renderMineralsTracker()}
                    </div>
                </div>

                <!-- Supplements Grid -->
                <div class="supplements-grid" data-period="${this.currentPeriod}">
                    ${supplementCards}
                </div>

                <!-- Period Summary -->
                <div class="period-summary">
                    <p><strong>${supplementIds.length}</strong> suplementa za ovaj period</p>
                    <p>Kliknite na "Uzeto danas" da označite unos</p>
                </div>

            </div>
        `;

        debugLog(`✅ Renderovan period: ${this.currentPeriod} sa ${supplementIds.length} suplementima`);
    }

    // MEMOIZACIJA - STABILNO GENERIRANJE KARTICA
    generateSupplementCard(id, supplement) {
        // Cache key sa stabilnim ID-jem
        const cacheKey = `${this.currentPeriod}_${id}_${this.getTakenStatus(id)}`;

        if (this.cardCache.has(cacheKey)) {
            return this.cardCache.get(cacheKey);
        }

        const taken = this.getTakenStatus(id);
        const cardHTML = `
            <div class="supplement-card ${supplement.category} priority-${supplement.priority}"
                 data-supplement-id="${id}"
                 data-key="${cacheKey}"
                 data-period="${this.currentPeriod}">

                <div class="supplement-header">
                    <div class="header-main">
                        <h3 class="supplement-name">${supplement.name}</h3>
                        <div class="supplement-badges">
                            <span class="priority-badge priority-${supplement.priority}">P${supplement.priority}</span>
                            ${supplement.fastingSafe ? '<span class="fasting-badge safe">Ne kvari post</span>' : ''}
                        </div>
                    </div>
                    <p class="supplement-brand">${supplement.brand}</p>
                </div>

                <div class="supplement-details">
                    <div class="detail-row">
                        <span class="detail-label">Doza:</span>
                        <span class="detail-value">${supplement.dosage}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Učestalost:</span>
                        <span class="detail-value">${supplement.frequency}</span>
                    </div>
                </div>

                <div class="supplement-benefits">
                    <p class="benefits-text">${supplement.benefits}</p>
                </div>

                <div class="supplement-actions">
                    <button class="taken-today-btn ${taken ? 'taken' : ''}"
                            data-supplement="${id}"
                            onclick="supplementPlanner.toggleTaken('${id}')">
                        <i class="fas ${taken ? 'fa-check-circle' : 'fa-check'}"></i>
                        ${taken ? 'Uzeto ✓' : 'Uzeto danas'}
                    </button>
                    <button class="details-btn"
                            data-supplement="${id}"
                            onclick="supplementPlanner.showDetails('${id}')">
                        <i class="fas fa-info-circle"></i>
                        Detalji
                    </button>
                </div>
            </div>
        `;

        // Cache karticu
        this.cardCache.set(cacheKey, cardHTML);
        return cardHTML;
    }

    // NAVIGACIJA IZMJEDU PERIODA
    changePeriod(direction) {
        const periods = Object.keys(PERIOD_INFO);
        const currentIndex = periods.indexOf(this.currentPeriod);
        const newIndex = (currentIndex + direction + periods.length) % periods.length;

        this.currentPeriod = periods[newIndex];
        this.invalidateCache();
        this.renderInterface();
        this.calculateConsistency();

        debugLog(`🔄 Promijenjen period na: ${this.currentPeriod}`);
    }

    // TOGGLE TAKEN STATUS
    toggleTaken(supplementId) {
        const key = `taken_${supplementId}`;
        const currentStatus = localStorage.getItem(key) === 'true';
        const newStatus = !currentStatus;

        localStorage.setItem(key, newStatus.toString());

        // Invalidate cache za ovu karticu
        this.invalidateCacheForSupplement(supplementId);

        // Update UI
        this.updateCardStatus(supplementId, newStatus);
        this.calculateConsistency();
        this.updateMineralsTracker();

        debugLog(`🔄 Status za ${supplementId}: ${newStatus ? 'uzeto' : 'nije uzeto'}`);
    }

    // UPDATE CARD STATUS
    updateCardStatus(supplementId, taken) {
        const card = this.container.querySelector(`[data-supplement-id="${supplementId}"]`);
        if (!card) return;

        const btn = card.querySelector('.taken-today-btn');
        if (btn) {
            btn.classList.toggle('taken', taken);
            btn.innerHTML = `
                <i class="fas ${taken ? 'fa-check-circle' : 'fa-check'}"></i>
                ${taken ? 'Uzeto ✓' : 'Uzeto danas'}
            `;
        }
    }

    // INVALIDATE CACHE
    invalidateCache() {
        this.cardCache.clear();
        debugLog('🗑️ Cache invalidiran');
    }

    invalidateCacheForSupplement(supplementId) {
        // Invalidate samo kartice koje sadrže ovaj suplement
        for (const [key, value] of this.cardCache.entries()) {
            if (key.includes(supplementId)) {
                this.cardCache.delete(key);
            }
        }
    }

    // GET TAKEN STATUS
    getTakenStatus(supplementId) {
        return localStorage.getItem(`taken_${supplementId}`) === 'true';
    }

    // CALCULATE CONSISTENCY
    calculateConsistency() {
        const allSupplements = window.getAllSupplements ? window.getAllSupplements() : {};
        const supplementIds = Object.keys(allSupplements);

        const total = supplementIds.length;
        const taken = supplementIds.filter(id => this.getTakenStatus(id)).length;

        this.consistencyData = {
            total,
            taken,
            percentage: total > 0 ? Math.round((taken / total) * 100) : 0
        };

        // Update progress bar ako postoji
        const progressFill = this.container?.querySelector('.progress-fill');
        const progressPercentage = this.container?.querySelector('.progress-percentage');
        const progressText = this.container?.querySelector('.progress-text');

        if (progressFill) progressFill.style.width = `${this.consistencyData.percentage}%`;
        if (progressPercentage) progressPercentage.textContent = `${this.consistencyData.percentage}%`;
        if (progressText) {
            progressText.textContent = `${this.consistencyData.taken} od ${this.consistencyData.total} suplementa uzeto`;
        }

        debugLog('📊 Konzistentnost ažurirana:', this.consistencyData);
    }

    // MINERALS TRACKER
    updateMineralsTracker() {
        this.mineralsTracker = {};

        const allSupplements = window.getAllSupplements ? window.getAllSupplements() : {};

        // Saberi minerale iz uzetih suplementa
        Object.keys(allSupplements).forEach(id => {
            if (this.getTakenStatus(id)) {
                const supplement = allSupplements[id];
                if (supplement.minerals) {
                    Object.entries(supplement.minerals).forEach(([mineral, amount]) => {
                        this.mineralsTracker[mineral] = (this.mineralsTracker[mineral] || 0) + amount;
                    });
                }
            }
        });

        debugLog('🔍 Minerals tracker:', this.mineralsTracker);
    }

    renderMineralsTracker() {
        const minerals = ['vitaminC', 'magnesium', 'zinc'];

        return minerals.map(mineral => {
            const current = this.mineralsTracker[mineral] || 0;
            // Koristi window.DAILY_LIMITS ili fallback vrijednosti
            const limit = window.DAILY_LIMITS ? window.DAILY_LIMITS[mineral] : null;
            const percentage = limit ? Math.min((current / limit.max) * 100, 100) : 0;
            const isWarning = limit && current >= limit.warning;
            const isOver = limit && current >= limit.max;

            return `
                <div class="mineral-item ${isOver ? 'over-limit' : isWarning ? 'warning' : ''}">
                    <div class="mineral-header">
                        <span class="mineral-name">${mineral.toUpperCase()}</span>
                        <span class="mineral-amount">${current}${limit?.unit || 'mg'}</span>
                    </div>
                    <div class="mineral-bar">
                        <div class="mineral-fill" style="width: ${percentage}%"></div>
                    </div>
                    ${limit ? `<span class="mineral-limit">/ ${limit.max}${limit.unit}</span>` : ''}
                </div>
            `;
        }).join('');
    }

    // SHOW DETAILS MODAL
    showDetails(supplementId) {
        const supplement = window.getSupplementById ? window.getSupplementById(supplementId) : null;
        if (!supplement) {
            debugLog('❌ Supplement nije pronađen:', supplementId);
            return;
        }

        debugLog('🔍 Pronašao supplement za modal:', supplement.name);
        
        // Pozovi modal za prikaz detalja
        if (window.supplementModal) {
            window.supplementModal.show(supplementId);
        } else {
            debugLog('❌ Modal nije dostupan');
        }
    }

    // PUBLIC API
    refresh() {
        this.invalidateCache();
        this.calculateConsistency();
        this.updateMineralsTracker();
        this.renderInterface();
        debugLog('🔄 SupplementPlanner refresh complete');
    }

    // Check if planner is ready
    isReady() {
        return this.initializationComplete;
    }

    destroy() {
        this.invalidateCache();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[SupplementPlanner]', ...args);
    }
}

// Global instance
let supplementPlannerInstance = null;

export function createSupplementPlanner() {
    if (!supplementPlannerInstance) {
        supplementPlannerInstance = new SupplementPlanner();
    }
    return supplementPlannerInstance;
}

export { SupplementPlanner };

// Napravi SupplementPlanner dostupnom globalno za main.js
if (typeof window !== 'undefined') {
    window.SupplementPlanner = SupplementPlanner;
    window.SupplementManager = SupplementPlanner; // ALIAS za main.js kompatibilnost

    // Kreiraj globalnu instancu
    window.supplementPlanner = new SupplementPlanner();
    window.supplementManager = window.supplementPlanner; // ALIAS

    debugLog('📡 SupplementPlanner instanca kreirana i dostupna kao supplementManager');
}

// Auto-initialize when DOM is ready - REMOVED to prevent race condition with main.js
// SupplementPlanner will be initialized by main.js after modules are loaded
