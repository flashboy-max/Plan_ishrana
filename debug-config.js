// Konfiguracija za debug logging
// Postaviti na false za produkciju
window.DEBUG = true;

// Debug logger funkcija
window.debugLog = function(message, ...args) {
    if (window.DEBUG) {
        console.log(message, ...args);
    }
};

// Debug grupiranje
window.debugGroup = function(groupName) {
    if (window.DEBUG) {
        console.group(groupName);
    }
};

window.debugGroupEnd = function() {
    if (window.DEBUG) {
        console.groupEnd();
    }
};
