// Create task function - Element
/**
 * Creates the list element and its respective / relevent classes in the DOM.
 * @param {Object} task - The tasks which are stored in an array and declared as tasks
 * @returns {HTMLLIElement} - The created list item elements
 */
export function createTaskElement(initialTasks) {
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
    
    taskElementCreated.setAttribute('data-id', initialTasks.id);
    taskElementCreated.setAttribute('data-priority', initialTasks.priority); // For sorting

    return taskElementCreated;
    // Returns the created DOM element
}