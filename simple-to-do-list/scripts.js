// Initial variables and funtcions
const inputField = document.querySelector("input");
const tasks = document.querySelector("#tasks");
const clearButton = document.querySelector("#add-task-section button");
let currentTask = false


const getNumberOfTasks = () => {
    let counter = 0
    Array.from(tasks.children).forEach(() => {
        counter++
    })

    return counter
}


// HTML structure of each task
const getElementHTML = (task) => {
    return `<button class="complete-button"><i class="fa-solid fa-check fa-flip" style="color: #000000;"></i></button>
    <button class="edit-button"><i class="fa-solid fa-pen-to-square" style="color: #000000;"></i></button>
    <p>${task}</p>`;
};


// A function that takes a task description and creates a task in the tasks container
const addTask = (task) => {
    const element = document.createElement("div");
    const currentId = "task-" + String(getNumberOfTasks() + 1);
    element.id = currentId;
    element.classList.add("task");
    element.innerHTML = getElementHTML(task);
    tasks.append(element);
    inputField.value = "";

    const completeButton = document.querySelector(`#${currentId} .complete-button`);
    completeButton.addEventListener("click", () => {
        completeButton.parentNode.remove();
        updateTasks();
    });
    updateTasks();

    const editButton = document.querySelector(`#${currentId} .edit-button`);
    editButton.addEventListener("click", () => {
        const current = editButton.nextSibling.nextSibling;
        currentTask = current;
        currentTask.parentNode.classList.add("focused");
        inputField.focus();
    });
}


// A function that takes all the tasks inside the tasks container and saves each description on the localStorage
const saveTasks = () => {
    const allTasks = Array.from(tasks.children);
    const taskData = allTasks.map((t) => t.getElementsByTagName("p")[0].innerText);
    localStorage.setItem('tasks', JSON.stringify(taskData));
};


// A function called after every addition or deletion of a task and updates the number of tasks as well as the localStorage
const updateTasks = () => {
    document.querySelector("header p").innerHTML = `Number Of Tasks: ${getNumberOfTasks()}`;
    saveTasks();
};


// Adding tasks with all the saved descriptions if any
window.addEventListener("load", () => {
    const taskData = JSON.parse(localStorage.getItem("tasks"));

    if (taskData) {
        taskData.forEach((td) => {
            addTask(td);
        });
    };

    updateTasks();
});


// Stop editing when the focus on the input is lost
inputField.addEventListener("blur", () => {
    if (currentTask) {
        currentTask = false;
        const selectedTask = document.querySelector(".focused");
        selectedTask.classList.remove("focused");
    };
});


// Add or edit a task
inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const task = inputField.value;
        if (!currentTask) {
            addTask(task)
        }
        else {
            currentTask.innerHTML = task;
            currentTask.parentNode.classList.remove("focused");
            inputField.value = "";
            currentTask = false;
        };
    };
}
);


// Clear all tasks
clearButton.addEventListener("click", () => {
    Array.from(tasks.children).forEach((t) => {
        t.remove();
    });
    updateTasks();
});
