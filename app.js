document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskInput.value}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const taskItem = button.parentElement;


    taskList.removeChild(taskItem);


    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];


    taskList.childNodes.forEach(function (taskItem) {
        const taskText = taskItem.querySelector("span").innerText;
        tasks.push(taskText);
    });


    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const storedTasks = localStorage.getItem("tasks");


    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach(function (taskText) {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;

            taskList.appendChild(taskItem);
        });
    }
}
