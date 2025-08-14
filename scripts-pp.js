// import { initialTasks } from "./initialData.js";


const initialTasks = JSON.parse(localStorage.getItem('initialTasks')) || [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
    priority: "medium",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
    priority: "low",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
    priority: "medium",
  },

  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
    priority: "low",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
    priority: "high",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
    priority: "high",
  },
];


const todoTasks = document.getElementById('todo-tasks');
const doingTasks = document.getElementById('doing-tasks');
const doneTasks = document.getElementById('done-tasks');
const modal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const cancelBtn = document.getElementById('cancel-btn');
const editModal = document.getElementById('edit-task-modal');
const editTaskForm = document.getElementById('edit-task-form');
const editCancelBtn = document.getElementById('edit-cancel-btn');
const addTask = document.getElementById('addTaskButton');
const toggle = document.getElementById("themeToggle");
const sidebar = document.querySelector('.sidebar');
const hideSidebarBtn = document.getElementById('hideSidebar');
const showSidebarBtn = document.getElementById('showSidebar');
const updateTaskBtn = document.getElementById('saveChangesBtn')
const mobileSidebar = document.getElementById('drawer');
const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');
const closeMobileSidebarBtn = document.getElementById('closeMobileSidebarBtn');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
const deleteConfirmation = document.getElementById('confirm');
const delConfirmBtn = document.getElementById('delete-confirmed');
const delCancelBtn = document.getElementById('delete-canceled');
const toggleSlider = document.getElementById('themeToggle');
const bod = document.documentElement;
const toggleSliderMobile = document.getElementById('themeToggle-mobile');

// Modal input fields that are stored and showed
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-description');
const taskStatusInput = document.getElementById('task-status');
const taskPriorityInput = document.getElementById('task-priority');
const editTaskTitleInput = document.getElementById('edit-task-title');
const editTaskDescInput = document.getElementById('edit-task-description');
const editTaskStatusInput = document.getElementById('edit-task-status');
const editTaskPriorityInput = document.getElementById('edit-task-priority');

// Current task that I want to show
let currentTask = null;

// Create task function - Element
/**
 * Creates the list element and its respective / relevent classes in the DOM.
 * @param {Object} task - The tasks which are stored in an array and declared as tasks
 * @returns {HTMLLIElement} - The created list item elements
 */
function createTaskElement(initialTasks) {
    const taskElementCreated = document.createElement("li"); // Creates an HTML list item element for a task


    if(initialTasks.priority === 'low') {
        taskElementCreated.className = 'task flex mt-4 py-5 px-3 mr-2 w-max-[320px] xl:w-[280px] h-[60px] bg-white dark:bg-[#2B2C37] dark:text-white rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] transition-all hover:shadow-md flex justify-between items-center';
        // Sets appropriate classes for styling and also creates a className for the new class
        taskElementCreated.innerHTML = `<h3 class="font-bold">${initialTasks.title}</h3><span class="flex justify-end inline h-[15px] w-[15px]">🟢</span>`;
        taskElementCreated.setAttribute('data-id', initialTasks.id);
    } else if (initialTasks.priority === 'medium') {
        taskElementCreated.className = 'task flex mt-4 py-5 px-3 mr-2 w-max-[320px] xl:w-[280px] h-[60px] bg-white dark:bg-[#2B2C37] dark:text-white rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] transition-all hover:shadow-md flex justify-between items-center';
        // Sets appropriate classes for styling and also creates a className for the new class
        taskElementCreated.innerHTML = `<h3 class="font-bold">${initialTasks.title} </h3><span class="flex justify-end inline h-[15px] w-[15px]">🟠</span>`;
        taskElementCreated.setAttribute('data-id', initialTasks.id);
    } else {
        taskElementCreated.className = 'task flex mt-4 py-5 px-3 mr-2 w-max-[320px] xl:w-[280px] h-[60px] bg-white dark:bg-[#2B2C37] dark:text-white rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)] transition-all hover:shadow-md flex justify-between items-center';
        // Sets appropriate classes for styling and also creates a className for the new class
        taskElementCreated.innerHTML = `<h3 class="font-bold">${initialTasks.title} </h3><span class="flex justify-end inline h-[15px] w-[15px]">🔴</span>`;
        taskElementCreated.setAttribute('data-id', initialTasks.id);
    }
    
    return taskElementCreated;
    // Returns the created DOM element
}

// Showing the task
// Implemented function to show all tasks once the script is running on the main section
/**
 * First cleans the HTML Elements and then Shows or Renders the tasks from the given array to the respactive columns in the DOM
 */
function showSortedTasks() {
    // Clear all columns
    todoTasks.innerHTML = '';
    doingTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    // Sort tasks into columns
    initialTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        
    
        switch(task.status) {
            case 'todo':
                todoTasks.appendChild(taskElement);
                break;   
            case 'doing':
                doingTasks.appendChild(taskElement);
                break;
            case 'done':
                doneTasks.appendChild(taskElement);
                break;
        }
    });

    updateTaskCounts();
}

// Update the task counts in each column header
/**
 * Selects the Element container with the specified id and select the last child of the target parent and gives it the value of length of the Elements in that column
 */
function updateTaskCounts() {
  // Updates the count numbers in each column header
  // selects the DOM at the attribute node and uses the property .textcontent to update / set it with the length of the children nodes/ elements
  document.querySelector('#todo-column span:last-child').textContent = `(${todoTasks.children.length})`; 
  document.querySelector('#doing-column span:last-child').textContent = `(${doingTasks.children.length})`;
  document.querySelector('#done-column span:last-child').textContent = `(${doneTasks.children.length})`;
}

// Function to open modal with task data
/**
 * Matches the Id of the selected task provides the information in the modal.
 * @param {number} taskId - Is the ID of the selected
 * @returns A modal that is populated with the informtion that the corresponds to the matched ID
 */
function openEditModal(taskId) {
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

// Function to open modal with task data
/**
 * Matches the Id of the selected task provides the information in the modal.
 * @returns A modal that is populated with the informtion that the corresponds to the matched ID
 */
function deleteTaskConfirm(e) {
    e.preventDefault();
    showDeleteConfirmationDialog();
}

// Delete confirmation functions
function showDeleteConfirmationDialog() {
    deleteConfirmation.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function deleteConfirmed(){
    deleteConfirmation.classList.add('hidden');
    document.body.style.overflow = '';
    deleteTask(currentTask.id);
}

function deleteCanceled(){
    deleteConfirmation.classList.add('hidden');
}

// function to add new dask from the modal
// save new task
/**
 * This allos changes to be made in modal to be savd
 * @param {Event} e - Is the submit event from the form
 * @returns 
 */
function addTasksubmit(e) {
    e.preventDefault();

    if(validateInputs()){
        closeModal();
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

// function to save task into local storage
function saveTask() {
    localStorage.setItem("initialTasks", JSON.stringify(initialTasks)); // convertd array into string version for local storgae to work with it
}

// Function to delete task from local storage
function deleteTask(taskId) {
    const taskIndex = initialTasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        initialTasks.splice(taskIndex, 1);
        saveTask();
        showSortedTasks();
    }
    closeModal();
}

// function to open modal
function openModel() {
    taskTitleInput.value = '';
    taskDescInput.value = '';
    taskStatusInput.value = 'todo';
    taskPriorityInput.value = 'low';
    modal.classList.remove('hidden')
}

// Function to close modal
/**
 * Closes the task modal and resets the current task variable declared
 * Add the Hidden class to allow the modal to dissapear once it is closed
 */
function closeModal() {
    modal.classList.add('hidden');
    editModal.classList.add('hidden');
    currentTask = null;
}

// Function to Save task changes
/**
 * This allos changes to be made in modal to be savd
 * @param {Event} e - Is the submit event from the form before
 * @returns 
 */
function saveTaskChanges(e) {
    e.preventDefault();
    
    if (!currentTask) return;
  
    // Update task object
    currentTask.title = editTaskTitleInput.value;
    currentTask.description = editTaskDescInput.value;
    currentTask.status = editTaskStatusInput.value;
    currentTask.priority = editTaskPriorityInput.value;
    
    // Refresh display
    // Refreshes the display and closes the modal
    saveTask()
    closeModal();
    showSortedTasks();
}

// function to Hide sidebar
function hideSidebarVisability() {
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('lg:w-[300px]');
    sidebar.classList.add('opacity-0');
    sidebar.classList.add('w-0');
    sidebar.classList.add('border-none');
    showSidebarBtn.classList.remove('hidden');
    localStorage.setItem('sidebarHidden', 'true');

}

// function to show sidebar
function showSidebarVisability() {
    sidebar.classList.remove('-translate-x-full');
    sidebar.classList.add('lg:w-[300px]');
    sidebar.classList.remove('opacity-0');
    sidebar.classList.remove('w-0');
    sidebar.classList.remove('border-none');
    showSidebarBtn.classList.add('hidden');
    localStorage.setItem('sidebarHidden', 'false');
}

function showSidebarVisabilityMobile(){
    mobileSidebar.classList.remove('hidden');
    localStorage.setItem('sidebarHidden', 'false');
}

function hideSidebarVisabilityMobile(){
    mobileSidebar.classList.add('hidden');
    localStorage.setItem('sidebarHidden', 'true');
}

function checkSidebarState () {
    const isHidden = localStorage.getItem('sidebarHidden') === 'true';
    if (isHidden){
        hideSidebarVisability();
    }
    else {
        showSidebarVisability();
    }
}

// Event Listeners
/**
 * Sets up event listener for the selected task that is triggered by a click
 * This will also open the edit model.
 * 
 */
function setupEventListeners() {
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

// Toggle event listener for light mode and dark mode
toggleSlider.addEventListener('change', () => {
    if (toggleSlider.checked) {
        bod.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        bod.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    }
});

if (localStorage.getItem('darkMode') === 'enabled') {
    bod.classList.add('dark');
    toggle.checked = true;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    bod.classList.add('dark');
    toggle.checked = true;
}

// Mobile toggle for light-mode darkmode
toggleSliderMobile.addEventListener('change', () => {
    if (toggleSliderMobile.checked) {
        bod.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        bod.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
    }
});

if (localStorage.getItem('darkMode') === 'enabled') {
    bod.classList.add('dark');
    toggle.checked = true;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    bod.classList.add('dark');
    toggle.checked = true;
}

// Initialize the board initially there was 8 now there will be 6
/**
 * init function is the main functon that has mor functions within the function
 */
function init() {
    showSortedTasks();
    checkSidebarState();
    setupEventListeners();
}

// Start the application
document.addEventListener('DOMContentLoaded', init);