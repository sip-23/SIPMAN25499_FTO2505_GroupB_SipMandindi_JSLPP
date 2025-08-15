import { initialTasks } from '../../fetchdataApi.js';
import { saveTask } from '../utils/localStorage.js';
import { showAdditionConfirmationDialog } from '../ui/confirmDialogs.js';
import { showSortedTasks } from '../ui/rendorTask.js';
import { closeModal } from '../ui/modalHandlers.js';

const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-description');
const taskStatusInput = document.getElementById('task-status');
const taskPriorityInput = document.getElementById('task-priority');

/**
 * Function to add new dask from the modal
 * save new task
 * This allows changes to be made in modal to be save
 * @param {Event} e - Is the submit event from the form
 * @returns {Boolean} True
 */
export function addTasksubmit(e) {
    e.preventDefault();

    if(validateInputs()){
        closeModal();
        showAdditionConfirmationDialog();
        showSortedTasks();
    }
    
};

const setError = (element, message) => {
    const errorDisplay = document.getElementById(`${element.id}-error`);

    if (errorDisplay) {
        errorDisplay.innerText = message;
        errorDisplay.classList.remove('hidden');
        element.classList.add('border-red-500');
        element.classList.remove('border-gray-300');
    }
    
};

// Creating a cussess
const setSuccess = (element) => {
    const errorDisplay = document.getElementById(`${element.id}-error`);
    
    if(errorDisplay){
        errorDisplay.innerText = '';
        errorDisplay.classList.add('hidden');
        element.classList.remove('border-red-500');
        element.classList.add('border-gray-300');
    }
};

// Validating inputs
const validateInputs = () => {
    const taskTitleInputValue = taskTitleInput.value.trim();
    const taskDescInputValue = taskDescInput.value.trim();
    const taskStatusInputValue = taskStatusInput.value;
    const taskPriorityInputValue = taskPriorityInput.value;

    let isValid = true;

    if(!taskTitleInputValue) {
        setError(taskTitleInput, "Please fill out this field.");
        isValid = false;
    } else {
        setSuccess(taskTitleInput);
    }

    if(!taskDescInputValue) {
        setError(taskDescInput, "Please fill out this field.");
        isValid = false;
    } else {
        setSuccess(taskDescInput);
    }

    if(!taskStatusInputValue) {
        setError(taskStatusInput, "INVALID STATUS! Please enter only: todo, doing, or done");
        isValid = false;
    } else {
        setSuccess(taskStatusInput);
    }

    if(!taskPriorityInputValue) {
        setError(taskPriorityInput, "INVALID STATUS! Please enter only: todo, doing, or done");
        isValid = false;
    } else {
        setSuccess(taskPriorityInput);
    }


    // Store task details in object
    if(isValid) {
        const output = {
            id: initialTasks.length + 1,
            title: taskTitleInputValue,
            description: taskDescInputValue,
            status: taskStatusInputValue,
            priority: taskPriorityInputValue
        };
        
        // Add task to the existing array
        initialTasks.push(output);
        
        saveTask();

        taskForm.reset();
        return true
    }

    return false;
};

export function openModel() {
    taskTitleInput.value = '';
    taskDescInput.value = '';
    taskStatusInput.value = 'todo';
    taskPriorityInput.value = 'low';
    document.getElementById('task-modal').classList.remove('hidden');
}