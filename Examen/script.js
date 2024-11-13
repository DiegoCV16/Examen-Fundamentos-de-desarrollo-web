let tasks = [];
let taskToDelete = null;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const taskText = taskInput.value;
    const priority = prioritySelect.value;

    if (taskText === "") return;

    const task = { text: taskText, priority: priority };
    tasks.push(task);
    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        
        // Asignar color según la prioridad
        let priorityClass = '';
        if (task.priority === 'Alta') {
            priorityClass = 'high-priority';
        } else if (task.priority === 'Media') {
            priorityClass = 'medium-priority';
        } else if (task.priority === 'Baja') {
            priorityClass = 'low-priority';
        }

        taskItem.classList.add(priorityClass);

        taskItem.innerHTML = `
            ${task.text} (${task.priority})
            <button onclick="handleDelete(${index})">Eliminar</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function handleDelete(index) {
    taskToDelete = index;
    if (tasks[index].priority === "Alta") {
        document.getElementById("confirmDialog").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    } else {
        deleteTask(index);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function confirmDelete() {
    deleteTask(taskToDelete);
    closeDialog();
}

function cancelDelete() {
    closeDialog();
}

function closeDialog() {
    document.getElementById("confirmDialog").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
