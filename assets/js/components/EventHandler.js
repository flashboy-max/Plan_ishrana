// EventHandler.js - Centralizovano upravljanje događajima
export class EventHandler {
    constructor(supplementPlanner) {
        this.supplementPlanner = supplementPlanner;
        this.eventListeners = new Map();
        this.delegatedEvents = new Set();
    }

    // Inicijalizacija event handler-a
    initialize() {
        this.setupCardEventHandlers();
        this.setupNavigationHandlers();
        this.setupGlobalHandlers();

        debugLog('[EventHandler] Event handlers inicijalizovani');
    }

    // Setup za kartice suplementa
    setupCardEventHandlers() {
        const container = this.supplementPlanner.container;
        if (!container) return;

        // Delegirani event handling za bolje performanse
        this.addDelegatedEvent(container, 'click', '.taken-today-btn', (event, element) => {
            event.preventDefault();
            const supplementId = element.getAttribute('data-supplement');
            if (supplementId) {
                this.handleTakenToggle(supplementId, element);
            }
        });

        this.addDelegatedEvent(container, 'click', '.details-btn', (event, element) => {
            event.preventDefault();
            const supplementId = element.getAttribute('data-supplement');
            if (supplementId) {
                this.handleDetailsClick(supplementId);
            }
        });

        // Hover efekti za kartice
        this.addDelegatedEvent(container, 'mouseenter', '.supplement-card', (event, element) => {
            element.classList.add('hover');
        });

        this.addDelegatedEvent(container, 'mouseleave', '.supplement-card', (event, element) => {
            element.classList.remove('hover');
        });
    }

    // Setup za navigaciju perioda
    setupNavigationHandlers() {
        const container = this.supplementPlanner.container;
        if (!container) return;

        this.addDelegatedEvent(container, 'click', '.nav-btn', (event, element) => {
            event.preventDefault();
            const direction = element.classList.contains('next-btn') ? 1 : -1;
            this.supplementPlanner.changePeriod(direction);
        });
    }

    // Globalni event handler-i
    setupGlobalHandlers() {
        // Keyboard shortcuts
        this.addGlobalEvent('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });

        // Window resize za responsive dizajn
        this.addGlobalEvent('resize', () => {
            this.handleWindowResize();
        });

        // Visibility change za optimizaciju
        this.addGlobalEvent('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    // Handler za toggle dugme
    handleTakenToggle(supplementId, buttonElement) {
        try {
            const newStatus = this.supplementPlanner.dataManager.toggleTakenStatus(supplementId);

            // Update UI
            this.updateTakenButton(buttonElement, newStatus);

            // Update konzistentnost
            this.supplementPlanner.calculateConsistency();

            // Update minerals tracker
            this.supplementPlanner.updateMineralsTracker();

            // Animacija feedback
            this.animateButtonFeedback(buttonElement, newStatus);

            debugLog(`[EventHandler] Toggle za ${supplementId}: ${newStatus ? 'uzeto' : 'nije uzeto'}`);

        } catch (error) {
            console.error('[EventHandler] Greška pri toggle:', error);
            this.showErrorFeedback(buttonElement);
        }
    }

    // Handler za details dugme
    handleDetailsClick(supplementId) {
        try {
            this.supplementPlanner.showDetails(supplementId);
            debugLog(`[EventHandler] Details za ${supplementId}`);
        } catch (error) {
            console.error('[EventHandler] Greška pri prikazu detalja:', error);
        }
    }

    // Update dugmeta nakon toggle
    updateTakenButton(button, taken) {
        if (!button) return;

        button.classList.toggle('taken', taken);
        button.innerHTML = `
            <i class="fas ${taken ? 'fa-check-circle' : 'fa-check'} mr-1"></i>
            ${taken ? 'Uzeto ✓' : 'Uzeto danas'}
        `;
    }

    // Keyboard shortcuts
    handleKeyboardShortcuts(event) {
        // Arrow keys za navigaciju perioda
        if (event.target.tagName === 'BODY' || event.target.tagName === 'HTML') {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.supplementPlanner.changePeriod(-1);
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.supplementPlanner.changePeriod(1);
                    break;
                case 'r':
                case 'R':
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault();
                        this.supplementPlanner.refresh();
                    }
                    break;
            }
        }
    }

    // Window resize handler
    handleWindowResize() {
        // Throttle resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.supplementPlanner && this.supplementPlanner.dataManager) {
                this.supplementPlanner.dataManager.invalidateCache();
                this.supplementPlanner.renderInterface();
            }
            debugLog('[EventHandler] Window resize - re-render');
        }, 250);
    }

    // Visibility change handler
    handleVisibilityChange() {
        if (!document.hidden) {
            // Tab je ponovo aktivan - refresh podatke
            this.supplementPlanner.refresh();
            debugLog('[EventHandler] Tab reactivated - refresh');
        }
    }

    // Animacija feedback za dugmad
    animateButtonFeedback(button, success) {
        if (!button) return;

        button.classList.add('animate-pulse');
        setTimeout(() => {
            button.classList.remove('animate-pulse');
        }, 300);

        if (success) {
            button.classList.add('success-feedback');
            setTimeout(() => {
                button.classList.remove('success-feedback');
            }, 1000);
        }
    }

    // Error feedback
    showErrorFeedback(element) {
        if (!element) return;

        element.classList.add('error-feedback');
        setTimeout(() => {
            element.classList.remove('error-feedback');
        }, 1000);
    }

    // Delegirani event handling sistem
    addDelegatedEvent(parent, eventType, selector, handler) {
        const key = `${eventType}_${selector}`;

        if (this.delegatedEvents.has(key)) {
            return; // Već registrovan
        }

        const delegatedHandler = (event) => {
            const target = event.target.closest(selector);
            if (target && parent.contains(target)) {
                handler(event, target);
            }
        };

        parent.addEventListener(eventType, delegatedHandler);
        this.eventListeners.set(key, { element: parent, type: eventType, handler: delegatedHandler });
        this.delegatedEvents.add(key);

        debugLog(`[EventHandler] Delegated event dodan: ${key}`);
    }

    // Globalni event handling
    addGlobalEvent(eventType, handler) {
        const key = `global_${eventType}`;

        if (this.eventListeners.has(key)) {
            return; // Već registrovan
        }

        window.addEventListener(eventType, handler);
        this.eventListeners.set(key, { element: window, type: eventType, handler });

        debugLog(`[EventHandler] Global event dodan: ${key}`);
    }

    // Cleanup - ukloni sve event listenere
    destroy() {
        this.eventListeners.forEach((listener, key) => {
            listener.element.removeEventListener(listener.type, listener.handler);
            debugLog(`[EventHandler] Event uklonjen: ${key}`);
        });

        this.eventListeners.clear();
        this.delegatedEvents.clear();

        debugLog('[EventHandler] Svi event handler-i uništeni');
    }

    // Utility funkcije
    preventDefault(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}

// Debug helper
function debugLog(...args) {
    if (typeof window !== 'undefined' && window.debugMode) {
        console.log('[EventHandler]', ...args);
    }
}