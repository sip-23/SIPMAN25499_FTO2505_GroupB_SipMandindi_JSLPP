import { initialTasks } from '../../fetchdataApi.js';
import { showSortedTasks } from './rendorTask.js';
import { saveTask } from '../utils/localStorage.js';
import { showAdditionConfirmationDialog } from './confirmDialogs.js';

const modal = document.getElementById('task-modal');
const editModal = document.getElementById('edit-task-modal');
const taskIdInput = document.getElementById('task-id');
const editTaskTitleInput = document.getElementById('edit-task-title');
const editTaskDescInput = document.getElementById('edit-task-description');
const editTaskStatusInput = document.getElementById('edit-task-status');
const editTaskPriorityInput = document.getElementById('edit-task-priority');

// Current task that I want to show
let currentTask = null;

/**
 * Function to open modal with task data
 * Matches the Id of the selected task provides the information in the modal.
 * @param {number} taskId - Is the ID of the selected
 * @returns A modal that is populated with the informtion that the corresponds to the matched ID
 */
export function openEditModal(taskId) {
    currentTask = initialTasks.find(task => task.id === taskId);
    
    if (!currentTask) return;
  
    // populate the modal with task data that was salected
    taskIdInput.value = currentTask.id;
    editTaskTitleInput.value = currentTask.title;
    editTaskDescInput.value = currentTask.description;
    editTaskStatusInput.value = currentTask.status;
    editTaskPriorityInput.value = currentTask.priority;
  
    // Show the modal
    editModal.classList.remove('hidden');
}


/**
 * Function to close modal
 * Closes the task modal and resets the current task variable declared
 * Add the Hidden class to allow the modal to dissapear once it is closed
 */
export function closeModal() {
    modal.classList.add('hidden');
    editModal.classList.add('hidden');
    currentTask = null;
}


/**
 * Function to Save task changes
 * This allos changes to be made in modal to be savd
 * @param {Event} e - Is the submit event from the form before
 * @returns 
 */
export function saveTaskChanges(e) {
    e.preventDefault();
    
    if (!currentTask) return;
  
    // Update task object
    currentTask.title = editTaskTitleInput.value;
    currentTask.description = editTaskDescInput.value;
    currentTask.status = editTaskStatusInput.value;
    currentTask.priority = editTaskPriorityInput.value;
    
    // Refresh display
    // Refreshes the display and closes the modal
    saveTask();
    closeModal();
    showAdditionConfirmationDialog();
    showSortedTasks();
}

export function getCurrentTask() {
    return currentTask;
}