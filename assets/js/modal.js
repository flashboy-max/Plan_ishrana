// Modal funkcionalnost za alternativne obroke
function initializeModals() {
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
