// Ensure the script runs after the document finishes loading
document.addEventListener('DOMContentLoaded', () => {

    // Select required DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get and trim text from input
        const taskText = taskInput.value.trim();

        // Prevent adding empty tasks
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // When user clicks remove, delete the task
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Attach the button to the list item
        li.appendChild(removeButton);

        // Add the list item to the task list
        taskList.appendChild(li);

        // Clear the input field for the next task
        taskInput.value = "";
    }

    // Add task when the "Add Task" button is clicked
    addButton.addEventListener('click', addTask);

    // Add task when the user presses Enter inside the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
