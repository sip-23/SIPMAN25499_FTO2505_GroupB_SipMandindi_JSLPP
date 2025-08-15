import { openEditModal, closeModal, saveTaskChanges } from '../ui/modalHandlers.js';
import { addTasksubmit, openModel } from '../tasks/addNewTask.js';
import { deleteTaskConfirm } from '../tasks/deleteTask.js';
import { deleteConfirmed, deleteCanceled, additionConfirmedCloseDialog } from '../ui/confirmDialogs.js';
import { hideSidebarVisability, showSidebarVisability, showSidebarVisabilityMobile, hideSidebarVisabilityMobile } from '../ui/sideBarInteractions.js';

const todoTasks = document.getElementById('todo-tasks');
const doingTasks = document.getElementById('doing-tasks');
const doneTasks = document.getElementById('done-tasks');
const addTask = document.getElementById('addTaskButton');
const cancelBtn = document.getElementById('cancel-btn');
const editCancelBtn = document.getElementById('edit-cancel-btn');
const updateTaskBtn = document.getElementById('saveChangesBtn');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
const modal = document.getElementById('task-modal');
const editModal = document.getElementById('edit-task-modal');
const taskForm = document.getElementById('task-form');
const delConfirmBtn = document.getElementById('delete-confirmed');
const delCancelBtn = document.getElementById('delete-canceled');
const additionConfirmedBtn = document.getElementById('addition-confirmed');
const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
const closeMobileSidebarBtn = document.getElementById('closeMobileSidebarBtn');
const hideSidebarBtn = document.getElementById('hideSidebar');
const showSidebarBtn = document.getElementById('showSidebar');


/**
 * Event Listeners Sets up event listener for the selected task that is triggered by a click
 * This will also open the edit model.
 * 
 */
export function setupEventListeners() {
    // Event delegation for task clicks
    // Sets up click handlers for task items using event delegation
    // Adds modal control handlers (cancel button, outside click, ESC key)
    // Sets up form submission handler
    [todoTasks, doingTasks, doneTasks].forEach(column => {
        column.addEventListener('click', (e) => {
            const taskElement = e.target.closest('.task');
            if (taskElement) {
                const taskId = parseInt(taskElement.dataset.id);
                openEditModal(taskId);
            }
        });
    });

    // Open modal once add new button is clicked
    addTask.addEventListener('click', openModel);
    taskForm.addEventListener('submit', addTasksubmit);

    // Modal close and opening event listeners
    cancelBtn.addEventListener('click', closeModal);
    editCancelBtn.addEventListener('click', closeModal);
    updateTaskBtn.addEventListener('click', saveTaskChanges);
    deleteTaskBtn.addEventListener('click', deleteTaskConfirm);
    delConfirmBtn.addEventListener("click", deleteConfirmed);
    delCancelBtn.addEventListener("click", deleteCanceled);
    additionConfirmedBtn.addEventListener("click", additionConfirmedCloseDialog);


    // Close modal when clicking on the ouside of it
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close modal when clicking on the ouside of it
    editModal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
  
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    hideSidebarBtn.addEventListener('click', hideSidebarVisability);
    showSidebarBtn.addEventListener('click', showSidebarVisability);
    mobileSidebarBtn.addEventListener('click', showSidebarVisabilityMobile);
    closeMobileSidebarBtn.addEventListener('click', hideSidebarVisabilityMobile);
}