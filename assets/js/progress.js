// Progress Bar funkcionalnost
function updateProgressBar(currentDay) {
    const totalDays = 28;
    const percentage = Math.round((currentDay / totalDays) * 100);
    const daysElapsed = currentDay - 1;
    const daysRemaining = totalDays - currentDay + 1;
    const weeksCompleted = Math.floor(daysElapsed / 7);
    
    // Animiraj progress bar
    setTimeout(() => {
        document.getElementById('progress-fill').style.width = percentage + '%';
        document.getElementById('progress-percentage').textContent = percentage + '%';
    }, 300);
    
    // Ažuriraj statistike
    document.getElementById('current-day').textContent = currentDay;
    document.getElementById('days-remaining').textContent = daysRemaining;
    document.getElementById('weeks-completed').textContent = weeksCompleted;
    document.getElementById('days-elapsed').textContent = daysElapsed;
    
    // Dodaj motivacijske poruke na osnovu napretka
    const progressContainer = document.querySelector('.progress-container');
    let motivationMessage = '';
    
    if (percentage === 0) {
        motivationMessage = '🚀 Počinjemo transformaciju!';
    } else if (percentage < 25) {
        motivationMessage = '💪 Odličan početak!';
    } else if (percentage < 50) {
        motivationMessage = '🔥 Na pola puta!';
    } else if (percentage < 75) {
        motivationMessage = '⚡ Idemo ka cilju!';
    } else if (percentage < 100) {
        motivationMessage = '🏆 Skoro smo tu!';
    } else {
        motivationMessage = '🎉 Transformacija završena!';
    }
    
    // Dodaj/ažuriraj motivacionu poruku
    let motivationEl = progressContainer.querySelector('.motivation-message');
    if (!motivationEl) {
        motivationEl = document.createElement('div');
        motivationEl.className = 'motivation-message text-center text-cyan-300 font-medium mt-3';
        progressContainer.appendChild(motivationEl);
    }
    motivationEl.textContent = motivationMessage;
}

function updateOverallProgress() {
    // Izračunaj ukupan progress svih dana
    let totalTasks = 0;
    let completedTasks = 0;
    
    document.querySelectorAll('.checklist-items').forEach(checklistContainer => {
        const checkboxes = checklistContainer.querySelectorAll('.checklist-checkbox');
        const checkedBoxes = checklistContainer.querySelectorAll('.checklist-checkbox:checked');
        totalTasks += checkboxes.length;
        completedTasks += checkedBoxes.length;
    });
    
    const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // Ažuriraj glavni progress bar (ako postoji)
    const mainProgressBar = document.querySelector('.progress-fill');
    if (mainProgressBar) {
        // Kombinuj checklist progress sa day progress
        const currentDay = getCurrentDay();
        const dayProgress = Math.round(((currentDay - 1) / 28) * 100);
        const combinedProgress = Math.max(dayProgress, Math.round(overallPercentage * 0.3)); // Checklist doprinosi 30%
        
        mainProgressBar.style.width = `${combinedProgress}%`;
    }
}

function getCurrentDay() {
    const now = new Date();
    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, Math.min(diffDays + 1, 28));
}
