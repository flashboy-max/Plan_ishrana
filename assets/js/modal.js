// Modal sistem za supplement detalje i alternativne obroke

// Debug helper function
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('%c[MODAL]', 'color: #ff6b6b; font-weight: bold;', ...args);
    }
}

class SupplementModal {
    constructor() {
        this.modal = null;
        this.currentSupplement = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('supplementModal');
        if (!this.modal) {
            debugLog('❌ Modal element not found');
            return;
        }

        debugLog('✅ SupplementModal inicijalizovan');

        // Event listener-i
        document.getElementById('closeModal')?.addEventListener('click', () => this.close());
        document.getElementById('closeModalBtn')?.addEventListener('click', () => this.close());
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });

        // Taken button
        document.getElementById('modalTakenBtn')?.addEventListener('click', () => {
            if (this.currentSupplement) {
                this.toggleTakenStatus();
            }
        });
    }

    show(supplementId) {
        debugLog('🔍 Modal.show pozvan za:', supplementId);
        debugLog('   - window.getSupplementById:', typeof window.getSupplementById);
        debugLog('   - window.getAllSupplements:', typeof window.getAllSupplements);
        debugLog('   - window.SUPPLEMENTS_DATA:', typeof window.SUPPLEMENTS_DATA);
        
        // Pronađi supplement u novom SUPPLEMENTS_DATA formatu
        let supplement = null;
        
        if (window.getSupplementById) {
            supplement = window.getSupplementById(supplementId);
            debugLog('✅ Koristim window.getSupplementById');
        } else if (window.getAllSupplements) {
            const allSupplements = window.getAllSupplements();
            supplement = allSupplements[supplementId];
            debugLog('⚠️ Fallback na window.getAllSupplements');
        } else {
            debugLog('❌ Ne mogu da pronađem supplement funkcije');
            debugLog('   Dostupno u window:', Object.keys(window).filter(k => k.includes('supplement')));
            return;
        }

        if (!supplement) {
            debugLog('❌ Supplement data not found:', supplementId);
            return;
        }
        this.currentSupplement = supplementId;

        debugLog('📱 Prikazujem modal za:', supplement.name);

        // Popuni modal sadržaj
        this.populateModal(supplement);

        // Prikaži modal
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    populateModal(supplement) {
        // Osnovne informacije
        document.getElementById('modalSupplementName').textContent = supplement.name;
        document.getElementById('modalBrand').textContent = supplement.brand;
        document.getElementById('modalPriority').textContent = `Prioritet ${supplement.priority}`;
        document.getElementById('modalTiming').textContent = 
            Array.isArray(supplement.timeSlots) ? supplement.timeSlots.join(', ') : 
            supplement.timeSlots || supplement.timing || 'Nije definisano';
        
        // Fasting status
        const fastingEl = document.getElementById('modalFasting');
        if (supplement.fastingSafe) {
            fastingEl.textContent = 'Ne kvari post';
            fastingEl.className = 'font-medium text-green-400';
        } else {
            fastingEl.textContent = 'U prozoru';
            fastingEl.className = 'font-medium text-orange-400';
        }

        // Detaljne informacije
        document.getElementById('modalBenefits').textContent = supplement.benefits;
        document.getElementById('modalNotes').textContent = supplement.notes;
        document.getElementById('modalInteractions').textContent = supplement.interactions;

        // Taken status
        this.updateTakenButton();
    }

    updateTakenButton() {
        const takenBtn = document.getElementById('modalTakenBtn');
        const taken = localStorage.getItem(`taken_${this.currentSupplement}`) === 'true';
        
        if (taken) {
            takenBtn.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Uzeto ✓';
            takenBtn.className = 'px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors';
        } else {
            takenBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Uzeto danas';
            takenBtn.className = 'px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors';
        }
    }

    toggleTakenStatus() {
        const current = localStorage.getItem(`taken_${this.currentSupplement}`) === 'true';
        localStorage.setItem(`taken_${this.currentSupplement}`, (!current).toString());
        
        debugLog('🔄 Toggled taken status for:', this.currentSupplement, 'to:', !current);
        
        this.updateTakenButton();
        
        // Ažuriraj i glavnu karticu ako postoji
        const mainCard = document.querySelector(`[data-supplement="${this.currentSupplement}"]`);
        if (mainCard) {
            const takenBtn = mainCard.querySelector('.taken-today-btn');
            if (takenBtn) {
                if (!current) {
                    takenBtn.classList.add('taken');
                    takenBtn.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Uzeto ✓';
                    takenBtn.className = takenBtn.className.replace('bg-cyan-600', 'bg-green-600');
                } else {
                    takenBtn.classList.remove('taken');
                    takenBtn.innerHTML = '<i class="fas fa-check mr-1"></i>Uzeto danas';
                    takenBtn.className = takenBtn.className.replace('bg-green-600', 'bg-cyan-600');
                }
            }
        }
    }

    close() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scroll
        this.currentSupplement = null;
        debugLog('📱 Modal zatvoren');
    }
}

// Modal funkcionalnost za alternativne obroke
function initializeModals() {
    // Inicijalizuj supplement modal
    window.supplementModal = new SupplementModal();
    
    // Event delegation za klikove na "Prikaži alternative"
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('show-alternatives-btn')) {
            e.preventDefault();
            const mealType = e.target.dataset.meal;
            showAlternativeModal(mealType);
        }
        
        // Zatvaranje modala
        if (e.target && e.target.classList && (e.target.classList.contains('close-modal') || e.target.classList.contains('modal-overlay'))) {
            closeAlternativeModal();
        }
    });

    // Zatvaranje modala sa ESC tasterom
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAlternativeModal();
        }
    });
}

function showAlternativeModal(mealType) {
    const modal = document.getElementById('alternativeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeals = document.getElementById('modalMeals');
    
    if (!alternativniObroci[mealType]) return;
    
    modalTitle.textContent = `Alternative za ${mealType}`;
    
    let mealsHTML = '';
    alternativniObroci[mealType].forEach((meal, index) => {
        mealsHTML += `
            <div class="meal-card">
                <div class="meal-header">
                    <h4 class="meal-name">${meal.naziv}</h4>
                    <span class="meal-time">${meal.priprema}</span>
                </div>
                <div class="meal-content">
                    <div class="meal-ingredients">
                        <h5>Sastojci:</h5>
                        <p>${meal.sastojci}</p>
                    </div>
                    <div class="meal-macros">
                        <h5>Makronurijenti:</h5>
                        <p>${meal.makroi}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    modalMeals.innerHTML = mealsHTML;
    modal.classList.add('show');
    
    // Sprečava scroll na pozadini
    document.body.style.overflow = 'hidden';
}

function closeAlternativeModal() {
    const modal = document.getElementById('alternativeModal');
    modal.classList.remove('show');
    
    // Vraća scroll na pozadini
    document.body.style.overflow = 'auto';
}
