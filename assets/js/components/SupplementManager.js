// SupplementManager.js - Glavna klasa koja koordinira sve komponente
import { PeriodManager } from './PeriodManager.js';
import { DataManager } from './DataManager.js';
import { EventHandler } from './EventHandler.js';
import { SupplementCardManager } from './SupplementCard.js';

export class SupplementManager {
    constructor() {
        this.container = null;
        this.currentPeriod = 'fasting';
        this.isInitialized = false;

        // Komponente
        this.dataManager = new DataManager();
        this.eventHandler = null; // Inicijalizuje se kasnije
        this.cardManager = new SupplementCardManager();

        // UI stanje
        this.consistencyData = {
            total: 0,
            taken: 0,
            percentage: 0
        };
        this.mineralsTracker = {};

        debugLog('[SupplementManager] Instanca kreirana');
    }

    // Glavna inicijalizacija
    async init() {
        try {
            debugLog('[SupplementManager] Početak inicijalizacije');

            // Setup kontejnera
            this.container = document.getElementById('supplement-planner');
            if (!this.container) {
                throw new Error('Supplement planner container not found');
            }

            // Prikaži skeleton loader
            this.showSkeletonLoader();

            // Sačekaj da se podaci učitaju
            await this.waitForData();

            // Inicijalizuj komponente
            this.currentPeriod = PeriodManager.getCurrentPeriod();
            this.eventHandler = new EventHandler(this);

            // Renderuj interface
            this.renderInterface();

            // Inicijalizuj event handlere
            this.eventHandler.initialize();

            // Izračunaj statistike
            this.calculateConsistency();
            this.updateMineralsTracker();

            this.isInitialized = true;

            // Export global functions for modal compatibility
            this.exportGlobalFunctions();

            debugLog('[SupplementManager] ✅ Inicijalizacija završena');

        } catch (error) {
            console.error('[SupplementManager] ❌ Greška pri inicijalizaciji:', error);
            this.showErrorState(error.message);
        }
    }

    // Čekaj da se podaci učitaju
    async waitForData() {
        return new Promise((resolve) => {
            debugLog('🔍 Čekam učitavanje podataka...');

            const checkData = () => {
                const hasSupplements = typeof window.SUPPLEMENTS_DATA !== 'undefined' ||
                                     (typeof window.getAllSupplements === 'function' && window.getAllSupplements());
                const hasDetailed = typeof window.detailedSupplements !== 'undefined';
                const hasPeriodInfo = typeof window.PERIOD_INFO !== 'undefined';

                debugLog('📊 Status podataka:', {
                    SUPPLEMENTS_DATA: typeof window.SUPPLEMENTS_DATA,
                    getAllSupplements: typeof window.getAllSupplements,
                    detailedSupplements: typeof window.detailedSupplements,
                    PERIOD_INFO: typeof window.PERIOD_INFO,
                    hasData: hasSupplements || hasDetailed
                });

                if ((hasSupplements || hasDetailed) && hasPeriodInfo) {
                    debugLog('🎉 Podaci dostupni - nastavljam!');
                    resolve();
                } else {
                    debugLog('⏳ Čekam podatke...');
                    setTimeout(checkData, 100);
                }
            };

            // Timeout nakon 3 sekunde
            setTimeout(() => {
                debugLog('⚠️ Timeout - nastavljam bez nekih podataka');
                resolve();
            }, 3000);

            checkData();
        });
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

    // GLAVNI RENDER - PERIOD BASED
    renderInterface() {
        if (!this.container) return;

        const periodSupplements = this.dataManager.getSupplementsByPeriod(this.currentPeriod);
        const supplementIds = Object.keys(periodSupplements);

        debugLog(`[SupplementManager] Renderujem ${supplementIds.length} suplementa za period ${this.currentPeriod}`);

        // Generiraj kartice
        const supplementCards = supplementIds
            .map(id => {
                const card = this.cardManager.createCard(id, periodSupplements[id], this.currentPeriod);
                return card.render();
            })
            .join('');

        // Period info
        const periodInfo = PeriodManager.getPeriodInfo(this.currentPeriod);

        // Renderuj kompletan interface
        this.container.innerHTML = `
            <div class="supplement-planner-container">

                ${this.renderPeriodHeader(periodInfo)}
                ${this.renderConsistencyTracker()}
                ${this.renderMineralsTracker()}

                <!-- Supplements Grid -->
                <div class="supplements-grid">
                    ${supplementCards}
                </div>

                ${this.renderPeriodSummary(supplementIds.length)}

            </div>
        `;

        debugLog('[SupplementManager] ✅ Interface renderovan');
    }

    // Render period header
    renderPeriodHeader(periodInfo) {
        const prevPeriod = PeriodManager.getPreviousPeriod(this.currentPeriod);
        const nextPeriod = PeriodManager.getNextPeriod(this.currentPeriod);

        return `
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
                    <button class="nav-btn prev-btn" data-direction="-1">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <span class="current-period">${this.currentPeriod}</span>
                    <button class="nav-btn next-btn" data-direction="1">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Render consistency tracker
    renderConsistencyTracker() {
        return `
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
        `;
    }

    // Render minerals tracker
    renderMineralsTracker() {
        const minerals = ['vitaminC', 'magnesium', 'zinc'];
        const DAILY_LIMITS = window.DAILY_LIMITS || {};

        const mineralItems = minerals.map(mineral => {
            const current = this.mineralsTracker[mineral] || 0;
            const limit = DAILY_LIMITS[mineral];
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

        return `
            <div class="minerals-tracker">
                <h4>Praćenje Minerala</h4>
                <div class="minerals-grid">
                    ${mineralItems}
                </div>
            </div>
        `;
    }

    // Render period summary
    renderPeriodSummary(count) {
        return `
            <div class="period-summary">
                <p><strong>${count}</strong> suplementa za trenutni period</p>
            </div>
        `;
    }

    // NAVIGACIJA IZMJEDU PERIODA
    changePeriod(direction) {
        const periods = PeriodManager.getAllPeriods();
        const currentIndex = periods.indexOf(this.currentPeriod);
        const newIndex = (currentIndex + direction + periods.length) % periods.length;

        this.currentPeriod = periods[newIndex];

        // Invalidate cache
        this.dataManager.invalidateCache();
        this.cardManager.destroyAll();

        // Re-render
        this.renderInterface();
        this.calculateConsistency();
        this.updateMineralsTracker();

        debugLog(`[SupplementManager] 🔄 Promijenjen period na: ${this.currentPeriod}`);
    }

    // TOGGLE TAKEN STATUS
    toggleTaken(supplementId) {
        const newStatus = this.dataManager.toggleTakenStatus(supplementId);

        // Update karticu
        this.cardManager.updateCard(supplementId);

        // Update statistike
        this.calculateConsistency();
        this.updateMineralsTracker();

        debugLog(`[SupplementManager] 🔄 Status za ${supplementId}: ${newStatus ? 'uzeto' : 'nije uzeto'}`);

        return newStatus;
    }

    // CALCULATE CONSISTENCY
    calculateConsistency() {
        this.consistencyData = this.dataManager.getConsistencyStats();

        // Update progress bar ako postoji
        const progressFill = this.container?.querySelector('.progress-fill');
        const progressPercentage = this.container?.querySelector('.progress-percentage');
        const progressText = this.container?.querySelector('.progress-text');

        if (progressFill) progressFill.style.width = `${this.consistencyData.percentage}%`;
        if (progressPercentage) progressPercentage.textContent = `${this.consistencyData.percentage}%`;
        if (progressText) {
            progressText.textContent = `${this.consistencyData.taken} od ${this.consistencyData.total} suplementa uzeto`;
        }

        debugLog('[SupplementManager] 📊 Konzistentnost ažurirana:', this.consistencyData);
    }

    // UPDATE MINERALS TRACKER
    updateMineralsTracker() {
        this.mineralsTracker = this.dataManager.getMineralsTracker();

        // Update UI ako postoji
        const mineralsContainer = this.container?.querySelector('.minerals-tracker');
        if (mineralsContainer) {
            const newMineralsHTML = this.renderMineralsTracker();
            const oldMinerals = mineralsContainer.innerHTML;
            if (oldMinerals !== newMineralsHTML) {
                mineralsContainer.innerHTML = newMineralsHTML;
            }
        }

        debugLog('[SupplementManager] 🔍 Minerals tracker ažuriran');
    }

    // SHOW DETAILS MODAL
    showDetails(supplementId) {
        const supplement = this.dataManager.getSupplementById(supplementId);
        if (!supplement) {
            console.error('[SupplementManager] Suplement ne pronađen:', supplementId);
            return;
        }

        console.log('[SupplementManager] Detalji za:', supplement);

        // Pozovi modal sistem
        if (window.supplementModal) {
            window.supplementModal.show(supplementId);
        } else {
            console.error('[SupplementManager] ❌ Modal sistem nije inicijalizovan');
        }
    }

    // PUBLIC API
    refresh() {
        this.dataManager.invalidateCache();
        this.cardManager.destroyAll();
        this.calculateConsistency();
        this.updateMineralsTracker();
        this.renderInterface();
        debugLog('[SupplementManager] 🔄 Refresh complete');
    }

    destroy() {
        if (this.eventHandler) {
            this.eventHandler.destroy();
        }
        this.cardManager.destroyAll();
        this.dataManager.invalidateCache();

        if (this.container) {
            this.container.innerHTML = '';
        }

        this.isInitialized = false;
        debugLog('[SupplementManager] 🗑️ Instance uništena');
    }

    // Getters za pristup komponentama
    getCurrentPeriod() {
        return this.currentPeriod;
    }

    getConsistencyData() {
        return { ...this.consistencyData };
    }

    getMineralsData() {
        return { ...this.mineralsTracker };
    }

    isReady() {
        return this.isInitialized;
    }

    // Export global functions for modal system compatibility
    exportGlobalFunctions() {
        // Export getSupplementById for modal system
        window.getSupplementById = (id) => {
            return this.dataManager.getSupplementById(id);
        };

        // Export getAllSupplements for modal system
        window.getAllSupplements = () => {
            return this.dataManager.getAllSupplements();
        };

        debugLog('🌍 Global functions exported for modal compatibility');
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[SupplementManager]', ...args);
    }
}

// Export za globalni pristup
if (typeof window !== 'undefined') {
    window.SupplementManager = SupplementManager;
}