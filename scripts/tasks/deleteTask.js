import { initialTasks } from '../utils/fetchdataApi.js';
import { saveTask } from '../utils/localStorage.js';
import { showSortedTasks } from '../ui/rendorTask.js';
import { closeModal } from '../ui/modalHandlers.js';


/**
 * Function to delete task from local storage 
 * */ 
export function deleteTask(taskId) {
    const taskIndex = initialTasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        initialTasks.splice(taskIndex, 1);
        saveTask();
        showSortedTasks();
    }
    closeModal();
}


// Function to open modal with task data
/**
 * Matches the Id of the selected task provides the information in the modal.
 * @param {Event} e - Is the submit event from the form
 * @returns A modal that is populated with the informtion that the corresponds to the matched ID
 */
export function deleteTaskConfirm(e) {
    e.preventDefault();
    showDeleteConfirmationDialog();
}