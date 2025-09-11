// IF Timer funkcionalnost
let ifTimerInterval;

function initializeIFTimer() {
    updateIFTimer();
    // Ažuriraj svake sekunde
    ifTimerInterval = setInterval(updateIFTimer, 1000);
}

function updateIFTimer() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // IF 18/6 protokol: Eating Window 13:00-19:00, Fasting Period 19:00-13:00
    const eatingStartHour = 13;
    const eatingEndHour = 19;
    
    const isEatingWindow = currentHour >= eatingStartHour && currentHour < eatingEndHour;
    
    // Calculate next phase time
    let nextPhaseTime;
    let timeToNextPhase;
    let currentPhaseProgress;
    
    if (isEatingWindow) {
        // U eating window-u - next phase je fasting
        nextPhaseTime = new Date(now);
        nextPhaseTime.setHours(eatingEndHour, 0, 0, 0);
        
        // Progress kroz eating window (8h = 480 min)
        const minutesIntoEating = (currentHour - eatingStartHour) * 60 + currentMinute;
        currentPhaseProgress = (minutesIntoEating / 480) * 100;
    } else {
        // U fasting period-u - next phase je eating
        nextPhaseTime = new Date(now);
        if (currentHour >= eatingEndHour) {
            // Isti dan, sutra ujutru
            nextPhaseTime.setDate(nextPhaseTime.getDate() + 1);
        }
        nextPhaseTime.setHours(eatingStartHour, 0, 0, 0);
        
        // Progress kroz fasting period (16h = 960 min)
        let minutesIntoFasting;
        if (currentHour >= eatingEndHour) {
            // Večernji fasting (19:00-24:00)
            minutesIntoFasting = (currentHour - eatingEndHour) * 60 + currentMinute;
        } else {
            // Jutarnji fasting (00:00-11:00)
            minutesIntoFasting = (eatingEndHour - 0) * 60 + (currentHour * 60 + currentMinute);
        }
        currentPhaseProgress = (minutesIntoFasting / 960) * 100;
    }
    
    // Calculate time difference
    timeToNextPhase = nextPhaseTime - now;
    
    // Format countdown
    const hours = Math.floor(timeToNextPhase / (1000 * 60 * 60));
    const minutes = Math.floor((timeToNextPhase % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeToNextPhase % (1000 * 60)) / 1000);
    
    const countdownString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update UI elements
    updateIFDisplay(isEatingWindow, countdownString, currentPhaseProgress);
}

function updateIFDisplay(isEatingWindow, countdown, progress) {
    const statusBadge = document.getElementById('if-status-badge');
    const statusIcon = document.getElementById('if-status-icon');
    const statusText = document.getElementById('if-status-text');
    const phaseTitle = document.getElementById('if-phase-title');
    const countdownEl = document.getElementById('if-countdown');
    const nextPhase = document.getElementById('if-next-phase');
    const progressFill = document.getElementById('if-progress-fill');
    
    if (isEatingWindow) {
        // Eating Window
        statusBadge.className = 'if-status-badge eating';
        statusText.textContent = 'EATING WINDOW';
        phaseTitle.textContent = '🍽️ Period Jela Aktivn';
        nextPhase.textContent = 'Do zatvaranja prozora za hranu';
        countdownEl.className = 'if-countdown eating';
        progressFill.className = 'if-progress-fill eating';
    } else {
        // Fasting Period
        statusBadge.className = 'if-status-badge fasting';
        statusText.textContent = 'FASTING PERIOD';
        phaseTitle.textContent = '🚫 Period Posta Aktivan';
        nextPhase.textContent = 'Do otvaranja prozora za hranu';
        countdownEl.className = 'if-countdown fasting';
        progressFill.className = 'if-progress-fill fasting';
    }
    
    countdownEl.textContent = countdown;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
    
    // Update checklist IF task if exists
    updateIFChecklistStatus(isEatingWindow);
}

function updateIFChecklistStatus(isEatingWindow) {
    // Automatski štikliraj IF protokol zadatak ako je u ispravnom periodu
    const ifCheckboxes = document.querySelectorAll('[data-task="if-protokol"]');
    ifCheckboxes.forEach(checkbox => {
        const now = new Date();
        const todayKey = `checklist_day_${getCurrentDay()}`;
        const dayData = JSON.parse(localStorage.getItem(todayKey) || '{}');
        
        // Auto-štikliraj ako je korisnik poštovao protocol barem 12h
        if (isEatingWindow && !dayData['if-protokol']) {
            // Možda dodati logiku za automatsko označavanje
            // checkbox.checked = true;
            // handleCheckboxChange(checkbox);
        }
    });
}

// Funkcija za manual reset IF Timer-a (ako je potrebno)
function resetIFTimer() {
    if (ifTimerInterval) {
        clearInterval(ifTimerInterval);
    }
    initializeIFTimer();
}
