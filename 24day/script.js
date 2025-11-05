const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when page loads
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Add new task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return alert("Enter a task!");
    addTaskToDOM(text, false);
    saveTasks();
    taskInput.value = "";
});

// Add task to UI
function addTaskToDOM(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;
    if (completed) li.classList.add("completed");

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    // Allow drag
    li.draggable = true;
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);

    taskList.appendChild(li);
}

// Drag & Drop functions
let draggedItem = null;
function dragStart(e) {
    draggedItem = this;
}
function dragOver(e) {
    e.preventDefault();
}
function drop() {
    if (draggedItem !== this) {
        let allTasks = Array.from(taskList.children);
        let draggedIndex = allTasks.indexOf(draggedItem);
        let dropIndex = allTasks.indexOf(this);
        if (draggedIndex < dropIndex) {
            taskList.insertBefore(draggedItem, this.nextSibling);
        } else {
            taskList.insertBefore(draggedItem, this);
        }
        saveTasks();
    }
}

// Save all tasks to localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.textContent,
        completed: li.classList.contains("completed"),
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
