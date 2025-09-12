// SupplementCard.js - Komponenta za pojedinačne suplement kartice
export class SupplementCard {
    constructor(supplementId, supplementData, period) {
        this.id = supplementId;
        this.data = supplementData;
        this.period = period;
        this.element = null;
        this.cache = new Map();
    }

    // Generisanje HTML-a za karticu
    render() {
        const cacheKey = `${this.id}_${this.getTakenStatus()}_${this.period}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const taken = this.getTakenStatus();
        const cardHTML = this.generateCardHTML(taken);

        this.cache.set(cacheKey, cardHTML);
        return cardHTML;
    }

    // Generisanje HTML strukture kartice
    generateCardHTML(taken) {
        const priorityClass = this.getPriorityClass();
        const fastingClass = this.data.fastingSafe ? 'fasting-safe' : 'breaks-fast';

        return `
            <div class="supplement-card ${priorityClass} ${fastingClass}"
                 data-supplement-id="${this.id}"
                 data-key="${this.period}_${this.id}_${taken}"
                 data-period="${this.period}">

                ${this.generateHeaderHTML()}
                ${this.generateDetailsHTML()}
                ${this.generateBenefitsHTML()}
                ${this.generateActionsHTML(taken)}

            </div>
        `;
    }

    // Header sekcija
    generateHeaderHTML() {
        const badges = this.generateBadges();

        return `
            <div class="supplement-header">
                <div class="header-main">
                    <h3 class="supplement-name">${this.data.name}</h3>
                    <div class="supplement-badges">
                        ${badges}
                    </div>
                </div>
                <p class="supplement-brand">${this.data.brand}</p>
            </div>
        `;
    }

    // Details sekcija
    generateDetailsHTML() {
        return `
            <div class="supplement-details">
                <div class="detail-row">
                    <span class="detail-label">Doza:</span>
                    <span class="detail-value">${this.data.dosage}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Učestalost:</span>
                    <span class="detail-value">${this.data.frequency}</span>
                </div>
            </div>
        `;
    }

    // Benefits sekcija
    generateBenefitsHTML() {
        return `
            <div class="supplement-benefits">
                <p class="benefits-text">${this.data.benefits}</p>
            </div>
        `;
    }

    // Actions sekcija
    generateActionsHTML(taken) {
        const takenIcon = taken ? 'fa-check-circle' : 'fa-check';
        const takenText = taken ? 'Uzeto ✓' : 'Uzeto danas';
        const takenClass = taken ? 'taken' : '';

        return `
            <div class="supplement-actions">
                <button class="taken-today-btn ${takenClass}"
                        data-supplement="${this.id}">
                    <i class="fas ${takenIcon} mr-1"></i>
                    ${takenText}
                </button>
                <button class="details-btn"
                        data-supplement="${this.id}">
                    <i class="fas fa-info-circle"></i>
                    Detalji
                </button>
            </div>
        `;
    }

    // Generisanje badges
    generateBadges() {
        let badges = `<span class="priority-badge priority-${this.data.priority}">P${this.data.priority}</span>`;

        if (this.data.fastingSafe) {
            badges += `<span class="fasting-badge safe">Ne kvari post</span>`;
        } else {
            badges += `<span class="fasting-badge breaks-fast">Kvary post</span>`;
        }

        return badges;
    }

    // Priority klasa
    getPriorityClass() {
        return `priority-${this.data.priority}`;
    }

    // Status uzimanja
    getTakenStatus() {
        return localStorage.getItem(`taken_${this.id}`) === 'true';
    }

    // Update statusa
    updateTakenStatus(taken) {
        // Invalidate cache
        this.cache.clear();

        // Update localStorage
        localStorage.setItem(`taken_${this.id}`, taken.toString());

        debugLog(`[SupplementCard] Status za ${this.id}: ${taken}`);
    }

    // Toggle status
    toggleTakenStatus() {
        const currentStatus = this.getTakenStatus();
        const newStatus = !currentStatus;
        this.updateTakenStatus(newStatus);
        return newStatus;
    }

    // Get element reference
    getElement() {
        if (!this.element) {
            this.element = document.querySelector(`[data-supplement-id="${this.id}"]`);
        }
        return this.element;
    }

    // Update UI element
    updateUI() {
        const element = this.getElement();
        if (!element) return;

        const taken = this.getTakenStatus();
        const takenBtn = element.querySelector('.taken-today-btn');

        if (takenBtn) {
            takenBtn.classList.toggle('taken', taken);
            takenBtn.innerHTML = `
                <i class="fas ${taken ? 'fa-check-circle' : 'fa-check'} mr-1"></i>
                ${taken ? 'Uzeto ✓' : 'Uzeto danas'}
            `;
        }

        // Add animation class
        element.classList.add('updated');
        setTimeout(() => {
            element.classList.remove('updated');
        }, 300);
    }

    // Validate data
    validateData() {
        const required = ['id', 'name', 'brand', 'dosage', 'frequency', 'priority'];
        const missing = required.filter(field => !this.data[field]);

        if (missing.length > 0) {
            console.warn(`[SupplementCard] Nedostaju podaci za ${this.id}:`, missing);
            return false;
        }

        return true;
    }

    // Get data for modal
    getModalData() {
        return {
            id: this.id,
            name: this.data.name,
            brand: this.data.brand,
            dosage: this.data.dosage,
            frequency: this.data.frequency,
            priority: this.data.priority,
            fastingSafe: this.data.fastingSafe,
            breaksFast: this.data.breaksFast,
            benefits: this.data.benefits,
            notes: this.data.notes,
            interactions: this.data.interactions,
            minerals: this.data.minerals,
            macros: this.data.macros,
            taken: this.getTakenStatus()
        };
    }

    // Destroy - cleanup
    destroy() {
        this.cache.clear();
        this.element = null;
        debugLog(`[SupplementCard] Kartica ${this.id} uništena`);
    }
}

// Factory funkcija za kreiranje kartica
export function createSupplementCard(supplementId, supplementData, period) {
    return new SupplementCard(supplementId, supplementData, period);
}

// Batch operations za više kartica
export class SupplementCardManager {
    constructor() {
        this.cards = new Map();
    }

    createCard(supplementId, supplementData, period) {
        const card = createSupplementCard(supplementId, supplementData, period);
        this.cards.set(supplementId, card);
        return card;
    }

    getCard(supplementId) {
        return this.cards.get(supplementId);
    }

    updateCard(supplementId) {
        const card = this.cards.get(supplementId);
        if (card) {
            card.updateUI();
        }
    }

    updateAllCards() {
        this.cards.forEach(card => card.updateUI());
    }

    destroyAll() {
        this.cards.forEach(card => card.destroy());
        this.cards.clear();
        debugLog('[SupplementCardManager] Sve kartice uništene');
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[SupplementCard]', ...args);
    }
}