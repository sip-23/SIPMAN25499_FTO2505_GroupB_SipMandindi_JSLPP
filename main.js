import { showSortedTasks } from '../ui/rendorTask.js';
import { checkSidebarState } from '../ui/sidebarInteractions.js';
import { setupEventListeners } from './eventListeners.js';
import { setupThemeToggle } from '../ui/themeToggle.js';

// Initialize the board initially there was 8 now there will be 6
/**
 * init function is the main functon that has mor functions within the function
 */
export function init() {
    showSortedTasks();
    checkSidebarState();
    setupEventListeners();
    setupThemeToggle();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);