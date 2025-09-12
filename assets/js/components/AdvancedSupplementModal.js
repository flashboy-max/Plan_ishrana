// AdvancedSupplementModal.js - Enhanced modal for detailed supplement information
import { ADVANCED_SUPPLEMENTS_DATA } from '../../data/supplements/advancedSupplements.js';

export class AdvancedSupplementModal {
    constructor() {
        this.modal = null;
        this.currentSupplement = null;
        this.isOpen = false;
    }

    show(supplementId) {
        this.currentSupplement = ADVANCED_SUPPLEMENTS_DATA[supplementId];
        if (!this.currentSupplement) {
            console.error(`[AdvancedSupplementModal] No data found for supplement: ${supplementId}`);
            return;
        }

        this.createModal();
        this.render();
        this.attachEventListeners();
        this.open();

        debugLog(`[AdvancedSupplementModal] Showing advanced details for: ${supplementId}`);
    }

    createModal() {
        // Remove existing modal if present
        const existingModal = document.getElementById('advanced-supplement-modal');
        if (existingModal) {
            existingModal.remove();
        }

        this.modal = document.createElement('div');
        this.modal.id = 'advanced-supplement-modal';
        this.modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm';
        this.modal.innerHTML = `
            <div class="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300 scale-95 opacity-0">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                    <div class="flex items-center space-x-3 min-w-0 flex-1">
                        <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-microscope text-white text-lg sm:text-xl"></i>
                        </div>
                        <div class="min-w-0">
                            <h2 class="text-lg sm:text-2xl font-bold text-white truncate">${this.currentSupplement.name}</h2>
                            <p class="text-gray-400 text-sm">${this.currentSupplement.brand}</p>
                        </div>
                    </div>
                    <button class="close-modal w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="modal-content max-h-[calc(85vh-100px)] sm:max-h-[calc(90vh-120px)] overflow-y-auto p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Left Column -->
                        <div class="space-y-5">
                            ${this.renderBasicInfo()}
                            ${this.renderMechanismOfAction()}
                            ${this.renderAdvancedDosing()}
                            ${this.renderExpectedEffects()}
                        </div>

                        <!-- Right Column -->
                        <div class="space-y-5">
                            ${this.renderInteractions()}
                            ${this.renderContraindications()}
                            ${this.renderNaturalSources()}
                            ${this.renderSynergisticEffects()}
                            ${this.renderMonitoring()}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);
    }

    renderBasicInfo() {
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-info-circle mr-2"></i>Osnovne Informacije
                </h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-400 text-sm">Prioritet:</span>
                        <span class="text-white font-semibold">${this.currentSupplement.priority}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-400 text-sm">Fasting Safe:</span>
                        <span class="font-semibold ${this.currentSupplement.fastingSafe ? 'text-green-400' : 'text-red-400'}">
                            ${this.currentSupplement.fastingSafe ? '✅ Da' : '❌ Ne'}
                        </span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-400 text-sm">Kategorija:</span>
                        <span class="text-purple-300 font-semibold">${this.currentSupplement.category}</span>
                    </div>
                    <div class="bg-gray-700/30 p-3 rounded-lg">
                        <div class="text-sm text-gray-400 mb-1">ID</div>
                        <div class="text-lg font-semibold text-gray-300 font-mono">${this.currentSupplement.id}</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMechanismOfAction() {
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-cog mr-2"></i>Mehanizam Delovanja
                </h3>
                <p class="text-gray-300 leading-relaxed">${this.currentSupplement.mechanismOfAction}</p>
            </div>
        `;
    }

    renderAdvancedDosing() {
        const dosing = this.currentSupplement.advancedDosing;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-pills mr-2"></i>Advanced Dosing Guidelines
                </h3>
                <div class="space-y-3">
                    ${dosing.loading ? `<div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-300">Loading Phase:</span>
                        <span class="text-white font-semibold">${dosing.loading}</span>
                    </div>` : ''}
                    ${dosing.maintenance ? `<div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-300">Maintenance:</span>
                        <span class="text-white font-semibold">${dosing.maintenance}</span>
                    </div>` : ''}
                    ${dosing.timing ? `<div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                        <span class="text-gray-300">Timing:</span>
                        <span class="text-white font-semibold">${dosing.timing}</span>
                    </div>` : ''}
                    ${dosing.maxDaily ? `<div class="flex justify-between items-center p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <span class="text-red-300">Max Daily:</span>
                        <span class="text-red-200 font-semibold">${dosing.maxDaily}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
    }

    renderExpectedEffects() {
        const effects = this.currentSupplement.expectedEffects;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-chart-line mr-2"></i>Očekivani Efekti
                </h3>
                <div class="space-y-2">
                    ${Object.entries(effects).map(([effect, timeframe]) => `
                        <div class="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                            <span class="text-gray-300 capitalize">${effect}:</span>
                            <span class="text-cyan-300 font-semibold">${timeframe}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderInteractions() {
        const interactions = this.currentSupplement.drugInteractions;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-exchange-alt mr-2"></i>Interakcije sa drugim suplementima
                </h3>
                ${interactions.length > 0 ? `
                    <div class="space-y-2">
                        ${interactions.map(interaction => `
                            <div class="flex items-start space-x-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                                <i class="fas fa-plus-circle text-green-400 mt-0.5"></i>
                                <span class="text-green-300">${interaction}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-gray-400">Nema poznatih interakcija</p>'}
            </div>
        `;
    }

    renderContraindications() {
        const contraindications = this.currentSupplement.contraindications;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-exclamation-triangle mr-2"></i>Kontraindikacije
                </h3>
                ${contraindications.length > 0 ? `
                    <div class="space-y-2">
                        ${contraindications.map(contraindication => `
                            <div class="flex items-start space-x-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                                <i class="fas fa-exclamation-triangle text-red-400 mt-0.5"></i>
                                <span class="text-red-300">${contraindication}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-gray-400">Nema poznatih kontraindikacija</p>'}
            </div>
        `;
    }

    renderNaturalSources() {
        const sources = this.currentSupplement.naturalSources;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-leaf mr-2"></i>Prirodni Izvori
                </h3>
                <div class="space-y-2">
                    ${sources.map(source => `
                        <div class="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg">
                            <i class="fas fa-seedling text-green-400"></i>
                            <span class="text-gray-300">${source}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderSynergisticEffects() {
        const synergies = this.currentSupplement.synergisticEffects;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-handshake mr-2"></i>Sinergetski Efekti
                </h3>
                ${synergies.length > 0 ? `
                    <div class="space-y-2">
                        ${synergies.map(synergy => `
                            <div class="flex items-start space-x-3 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                                <i class="fas fa-star text-purple-400 mt-0.5"></i>
                                <span class="text-purple-300">${synergy}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-gray-400">Nema poznatih sinergija</p>'}
            </div>
        `;
    }

    renderMonitoring() {
        const monitoring = this.currentSupplement.monitoring;
        return `
            <div class="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 class="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <i class="fas fa-stethoscope mr-2"></i>Praćenje i Monitoring
                </h3>
                <div class="space-y-2">
                    ${monitoring.map(item => `
                        <div class="flex items-start space-x-3 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <i class="fas fa-check-circle text-blue-400 mt-0.5"></i>
                            <span class="text-blue-300">${item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Close modal on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close modal on close button
        const closeBtn = this.modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(() => {
            this.modal.querySelector('.bg-gray-900').classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    close() {
        this.isOpen = false;
        document.body.style.overflow = '';

        const modalContent = this.modal.querySelector('.bg-gray-900');
        modalContent.classList.remove('scale-100', 'opacity-100');

        setTimeout(() => {
            if (this.modal && this.modal.parentNode) {
                this.modal.parentNode.removeChild(this.modal);
            }
        }, 300);
    }

    render() {
        // Modal is already rendered in createModal()
    }
}

// Global instance
let advancedModalInstance = null;

export function showAdvancedSupplementModal(supplementId) {
    if (!advancedModalInstance) {
        advancedModalInstance = new AdvancedSupplementModal();
    }
    advancedModalInstance.show(supplementId);
}

// Make function globally available
if (typeof window !== 'undefined') {
    window.showAdvancedSupplementModal = showAdvancedSupplementModal;
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[AdvancedSupplementModal]', ...args);
    }
}