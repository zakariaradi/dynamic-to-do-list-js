// script.js
// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array of tasks (strings)
    let tasks = [];

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task element and append to DOM.
    // If save === true, also persist the task to localStorage.
    function addTask(taskText, save = true) {
        // When called without explicit taskText (user flow), read from input
        if (taskText === undefined) {
            taskText = taskInput.value.trim();
        }

        // Validate input
        if (!taskText || taskText.trim() === '') {
            alert("Please enter a task.");
            return;
        }

        // Create <li> and set a data attribute to hold the exact task text
        const li = document.createElement('li');
        li.textContent = taskText;
        li.dataset.task = taskText; // store the task text for reliable removal

        // Create remove button and assign class using classList.add
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // When remove button is clicked, remove the li and update localStorage
        removeButton.onclick = () => {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Remove from tasks array (first matching occurrence)
            const idx = tasks.indexOf(li.dataset.task);
            if (idx !== -1) {
                tasks.splice(idx, 1);
                saveTasks();
            }
        };

        // Append button to li and li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // If requested, add to tasks array and persist
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear the input field if this was a user-triggered add
        if (taskInput.value) taskInput.value = "";
    }

    // Load tasks from localStorage and populate the DOM
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Initialize in-memory array from storage to avoid duplication
        tasks = Array.isArray(stored) ? stored.slice() : [];

        // Create DOM entries without saving back to localStorage
        tasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize app by loading tasks
    loadTasks();
});
