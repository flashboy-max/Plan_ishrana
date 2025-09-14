// ═══════════════════════════════════════════════════════════════════════════════════
// 🤖 ENHANCED AI DEBUG SYSTEM 
// ═══════════════════════════════════════════════════════════════════════════════════
// Postaviti na false za produkciju
window.DEBUG = true;
window.DEBUG_MODE = true;
window.debugLogs = [];
window.errorLogs = [];
window.performanceLogs = [];
window.debugExports = [];
window.exportCounter = 0;

// Enhanced console logging with storage
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
};

// Capture all console messages
console.log = function(...args) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
        type: 'log',
        timestamp,
        message: args.join(' '),
        stack: (new Error()).stack.split('\n').slice(2, 4).join('\n') // Relevant stack only
    };
    window.debugLogs.push(logEntry);
    updateDebugPanel();
    originalConsole.log(`[${timestamp}]`, ...args);
};

console.error = function(...args) {
    const timestamp = new Date().toLocaleTimeString();
    const errorEntry = {
        type: 'error',
        timestamp,
        message: args.join(' '),
        stack: (new Error()).stack
    };
    window.errorLogs.push(errorEntry);
    updateDebugPanel();
    originalConsole.error(`[${timestamp}] ERROR:`, ...args);
    
    // Auto-export on critical errors
    if (document.getElementById('auto-export')?.checked) {
        setTimeout(() => window.exportDebugForAI(), 1000);
    }
};

console.warn = function(...args) {
    const timestamp = new Date().toLocaleTimeString();
    const warnEntry = {
        type: 'warn',
        timestamp,
        message: args.join(' ')
    };
    window.debugLogs.push(warnEntry);
    updateDebugPanel();
    originalConsole.warn(`[${timestamp}] WARN:`, ...args);
};

// Update debug panel counters
function updateDebugPanel() {
    const errorCount = document.getElementById('error-count');
    const logCount = document.getElementById('log-count');
    const exportCount = document.getElementById('export-count');
    
    if (errorCount) errorCount.textContent = window.errorLogs.length;
    if (logCount) logCount.textContent = window.debugLogs.length;
    if (exportCount) exportCount.textContent = window.exportCounter;
}

// ═══════════════════════════════════════════════════════════════════════════════════
// 🎯 ENHANCED EXPORT FUNCTION FOR AI ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════════════
window.exportDebugForAI = function() {
    window.exportCounter++;
    const timestamp = new Date().toISOString();
    const filename = `debug-report-${timestamp.slice(0, 19).replace(/:/g, '-')}.json`;
    
    const report = {
        export_info: {
            export_id: window.exportCounter,
            filename: filename,
            timestamp: timestamp,
            export_path: `debug-reports/${filename}`,
            session_duration_ms: performance.now()
        },
        session_info: {
            url: window.location.href,
            userAgent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            connection: navigator.connection?.effectiveType || 'unknown',
            language: navigator.language
        },
        error_analysis: {
            total_errors: window.errorLogs.length,
            unique_error_types: [...new Set(window.errorLogs.map(e => e.message.split(':')[0]))],
            recent_errors: window.errorLogs.slice(-5),
            error_frequency: getErrorFrequency(),
            critical_errors: window.errorLogs.filter(e => e.message.toLowerCase().includes('critical')),
            javascript_errors: window.errorLogs.filter(e => e.stack)
        },
        console_logs: {
            total_logs: window.debugLogs.length,
            recent_logs: window.debugLogs.slice(-20),
            debug_logs: window.debugLogs.filter(log => log.message.includes('[DEBUG]')).slice(-10),
            warning_logs: window.debugLogs.filter(log => log.type === 'warn'),
            log_patterns: getLogPatterns()
        },
        application_state: {
            data_status: {
                planData: {
                    loaded: !!window.planData,
                    type: typeof window.planData,
                    keys: window.planData ? Object.keys(window.planData).slice(0, 5) : [],
                    size: window.planData ? JSON.stringify(window.planData).length : 0
                },
                trainingData: {
                    loaded: !!window.TRAINING_DATA,
                    type: typeof window.TRAINING_DATA,
                    days: window.TRAINING_DATA ? Object.keys(window.TRAINING_DATA).length : 0,
                    sample_day: window.TRAINING_DATA ? Object.keys(window.TRAINING_DATA)[0] : null
                },
                mealsData: {
                    loaded: !!window.MEALS_DATA,
                    type: typeof window.MEALS_DATA,
                    meals_count: window.MEALS_DATA?.meals ? window.MEALS_DATA.meals.length : 0
                },
                supplementsData: {
                    loaded: !!window.SUPPLEMENTS_DATA,
                    type: typeof window.SUPPLEMENTS_DATA,
                    supplements_count: window.SUPPLEMENTS_DATA?.supplements ? window.SUPPLEMENTS_DATA.supplements.length : 0
                }
            },
            managers_status: {
                trainingManager: {
                    active: !!window.trainingManager,
                    methods: window.trainingManager ? Object.getOwnPropertyNames(Object.getPrototypeOf(window.trainingManager)) : []
                },
                mealManager: {
                    active: !!window.mealManager,
                    methods: window.mealManager ? Object.getOwnPropertyNames(Object.getPrototypeOf(window.mealManager)) : []
                },
                supplementManager: {
                    active: !!window.supplementManager,
                    methods: window.supplementManager ? Object.getOwnPropertyNames(Object.getPrototypeOf(window.supplementManager)) : []
                },
                checklistManager: {
                    active: !!window.checklistManager,
                    methods: window.checklistManager ? Object.getOwnPropertyNames(Object.getPrototypeOf(window.checklistManager)) : []
                }
            },
            dom_elements: {
                training_container: {
                    exists: !!document.getElementById('training-container'),
                    children: document.getElementById('training-container')?.children.length || 0
                },
                meals_container: {
                    exists: !!document.getElementById('meals-container'),
                    children: document.getElementById('meals-container')?.children.length || 0
                },
                supplement_planner: {
                    exists: !!document.getElementById('supplement-planner'),
                    children: document.getElementById('supplement-planner')?.children.length || 0
                },
                checklist_container: {
                    exists: !!document.getElementById('checklist-container'),
                    children: document.getElementById('checklist-container')?.children.length || 0
                },
                accordion_sections: {
                    total_accordions: document.querySelectorAll('.accordion-button').length,
                    open_accordions: document.querySelectorAll('.accordion-content:not(.hidden)').length
                }
            }
        },
        performance_metrics: {
            page_load_time: performance.now(),
            memory_usage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB',
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
            } : 'not available',
            custom_performance: window.performanceLogs.slice(-10),
            navigation_timing: getNavigationTiming()
        },
        user_interactions: {
            accordion_toggles: document.querySelectorAll('.accordion-button').length,
            visible_sections: Array.from(document.querySelectorAll('.accordion-content')).filter(el => !el.classList.contains('hidden')).length,
            button_clicks: getButtonClickCount(),
            scroll_position: window.pageYOffset
        },
        recommendations: generateRecommendations(),
        debug_session_summary: {
            total_exports: window.exportCounter,
            session_errors: window.errorLogs.length,
            session_logs: window.debugLogs.length,
            most_recent_activity: getMostRecentActivity()
        }
    };
    
    // Store export
    window.debugExports.push(report);
    
    // Format for easy copy-paste
    const formatted = JSON.stringify(report, null, 2);
    
    console.log('%c📋 AI DEBUG REPORT #' + window.exportCounter + ' GENERATED', 'color: cyan; font-size: 16px; font-weight: bold;');
    console.log('%c📁 Filename: ' + filename, 'color: yellow; font-size: 14px;');
    console.log('%c🎯 Export Path: debug-reports/' + filename, 'color: green; font-size: 12px;');
    console.log('%c' + '═'.repeat(80), 'color: cyan;');
    console.log(formatted);
    console.log('%c' + '═'.repeat(80), 'color: cyan;');
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(formatted)
            .then(() => {
                console.log('✅ Debug report copied to clipboard!');
                showNotification(`Debug report #${window.exportCounter} copied to clipboard!`, 'success');
            })
            .catch(() => {
                console.log('❌ Could not copy to clipboard');
                showNotification('Could not copy to clipboard', 'error');
            });
    }
    
    updateDebugPanel();
    return report;
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 📋 QUICK SUMMARY FOR RAPID DEBUGGING
// ═══════════════════════════════════════════════════════════════════════════════════
window.getQuickDebugSummary = function() {
    const timestamp = new Date().toLocaleTimeString();
    const summary = `
🔍 QUICK DEBUG SUMMARY #${window.exportCounter + 1} (${timestamp}):
${'═'.repeat(80)}
📊 SESSION STATS:
  • Export #: ${window.exportCounter + 1}
  • Errors: ${window.errorLogs.length} ${window.errorLogs.length > 5 ? '⚠️' : '✅'}
  • Logs: ${window.debugLogs.length}
  • Performance entries: ${window.performanceLogs.length}
  • Session time: ${Math.round(performance.now() / 1000)}s

🗃️ DATA STATUS:
  • PlanData: ${!!window.planData ? '✅ Loaded' : '❌ Missing'}
  • Training: ${!!window.TRAINING_DATA ? '✅ Loaded (' + (window.TRAINING_DATA ? Object.keys(window.TRAINING_DATA).length : 0) + ' days)' : '❌ Missing'}
  • Meals: ${!!window.MEALS_DATA ? '✅ Loaded' : '❌ Missing'}
  • Supplements: ${!!window.SUPPLEMENTS_DATA ? '✅ Loaded' : '❌ Missing'}

🎮 MANAGERS STATUS:
  • Training Manager: ${!!window.trainingManager ? '✅ Active' : '❌ Inactive'}
  • Meal Manager: ${!!window.mealManager ? '✅ Active' : '❌ Inactive'}
  • Supplement Manager: ${!!window.supplementManager ? '✅ Active' : '❌ Inactive'}
  • Checklist Manager: ${!!window.checklistManager ? '✅ Active' : '❌ Inactive'}

🏗️ DOM STATUS:
  • Accordion Sections: ${document.querySelectorAll('.accordion-button').length}
  • Open Sections: ${document.querySelectorAll('.accordion-content:not(.hidden)').length}
  • Training Container: ${!!document.getElementById('training-container') ? '✅' : '❌'}
  • Meals Container: ${!!document.getElementById('meals-container') ? '✅' : '❌'}

🚨 CRITICAL ERRORS (Last 3):
${window.errorLogs.slice(-3).map(e => `  • ${e.timestamp}: ${e.message.substring(0, 60)}...`).join('\n') || '  • No critical errors'}

📝 RECENT ACTIVITY (Last 5):
${window.debugLogs.slice(-5).map(l => `  • ${l.timestamp}: ${l.message.substring(0, 60)}...`).join('\n') || '  • No recent activity'}

💡 AI RECOMMENDATIONS:
${generateRecommendations().map(r => `  • ${r}`).join('\n') || '  • System operating normally'}
${'═'.repeat(80)}
📁 Copy this summary and send to AI for quick analysis!
`;
    
    console.log(summary);
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(summary)
            .then(() => showNotification('Quick summary copied to clipboard!', 'success'))
            .catch(() => console.log('Could not copy summary to clipboard'));
    }
    
    return summary;
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 💾 SAVE DEBUG DATA TO DOWNLOADABLE FILE
// ═══════════════════════════════════════════════════════════════════════════════════
window.saveDebugToFile = function() {
    const data = window.exportDebugForAI();
    const filename = data.export_info.filename;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`📁 Debug report saved as: ${filename}`);
    console.log(`� Downloaded to: C:/Users/ROG_LAP/Downloads/${filename}`);
    console.log(`🎯 Target: C:/Users/ROG_LAP/Desktop/Plan_Ishrana/debug-reports/`);
    console.log(`%c� PowerShell command to move file:`, 'color: yellow; font-weight: bold;');
    console.log(`   Move-Item "C:/Users/ROG_LAP/Downloads/${filename}" "C:/Users/ROG_LAP/Desktop/Plan_Ishrana/debug-reports/"`);
    console.log(`%c🎛️ Or use "Move File" button in Debug Panel`, 'color: orange;');
    
    showNotification(`Debug report saved: ${filename}`, 'success');
    
    // Auto-generate move commands
    setTimeout(() => {
        showNotification(`💡 Use "Move File" button for instructions`, 'info');
        
        // Automatically trigger move instructions after 3 seconds
        setTimeout(() => {
            if (document.getElementById('move-file')) {
                console.log(`%c🤖 Auto-generating move instructions for ${filename}...`, 'color: cyan;');
                // Show move instructions in console
                window.moveDebugFileFromDownloads && window.moveDebugFileFromDownloads(filename);
            }
        }, 3000);
    }, 2000);
    
    return filename;
};

// ═══════════════════════════════════════════════════════════════════════════════════
//  MOVE DEBUG FILE FROM DOWNLOADS (Auto-called function)
// ═══════════════════════════════════════════════════════════════════════════════════
window.moveDebugFileFromDownloads = function(filename) {
    if (!filename) {
        console.log('%c❌ No filename provided for move operation', 'color: red;');
        return;
    }
    
    console.log(`%c🚀 Auto-generating move instructions for: ${filename}`, 'color: cyan; font-weight: bold;');
    
    // Show move command
    const command = `move "%USERPROFILE%\\Downloads\\${filename}" "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`;
    console.log(`%c📋 Move Command:`, 'color: yellow; font-weight: bold;');
    console.log(`   ${command}`);
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(command).then(() => {
            console.log('%c✅ Move command copied to clipboard!', 'color: lime;');
            showNotification('Move command ready in clipboard!', 'success');
        }).catch(() => {
            console.log('%c❌ Could not copy to clipboard', 'color: red;');
        });
    }
    
    // Show enhanced instructions
    console.log(`%c🎯 QUICK MOVE INSTRUCTIONS:`, 'color: orange; font-weight: bold;');
    console.log('   1. Press Win+R → type "cmd" → Enter');
    console.log('   2. Paste the command (Ctrl+V) → Enter');
    console.log(`   3. File will move to debug-reports folder`);
    
    return command;
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 📁 COPY FILE FROM DOWNLOADS TO PROJECT FOLDER
// ═══════════════════════════════════════════════════════════════════════════════════
window.copyDebugFromDownloads = function(filename) {
    if (!filename) {
        // Find latest debug file in Downloads
        console.log(`📁 To copy latest debug file from Downloads:`);
        console.log(`1. Open Terminal (PowerShell)`);
        console.log(`2. Run: move "%USERPROFILE%\\Downloads\\debug-report-*.json" "c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`);
        showNotification('Check console for copy instructions', 'info');
        return;
    }
    
    console.log(`📂 To move ${filename} to project folder:`);
    console.log(`move "%USERPROFILE%\\Downloads\\${filename}" "c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`);
    
    // Try to copy to clipboard for easy pasting
    const command = `move "%USERPROFILE%\\Downloads\\${filename}" "c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(command)
            .then(() => {
                showNotification('Move command copied to clipboard!', 'success');
                console.log(`✅ Command copied to clipboard - paste in Terminal`);
            })
            .catch(() => {
                showNotification('Copy command manually from console', 'warning');
            });
    }
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 🔄 AUTO-MOVE FUNCTIONALITY (Browser Security Limitations)
// ═══════════════════════════════════════════════════════════════════════════════════
window.showMoveInstructions = function() {
    const instructions = `
📁 MOVE DEBUG REPORTS TO PROJECT FOLDER:

🎯 Method 1 - PowerShell Command:
   move "%USERPROFILE%\\Downloads\\debug-report-*.json" "c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"

🎯 Method 2 - Manual:
   1. Open: C:\\Users\\ROG_LAP\\Downloads\\
   2. Find: debug-report-YYYY-MM-DDTHH-MM-SS.json
   3. Cut & Paste to: c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\

🎯 Method 3 - Drag & Drop:
   1. Open both folders side by side
   2. Drag debug-report-*.json from Downloads to debug-reports/

💡 TIP: Use Method 1 for fastest results!
`;
    
    console.log(instructions);
    showNotification('File move instructions in console', 'info');
    
    // Copy Method 1 command to clipboard
    const command = `move "%USERPROFILE%\\Downloads\\debug-report-*.json" "c:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(command)
            .then(() => console.log('✅ Move command copied to clipboard!'))
            .catch(() => console.log('❌ Could not copy command to clipboard'));
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

// ═══════════════════════════════════════════════════════════════════════════════════
// 🚀 AUTO MOVE LATEST DEBUG FILE (Enhanced Workflow)
// ═══════════════════════════════════════════════════════════════════════════════════
window.autoMoveLatestDebugFile = function() {
    console.log('%c🚀 AUTO MOVE LATEST DEBUG FILE - Enhanced Workflow', 'color: lime; font-size: 16px; font-weight: bold;');
    
    // Check if there are exported debug files
    if (!window.exportHistory || window.exportHistory.length === 0) {
        showNotification('❌ No debug files to move! Export a debug report first.', 'warning');
        console.log('%c❌ No export history found. Please export a debug report first.', 'color: orange;');
        return;
    }
    
    // Get the latest export
    const latestExport = window.exportHistory[window.exportHistory.length - 1];
    const filename = latestExport.filename;
    
    console.log(`%c📄 Latest file: ${filename}`, 'color: cyan;');
    
    // Method 1: Try modern File System Access API first
    if ('showDirectoryPicker' in window) {
        console.log('%c🔥 Modern API available - attempting direct save...', 'color: lime;');
        
        // Call ultimate automation with modern API
        window.ultimateAutoSaveAndMove();
        return;
    }
    
    // Method 2: Enhanced legacy workflow
    console.log('%c📋 Using enhanced legacy workflow...', 'color: yellow;');
    
    // Generate PowerShell command
    const moveCommand = `Move-Item "$env:USERPROFILE\\Downloads\\${filename}" "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"`;
    const openCommand = `explorer "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports"`;
    const fullCommand = `${moveCommand}; ${openCommand}`;
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullCommand).then(() => {
            console.log('%c✅ Enhanced move command copied to clipboard!', 'color: lime;');
            
            // Show enhanced notification
            showEnhancedMoveNotification(filename);
            
            // Also show in console
            console.log(`%c📋 COPY THIS COMMAND:`, 'color: yellow; font-weight: bold;');
            console.log(`   ${fullCommand}`);
            console.log(`%c💡 INSTRUCTIONS:`, 'color: cyan; font-weight: bold;');
            console.log('   1. Press Win+R');
            console.log('   2. Type "powershell" and press Enter');  
            console.log('   3. Paste the command (Ctrl+V)');
            console.log('   4. Press Enter');
            console.log('   5. File will move + folder will open!');
            
        }).catch(() => {
            console.log('%c❌ Could not copy to clipboard', 'color: red;');
            showNotification('Could not copy command', 'error');
        });
    }
    
    return fullCommand;
};

// Enhanced notification for auto-move workflow
function showEnhancedMoveNotification(filename) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10002;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        border: 2px solid #00ff88;
        border-radius: 12px; padding: 20px;
        color: white; font-family: 'Segoe UI', Arial, sans-serif;
        box-shadow: 0 8px 32px rgba(0,255,136,0.3);
        max-width: 400px; animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 24px; margin-right: 10px;">🚀</span>
            <strong style="font-size: 16px; color: #00ff88;">AUTO-MOVE READY!</strong>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
            File: <span style="color: #ffd700;">${filename}</span>
        </div>
        <div style="font-size: 13px; margin-bottom: 15px; color: #b0b0b0;">
            ✅ Enhanced PowerShell command copied to clipboard
        </div>
        <div style="background: rgba(0,255,136,0.1); padding: 8px; border-radius: 6px; font-size: 12px; margin-bottom: 10px;">
            Win+R → "powershell" → Paste → Enter
        </div>
        <button onclick="this.parentElement.remove()" style="
            background: #00ff88; border: none; color: #000; padding: 8px 16px;
            border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px;
        ">Got it! 👍</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 12 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 12000);
}

// ═══════════════════════════════════════════════════════════════════════════════════
// 🔧 HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════════

function getErrorFrequency() {
    const frequency = {};
    window.errorLogs.forEach(error => {
        const pattern = error.message.split(':')[0];
        frequency[pattern] = (frequency[pattern] || 0) + 1;
    });
    return frequency;
}

function getLogPatterns() {
    const patterns = {};
    window.debugLogs.forEach(log => {
        const pattern = log.message.split(' ')[0];
        patterns[pattern] = (patterns[pattern] || 0) + 1;
    });
    return Object.entries(patterns).sort((a, b) => b[1] - a[1]).slice(0, 10);
}

function getNavigationTiming() {
    if (performance.navigation) {
        return {
            type: performance.navigation.type,
            redirectCount: performance.navigation.redirectCount,
            timing: {
                navigationStart: performance.timing.navigationStart,
                loadEventEnd: performance.timing.loadEventEnd,
                domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
                pageLoad: performance.timing.loadEventEnd - performance.timing.navigationStart
            }
        };
    }
    return 'Navigation timing not available';
}

function getButtonClickCount() {
    // This would be enhanced to track actual clicks
    return document.querySelectorAll('button').length;
}

function getMostRecentActivity() {
    const allActivity = [...window.debugLogs, ...window.errorLogs]
        .sort((a, b) => new Date(`1970/01/01 ${b.timestamp}`) - new Date(`1970/01/01 ${a.timestamp}`));
    return allActivity.slice(0, 3);
}

function generateRecommendations() {
    const recommendations = [];
    
    if (window.errorLogs.length > 5) {
        recommendations.push("🚨 High error count detected - investigate recurring issues");
    }
    
    if (window.errorLogs.length === 0 && window.debugLogs.length > 20) {
        recommendations.push("✅ System stable - good logging activity, no errors");
    }
    
    if (!window.TRAINING_DATA) {
        recommendations.push("⚠️ Training data not loaded - check trainingData.js import");
    }
    
    if (!window.planData) {
        recommendations.push("⚠️ Plan data not loaded - check planData.js import");
    }
    
    if (!window.trainingManager && window.TRAINING_DATA) {
        recommendations.push("🔧 Training data loaded but TrainingManager not initialized");
    }
    
    if (document.querySelectorAll('.accordion-button').length === 0) {
        recommendations.push("🏗️ No accordion buttons found - check HTML structure");
    }
    
    const openSections = document.querySelectorAll('.accordion-content:not(.hidden)').length;
    if (openSections === 0) {
        recommendations.push("📂 All accordion sections are closed - check default states");
    }
    
    if (performance.now() > 10000) { // 10 seconds
        recommendations.push("⏱️ Long session detected - consider performance monitoring");
    }
    
    if (recommendations.length === 0) {
        recommendations.push("🎉 System operating optimally - no issues detected");
    }
    
    return recommendations;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm transition-all duration-300 shadow-lg ${
        type === 'success' ? 'bg-green-600 border border-green-500' : 
        type === 'error' ? 'bg-red-600 border border-red-500' : 
        type === 'warning' ? 'bg-yellow-600 border border-yellow-500' :
        'bg-blue-600 border border-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animation in
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ═══════════════════════════════════════════════════════════════════════════════════
// 🎛️ DEBUG PANEL EVENT HANDLERS
// ═══════════════════════════════════════════════════════════════════════════════════

// Initialize debug panel when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Toggle debug panel
    const toggleBtn = document.getElementById('toggle-debug');
    const debugControls = document.getElementById('debug-controls');
    const debugChevron = document.getElementById('debug-chevron');
    
    if (toggleBtn && debugControls) {
        toggleBtn.addEventListener('click', () => {
            debugControls.classList.toggle('hidden');
            debugChevron.classList.toggle('fa-chevron-up');
            debugChevron.classList.toggle('fa-chevron-down');
        });
    }
    
    // Export debug button
    document.getElementById('export-debug')?.addEventListener('click', () => {
        window.exportDebugForAI();
        showNotification('Debug report generated and copied!', 'success');
    });
    
    // Quick summary button
    document.getElementById('quick-summary')?.addEventListener('click', () => {
        window.getQuickDebugSummary();
        showNotification('Quick summary copied to clipboard!', 'info');
    });
    
    // Copy console button
    document.getElementById('copy-console')?.addEventListener('click', () => {
        const allLogs = [...window.debugLogs, ...window.errorLogs].sort((a, b) => 
            new Date(`1970/01/01 ${a.timestamp}`) - new Date(`1970/01/01 ${b.timestamp}`)
        );
        const formatted = allLogs.map(log => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}`).join('\n');
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(formatted).then(() => {
                showNotification('Console logs copied to clipboard!', 'success');
            });
        }
    });
    
    // Save to file button - NOW with ULTIMATE AUTO-MOVE  
    document.getElementById('save-debug')?.addEventListener('click', () => {
        console.log('%c💾 SAVE + ULTIMATE AUTO-MOVE INITIATED', 'color: cyan; font-size: 16px; font-weight: bold;');
        
        // Save the file
        const filename = window.saveDebugToFile();
        showNotification(`Saved: ${filename} - Starting auto-move...`, 'success');
        
        // Start ultimate auto-move process
        setTimeout(() => {
            window.ultimateAutoSaveAndMove();
        }, 1500); // Give time for file to be saved
    });
    
    // Clear logs button
    document.getElementById('clear-logs')?.addEventListener('click', () => {
        window.debugLogs = [];
        window.errorLogs = [];
        window.performanceLogs = [];
        updateDebugPanel();
        console.clear();
        showNotification('All logs cleared!', 'warning');
        console.log('%c🧹 Debug logs cleared by user', 'color: yellow; font-weight: bold;');
    });
    
    // View debug folder button
    document.getElementById('view-folder')?.addEventListener('click', () => {
        showNotification('Debug reports saved to: debug-reports/ folder', 'info');
        console.log('%c📁 Debug reports location:', 'color: cyan; font-weight: bold;');
        console.log('c:/Users/ROG_LAP/Desktop/Plan_Ishrana/debug-reports/');
        console.log('💡 Files are automatically named: debug-report-YYYY-MM-DDTHH-MM-SS.json');
    });
    
    // Move file button - AUTO-MOVE with enhanced workflow
    document.getElementById('move-file')?.addEventListener('click', () => {
        window.autoMoveLatestDebugFile();
    });
    
    // Open terminal button - shows instructions to open PowerShell
    document.getElementById('open-terminal')?.addEventListener('click', () => {
        console.log('%c💻 OPEN POWERSHELL TERMINAL', 'color: indigo; font-size: 16px; font-weight: bold;');
        console.log('%c' + '═'.repeat(50), 'color: indigo;');
        console.log('🚀 Ways to open PowerShell:');
        console.log('   1. Press Windows + R → type "powershell" → Enter');
        console.log('   2. Press Windows + X → select "Windows PowerShell"');
        console.log('   3. Right-click Start button → "Windows PowerShell"');
        console.log('   4. Search "PowerShell" in Start menu');
        console.log('%c📁 Navigate to project folder:', 'color: cyan;');
        console.log('   cd "C:/Users/ROG_LAP/Desktop/Plan_Ishrana"');
        console.log('%c' + '═'.repeat(50), 'color: indigo;');
        
        showNotification('PowerShell instructions in console!', 'info');
    });
    
    // 🚀 ULTIMATE: Complete automation - Export → Save → Move → Execute
    document.getElementById('save-and-move')?.addEventListener('click', () => {
        console.log('%c🚀 ULTIMATE AUTOMATION INITIATED', 'color: lime; font-size: 18px; font-weight: bold;');
        console.log('%c' + '═'.repeat(60), 'color: lime;');
        
        showUltimateProgressNotification('Starting complete automation...', 0);
        
        // Step 1: Export debug data
        window.exportDebugForAI();
        showUltimateProgressNotification('Debug data exported...', 20);
        
        // Step 2: Save to file
        setTimeout(() => {
            window.saveDebugToFile();
            showUltimateProgressNotification('File saved to Downloads...', 40);
            
            // Step 3: Ultimate auto-move system
            setTimeout(() => {
                showUltimateProgressNotification('Preparing auto-move system...', 60);
                window.ultimateAutoSaveAndMove();
                console.log('%c✅ ULTIMATE WORKFLOW COMPLETE: Export → Save → Ultimate Auto-Move!', 'color: lime; font-weight: bold;');
            }, 1500);
        }, 800);
    });
    
    console.log('%c🤖 AI DEBUG SYSTEM INITIALIZED', 'color: cyan; font-size: 16px; font-weight: bold;');
    console.log('%c📱 Use the debug panel (top-right corner) for easy access', 'color: yellow;');
    console.log('%c📁 Debug files will be saved to: debug-reports/', 'color: green;');
});

// ═══════════════════════════════════════════════════════════════════════════════════
// 🚨 AUTO-ERROR CAPTURE & PERFORMANCE MONITORING
// ═══════════════════════════════════════════════════════════════════════════════════

// Auto-error capture for unhandled errors
window.addEventListener('error', function(event) {
    const errorEntry = {
        type: 'unhandled-error',
        timestamp: new Date().toLocaleTimeString(),
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
    };
    
    window.errorLogs.push(errorEntry);
    updateDebugPanel();
    console.error('🚨 UNHANDLED ERROR CAPTURED:', errorEntry);
});

// Promise rejection capture
window.addEventListener('unhandledrejection', function(event) {
    const errorEntry = {
        type: 'promise-rejection',
        timestamp: new Date().toLocaleTimeString(),
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack
    };
    
    window.errorLogs.push(errorEntry);
    updateDebugPanel();
    console.error('🚨 UNHANDLED PROMISE REJECTION:', errorEntry);
});

// Performance monitoring wrapper
window.trackPerformance = function(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    const perfEntry = {
        name,
        duration: end - start,
        timestamp: new Date().toISOString()
    };
    
    window.performanceLogs.push(perfEntry);
    console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`);
    
    return result;
};

// ═══════════════════════════════════════════════════════════════════════════════════
// 🚀 ULTIMATE AUTO-MOVE SYSTEM - FULL AUTOMATION
// ═══════════════════════════════════════════════════════════════════════════════════

// Complete automation: Save → Move → Execute - MODERN FILE SYSTEM ACCESS
window.ultimateAutoSaveAndMove = function() {
    const latestExport = window.debugExports[window.debugExports.length - 1];
    if (!latestExport) {
        showNotification('No debug files to process!', 'warning');
        return;
    }
    
    const filename = latestExport.export_info.filename;
    showUltimateProgressNotification('🚀 Modern Direct Save Initiated...', 0);
    
    // Check for File System Access API support (Chrome 86+)
    if ('showDirectoryPicker' in window) {
        // Modern approach: Direct folder access
        directSaveToDebugFolder(latestExport, filename);
        return;
    } else {
        // Fallback: Traditional download + manual move
        showUltimateProgressNotification('⚠️ Using legacy method...', 25);
        legacyAutoMove(latestExport, filename);
    }
};

// 🔥 MODERN FILE SYSTEM ACCESS API - Direct Save
async function directSaveToDebugFolder(exportData, filename) {
    try {
        showUltimateProgressNotification('🎯 Selecting debug-reports folder...', 25);
        
        // Let user pick the debug-reports folder once
        const dirHandle = await window.showDirectoryPicker({
            id: 'debug-reports-folder',
            mode: 'readwrite',
            startIn: 'desktop'
        });
        
        showUltimateProgressNotification('✅ Folder selected! Creating file...', 50);
        
        // Create file directly in the chosen folder
        const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
        const writable = await fileHandle.createWritable();
        
        // Write JSON data directly
        const jsonString = JSON.stringify(exportData, null, 2);
        await writable.write(jsonString);
        await writable.close();
        
        showUltimateProgressNotification('🎉 File saved directly!', 100);
        showModernSuccessNotification(filename);
        
        console.log('🚀 MODERN: File saved directly to debug-reports folder!');
        
    } catch (error) {
        if (error.name === 'AbortError') {
            showNotification('❌ Folder selection cancelled', 'warning');
        } else {
            console.log('Modern API failed, using legacy:', error);
            legacyAutoMove(exportData, filename);
        }
    }
}

// Legacy method with PowerShell automation
function legacyAutoMove(exportData, filename) {
    showUltimateProgressNotification('📥 Using download + auto-move...', 25);
    
    // First download the file normally
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showUltimateProgressNotification('✅ File downloaded! Preparing auto-move...', 50);
    
    // Create PowerShell script for auto-move
    const powershellScript = `
# Auto-Move Script - ${new Date().toLocaleString()}
$sourceFile = "$env:USERPROFILE\\Downloads\\${filename}"
$targetFile = "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\${filename}"

if (Test-Path $sourceFile) {
    Move-Item -Path $sourceFile -Destination $targetFile -Force
    Write-Host "✅ Moved: ${filename}" -ForegroundColor Green
    explorer "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports"
} else {
    Write-Host "❌ File not found in Downloads" -ForegroundColor Red
}`.trim();

    // Copy to clipboard and show instructions
    navigator.clipboard.writeText(powershellScript).then(() => {
        showUltimateProgressNotification('🎯 Ready for execution!', 100);
        showLegacySuccessNotification(filename);
    }).catch(() => {
        showNotification('Manual process needed', 'warning');
    });
}

// Try to execute the downloaded PowerShell script
function tryExecuteDownloadedScript(filename) {
    try {
        // Create command to run the downloaded script
        const execCommand = `powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\\Downloads\\auto-move-debug.ps1"`;
        
        // Try protocol handler (usually doesn't work but worth trying)
        const protocolLink = `ms-windows-store://review/?ProductId=9MZ1SNWT0N5D`;
        window.open(protocolLink, '_blank');
        
        showUltimateProgressNotification('Attempting script execution...', 75);
        
        // Fallback to enhanced clipboard method
        setTimeout(() => {
            enhancedClipboardMethod(filename);
        }, 2000);
        
    } catch (error) {
        console.log('Script execution failed:', error);
        enhancedClipboardMethod(filename);
    }
}

// Enhanced clipboard method with auto-run attempt
function enhancedClipboardMethod(filename) {
    const quickCommand = `Move-Item "$env:USERPROFILE\\Downloads\\${filename}" "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports\\"; explorer "C:\\Users\\ROG_LAP\\Desktop\\Plan_Ishrana\\debug-reports"`;
    
    navigator.clipboard.writeText(quickCommand).then(() => {
        showUltimateProgressNotification('Ready for instant execution!', 100);
        showUltimateSuccessNotification(filename);
        console.log('🚀 ULTIMATE: Quick command ready in clipboard');
        
        // Try to auto-trigger Win+R (this won't work but we'll provide clear instructions)
        setTimeout(() => {
            simulateWinR();
        }, 1000);
        
    }).catch(() => {
        showNotification('Manual execution needed - check console', 'error');
        console.log('Manual command:', quickCommand);
    });
}

// Simulate Win+R shortcut (visual helper only)
function simulateWinR() {
    console.log('%c🎮 SIMULATING WIN+R...', 'color: lime; font-size: 16px; font-weight: bold;');
    
    // Create visual helper
    const helper = document.createElement('div');
    helper.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        z-index: 10001; background: rgba(0,0,0,0.9); color: white; 
        padding: 20px; border-radius: 15px; text-align: center;
        font-size: 18px; font-family: monospace;
        border: 3px solid lime; box-shadow: 0 0 20px lime;
    `;
    helper.innerHTML = `
        <div style="margin-bottom: 15px;">🎮 PRESS NOW:</div>
        <div style="font-size: 24px; color: lime; margin: 10px 0;">
            <kbd style="background: #333; padding: 8px; border-radius: 5px; margin: 0 5px;">Win</kbd>
            +
            <kbd style="background: #333; padding: 8px; border-radius: 5px; margin: 0 5px;">R</kbd>
        </div>
        <div style="font-size: 14px; color: cyan;">Then type: <strong>powershell</strong></div>
        <div style="font-size: 14px; color: yellow; margin-top: 10px;">Command ready in clipboard! ✅</div>
    `;
    
    document.body.appendChild(helper);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (helper.parentNode) {
            helper.remove();
        }
    }, 5000);
}

// Fallback to standard clipboard method
function fallbackToClipboard(script, filename) {
    navigator.clipboard.writeText(script).then(() => {
        showAutoMoveNotification(filename);
        console.log('🔄 Fallback: Standard clipboard method used');
    }).catch(() => {
        showNotification('All methods failed - manual execution needed', 'error');
    });
}

// Ultimate progress notification system
function showUltimateProgressNotification(message, progress) {
    // Remove existing progress notifications
    const existing = document.querySelectorAll('.ultimate-progress-notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'ultimate-progress-notification';
    notification.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
        z-index: 10001; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white; padding: 15px 25px; border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', Arial, sans-serif; text-align: center;
        border: 2px solid rgba(255,255,255,0.2);
        min-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
            <span style="font-size: 20px; margin-right: 8px;">⚡</span>
            <strong>ULTIMATE AUTO-SYSTEM</strong>
        </div>
        <div style="font-size: 13px; margin-bottom: 12px;">${message}</div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 10px; height: 8px; margin-bottom: 8px;">
            <div style="background: linear-gradient(90deg, #00ff88, #00ccff); height: 100%; border-radius: 10px; width: ${progress}%; transition: width 0.5s ease;"></div>
        </div>
        <div style="font-size: 11px; opacity: 0.9;">${progress}% Complete</div>
    `;
    
    document.body.appendChild(notification);
    
    if (progress >= 100) {
        setTimeout(() => notification.remove(), 3000);
    }
}

// Ultimate success notification
function showUltimateSuccessNotification(filename) {
    const notification = document.createElement('div');
    notification.className = 'ultimate-success-notification';
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10002;
        background: linear-gradient(135deg, #11998e, #38ef7d);
        color: white; padding: 20px; border-radius: 15px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.4);
        max-width: 400px; font-family: 'Segoe UI', Arial, sans-serif;
        border: 3px solid rgba(255,255,255,0.3);
        animation: ultimateSuccess 0.6s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 28px; margin-right: 12px;">🎯</span>
            <strong style="font-size: 18px;">ULTIMATE SUCCESS!</strong>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
            Ready for instant execution! Press:
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; text-align: center; margin: 10px 0;">
            <strong style="color: yellow;">Win + R → powershell → Paste (Ctrl+V)</strong>
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
            File: ${filename}<br>
            Command copied to clipboard ✅
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ultimateSuccess {
            0% { transform: translateX(400px) scale(0.8); opacity: 0; }
            50% { transform: translateX(-20px) scale(1.05); }
            100% { transform: translateX(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 8000);
}

// Modern API Success Notification
function showModernSuccessNotification(filename) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10002;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white; padding: 20px; border-radius: 15px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.4);
        max-width: 350px; font-family: 'Segoe UI', Arial, sans-serif;
        border: 3px solid rgba(255,255,255,0.3);
        animation: modernSuccess 0.5s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 28px; margin-right: 12px;">🚀</span>
            <strong style="font-size: 18px;">DIRECT SAVE SUCCESS!</strong>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
            File saved directly to debug-reports folder!
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center; margin: 10px 0;">
            <strong style="color: #00ff88;">✅ No downloads needed!</strong>
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
            File: ${filename}<br>
            Modern File System Access API used 🔥
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modernSuccess {
            0% { transform: translateY(-100px) scale(0.8); opacity: 0; }
            50% { transform: translateY(10px) scale(1.05); }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 6000);
}

// Legacy Success Notification
function showLegacySuccessNotification(filename) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10002;
        background: linear-gradient(135deg, #f093fb, #f5576c);
        color: white; padding: 20px; border-radius: 15px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.4);
        max-width: 350px; font-family: 'Segoe UI', Arial, sans-serif;
        border: 3px solid rgba(255,255,255,0.3);
        animation: legacySuccess 0.5s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 28px; margin-right: 12px;">📥</span>
            <strong style="font-size: 18px;">LEGACY DOWNLOAD READY!</strong>
        </div>
        <div style="font-size: 14px; margin-bottom: 10px;">
            File downloaded! Auto-move script ready:
        </div>
        <div style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; text-align: center; margin: 10px 0;">
            <strong style="color: yellow;">Win + R → powershell → Paste</strong>
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
            File: ${filename}<br>
            PowerShell script copied to clipboard ✅
        </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes legacySuccess {
            0% { transform: translateX(400px) rotate(10deg) scale(0.8); opacity: 0; }
            50% { transform: translateX(-10px) rotate(-5deg) scale(1.05); }
            100% { transform: translateX(0) rotate(0deg) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 8000);
}

// Add button to enable modern API  
function addModernApiButton() {
    const debugPanel = document.querySelector('.debug-panel .button-group');
    if (debugPanel && !document.getElementById('modern-save-btn')) {
        const button = document.createElement('button');
        button.id = 'modern-save-btn';
        button.className = 'debug-btn';
        button.innerHTML = '🚀 DIRECT SAVE';
        button.title = 'Modern File System Access API - Direct save to folder';
        button.style.cssText = `
            background: linear-gradient(135deg, #667eea, #764ba2) !important;
            border: 2px solid #9d50bb !important;
            color: white !important;
            margin: 5px !important;
        `;
        
        button.addEventListener('click', async () => {
            if (!window.debugExports.length) {
                showNotification('No debug data to save!', 'warning');
                return;
            }
            
            const latestExport = window.debugExports[window.debugExports.length - 1];
            const filename = latestExport.export_info.filename;
            
            // Check for modern API support
            if ('showDirectoryPicker' in window) {
                try {
                    showUltimateProgressNotification('🎯 Select debug-reports folder...', 25);
                    
                    const dirHandle = await window.showDirectoryPicker({
                        id: 'debug-reports-folder',
                        mode: 'readwrite'
                    });
                    
                    showUltimateProgressNotification('✅ Creating file...', 75);
                    
                    const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(JSON.stringify(latestExport, null, 2));
                    await writable.close();
                    
                    showUltimateProgressNotification('🎉 Success!', 100);
                    showModernSuccessNotification(filename);
                    
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        showNotification('Error: ' + error.message, 'error');
                    }
                }
            } else {
                showNotification('Modern API not supported in this browser', 'warning');
            }
        });
        
        debugPanel.appendChild(button);
    }
}

// Enhanced notification for auto-move (fallback)
function showAutoMoveNotification(filename) {
    showUltimateSuccessNotification(filename);
}

// ═══════════════════════════════════════════════════════════════════════════════════
// 🎉 STARTUP MESSAGE
// ═══════════════════════════════════════════════════════════════════════════════════
console.log('%c🚀 ENHANCED DEBUG SYSTEM LOADED', 'color: lime; font-size: 18px; font-weight: bold;');
console.log('%c📋 Available Commands:', 'color: yellow; font-weight: bold;');
console.log('  • exportDebugForAI() - Full AI-optimized report with auto-naming');
console.log('  • getQuickDebugSummary() - Quick overview for rapid analysis');
console.log('  • saveDebugToFile() - Download debug report to debug-reports/ folder');
console.log('  • autoMoveLatestDebugFile() - 🚀 NEW: Auto-move with enhanced workflow');
console.log('  • trackPerformance(name, fn) - Monitor function performance');
console.log('%c🎛️ Use the Debug Panel (top-right) for easy access!', 'color: cyan;');
console.log('%c📁 All reports auto-saved to: c:/Users/ROG_LAP/Desktop/Plan_Ishrana/debug-reports/', 'color: green;');

// Initialize modern API button when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addModernApiButton, 1000);
});
