// ChecklistManager.js - Glavna komponenta za upravljanje dnevnih checklist zadataka
import { ChecklistCard } from './ChecklistCard.js';

export class ChecklistManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDay = this.getCurrentDay();
        this.cards = new Map();
        this.isInitialized = false;
        
        // Enhanced f// Enhanced Systems Classes
class XPSystem {
    constructor() {
        this.currentXP = this.loadXP();
        this.level = this.calculateLevel();
        this.levelThresholds = [0, 100, 250, 500, 1000, 1750, 2750, 4250, 6500, 10000];
    }

    loadXP() {
        return parseInt(localStorage.getItem('checklist_xp') || '0');
    }

    saveXP() {
        localStorage.setItem('checklist_xp', this.currentXP.toString());
        localStorage.setItem('checklist_level', this.level.toString());
    }

    awardXP(amount, reason = 'Task completed') {
        const oldLevel = this.level;
        this.currentXP += amount;
        this.level = this.calculateLevel();
        this.saveXP();

        debugLog(`[XPSystem] Awarded ${amount} XP for: ${reason}. Total: ${this.currentXP} XP, Level: ${this.level}`);

        // Check for level up
        if (this.level > oldLevel) {
            this.showLevelUpNotification(this.level);
        }

        return {
            xpAwarded: amount,
            totalXP: this.currentXP,
            level: this.level,
            leveledUp: this.level > oldLevel
        };
    }

    calculateLevel() {
        let level = 1;
        for (let i = this.levelThresholds.length - 1; i >= 0; i--) {
            if (this.currentXP >= this.levelThresholds[i]) {
                level = i + 1;
                break;
            }
        }
        return level;
    }

    getXPForNextLevel() {
        const currentThreshold = this.levelThresholds[this.level - 1] || 0;
        const nextThreshold = this.levelThresholds[this.level] || this.levelThresholds[this.levelThresholds.length - 1];
        return {
            current: this.currentXP - currentThreshold,
            needed: nextThreshold - currentThreshold,
            progress: ((this.currentXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100
        };
    }

    showLevelUpNotification(newLevel) {
        // Create level up animation
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <i class="fas fa-trophy text-yellow-400 text-3xl mb-2"></i>
                <h3 class="text-xl font-bold text-white">Level Up!</h3>
                <p class="text-cyan-300">Dostigao si Level ${newLevel}!</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }
}

class AchievementSystem {
    constructor() {
        this.unlockedAchievements = this.loadAchievements();
        this.achievements = this.getAchievementDefinitions();
    }

    loadAchievements() {
        return JSON.parse(localStorage.getItem('checklist_achievements') || '[]');
    }

    saveAchievements() {
        localStorage.setItem('checklist_achievements', JSON.stringify(this.unlockedAchievements));
    }

    getAchievementDefinitions() {
        return {
            'first_task': {
                name: 'Prvi Korak',
                description: 'Završi svoj prvi zadatak',
                icon: 'fas fa-baby',
                xpReward: 25
            },
            'daily_complete': {
                name: 'Savršen Dan',
                description: 'Završi sve zadatke u jednom danu',
                icon: 'fas fa-check-circle',
                xpReward: 100
            },
            'week_streak': {
                name: 'Nedeljni Ratnik',
                description: '7 dana zaredom bez propuštenog zadatka',
                icon: 'fas fa-fire',
                xpReward: 250
            },
            'early_bird': {
                name: 'Rana Ptica',
                description: 'Završi sve jutarnje zadatke pre 9:00',
                icon: 'fas fa-sunrise',
                xpReward: 50
            },
            'level_5': {
                name: 'Veteran',
                description: 'Dostigni Level 5',
                icon: 'fas fa-medal',
                xpReward: 500
            }
        };
    }

    checkAchievements(data) {
        const newAchievements = [];
        
        // First task achievement
        if (!this.hasAchievement('first_task') && data.totalCompleted >= 1) {
            newAchievements.push(this.unlockAchievement('first_task'));
        }

        // Daily complete achievement
        if (!this.hasAchievement('daily_complete') && data.completionRate === 100) {
            newAchievements.push(this.unlockAchievement('daily_complete'));
        }

        // Week streak achievement
        if (!this.hasAchievement('week_streak') && data.currentStreak >= 7) {
            newAchievements.push(this.unlockAchievement('week_streak'));
        }

        return newAchievements;
    }

    hasAchievement(id) {
        return this.unlockedAchievements.includes(id);
    }

    unlockAchievement(id) {
        if (!this.hasAchievement(id)) {
            this.unlockedAchievements.push(id);
            this.saveAchievements();
            
            const achievement = this.achievements[id];
            this.showAchievementNotification(achievement);
            
            debugLog(`[AchievementSystem] Unlocked: ${achievement.name}`);
            return achievement;
        }
        return null;
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <i class="${achievement.icon} text-yellow-400 text-2xl mb-2"></i>
                <h4 class="text-lg font-bold text-white">${achievement.name}</h4>
                <p class="text-gray-300 text-sm">${achievement.description}</p>
                <div class="xp-reward text-cyan-300">+${achievement.xpReward} XP</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 4000);
    }
}

class StreakTracker {
    constructor() {
        this.currentStreak = this.loadStreak();
        this.bestStreak = this.loadBestStreak();
        this.lastCompletionDate = this.loadLastDate();
    }

    loadStreak() {
        return parseInt(localStorage.getItem('checklist_streak') || '0');
    }

    loadBestStreak() {
        return parseInt(localStorage.getItem('checklist_best_streak') || '0');
    }

    loadLastDate() {
        return localStorage.getItem('checklist_last_date') || null;
    }

    saveData() {
        localStorage.setItem('checklist_streak', this.currentStreak.toString());
        localStorage.setItem('checklist_best_streak', this.bestStreak.toString());
        localStorage.setItem('checklist_last_date', new Date().toDateString());
    }

    updateStreak(completionRate) {
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (completionRate === 100) {
            if (this.lastCompletionDate === yesterday) {
                this.currentStreak++;
            } else if (this.lastCompletionDate !== today) {
                this.currentStreak = 1;
            }
            
            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }
            
            this.lastCompletionDate = today;
            this.saveData();
        }
        
        debugLog(`[StreakTracker] Current streak: ${this.currentStreak}, Best: ${this.bestStreak}`);
    }
}

class ChecklistAnalytics {
    constructor() {
        this.data = this.loadAnalyticsData();
    }

    loadAnalyticsData() {
        return JSON.parse(localStorage.getItem('checklist_analytics') || '{}');
    }

    saveAnalyticsData() {
        localStorage.setItem('checklist_analytics', JSON.stringify(this.data));
    }

    recordCompletion(taskId, dayNumber) {
        const today = new Date().toDateString();
        
        if (!this.data[today]) {
            this.data[today] = {
                day: dayNumber,
                completedTasks: [],
                completionTime: Date.now()
            };
        }
        
        if (!this.data[today].completedTasks.includes(taskId)) {
            this.data[today].completedTasks.push(taskId);
        }
        
        this.saveAnalyticsData();
    }

    getWeeklyStats() {
        const lastWeek = this.getLast7Days();
        const weekData = lastWeek.map(date => this.data[date] || { completedTasks: [] });
        
        return {
            totalTasks: weekData.reduce((sum, day) => sum + day.completedTasks.length, 0),
            averagePerDay: weekData.reduce((sum, day) => sum + day.completedTasks.length, 0) / 7,
            perfectDays: weekData.filter(day => day.completedTasks.length >= 10).length,
            mostProductiveDay: this.getMostProductiveDay(weekData)
        };
    }

    getLast7Days() {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(Date.now() - (i * 86400000));
            days.push(date.toDateString());
        }
        return days;
    }

    getMostProductiveDay(weekData) {
        let maxTasks = 0;
        let bestDay = 0;
        
        weekData.forEach((day, index) => {
            if (day.completedTasks.length > maxTasks) {
                maxTasks = day.completedTasks.length;
                bestDay = index;
            }
        });
        
        const dayNames = ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota', 'Nedelja'];
        return dayNames[bestDay];
    }
}

// Global reference
if (typeof window !== 'undefined') {
    window.ChecklistManager = ChecklistManager;
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log(...args);
    }
}      this.xpSystem = new XPSystem();
        this.achievements = new AchievementSystem();
        this.analytics = new ChecklistAnalytics();
        this.streakTracker = new StreakTracker();
    }

    // Glavna inicijalizacija
    init() {
        debugLog(`[ChecklistManager] Starting initialization for container: ${this.container?.id || 'null'}`);

        if (!this.container) {
            console.error('[ChecklistManager] Container not found!');
            this.showError('Checklist container not found');
            return;
        }

        if (this.isInitialized) {
            debugLog('[ChecklistManager] Already initialized');
            return;
        }

        // Show loading state initially
        this.showLoadingState();

        // Check if planData is available
        if (!window.planData) {
            debugLog('[ChecklistManager] planData not available, waiting...');
            setTimeout(() => this.init(), 200);
            return;
        }

        debugLog(`[ChecklistManager] planData available, proceeding with day ${this.currentDay}`);

        this.render();
        this.attachEventListeners();
        this.isInitialized = true;

        debugLog(`[ChecklistManager] ✅ Successfully initialized for day ${this.currentDay}`);
    }

    // Renderovanje kompletne checklist-e
    render() {
        debugLog(`[ChecklistManager] Starting render for day ${this.currentDay}`);

        const dayData = this.getDayData();
        debugLog(`[ChecklistManager] Day data:`, dayData);

        if (!dayData) {
            debugLog(`[ChecklistManager] No day data found for day ${this.currentDay}`);
            this.showError('Nema podataka za današnji dan');
            return;
        }

        if (!dayData.checklist || dayData.checklist.length === 0) {
            debugLog(`[ChecklistManager] No checklist tasks found for day ${this.currentDay}`);
            this.showEmptyState('Nema definisanih zadataka za današnji dan');
            return;
        }

        debugLog(`[ChecklistManager] Found ${dayData.checklist.length} tasks:`, dayData.checklist);

        const checklistHTML = this.generateChecklistHTML(dayData);
        this.container.innerHTML = checklistHTML;

        // Inicijalizuj kartice
        this.initializeCards(dayData.checklist);

        // Ažuriraj progress
        this.updateProgress();

        debugLog(`[ChecklistManager] ✅ Successfully rendered ${dayData.checklist.length} tasks for day ${this.currentDay}`);
    }

    // Generisanje HTML-a za checklist
    generateChecklistHTML(dayData) {
        const dayDate = this.getCurrentDate();
        const dayName = dayDate.toLocaleDateString('sr-RS', { weekday: 'long' });

        return `
            <div class="checklist-container">
                <!-- Header -->
                <div class="checklist-header">
                    <div class="day-info">
                        <h3 class="day-title">
                            <i class="fas fa-calendar-check"></i>
                            Dnevni Checklist
                        </h3>
                        <div class="day-meta">
                            <span class="day-number">Dan ${this.currentDay} od 28</span>
                            <span class="day-date">${dayDate.getDate()}.${(dayDate.getMonth() + 1).toString().padStart(2, '0')}</span>
                            <span class="day-name">${dayName}</span>
                        </div>
                    </div>
                    <div class="day-description">
                        <p>Prati svoj napredak kroz dnevne zadatke i ostani motivisan! 💪</p>
                    </div>
                </div>

                <!-- Tasks List -->
                <div class="checklist-items" data-day="${this.currentDay}">
                    ${dayData.checklist.map(task => {
                        const card = new ChecklistCard(task, this.currentDay);
                        return card.render();
                    }).join('')}
                </div>

                <!-- Progress Summary -->
                <div class="checklist-summary">
                    <div class="progress-header">
                        <h4>Dnevni Progress</h4>
                        <div class="progress-stats">
                            <span class="completed-count">0</span>
                            <span class="separator">/</span>
                            <span class="total-count">${dayData.checklist.length}</span>
                            <span class="progress-percentage">0%</span>
                        </div>
                    </div>

                    <div class="progress-bar-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 0%"></div>
                        </div>
                    </div>

                    <div class="motivational-message">
                        Počni dan sa prvim zadatkom!
                    </div>
                </div>

                <!-- Actions -->
                <div class="checklist-actions">
                    <button class="action-btn refresh-btn" onclick="window.checklistManager?.refresh()">
                        <i class="fas fa-sync-alt"></i>
                        Osveži
                    </button>
                    <button class="action-btn reset-btn" onclick="window.checklistManager?.resetDay()">
                        <i class="fas fa-undo"></i>
                        Resetuj Dan
                    </button>
                </div>
            </div>
        `;
    }

    // Inicijalizacija kartica
    initializeCards(tasks) {
        this.cards.clear();

        // Sačekaj da se DOM ažurira
        setTimeout(() => {
            const checklistItems = this.container.querySelectorAll('.checklist-item');

            checklistItems.forEach((item, index) => {
                const task = tasks[index];
                if (task) {
                    const card = new ChecklistCard(task, this.currentDay);
                    card.setElement(item);
                    this.cards.set(card.taskId, card);
                }
            });

            debugLog(`[ChecklistManager] Initialized ${this.cards.size} checklist cards`);
        }, 10);
    }

    // Event listeners
    attachEventListeners() {
        // Event delegation za checkbox-ove
        this.container.addEventListener('change', (e) => {
            if (e.target.matches('.checklist-checkbox')) {
                this.handleCheckboxChange(e.target);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'BODY' || e.target.tagName === 'HTML') {
                if (e.key === 'r' && e.ctrlKey) {
                    e.preventDefault();
                    this.refresh();
                }
            }
        });

        // Custom events
        document.addEventListener('checklistItemChanged', (e) => {
            this.handleItemChanged(e.detail);
        });

        debugLog('[ChecklistManager] Event listeners attached');
    }

    // Handler za checkbox promjene
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

            debugLog(`[ChecklistManager] Task ${taskId} changed to ${newState}`);
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
        
        // Prikaži XP gain notification
        this.showXPGainNotification(checkbox, xpGained, levelUp);
        
        // Prikaži nova postignuća
        if (newAchievements.length > 0) {
            this.showAchievementNotifications(newAchievements);
        }
        
        debugLog(`[ChecklistManager] Task completed: +${xpGained} XP${levelUp ? ', LEVEL UP!' : ''}`);
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

    // Handler za custom event
    handleItemChanged(detail) {
        this.updateProgress();
        debugLog(`[ChecklistManager] Item changed: ${detail.taskId} = ${detail.isChecked}`);
    }

    // Ažuriranje progress bara
    updateProgress() {
        const total = this.cards.size;
        const completed = Array.from(this.cards.values()).filter(card => card.getSavedState()).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // Update UI elements
        const completedEl = this.container.querySelector('.completed-count');
        const percentageEl = this.container.querySelector('.progress-percentage');
        const progressFill = this.container.querySelector('.progress-fill');
        const messageEl = this.container.querySelector('.motivational-message');

        if (completedEl) completedEl.textContent = completed;
        if (percentageEl) percentageEl.textContent = `${percentage}%`;
        if (progressFill) progressFill.style.width = `${percentage}%`;
        if (messageEl) messageEl.textContent = this.getMotivationalMessage(percentage);

        // Update container classes za styling
        this.updateProgressClasses(percentage);

        debugLog(`[ChecklistManager] Progress updated: ${completed}/${total} (${percentage}%)`);
        
        // Ažuriraj gamification dashboard
        this.updateGamificationUI();
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
    
    // Ažuriranje liste postignuća
    updateAchievementsList() {
        const recentAchievementsContainer = document.getElementById('recent-achievements');
        const achievementsList = document.getElementById('achievements-list');
        
        if (!recentAchievementsContainer || !achievementsList) return;
        
        const unlockedAchievements = this.achievementSystem.getUnlockedAchievements();
        
        if (unlockedAchievements.length === 0) {
            recentAchievementsContainer.classList.add('hidden');
            return;
        }
        
        recentAchievementsContainer.classList.remove('hidden');
        achievementsList.innerHTML = '';
        
        // Prikaži poslednja 3 achievement-a
        const recentAchievements = unlockedAchievements.slice(-3).reverse();
        
        recentAchievements.forEach(achievement => {
            const achievementEl = document.createElement('div');
            achievementEl.className = 'flex items-center p-3 bg-gray-800 rounded-lg';
            achievementEl.innerHTML = `
                <div class="text-2xl mr-3">🏆</div>
                <div>
                    <div class="font-semibold text-white">${achievement.name}</div>
                    <div class="text-sm text-gray-400">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(achievementEl);
        });
    }

    // Motivacione poruke na osnovu progress-a
    getMotivationalMessage(percentage) {
        if (percentage === 0) return 'Počni dan sa prvim zadatkom!';
        if (percentage < 25) return 'Dobro počinje! Nastavi tako!';
        if (percentage < 50) return 'Odličan napredak! 💪';
        if (percentage < 75) return 'Više od polovine gotovo! 🔥';
        if (percentage < 100) return 'Skoro gotovo! Završi jako! ⚡';
        return 'Savršen dan! Čestitamo! 🏆';
    }

    // Update CSS classes za progress
    updateProgressClasses(percentage) {
        const container = this.container.querySelector('.checklist-container');
        if (!container) return;

        // Remove old classes
        container.classList.remove('progress-low', 'progress-medium', 'progress-high', 'progress-complete');

        // Add new class
        if (percentage === 100) {
            container.classList.add('progress-complete');
        } else if (percentage >= 75) {
            container.classList.add('progress-high');
        } else if (percentage >= 50) {
            container.classList.add('progress-medium');
        } else if (percentage >= 25) {
            container.classList.add('progress-low');
        }
    }

    // Feedback animacija
    showFeedback(element, success) {
        if (!element) return;

        const item = element.closest('.checklist-item');
        if (!item) return;

        item.classList.add('feedback-animation');

        if (success) {
            item.classList.add('success-feedback');
            setTimeout(() => {
                item.classList.remove('success-feedback', 'feedback-animation');
            }, 1000);
        } else {
            item.classList.add('neutral-feedback');
            setTimeout(() => {
                item.classList.remove('neutral-feedback', 'feedback-animation');
            }, 500);
        }
    }

    // Utility funkcije
    getDayData() {
        if (!window.planData) {
            debugLog(`[ChecklistManager] window.planData is not available`);
            return null;
        }

        const dayKey = `Dan ${this.currentDay}`;
        const dayData = window.planData[dayKey];

        debugLog(`[ChecklistManager] Looking for day data: ${dayKey}`);
        debugLog(`[ChecklistManager] Available days in planData:`, Object.keys(window.planData));
        debugLog(`[ChecklistManager] Found day data:`, dayData);

        return dayData;
    }

    getCurrentDay() {
        const startDate = new Date('2025-09-14');
        const today = new Date();
        const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const currentDay = Math.min(Math.max(diffDays, 1), 28);

        debugLog(`[ChecklistManager] Calculated current day: ${currentDay} (diff: ${diffDays})`);
        debugLog(`[ChecklistManager] Start date: ${startDate.toISOString()}`);
        debugLog(`[ChecklistManager] Today: ${today.toISOString()}`);

        return currentDay;
    }

    getCurrentDate() {
        const startDate = new Date('2025-09-14');
        const today = new Date();
        return today;
    }

    // Public API
    refresh() {
        debugLog('[ChecklistManager] Refreshing...');
        this.currentDay = this.getCurrentDay();
        this.render();
    }

    resetDay() {
        if (confirm('Da li ste sigurni da želite da resetujete sve zadatke za današnji dan?')) {
            const storageKey = `checklist_day_${this.currentDay}`;
            localStorage.removeItem(storageKey);

            // Reset all cards
            this.cards.forEach(card => {
                card.saveState(false);
                card.updateUI();
            });

            this.updateProgress();
            debugLog(`[ChecklistManager] Day ${this.currentDay} reset`);
        }
    }

    getProgress() {
        const total = this.cards.size;
        const completed = Array.from(this.cards.values()).filter(card => card.getSavedState()).length;

        return {
            day: this.currentDay,
            total: total,
            completed: completed,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
            date: new Date().toISOString()
        };
    }

    // Error states
    showError(message) {
        this.container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Greška pri učitavanju</h3>
                <p>${message}</p>
                <button onclick="window.checklistManager?.refresh()" class="retry-btn">
                    <i class="fas fa-redo"></i> Pokušaj ponovo
                </button>
            </div>
        `;
    }

    showLoadingState() {
        this.container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <h3>Učitavam checklist...</h3>
                <p>Pripremam vaše dnevne zadatke</p>
            </div>
        `;
    }

    showEmptyState(message) {
        this.container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-check"></i>
                <h3>Nema zadataka</h3>
                <p>${message}</p>
            </div>
        `;
    }

    // Cleanup
    destroy() {
        this.cards.clear();
        this.isInitialized = false;
        debugLog('[ChecklistManager] Destroyed');
    }
}

// Global reference
if (typeof window !== 'undefined') {
    window.ChecklistManager = ChecklistManager;
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[ChecklistManager]', ...args);
    }
}