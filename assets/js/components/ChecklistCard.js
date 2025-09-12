// ChecklistCard.js - Komponenta za pojedinačne checklist zadatke
export class ChecklistCard {
    constructor(taskData, dayNumber) {
        this.task = taskData;
        this.dayNumber = dayNumber;
        this.element = null;
        this.taskId = this.generateTaskId();
    }

    // Generisanje jedinstvenog ID-a za zadatak
    generateTaskId() {
        return this.task.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .substring(0, 50);
    }

    // Glavna render metoda
    render() {
        const isChecked = this.getSavedState();

        return `
            <div class="checklist-item ${isChecked ? 'completed' : ''}" data-task-id="${this.taskId}">
                <label class="checklist-label">
                    <input type="checkbox"
                           class="checklist-checkbox"
                           data-task="${this.taskId}"
                           ${isChecked ? 'checked' : ''}>
                    <span class="checkmark">
                        <i class="fas ${isChecked ? 'fa-check' : 'fa-circle'}"></i>
                    </span>
                    <span class="task-text">${this.task}</span>
                </label>
                ${isChecked ? '<div class="completion-stamp">✓</div>' : ''}
            </div>
        `;
    }

    // Toggle checkbox stanja
    toggle() {
        const checkbox = this.element?.querySelector('.checklist-checkbox');
        if (!checkbox) return;

        const newState = !checkbox.checked;
        checkbox.checked = newState;
        this.saveState(newState);
        this.updateUI();

        debugLog(`[ChecklistCard] Toggled ${this.taskId}: ${newState}`);
        return newState;
    }

    // Ažuriranje vizuelnog stanja
    updateUI() {
        if (!this.element) return;

        const isChecked = this.getSavedState();
        const checkbox = this.element.querySelector('.checklist-checkbox');
        const checkmark = this.element.querySelector('.checkmark i');
        const completionStamp = this.element.querySelector('.completion-stamp');

        // Update checkbox
        if (checkbox) checkbox.checked = isChecked;

        // Update checkmark icon
        if (checkmark) {
            checkmark.className = `fas ${isChecked ? 'fa-check' : 'fa-circle'}`;
        }

        // Update completion stamp
        if (isChecked && !completionStamp) {
            const stamp = document.createElement('div');
            stamp.className = 'completion-stamp';
            stamp.textContent = '✓';
            this.element.appendChild(stamp);

            // Animate stamp
            setTimeout(() => stamp.classList.add('animate'), 10);
        } else if (!isChecked && completionStamp) {
            completionStamp.remove();
        }

        // Update item class
        this.element.classList.toggle('completed', isChecked);

        // Add animation class
        this.element.classList.add('updated');
        setTimeout(() => {
            this.element.classList.remove('updated');
        }, 300);
    }

    // Čuvanje stanja u localStorage
    saveState(isChecked) {
        const storageKey = `checklist_day_${this.dayNumber}`;
        let dayData = JSON.parse(localStorage.getItem(storageKey) || '{}');
        dayData[this.taskId] = isChecked;
        localStorage.setItem(storageKey, JSON.stringify(dayData));

        // Dispatch custom event za global update
        const event = new CustomEvent('checklistItemChanged', {
            detail: {
                taskId: this.taskId,
                dayNumber: this.dayNumber,
                isChecked: isChecked,
                task: this.task
            }
        });
        document.dispatchEvent(event);
    }

    // Učitavanje stanja iz localStorage
    getSavedState() {
        const storageKey = `checklist_day_${this.dayNumber}`;
        const dayData = JSON.parse(localStorage.getItem(storageKey) || '{}');
        return dayData[this.taskId] || false;
    }

    // Set element reference
    setElement(element) {
        this.element = element;
    }

    // Get task data
    getData() {
        return {
            id: this.taskId,
            text: this.task,
            dayNumber: this.dayNumber,
            isChecked: this.getSavedState()
        };
    }

    // Destroy - cleanup
    destroy() {
        this.element = null;
        debugLog(`[ChecklistCard] Destroyed: ${this.taskId}`);
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[ChecklistCard]', ...args);
    }
}