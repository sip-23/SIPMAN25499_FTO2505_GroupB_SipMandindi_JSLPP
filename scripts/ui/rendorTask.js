import { initialTasks } from '../utils/fetchdataApi.js';
import { createTaskElement } from '../ui/taskElement.js';


const todoTasks = document.getElementById('todo-tasks');
const doingTasks = document.getElementById('doing-tasks');
const doneTasks = document.getElementById('done-tasks');

/**
 * Showing the task
 * Implemented function to show all tasks once the script is running on the main section
 * First cleans the HTML Elements and then Shows or Renders the tasks from the given array to the respactive columns in the DOM
 */
export function showSortedTasks() {
    // Clear all columns
    todoTasks.innerHTML = '';
    doingTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    // Sort all tasks by priority first (high to low), then by other criteria if needed
    const sortedTasks = [...initialTasks].sort((a, b) => {
        // creates a copy using  spread operator 
        const priorityOrder = {high: 3, medium: 2, low: 1};
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Sort tasks into columns
    sortedTasks.forEach(task => {
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


/**
 * Update the task counts in each column header
 * Selects the Element container with the specified id and select the last child of the target parent and gives it the value of length of the Elements in that column
 */
function updateTaskCounts() {
  // Updates the count numbers in each column header
  // selects the DOM at the attribute node and uses the property .textcontent to update / set it with the length of the children nodes/ elements
  document.querySelector('#todo-column span:last-child').textContent = `(${todoTasks.children.length})`; 
  document.querySelector('#doing-column span:last-child').textContent = `(${doingTasks.children.length})`;
  document.querySelector('#done-column span:last-child').textContent = `(${doneTasks.children.length})`;
}