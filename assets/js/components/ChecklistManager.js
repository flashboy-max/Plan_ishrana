// ChecklistManager.js - Glavna komponenta za upravljanje dnevnih checklist zadataka
import { ChecklistCard } from './ChecklistCard.js';

// Enhanced Systems Classes
class XPSystem {
    constructor() {
        this.levelThresholds = [0, 100, 250, 500, 1000, 1750, 2750, 4250, 6500, 10000];
        this.currentXP = this.loadXP();
        this.level = this.calculateLevel();
    }

    loadXP() {
        return parseInt(localStorage.getItem('checklist_xp') || '0');
    }

    saveXP() {
        localStorage.setItem('checklist_xp', this.currentXP.toString());
        localStorage.setItem('checklist_level', this.level.toString());
    }

    awardTaskCompletion() {
        const xpGain = 25; // Base XP for task completion
        this.currentXP += xpGain;
        const oldLevel = this.level;
        this.level = this.calculateLevel();
        this.saveXP();
        return xpGain;
    }

    calculateLevel() {
        let level = 1;
        for (let i = 0; i < this.levelThresholds.length; i++) {
            if (this.currentXP >= this.levelThresholds[i]) {
                level = i + 1;
            } else {
                break;
            }
        }
        return Math.min(level, this.levelThresholds.length);
    }

    checkLevelUp() {
        const oldLevel = parseInt(localStorage.getItem('checklist_level') || '1');
        return this.level > oldLevel;
    }

    getLevel() {
        return this.level;
    }

    getCurrentXP() {
        return this.currentXP;
    }

    getXPForNextLevel() {
        if (this.level >= this.levelThresholds.length) {
            return this.levelThresholds[this.levelThresholds.length - 1];
        }
        return this.levelThresholds[this.level];
    }

    getLevelProgress() {
        const currentThreshold = this.levelThresholds[this.level - 1] || 0;
        const nextThreshold = this.getXPForNextLevel();
        const progress = ((this.currentXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
        return Math.min(Math.max(progress, 0), 100);
    }
}

class AchievementSystem {
    constructor() {
        this.achievements = [
            { id: 'first_task', name: 'Prvi Korak', description: 'Završi svoj prvi zadatak', unlocked: false },
            { id: 'perfect_day', name: 'Savršen Dan', description: 'Završi sve zadatke u jednom danu', unlocked: false },
            { id: 'week_warrior', name: 'Ratnik Sedmice', description: 'Završi sve zadatke 7 dana zaredom', unlocked: false },
            { id: 'xp_master', name: 'XP Majstor', description: 'Dosegni 1000 XP', unlocked: false },
            { id: 'level_5', name: 'Veteran', description: 'Dosegni Level 5', unlocked: false }
        ];
        this.loadAchievements();
    }

    loadAchievements() {
        const saved = localStorage.getItem('checklist_achievements');
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            this.achievements.forEach(achievement => {
                const savedAch = savedAchievements.find(a => a.id === achievement.id);
                if (savedAch) {
                    achievement.unlocked = savedAch.unlocked;
                }
            });
        }
    }

    saveAchievements() {
        localStorage.setItem('checklist_achievements', JSON.stringify(this.achievements));
    }

    checkAchievements() {
        const newAchievements = [];
        
        // Check for new unlocks based on current stats
        // This is where you'd implement achievement checking logic
        
        if (newAchievements.length > 0) {
            this.saveAchievements();
        }
        
        return newAchievements;
    }

    getUnlockedAchievements() {
        return this.achievements.filter(a => a.unlocked);
    }

    getAllAchievements() {
        return this.achievements;
    }
}

class StreakTracker {
    constructor() {
        this.currentStreak = parseInt(localStorage.getItem('checklist_current_streak') || '0');
        this.bestStreak = parseInt(localStorage.getItem('checklist_best_streak') || '0');
        this.lastCompletionDate = localStorage.getItem('checklist_last_completion') || null;
    }

    updateStreak() {
        const today = new Date().toDateString();
        
        if (this.lastCompletionDate === today) {
            return; // Already updated today
        }

        // Check if we completed tasks today
        const todaysTasks = this.checkTodaysCompletion();
        
        if (todaysTasks.allCompleted) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (this.lastCompletionDate === yesterday.toDateString()) {
                this.currentStreak++;
            } else {
                this.currentStreak = 1;
            }
            
            this.lastCompletionDate = today;
            
            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }
            
            this.saveStreak();
        }
    }

    checkTodaysCompletion() {
        // This would check if all today's tasks are completed
        // Implementation depends on how tasks are stored
        return { allCompleted: false, completed: 0, total: 0 };
    }

    saveStreak() {
        localStorage.setItem('checklist_current_streak', this.currentStreak.toString());
        localStorage.setItem('checklist_best_streak', this.bestStreak.toString());
        localStorage.setItem('checklist_last_completion', this.lastCompletionDate || '');
    }

    getCurrentStreak() {
        return this.currentStreak;
    }

    getBestStreak() {
        return this.bestStreak;
    }
}

class ChecklistAnalytics {
    constructor() {
        this.completionHistory = this.loadHistory();
    }

    loadHistory() {
        const saved = localStorage.getItem('checklist_analytics');
        return saved ? JSON.parse(saved) : {};
    }

    saveHistory() {
        localStorage.setItem('checklist_analytics', JSON.stringify(this.completionHistory));
    }

    recordTaskCompletion(taskId) {
        const today = new Date().toDateString();
        if (!this.completionHistory[today]) {
            this.completionHistory[today] = [];
        }
        
        if (!this.completionHistory[today].includes(taskId)) {
            this.completionHistory[today].push(taskId);
            this.saveHistory();
        }
    }

    getWeeklyStats() {
        // Implementation for weekly statistics
        return { completed: 0, total: 0, percentage: 0 };
    }
}

export class ChecklistManager {
    constructor(containerId) {
        console.log('[ChecklistManager] Constructor called with containerId:', containerId);
        this.container = document.getElementById(containerId);
        console.log('[ChecklistManager] Container found:', !!this.container);
        
        this.currentDay = this.getCurrentDay();
        console.log('[ChecklistManager] Current day calculated:', this.currentDay);
        
        this.cards = new Map();
        this.isInitialized = false;
        
        // Initialize gamification systems
        try {
            this.xpSystem = new XPSystem();
            this.achievementSystem = new AchievementSystem();
            this.streakTracker = new StreakTracker();
            this.analytics = new ChecklistAnalytics();
            console.log('[ChecklistManager] Gamification systems initialized successfully');
        } catch (error) {
            console.error('[ChecklistManager] Error initializing gamification systems:', error);
        }
        
        // Listen for day changes from other managers
        window.addEventListener('dayChanged', (event) => {
            if (event.detail.source !== 'ChecklistManager') {
                this.debugLog(`[ChecklistManager] Day changed by ${event.detail.source} to day ${event.detail.day}`);
                this.setCurrentDay(event.detail.day);
            }
        });
    }

    // Glavna inicijalizacija
    async init() {
        try {
            this.debugLog('[ChecklistManager] Initializing...');
            this.debugLog('[ChecklistManager] Container:', this.container);
            this.debugLog('[ChecklistManager] Current day:', this.currentDay);
            
            if (!this.container) {
                throw new Error('Checklist container not found');
            }

            this.debugLog('[ChecklistManager] About to render...');
            await this.render();
            this.debugLog('[ChecklistManager] Render completed, updating UI...');
            this.updateGamificationUI();
            this.isInitialized = true;
            
            this.debugLog('[ChecklistManager] Initialized successfully');
        } catch (error) {
            console.error('[ChecklistManager] Initialization failed:', error);
            console.error('[ChecklistManager] Error stack:', error.stack);
            this.showError('Failed to load checklist: ' + error.message);
        }
    }

    getCurrentDay() {
        const startDate = new Date('2025-09-14');
        const currentDate = new Date();
        const diffTime = currentDate - startDate; // Remove Math.abs() to get proper sign
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 because Day 1 starts on start date
        
        this.debugLog(`[ChecklistManager] Calculated current day: ${Math.min(Math.max(diffDays, 1), 28)} (diff: ${diffDays - 1})`);
        this.debugLog(`[ChecklistManager] Start date: ${startDate.toISOString()}`);
        this.debugLog(`[ChecklistManager] Today: ${currentDate.toISOString()}`);
        
        return Math.min(Math.max(diffDays, 1), 28);
    }

    // Renderovanje glavnog UI-ja
    async render() {
        this.debugLog('[ChecklistManager] Render started');
        this.debugLog('[ChecklistManager] Container exists:', !!this.container);
        this.debugLog('[ChecklistManager] Window.planData exists:', !!window.planData);
        
        if (!this.container || !window.planData) {
            this.debugLog('[ChecklistManager] Missing container or planData - stopping render');
            return;
        }

        this.debugLog(`[ChecklistManager] Looking for day data: Dan ${this.currentDay}`);
        let dayData = window.planData[`Dan ${this.currentDay}`];
        this.debugLog('[ChecklistManager] Day data found:', !!dayData);
        
        // Fallback to Dan 1 if current day data doesn't exist
        if (!dayData || !dayData.checklist) {
            this.debugLog(`[ChecklistManager] No checklist data for day ${this.currentDay}, falling back to Dan 1`);
            this.debugLog('[ChecklistManager] Available keys:', Object.keys(window.planData || {}));
            dayData = window.planData['Dan 1'];
            if (!dayData || !dayData.checklist) {
                this.debugLog('[ChecklistManager] No checklist data for Dan 1 either - stopping');
                return;
            }
            this.debugLog('[ChecklistManager] Using Dan 1 as fallback');
        }
        
        this.debugLog('[ChecklistManager] Checklist tasks count:', dayData.checklist.length);

        // Clear container
        this.container.innerHTML = '';

        // Create day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-4 mb-6 text-white';
        dayHeader.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-xl font-bold">Dan ${this.currentDay}</h3>
                    <p class="text-cyan-200">Dnevni zadaci</p>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold" id="day-progress">0%</div>
                    <div class="text-sm text-cyan-200">Završeno</div>
                </div>
            </div>
        `;

        this.container.appendChild(dayHeader);

        // Create checklist container
        const checklistContainer = document.createElement('div');
        checklistContainer.className = 'checklist-tasks space-y-3';

        // Create checklist cards
        dayData.checklist.forEach((task, index) => {
            const taskId = `day-${this.currentDay}-task-${index}`;
            const card = new ChecklistCard(taskId, task, this.currentDay);
            card.render(checklistContainer);
            this.cards.set(taskId, card);
        });

        this.container.appendChild(checklistContainer);

        // Add event listeners
        this.addEventListeners();
        this.updateProgress();
    }

    addEventListeners() {
        this.container.addEventListener('change', (e) => {
            if (e.target.classList.contains('checklist-checkbox')) {
                this.handleCheckboxChange(e.target);
            }
        });
    }

    handleCheckboxChange(checkbox) {
        const taskId = checkbox.dataset.task;
        const card = this.cards.get(taskId);

        if (card) {
            const newState = checkbox.checked;
            const wasCompleted = card.getSavedState();
            
            card.saveState(newState);
            card.updateUI();

            // Ažuriraj progress
            this.updateProgress();

            // Gamifikacija - samo za novo završene zadatke
            if (newState && !wasCompleted) {
                this.handleTaskCompletion(taskId, checkbox);
            }
            
            // Ažuriraj streak kad god se promijeni stanje
            this.streakTracker.updateStreak();

            // Feedback animacija
            this.showFeedback(checkbox, newState);

            this.debugLog(`[ChecklistManager] Task ${taskId} changed to ${newState}`);
        }
    }

    // Handling task completion za gamifikaciju
    handleTaskCompletion(taskId, checkbox) {
        const xpGained = this.xpSystem.awardTaskCompletion();
        const levelUp = this.xpSystem.checkLevelUp();
        
        // Provjeri achievements
        const newAchievements = this.achievementSystem.checkAchievements();
        
        // Ažuriraj analytics
        this.analytics.recordTaskCompletion(taskId);
        
        // Ažuriraj UI
        this.updateGamificationUI();
        
        // Prikaži XP gain notification
        this.showXPGainNotification(checkbox, xpGained, levelUp);
        
        // Prikaži nova postignuća
        if (newAchievements.length > 0) {
            this.showAchievementNotifications(newAchievements);
        }
        
        this.debugLog(`[ChecklistManager] Task completed: +${xpGained} XP${levelUp ? ', LEVEL UP!' : ''}`);
    }

    // Prikaži XP gain notifikaciju
    showXPGainNotification(element, xpGained, levelUp) {
        const notification = document.createElement('div');
        notification.className = 'xp-notification';
        notification.innerHTML = `
            <div class="xp-gain">+${xpGained} XP</div>
            ${levelUp ? '<div class="level-up">LEVEL UP!</div>' : ''}
        `;
        
        // Pozicioniranje relative to checkbox
        const rect = element.getBoundingClientRect();
        notification.style.position = 'fixed';
        notification.style.left = rect.right + 10 + 'px';
        notification.style.top = rect.top + 'px';
        notification.style.zIndex = '10000';
        notification.style.pointerEvents = 'none';
        
        document.body.appendChild(notification);
        
        // Animacija i uklanjanje
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
        }, 100);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 1100);
    }

    // Prikaži achievement notifikacije
    showAchievementNotifications(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                this.showAchievementNotification(achievement);
            }, index * 500);
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <div class="achievement-title">Novo postignuće!</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
        
        // Pozicioniranje u donjem desnom uglu
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '10001';
        
        document.body.appendChild(notification);
        
        // Animacija ulaska
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Uklanjanje nakon 4 sekunde
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    // Ažuriranje gamification dashboard-a
    updateGamificationUI() {
        // XP i Level
        const levelDisplay = document.getElementById('level-display');
        const levelText = document.getElementById('level-text');
        const xpText = document.getElementById('xp-text');
        const xpProgress = document.getElementById('xp-progress');
        
        if (levelDisplay) levelDisplay.textContent = this.xpSystem.getLevel();
        if (levelText) levelText.textContent = `Level ${this.xpSystem.getLevel()}`;
        if (xpText) {
            const currentXP = this.xpSystem.getCurrentXP();
            const nextLevelXP = this.xpSystem.getXPForNextLevel();
            xpText.textContent = `${currentXP} / ${nextLevelXP} XP`;
        }
        
        if (xpProgress) {
            const progress = this.xpSystem.getLevelProgress();
            xpProgress.style.width = `${progress}%`;
        }
        
        // Streak
        const currentStreakEl = document.getElementById('current-streak');
        const bestStreakEl = document.getElementById('best-streak');
        
        if (currentStreakEl) currentStreakEl.textContent = this.streakTracker.getCurrentStreak();
        if (bestStreakEl) bestStreakEl.textContent = this.streakTracker.getBestStreak();
        
        // Achievements
        const totalAchievementsEl = document.getElementById('total-achievements');
        
        const unlockedAchievements = this.achievementSystem.getUnlockedAchievements();
        
        if (totalAchievementsEl) {
            totalAchievementsEl.textContent = unlockedAchievements.length;
        }
    }

    // Handler za custom event
    handleItemChanged(detail) {
        this.updateProgress();
        this.debugLog(`[ChecklistManager] Item changed: ${detail.taskId} = ${detail.isChecked}`);
    }

    // Ažuriranje progress bara
    updateProgress() {
        const total = this.cards.size;
        const completed = Array.from(this.cards.values()).filter(card => card.getSavedState()).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update day progress
        const dayProgressEl = this.container.querySelector('#day-progress');
        if (dayProgressEl) {
            dayProgressEl.textContent = `${percentage}%`;
        }

        this.debugLog(`[ChecklistManager] Progress updated: ${completed}/${total} (${percentage}%)`);
    }

    // Feedback animacija
    showFeedback(checkbox, isChecked) {
        const item = checkbox.closest('.checklist-item');
        if (!item) return;

        if (isChecked) {
            item.style.transform = 'scale(1.02)';
            item.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
            
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.boxShadow = '';
            }, 200);
        }
    }

    showError(message) {
        this.container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-exclamation-triangle text-red-400 text-2xl mb-4"></i>
                <p class="text-gray-400">${message}</p>
            </div>
        `;
    }

    // Day navigation methods
    setCurrentDay(day) {
        this.currentDay = Math.min(Math.max(day, 1), 28);
        this.debugLog(`[ChecklistManager] Day set to: ${this.currentDay}`);
        this.render();
    }

    nextDay() {
        if (this.currentDay < 28) {
            this.currentDay++;
            this.debugLog(`[ChecklistManager] Next day: ${this.currentDay}`);
            this.render();
        }
    }

    previousDay() {
        if (this.currentDay > 1) {
            this.currentDay--;
            this.debugLog(`[ChecklistManager] Previous day: ${this.currentDay}`);
            this.render();
        }
    }

    // Debug helper
    debugLog(...args) {
        if (typeof window !== 'undefined' && window.debugMode) {
            console.log('[ChecklistManager]', ...args);
        }
    }
}