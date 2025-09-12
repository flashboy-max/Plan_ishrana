// DataManager.js - Centralizovano upravljanje podacima
export class DataManager {
    constructor() {
        this.cache = new Map();
        this.lastUpdate = null;
    }

    // Dobijanje suplementa za određeni period
    getSupplementsByPeriod(period) {
        const cacheKey = `period_${period}`;

        if (this.cache.has(cacheKey) && this.isCacheValid()) {
            return this.cache.get(cacheKey);
        }

        const SUPPLEMENTS_DATA = window.SUPPLEMENTS_DATA || {};
        const supplements = SUPPLEMENTS_DATA[period] || {};

        this.cache.set(cacheKey, supplements);
        this.updateTimestamp();

        return supplements;
    }

    // Dobijanje svih suplementa
    getAllSupplements() {
        const cacheKey = 'all_supplements';

        if (this.cache.has(cacheKey) && this.isCacheValid()) {
            return this.cache.get(cacheKey);
        }

        const SUPPLEMENTS_DATA = window.SUPPLEMENTS_DATA || {};
        const allSupplements = {};

        Object.values(SUPPLEMENTS_DATA).forEach(periodSupplements => {
            Object.assign(allSupplements, periodSupplements);
        });

        this.cache.set(cacheKey, allSupplements);
        this.updateTimestamp();

        return allSupplements;
    }

    // Dobijanje suplementa po ID-u
    getSupplementById(id) {
        const cacheKey = `supplement_${id}`;

        if (this.cache.has(cacheKey) && this.isCacheValid()) {
            return this.cache.get(cacheKey);
        }

        const allSupplements = this.getAllSupplements();
        const supplement = allSupplements[id] || null;

        if (supplement) {
            this.cache.set(cacheKey, supplement);
        }

        return supplement;
    }

    // Praćenje unosa suplementa
    getTakenStatus(supplementId) {
        return localStorage.getItem(`taken_${supplementId}`) === 'true';
    }

    setTakenStatus(supplementId, taken) {
        localStorage.setItem(`taken_${supplementId}`, taken.toString());
        this.invalidateCache();
    }

    toggleTakenStatus(supplementId) {
        const currentStatus = this.getTakenStatus(supplementId);
        const newStatus = !currentStatus;
        this.setTakenStatus(supplementId, newStatus);
        return newStatus;
    }

    // Statistike konzistentnosti
    getConsistencyStats() {
        const allSupplements = this.getAllSupplements();
        const supplementIds = Object.keys(allSupplements);

        const total = supplementIds.length;
        const taken = supplementIds.filter(id => this.getTakenStatus(id)).length;
        const percentage = total > 0 ? Math.round((taken / total) * 100) : 0;

        return {
            total,
            taken,
            percentage,
            remaining: total - taken
        };
    }

    // Praćenje minerala
    getMineralsTracker() {
        const mineralsTracker = {};
        const allSupplements = this.getAllSupplements();

        // Saberi minerale iz uzetih suplementa
        Object.keys(allSupplements).forEach(id => {
            if (this.getTakenStatus(id)) {
                const supplement = allSupplements[id];
                if (supplement.minerals) {
                    Object.entries(supplement.minerals).forEach(([mineral, amount]) => {
                        mineralsTracker[mineral] = (mineralsTracker[mineral] || 0) + amount;
                    });
                }
            }
        });

        return mineralsTracker;
    }

    // Provjera limita minerala
    checkMineralLimits() {
        const minerals = this.getMineralsTracker();
        const DAILY_LIMITS = window.DAILY_LIMITS || {};

        const warnings = [];
        const overLimits = [];

        Object.entries(minerals).forEach(([mineral, currentAmount]) => {
            const limit = DAILY_LIMITS[mineral];
            if (limit) {
                if (currentAmount >= limit.max) {
                    overLimits.push({
                        mineral,
                        current: currentAmount,
                        limit: limit.max,
                        unit: limit.unit
                    });
                } else if (currentAmount >= limit.warning) {
                    warnings.push({
                        mineral,
                        current: currentAmount,
                        limit: limit.max,
                        warning: limit.warning,
                        unit: limit.unit
                    });
                }
            }
        });

        return { warnings, overLimits };
    }

    // Cache management
    invalidateCache() {
        this.cache.clear();
        this.lastUpdate = null;
        debugLog('[DataManager] Cache invalidiran');
    }

    isCacheValid() {
        if (!this.lastUpdate) return false;

        const CACHE_DURATION = 5 * 60 * 1000; // 5 minuta
        return (Date.now() - this.lastUpdate) < CACHE_DURATION;
    }

    updateTimestamp() {
        this.lastUpdate = Date.now();
    }

    // Utility funkcije
    clearAllData() {
        // Očisti localStorage za suplemente
        const allSupplements = this.getAllSupplements();
        Object.keys(allSupplements).forEach(id => {
            localStorage.removeItem(`taken_${id}`);
        });

        this.invalidateCache();
        debugLog('[DataManager] Svi podaci očišćeni');
    }

    exportData() {
        const stats = this.getConsistencyStats();
        const minerals = this.getMineralsTracker();
        const limits = this.checkMineralLimits();

        return {
            timestamp: new Date().toISOString(),
            stats,
            minerals,
            limits,
            supplements: this.getAllSupplements()
        };
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[DataManager]', ...args);
    }
}