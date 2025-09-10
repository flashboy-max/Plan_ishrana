// Checklist funkcionalnost
function initializeChecklist() {
    // Event delegation za checkbox promjene
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('checklist-checkbox')) {
            handleCheckboxChange(e.target);
        }
    });

    // Učitaj sacuvano stanje iz localStorage
    loadChecklistState();
}

// Nova funkcija za inicijalizaciju samo današnjeg checklist-a
function initializeTodayChecklist(currentDay) {
    // Učitaj samo stanje za današnji dan
    loadTodayChecklistState(currentDay);
    
    // Setup event listener samo za današnji dan
    const todayChecklistContainer = document.querySelector('#danasnji-plan-container .checklist-items');
    if (todayChecklistContainer) {
        todayChecklistContainer.addEventListener('change', function(e) {
            if (e.target.classList.contains('checklist-checkbox')) {
                handleCheckboxChange(e.target);
            }
        });
    }
}

function handleCheckboxChange(checkbox) {
    const checklistContainer = checkbox.closest('.checklist-items');
    const dayNumber = checklistContainer.getAttribute('data-day');
    
    // Sačuvaj stanje u localStorage
    saveChecklistState(dayNumber, checkbox.dataset.task, checkbox.checked);
    
    // Ažuriraj progress za ovaj dan
    updateChecklistProgress(checklistContainer);
    
    // Ažuriraj glavni progress bar
    updateOverallProgress();
}

function updateChecklistProgress(checklistContainer) {
    const checkboxes = checklistContainer.querySelectorAll('.checklist-checkbox');
    const checkedBoxes = checklistContainer.querySelectorAll('.checklist-checkbox:checked');
    const progressEl = checklistContainer.closest('.daily-checklist').querySelector('.checklist-progress');
    const percentageEl = checklistContainer.closest('.daily-checklist').querySelector('.completion-percentage');
    const messageEl = checklistContainer.closest('.daily-checklist').querySelector('.completion-message');
    
    const total = checkboxes.length;
    const completed = checkedBoxes.length;
    const percentage = Math.round((completed / total) * 100);
    
    // Ažuriraj progress text
    progressEl.textContent = `${completed}/${total}`;
    percentageEl.textContent = `${percentage}%`;
    
    // Ažuriraj motivacionu poruku
    let message = '';
    if (percentage === 0) {
        message = 'Počni dan sa prvim zadatkom!';
    } else if (percentage < 25) {
        message = 'Dobro počinje! Nastavi tako!';
    } else if (percentage < 50) {
        message = 'Odličan napredak! 💪';
    } else if (percentage < 75) {
        message = 'Više od polovine gotovo! 🔥';
    } else if (percentage < 100) {
        message = 'Skoro gotovo! Završi jako! ⚡';
    } else {
        message = 'Savršen dan! Čestitamo! 🏆';
    }
    messageEl.textContent = message;
    
    // Dodaj CSS klase na osnovu progress-a
    const summaryEl = checklistContainer.closest('.daily-checklist').querySelector('.checklist-summary');
    summaryEl.className = `checklist-summary mt-4 pt-3 border-t border-gray-700 progress-${Math.floor(percentage / 25) * 25}`;
}

function saveChecklistState(dayNumber, taskId, isChecked) {
    const storageKey = `checklist_day_${dayNumber}`;
    let dayData = JSON.parse(localStorage.getItem(storageKey) || '{}');
    dayData[taskId] = isChecked;
    localStorage.setItem(storageKey, JSON.stringify(dayData));
}

function loadChecklistState() {
    document.querySelectorAll('.checklist-items').forEach(checklistContainer => {
        const dayNumber = checklistContainer.getAttribute('data-day');
        const storageKey = `checklist_day_${dayNumber}`;
        const dayData = JSON.parse(localStorage.getItem(storageKey) || '{}');
        
        // Postavi stanje checkbox-a
        checklistContainer.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
            const taskId = checkbox.dataset.task;
            if (dayData[taskId] !== undefined) {
                checkbox.checked = dayData[taskId];
            }
        });
        
        // Ažuriraj progress
        updateChecklistProgress(checklistContainer);
    });
}

// Nova funkcija za učitavanje stanja samo današnjeg dana
function loadTodayChecklistState(currentDay) {
    const todayContainer = document.querySelector('#danasnji-plan-container .checklist-items');
    if (!todayContainer) return;
    
    const storageKey = `checklist_day_${currentDay}`;
    const dayData = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    // Postavi stanje checkbox-a
    todayContainer.querySelectorAll('.checklist-checkbox').forEach(checkbox => {
        const taskId = checkbox.dataset.task;
        if (dayData[taskId] !== undefined) {
            checkbox.checked = dayData[taskId];
        }
    });
    
    // Ažuriraj progress
    updateChecklistProgress(todayContainer);
}
