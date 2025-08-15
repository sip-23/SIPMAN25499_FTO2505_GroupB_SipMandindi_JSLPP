import { deleteTask } from '../tasks/deleteTask.js';
import { getCurrentTask } from './modalHandlers.js';

const deleteConfirmation = document.getElementById('confirm');
const delConfirmBtn = document.getElementById('delete-confirmed');
const delCancelBtn = document.getElementById('delete-canceled');
const addTaskConfirmDiag = document.getElementById('confirm-addition');
const additionConfirmedBtn = document.getElementById('addition-confirmed');

// Delete confirmation functions
export function showDeleteConfirmationDialog() {
    deleteConfirmation.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

export function showAdditionConfirmationDialog(){
    addTaskConfirmDiag.classList.remove('hidden');
}

export function deleteConfirmed(){
    deleteConfirmation.classList.add('hidden');
    document.body.style.overflow = '';
    const currentTask = getCurrentTask();
    if (currentTask) {
        deleteTask(currentTask.id);
    }
    
}

export function deleteCanceled(){
    deleteConfirmation.classList.add('hidden');
}

export function additionConfirmedCloseDialog(){
    addTaskConfirmDiag.classList.add('hidden');
}