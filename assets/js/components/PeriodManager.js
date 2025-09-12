// PeriodManager.js - Upravljanje vremenskim periodima
export class PeriodManager {
    static getCurrentPeriod() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour * 60 + minute;

        // Definiraj vremenske granice za periode
        const periods = {
            fasting: { start: 7 * 60, end: 12 * 60 + 30 }, // 07:00 - 12:30
            preWorkout: { start: 12 * 60 + 30, end: 14 * 60 }, // 12:30 - 14:00
            duringWorkout: { start: 14 * 60, end: 16 * 60 }, // 14:00 - 16:00
            postWorkout: { start: 16 * 60, end: 17 * 60 }, // 16:00 - 17:00
            meal1: { start: 13 * 60 + 30, end: 14 * 60 }, // 13:30 - 14:00
            meal2: { start: 17 * 60 + 30, end: 19 * 60 }, // 17:30 - 19:00
            evening: { start: 21 * 60, end: 21 * 60 + 30 }, // 21:00 - 21:30
            bedtime: { start: 21 * 60 + 30, end: 22 * 60 } // 21:30 - 22:00
        };

        for (const [period, times] of Object.entries(periods)) {
            if (currentTime >= times.start && currentTime < times.end) {
                return period;
            }
        }

        return 'fasting'; // Default period
    }

    static getPeriodInfo(period) {
        const PERIOD_INFO = window.PERIOD_INFO || {};
        return PERIOD_INFO[period] || {
            label: 'Nepoznat Period',
            time: '--:--',
            icon: 'fas fa-question',
            color: 'gray',
            description: 'Period nije definisan'
        };
    }

    static getAllPeriods() {
        return ['fasting', 'meal1', 'preWorkout', 'duringWorkout', 'postWorkout', 'meal2', 'evening', 'bedtime'];
    }

    static getNextPeriod(currentPeriod) {
        const periods = this.getAllPeriods();
        const currentIndex = periods.indexOf(currentPeriod);
        const nextIndex = (currentIndex + 1) % periods.length;
        return periods[nextIndex];
    }

    static getPreviousPeriod(currentPeriod) {
        const periods = this.getAllPeriods();
        const currentIndex = periods.indexOf(currentPeriod);
        const prevIndex = currentIndex === 0 ? periods.length - 1 : currentIndex - 1;
        return periods[prevIndex];
    }

    static formatPeriodTime(period) {
        const info = this.getPeriodInfo(period);
        return info.time || '--:--';
    }

    static getPeriodDescription(period) {
        const info = this.getPeriodInfo(period);
        return info.description || 'Nema opisa';
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[PeriodManager]', ...args);
    }
}